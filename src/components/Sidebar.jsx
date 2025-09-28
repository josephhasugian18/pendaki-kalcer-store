import { Link, useLocation } from "react-router-dom";
import { Info, Package, ShoppingCart } from "lucide-react"; 
import Logo from "../assets/Logo.png";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();

  const menuItems = [
    { path: "/admin/products", label: "Products", icon: <Package className="w-5 h-5" /> },
    { path: "/admin/orders", label: "Orders", icon: <ShoppingCart className="w-5 h-5" /> },
    { path: "/admin/about", label: "About", icon: <Info className="w-5 h-5" /> },
  ];

  return (
    <div
      className={`${
        sidebarOpen ? "block" : "hidden"
      } md:block w-64 bg-white shadow-md h-screen sticky top-0`}
    >
      <Link
        to="/admin"
        onClick={() => setSidebarOpen(false)}
        className="flex items-center gap-2 p-4 font-bold text-xl text-amber-900 border-b hover:bg-amber-200 transition"
      >
        <img src={Logo} alt="Logo" className="w-8 h-8 object-contain" />
        <span>PENCER ADMIN</span>
      </Link>

      <nav className="flex flex-col p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${
                isActive
                  ? "bg-amber-800 text-white"
                  : "text-gray-700 hover:bg-amber-200"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
