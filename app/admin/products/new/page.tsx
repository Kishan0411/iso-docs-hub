import AdminTopbar from "@/components/admin/topbar";
import ProductForm from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div>
      <AdminTopbar title="Add Product" />
      <div className="p-6">
        <ProductForm />
      </div>
    </div>
  );
}
