import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseInt(String(item.price).replace(/[^\d]/g, ""), 10) || 0;
    return acc + price * Number(item.quantity);
  }, 0);

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Please select a payment method first.");
      return;
    }
    navigate("/payment", { state: { paymentMethod } });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>

        <form
          className="space-y-6 bg-white p-6 rounded-2xl shadow-md"
          onSubmit={handleSubmit}
        >
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-700 outline-none"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Address
            </label>
            <textarea
              placeholder="Full Address"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-700 outline-none"
              required
            ></textarea>
          </div>

          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Payment Method
            </label>
            <select
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-700 outline-none"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              required
            >
              <option value="">-- Select Method --</option>
              <option value="qris-cod">COD</option>
              <option value="qris-ovo">OVO</option>
              <option value="qris-dana">DANA</option>
              <option value="qris-bri">BRI</option>
              <option value="qris-bca">BCA</option>
              <option value="qris-bni">BNI</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Confirm Order
          </button>
        </form>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Order Summary</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">No products in the cart.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.id}-${item.selectedSize || "default"}`}
                className="flex items-center gap-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded border"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  {item.selectedSize && (
                    <p className="text-sm text-gray-600">
                      Size: {item.selectedSize}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    {Number(item.quantity)} x {item.price}
                  </p>
                </div>
                <p className="font-semibold text-gray-800">
                  {formatRupiah(
                    (parseInt(String(item.price).replace(/[^\d]/g, ""), 10) ||
                      0) * Number(item.quantity)
                  )}
                </p>
              </div>
            ))}

            <hr />

            <div className="flex justify-between font-bold text-lg text-gray-800">
              <span>Total</span>
              <span>{formatRupiah(subtotal)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
