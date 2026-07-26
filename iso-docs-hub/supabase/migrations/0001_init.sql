-- ============================================================================
-- ISO Docs Hub — Supabase schema
-- Run in Supabase SQL editor, or via `supabase db push` with this as a migration.
-- ============================================================================

create extension if not exists "uuid-ossp";

-- ----------------------------------------------------------------------------
-- PROFILES  (extends auth.users)
-- ----------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  gstin text,
  billing_address jsonb,
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, company, phone)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company',
    new.raw_user_meta_data->>'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ----------------------------------------------------------------------------
-- PRODUCTS
-- ----------------------------------------------------------------------------
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  tagline text,
  description text,
  category text not null,
  doc_code text unique not null,
  price_paise integer not null,
  compare_at_price_paise integer,
  document_count integer not null default 0,
  version text not null default 'v1.0',
  whats_included text[] default '{}',
  compatibility text[] default '{}',
  images text[] default '{}',
  file_path text,          -- storage path in 'product-files' bucket (ZIP deliverable)
  preview_pdf_path text,   -- storage path in 'product-previews' bucket
  popular boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_products_category on public.products(category);
create index idx_products_active on public.products(active);

-- ----------------------------------------------------------------------------
-- COUPONS
-- ----------------------------------------------------------------------------
create table public.coupons (
  code text primary key,
  type text not null check (type in ('percent', 'flat')),
  value integer not null,
  max_uses integer not null default 1000,
  uses integer not null default 0,
  active boolean not null default true,
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- ORDERS  (id = Razorpay order_id for easy reconciliation)
-- ----------------------------------------------------------------------------
create table public.orders (
  id text primary key,
  user_id uuid not null references public.profiles(id),
  product_id uuid not null references public.products(id),
  amount_paise integer not null,
  status text not null default 'pending' check (status in ('pending', 'paid', 'failed', 'refunded')),
  coupon_code text references public.coupons(code),
  razorpay_payment_id text,
  razorpay_signature text,
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

create index idx_orders_user on public.orders(user_id);
create index idx_orders_status on public.orders(status);

-- ----------------------------------------------------------------------------
-- PURCHASES  (grants access — one row per unlocked product per user)
-- ----------------------------------------------------------------------------
create table public.purchases (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id),
  product_id uuid not null references public.products(id),
  order_id text references public.orders(id),
  purchased_at timestamptz not null default now(),
  unique (user_id, product_id, order_id)
);

-- ----------------------------------------------------------------------------
-- DOWNLOADS  (audit log for download history)
-- ----------------------------------------------------------------------------
create table public.downloads (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id),
  product_id uuid not null references public.products(id),
  ip_address text,
  downloaded_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- INVOICES
-- ----------------------------------------------------------------------------
create table public.invoices (
  id uuid primary key default uuid_generate_v4(),
  invoice_number text unique,
  order_id text not null references public.orders(id),
  user_id uuid not null references public.profiles(id),
  pdf_path text,
  created_at timestamptz not null default now()
);

create sequence invoice_number_seq start 1;
create or replace function public.generate_invoice_number()
returns trigger as $$
begin
  new.invoice_number := 'INV-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('invoice_number_seq')::text, 4, '0');
  return new;
end;
$$ language plpgsql;

create trigger set_invoice_number
  before insert on public.invoices
  for each row execute procedure public.generate_invoice_number();

-- ----------------------------------------------------------------------------
-- REVIEWS
-- ----------------------------------------------------------------------------
create table public.reviews (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id),
  product_id uuid not null references public.products(id),
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

-- ----------------------------------------------------------------------------
-- WISHLIST
-- ----------------------------------------------------------------------------
create table public.wishlist (
  user_id uuid not null references public.profiles(id),
  product_id uuid not null references public.products(id),
  added_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

-- ----------------------------------------------------------------------------
-- NEWSLETTER / LEADS
-- ----------------------------------------------------------------------------
create table public.newsletter_subscribers (
  email text primary key,
  name text,
  mobile text,
  company text,
  source text,
  requested_items text[],
  subscribed_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- CONTACT MESSAGES
-- ----------------------------------------------------------------------------
create table public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  email text not null,
  mobile text,
  message text not null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- BLOG POSTS
-- ----------------------------------------------------------------------------
create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text,
  category text,
  cover_image text,
  author text,
  read_minutes integer default 5,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

-- ============================================================================
-- ROW LEVEL SECURITY
-- ============================================================================
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.coupons enable row level security;
alter table public.orders enable row level security;
alter table public.purchases enable row level security;
alter table public.downloads enable row level security;
alter table public.invoices enable row level security;
alter table public.reviews enable row level security;
alter table public.wishlist enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.contact_messages enable row level security;
alter table public.blog_posts enable row level security;

-- Helper: is the current user an admin?
create or replace function public.is_admin()
returns boolean as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin');
$$ language sql security definer stable;

-- Profiles: users see/update their own row; admins see all
create policy "profiles_select_own" on public.profiles for select using (auth.uid() = id or public.is_admin());
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);

-- Products: publicly readable when active; only admins can write
create policy "products_public_read" on public.products for select using (active = true or public.is_admin());
create policy "products_admin_write" on public.products for insert with check (public.is_admin());
create policy "products_admin_update" on public.products for update using (public.is_admin());
create policy "products_admin_delete" on public.products for delete using (public.is_admin());

-- Coupons: only admins can read/write directly (validation happens server-side via service role)
create policy "coupons_admin_all" on public.coupons for all using (public.is_admin());

-- Orders: users see their own; admins see all
create policy "orders_select_own" on public.orders for select using (auth.uid() = user_id or public.is_admin());
create policy "orders_insert_own" on public.orders for insert with check (auth.uid() = user_id);
create policy "orders_admin_update" on public.orders for update using (public.is_admin());

-- Purchases: users see their own; admins see all
create policy "purchases_select_own" on public.purchases for select using (auth.uid() = user_id or public.is_admin());

-- Downloads: users see their own; admins see all
create policy "downloads_select_own" on public.downloads for select using (auth.uid() = user_id or public.is_admin());
create policy "downloads_insert_own" on public.downloads for insert with check (auth.uid() = user_id);

-- Invoices: users see their own; admins see all
create policy "invoices_select_own" on public.invoices for select using (auth.uid() = user_id or public.is_admin());

-- Reviews: publicly readable; only the purchasing user may insert their own
create policy "reviews_public_read" on public.reviews for select using (true);
create policy "reviews_insert_own" on public.reviews for insert with check (auth.uid() = user_id);
create policy "reviews_update_own" on public.reviews for update using (auth.uid() = user_id);

-- Wishlist: private to the user
create policy "wishlist_all_own" on public.wishlist for all using (auth.uid() = user_id);

-- Newsletter subscribers: insert-only from the public (via API route using service role); admin read
create policy "newsletter_admin_read" on public.newsletter_subscribers for select using (public.is_admin());

-- Contact messages: admin read only; inserts go through API route with service role
create policy "contact_admin_read" on public.contact_messages for select using (public.is_admin());

-- Blog posts: public reads published posts; admins manage all
create policy "blog_public_read" on public.blog_posts for select using (published = true or public.is_admin());
create policy "blog_admin_write" on public.blog_posts for insert with check (public.is_admin());
create policy "blog_admin_update" on public.blog_posts for update using (public.is_admin());
create policy "blog_admin_delete" on public.blog_posts for delete using (public.is_admin());

-- ============================================================================
-- STORAGE BUCKETS
-- Run these once (or via Supabase Dashboard → Storage):
--   product-files     (private)  — deliverable ZIPs, served only via signed URLs
--   product-previews  (public)   — sample preview PDFs
--   product-images    (public)   — gallery screenshots
-- ============================================================================
insert into storage.buckets (id, name, public) values ('product-files', 'product-files', false)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('product-previews', 'product-previews', true)
  on conflict (id) do nothing;
insert into storage.buckets (id, name, public) values ('product-images', 'product-images', true)
  on conflict (id) do nothing;

create policy "product_files_admin_write" on storage.objects for insert
  with check (bucket_id = 'product-files' and public.is_admin());
create policy "product_files_admin_manage" on storage.objects for update
  using (bucket_id = 'product-files' and public.is_admin());
create policy "product_previews_public_read" on storage.objects for select
  using (bucket_id in ('product-previews', 'product-images'));
