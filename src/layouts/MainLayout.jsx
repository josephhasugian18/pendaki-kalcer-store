import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import { useToast } from "../context/ToastContext"; 

export default function MainLayout() {
  const { toast, clearToast } = useToast(); 

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 p-6">
        <Outlet />
      </main>

      <Toast toast={toast} clearToast={clearToast} />

      <footer className="bg-amber-900 text-white text-center p-4 font-bold">
        <p>© 2025 Pendaki Kalcer</p>
      </footer>
    </div>
  );
}
