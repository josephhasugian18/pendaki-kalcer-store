import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import Toast from "../components/Toast";
import { useToast } from "../context/ToastContext"; 

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast, clearToast } = useToast(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn"); 
    navigate("/login"); 
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <header className="bg-amber-900 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-20">
          <h1 className="text-xl font-bold text-white tracking-wide"></h1>
          <div className="flex items-center gap-4">
            <button
              className="md:hidden p-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>

            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <div className="bg-white rounded-xl shadow p-6 min-h-[80vh] transition">
            <Outlet />
          </div>
        </main>

        <Toast toast={toast} clearToast={clearToast} noNavigate={true} />

        <footer className="bg-white border-t p-4 text-center text-sm text-gray-600">
          © 2025 <span className="font-semibold text-amber-900">Pendaki Kalcer Admin</span>.
        </footer>
      </div>
    </div>
  );
}
