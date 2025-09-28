import { Link } from "react-router-dom";
import { Package, ShoppingCart } from "lucide-react";
import products from "../../data/products";

export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-amber-900 mb-2">Dashboard</h1>
      <div className="h-1 w-20 bg-amber-900 rounded mb-6"></div>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <p className="text-gray-700">
          Welcome to{" "}
          <span className="font-semibold text-amber-900">Pendaki Kalcer Admin</span> 👋
          Manage products and orders here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/products"
          className="bg-white p-6 rounded-xl shadow flex items-center gap-4 hover:shadow-lg transition cursor-pointer"
        >
          <div className="p-4 bg-red-100 text-amber-900 rounded-full">
            <Package size={28} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Products</h2>
            <p className="text-gray-600 text-sm">Total: {products.length}</p>
          </div>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white p-6 rounded-xl shadow flex items-center gap-4 hover:shadow-lg transition cursor-pointer"
        >
          <div className="p-4 bg-green-100 text-green-700 rounded-full">
            <ShoppingCart size={28} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-gray-600 text-sm">Click to view all orders</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
