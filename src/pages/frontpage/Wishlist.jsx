import { useWishlist } from "../../context/WishlistContext";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import Toast from "../../components/Toast";
import { FaHeart } from "react-icons/fa";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center gap-6 animate-fadeInUp">
          <div className="text-6xl text-pink-400 animate-bounce">
            <FaHeart />
          </div>
          <h2 className="text-3xl font-bold text-gray-700 animate-pulse">
            Your Wishlist is Empty
          </h2>
          <p className="text-gray-500 max-w-sm">
            You haven't added any favorite products yet.
          </p>
          <Link
            to="/"
            className="mt-4 bg-amber-900 text-white px-6 py-3 rounded-lg font-semibold 
            hover:bg-red-800 hover:scale-105 hover:shadow-lg transition-transform duration-300"
          >
            Back to Dashboard
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize || "default"}`}
              className="border rounded-2xl p-4 shadow-md hover:shadow-xl transition flex flex-col items-center bg-white"
            >
              <Link to={`/product/${item.id}`} className="relative w-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-40 object-contain mb-3 cursor-pointer transform hover:scale-105 transition duration-300"
                />
                {item.selectedSize && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                    {item.selectedSize}
                  </span>
                )}
              </Link>

              <h2 className="font-semibold text-lg text-center text-gray-800">
                {item.name}
              </h2>
              <p className="text-green-600 font-medium mt-1">{item.price}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    addToCart(item, 1, item.selectedSize || undefined);
                    showToast("Added to Cart", "cart");
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition"
                >
                  + Cart
                </button>
                <button
                  onClick={() => {
                    removeFromWishlist(item.id, item.selectedSize);
                    showToast("Removed from Wishlist", "wishlist");
                  }}
                  className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-lg text-sm font-medium transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Toast toast={toast} clearToast={() => setToast(null)} />
    </div>
  );
}
