import { useParams } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext"; 
import AdminProductForm from "./AdminProductForm";
import { useToast } from "../../context/ToastContext";

export default function EditProduct() {
  const { id } = useParams();
  const { products, updateProduct } = useProducts();
  const { showToast } = useToast();

  const product = products.find((p) => p.id === parseInt(id));
  if (!product) return <p>Product not found</p>;

  const handleSubmit = (updated) => {
    updateProduct(product.id, updated);  
    showToast("Product updated successfully!", "success"); 
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <AdminProductForm 
        initialData={product} 
        onSubmit={handleSubmit} 
        submitLabel="Update" 
      />
    </div>
  );
}
