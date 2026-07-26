import { notFound } from "next/navigation";
import AdminTopbar from "@/components/admin/topbar";
import ProductForm from "@/components/admin/product-form";
import { products } from "@/lib/data";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) return notFound();
  return (
    <div>
      <AdminTopbar title={`Edit — ${product.title}`} />
      <div className="p-6">
        <ProductForm initial={product} />
      </div>
    </div>
  );
}
