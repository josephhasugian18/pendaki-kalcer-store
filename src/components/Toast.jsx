import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaCheckCircle, FaInfoCircle, FaExclamationCircle } from "react-icons/fa";

export default function Toast({ toast, clearToast, noNavigate = false }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        clearToast();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast, clearToast]);

  if (!toast) return null;

  let bgColor, icon;
  switch (toast.type) {
    case "cart":
      bgColor = "bg-green-600";
      icon = <FaShoppingCart />;
      break;
    case "wishlist":
      bgColor = "bg-pink-600";
      icon = <FaHeart />;
      break;
    case "success":
      bgColor = "bg-blue-600";
      icon = <FaCheckCircle />;
      break;
    case "error":
      bgColor = "bg-red-600";
      icon = <FaExclamationCircle />;
      break;
    case "info":
      bgColor = "bg-gray-600";
      icon = <FaInfoCircle />;
      break;
    default:
      bgColor = "bg-gray-600";
      icon = <FaInfoCircle />;
      break;
  }

  const handleClick = () => {
    if (!noNavigate) {
      if (toast.type === "cart") navigate("/cart");
      else if (toast.type === "wishlist") navigate("/wishlist");
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`fixed bottom-6 right-6 flex items-center gap-4 ${bgColor} text-white px-6 py-3 rounded-2xl shadow-xl transition-transform transform
      ${noNavigate ? "cursor-default" : "cursor-pointer"} 
      hover:scale-105 hover:shadow-2xl
      min-w-[250px] max-w-[400px] w-auto
      animate-slide-in animate-fade-in z-50`}
    >
      <div className="text-lg">{icon}</div>
      <div className="font-medium truncate">{toast.message}</div>
    </div>
  );
}
