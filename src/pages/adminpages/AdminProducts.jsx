import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductsContext";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const { products, deleteProduct } = useProducts();
  const navigate = useNavigate();

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.id - b.id);

  return (
    <div>
      <h1 className="text-3xl font-bold text-amber-900 mb-2">Product List</h1>
      <div className="h-1 w-43 bg-amber-900 rounded mb-6"></div>

      <div className="mb-6 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-900"
        />

        <button
          onClick={() => navigate("/admin/products/add")}
          className="ml-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const numericPrice = parseInt(product.price.replace(/[^\d]/g, ""));
            return (
              <div
                key={product.id}
                className="bg-white border-3 border-amber-900 rounded-lg shadow hover:shadow-lg flex flex-col relative transition-transform duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-cover"
                />
                <div className="p-4 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-amber-900 font-bold">
                    Rp {numericPrice.toLocaleString("id-ID")}
                  </p>

                  <div className="absolute bottom-2 right-2 flex gap-3 text-xl">
                    <AiOutlineEdit
                      className="cursor-pointer text-blue-600 hover:text-blue-700"
                      onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                    />
                    <AiOutlineDelete
                      className="cursor-pointer text-red-700 hover:text-red-800"
                      onClick={() => deleteProduct(product.id)}
                    />
                    <AiOutlineEye
                      className="cursor-pointer text-gray-600 hover:text-gray-800"
                      onClick={() => navigate(`/product/${product.id}`)}
                    />
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="col-span-full text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}
