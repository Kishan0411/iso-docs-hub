# ISO Docs Hub

**Professional Documentation for Certification & Compliance**

A premium, production-ready storefront for selling original ISO documentation kits, SOPs, formats, checklists and compliance templates — built with Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Supabase and Razorpay.

> **Legal note:** This platform sells **original templates authored in-house** (manuals, SOPs, procedures, forms, checklists, audit tools). It does **not** sell or reproduce official copyrighted ISO standard publications. See `/legal/disclaimer`.

---

## 1. Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, Server Components) |
| Language | TypeScript |
| Styling | Tailwind CSS + `tailwindcss-animate` + `@tailwindcss/typography` |
| Animation | Framer Motion |
| Icons | lucide-react |
| Auth + DB + Storage | Supabase (Postgres, Row Level Security, Storage buckets) |
| Payments | Razorpay (Orders API + Webhooks) |
| Charts (admin) | Recharts |
| Forms/validation | react-hook-form + zod |
| Theming | next-themes (dark/light) |

---

## 2. Folder structure

```
iso-docs-hub/
├── app/
│   ├── (marketing)/          # Public site — layout-free route group
│   │   ├── shop/
│   │   │   └── [category]/
│   │   ├── product/[slug]/
│   │   ├── free-downloads/
│   │   ├── blog/[slug]/
│   │   ├── about/
│   │   ├── contact/
│   │   └── legal/            # privacy, refund, terms, disclaimer, shipping
│   ├── (auth)/                # login / register / forgot-password
│   ├── (dashboard)/dashboard/ # customer account area (protected)
│   ├── admin/                 # admin panel (protected, role-gated)
│   ├── api/
│   │   ├── checkout/create-order/
│   │   ├── checkout/verify/
│   │   ├── webhooks/razorpay/
│   │   ├── downloads/[productId]/
│   │   ├── newsletter/subscribe/
│   │   ├── contact/
│   │   ├── admin/products/
│   │   ├── admin/orders/
│   │   └── reviews/
│   ├── layout.tsx, page.tsx, globals.css
│   ├── sitemap.ts, robots.ts
├── components/
│   ├── layout, home, shop, product, blog, dashboard, admin, marketing, ui
├── lib/
│   ├── supabase/ (client.ts, server.ts)
│   ├── razorpay/client.ts
│   ├── data.ts   (typed mock catalogue — swap for Supabase queries)
│   ├── types.ts, utils.ts, rate-limit.ts
├── supabase/migrations/0001_init.sql
├── middleware.ts   (route protection for /dashboard, /admin)
└── .env.example
```

---

## 3. Getting started locally

```bash
npm install
cp .env.example .env.local   # fill in Supabase + Razorpay keys
npm run dev
```

The app currently reads catalogue/blog data from `lib/data.ts` (typed mock data) so the UI is fully browsable out of the box. To go live, point the same components at Supabase queries (`supabase.from('products').select()`) using the schema below — the shapes already match.

---

## 4. Supabase setup

1. Create a project at supabase.com.
2. Run `supabase/migrations/0001_init.sql` in the SQL editor (creates tables, RLS policies, and the three storage buckets: `product-files` private, `product-previews` + `product-images` public).
3. Copy your Project URL, anon key and service role key into `.env.local`.
4. In **Authentication → Providers**, enable Email (and any social providers you want).
5. Promote your admin account: `update public.profiles set role = 'admin' where id = '<your-user-uuid>';`

### Tables
`profiles · products · coupons · orders · purchases · downloads · invoices · reviews · wishlist · newsletter_subscribers · contact_messages · blog_posts`

Row Level Security is enabled on every table — customers can only read/write their own rows; product/coupon/blog writes require `role = 'admin'`.

---

## 5. Razorpay setup

1. Create a Razorpay account, get **Key ID** and **Key Secret** (Test mode first).
2. Add to `.env.local`: `NEXT_PUBLIC_RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`.
3. In **Dashboard → Settings → Webhooks**, add `https://yourdomain.com/api/webhooks/razorpay`, subscribe to `payment.captured` and `payment.failed`, and copy the webhook secret into `RAZORPAY_WEBHOOK_SECRET`.
4. Checkout flow: `BuyBox` (client) → `POST /api/checkout/create-order` (creates a Razorpay order server-side using the **DB price**, never a client-supplied price) → Razorpay Checkout modal opens → on success, `POST /api/checkout/verify` validates the HMAC signature, marks the order paid, and inserts a `purchases` row → the webhook is a redundant backstop for the same effect if the browser tab closes early.
5. Supports UPI, cards, net banking and wallets automatically — these are configured in the Razorpay Dashboard, not in code.

---

## 6. Digital delivery & security

- Deliverable ZIPs live in the **private** `product-files` bucket. `GET /api/downloads/[productId]` checks the caller purchased the product, then issues a **5-minute signed URL** — files are never publicly linkable.
- Every download is logged to the `downloads` table for the customer's Download History and for admin auditing.
- `middleware.ts` protects `/dashboard/*` (any authenticated user) and `/admin/*` (must additionally have `role = 'admin'` in `profiles`).
- `lib/rate-limit.ts` throttles checkout, download, contact and newsletter endpoints per-IP. Swap the in-memory store for Upstash Redis before scaling to multiple server instances.
- Razorpay payment signatures are verified server-side with HMAC-SHA256 — the client can never fake a "paid" state.

---

## 7. SEO

- Per-page `generateMetadata` (title, description, canonical, Open Graph) on every route.
- `Product` and `BlogPosting` JSON-LD schema on product/blog pages.
- Dynamic `app/sitemap.ts` (all static, category, product and blog URLs) and `app/robots.ts` (blocks `/admin`, `/dashboard`, `/api`, auth pages).
- Breadcrumb trails on shop, category, product and blog pages.
- Semantic headings, `next/font` for zero-CLS type loading, image `alt` conventions ready for real assets.

---

## 8. Admin panel

`/admin` — role-gated via `profiles.role = 'admin'`.

- **Dashboard** — revenue chart, recent orders, KPI cards.
- **Products** — list, add, edit, delete; upload ZIP deliverable + preview PDF + gallery images.
- **Orders** — filter by status, view customer + download GST invoice.
- **Customers** — contact info, lifetime orders/spend.
- **Coupons** — create % / flat discounts with usage caps.
- **Blog** — manage posts by category.
- **Newsletter** — compose campaigns, view/export subscriber list.
- **Analytics** — sales by category, traffic sources, conversion/AOV/cart-abandonment KPIs.

---

## 9. Deployment (Vercel)

1. Push this repo to GitHub.
2. Import into Vercel → Framework preset **Next.js** (auto-detected).
3. Add all variables from `.env.example` under **Project → Settings → Environment Variables** (use **live** Razorpay keys for Production).
4. Deploy. Vercel builds `app/sitemap.ts`/`robots.ts` automatically at `/sitemap.xml` and `/robots.txt`.
5. Point your domain's DNS at Vercel, then update `NEXT_PUBLIC_SITE_URL`.
6. Re-point the Razorpay webhook URL at your production domain.
7. Run the Supabase migration against your **production** Supabase project (use a separate project from dev/staging).

### Post-launch checklist
- [ ] Switch Razorpay from Test to Live mode keys
- [ ] Verify webhook signature secret matches the Live webhook
- [ ] Upload real product ZIPs/PDFs/images to Supabase Storage and update `products.file_path`
- [ ] Set your GSTIN/company details in `.env` for invoice generation
- [ ] Configure a transactional email provider (Resend/SendGrid) for order confirmations & free-download links
- [ ] Submit `sitemap.xml` to Google Search Console
- [ ] Load-test `/api/checkout/create-order` and raise rate limits or move to Redis if needed

---

## 10. Design system

- **Palette:** Ink navy (`#0B1220`), Signal blue (`#2563EB`), Certify emerald (`#10B981`), white, slate greys.
- **Type:** Space Grotesk (display/headings), Inter (body), IBM Plex Mono (document codes, prices, data).
- **Motif:** a certification "stamp" — used in the hero and empty states — reinforcing the compliance/audit theme without leaning on stock imagery.
- Dark mode via `next-themes`, class-based (`dark:` variants throughout).
