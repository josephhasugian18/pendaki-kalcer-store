import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
  } = useCart();

  const [toast, setToast] = useState(null);

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center gap-6 p-6 animate-fadeInUp">
        <div className="text-6xl text-gray-300 animate-bounce">
          <FaShoppingCart />
        </div>
        <h2 className="text-3xl font-bold text-gray-700 animate-pulse">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-gray-500 max-w-sm">
          It seems you haven't added any products to your cart yet.
        </p>
        <Link
          to="/"
          className="mt-4 bg-amber-900 text-white px-6 py-3 rounded-lg font-semibold 
          hover:bg-red-800 hover:scale-105 hover:shadow-lg transition-transform duration-300"
        >
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseInt(String(item.price).replace(/[^\d]/g, ""), 10) || 0;
    return acc + price * Number(item.quantity);
  }, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-white text-gray-700">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-center">Size</th>
              <th className="p-3 text-center">Quantity</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-right">Total</th>
              <th className="p-3 text-center">Remove</th>
            </tr>
          </thead>

          <tbody>
            {cartItems.map((item) => {
              const price =
                parseInt(String(item.price).replace(/[^\d]/g, ""), 10) || 0;
              const total = price * Number(item.quantity);

              return (
                <tr
                  key={`${item.id}-${item.selectedSize || "default"}`}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="p-3">
                    <Link to={`/product/${item.id}`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-contain rounded cursor-pointer hover:scale-105 transition"
                      />
                    </Link>
                  </td>

                  <td className="p-3 font-medium">{item.name}</td>

                  <td className="p-3 text-center">
                    {item.selectedSize ? (
                      <span className="bg-red-100 text-amber-900 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                        {item.selectedSize}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>

                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.id, item.selectedSize)
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={Number(item.quantity)}
                        min="1"
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            e.target.value,
                            item.selectedSize
                          )
                        }
                        className="w-12 text-center border rounded"
                      />
                      <button
                        onClick={() =>
                          increaseQuantity(item.id, item.selectedSize)
                        }
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="p-3 text-right text-green-600">{item.price}</td>

                  <td className="p-3 text-right font-semibold text-green-700">
                    {formatRupiah(total)}
                  </td>

                  <td className="p-3 text-center">
                    <button
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-red-500 hover:text-amber-900 font-medium"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

          <tfoot>
            <tr className="border-t bg-gray-50 font-semibold">
              <td colSpan="5" className="p-3 text-right">
                Subtotal:
              </td>
              <td className="p-3 text-right text-green-700">
                {formatRupiah(subtotal)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={clearCart}
          className="bg-amber-800 text-white px-5 py-2 rounded-lg hover:bg-amber-800 transition"
        >
          Clear Cart
        </button>
        <Link
          to="/checkout"
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
}
