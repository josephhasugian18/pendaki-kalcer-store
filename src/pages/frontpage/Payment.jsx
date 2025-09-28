import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useOrders } from "../../context/OrderContext";
import { FaCheckCircle } from "react-icons/fa";
import QRCode from "react-qr-code";

export default function Payment() {
  const { cartItems, clearCart } = useCart();
  const { addOrder } = useOrders(); 
  const location = useLocation();
  const paymentMethod = location.state?.paymentMethod || "transfer";
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = parseInt(String(item.price).replace(/[^\d]/g, ""), 10) || 0;
    return acc + price * Number(item.quantity);
  }, 0);

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(num);

  const handleConfirm = () => {
    if (cartItems.length === 0) return;

    const newOrder = {
      id: Date.now(),
      items: cartItems,
      paymentMethod,
      total: subtotal,
      date: new Date().toLocaleString(),
    };

    addOrder(newOrder);  
    clearCart();         
    setShowSuccess(true); 

    setTimeout(() => setShowSuccess(false), 5000);
  };

  const isQRIS = paymentMethod.startsWith("qris-");
  const qrName = isQRIS ? paymentMethod.split("-")[1] : "";

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-6 rounded-2xl shadow-md text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">Payment</h1>

        {isQRIS && (
          <>
            <h2 className="text-lg font-semibold mb-2 text-gray-700 uppercase">{qrName}</h2>
            <div className="flex justify-center mb-2 p-4 bg-gray-100 rounded-lg">
              <QRCode value={`QR-${paymentMethod}`} size={200} />
            </div>
            <p className="text-gray-600">
              Scan the QR code above to complete the payment.
            </p>
          </>
        )}

        {paymentMethod === "cod" && (
          <p className="text-gray-600">
            Please prepare cash. Payment will be made upon delivery.
          </p>
        )}

        <button
          onClick={handleConfirm}
          className="mt-4 w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Confirm Payment
        </button>
      </div>

      <div className="bg-gray-50 p-6 rounded-2xl shadow-md space-y-4">
        <h2 className="text-xl font-bold text-gray-800">Order Details</h2>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">No products in the cart.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.selectedSize || "default"}`} className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded border" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  {item.selectedSize && <p className="text-sm text-gray-600">Size: {item.selectedSize}</p>}
                  <p className="text-sm text-gray-500">{item.quantity} x {item.price}</p>
                </div>
                <p className="font-semibold text-gray-800">
                  {formatRupiah((parseInt(String(item.price).replace(/[^\d]/g, ""), 10) || 0) * item.quantity)}
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

      {showSuccess && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-green-600 text-white px-10 py-8 rounded-3xl flex flex-col items-center shadow-2xl animate-scale-fade">
            <FaCheckCircle className="text-6xl mb-4 animate-bounce-mini" />
            <div className="text-2xl font-bold text-center">Payment Completed Successfully</div>
          </div>
        </div>
      )}
    </div>
  );
}
