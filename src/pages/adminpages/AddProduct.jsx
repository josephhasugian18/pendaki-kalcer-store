import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext"; 
import AdminProductForm from "./AdminProductForm";
import { useToast } from "../../context/ToastContext";

export default function AddProduct() {
  const { products, addProduct } = useProducts();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (product) => {
    const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;
    const newProduct = { ...product, id: newId };

    addProduct(newProduct);
    showToast("Product added successfully!", "success", true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>
      <AdminProductForm onSubmit={handleSubmit} submitLabel="Add" />
    </div>
  );
}
