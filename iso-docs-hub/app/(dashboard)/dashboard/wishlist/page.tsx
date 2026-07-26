import { products } from "@/lib/data";
import ProductCard from "@/components/product-card";

export default function WishlistPage() {
  const wishlist = products.slice(3, 5);
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">Wishlist</h1>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Kits you've saved for later.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {wishlist.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
        {wishlist.length === 0 && (
          <p className="col-span-full py-16 text-center text-sm text-slate-500 dark:text-slate-400">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}
