import { useOrders } from "../../context/OrderContext";
import { FaBox, FaClipboardList } from "react-icons/fa";

export default function AdminOrders() {
  const { orders } = useOrders();

  const formatRupiah = (num) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center gap-6 p-6">
        <FaClipboardList className="text-6xl text-gray-300 animate-bounce" />
        <h2 className="text-3xl font-bold text-gray-700">No Orders Yet</h2>
        <p className="text-gray-500 max-w-sm">
          No transactions have been made. Paid orders will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-amber-900 mb-4">Orders List</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <FaBox className="text-amber-800 text-xl" />
                <span className="font-semibold text-gray-800">
                  Order #{order.id}
                </span>
              </div>
              <span className="text-sm text-gray-500">{order.date}</span>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Size</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2 text-right">Price</th>
                    <th className="p-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => {
                    const price =
                      parseInt(String(item.price).replace(/[^\d]/g, ""), 10) || 0;
                    const total = price * Number(item.quantity);

                    return (
                      <tr key={`${item.id}-${item.selectedSize || "default"}`} className="border-t hover:bg-gray-50">
                        <td className="p-2 flex items-center gap-2">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-contain rounded"
                          />
                          <span className="font-medium">{item.name}</span>
                        </td>
                        <td className="p-2 text-center">{item.selectedSize || "-"}</td>
                        <td className="p-2 text-center">{item.quantity}</td>
                        <td className="p-2 text-right text-green-600">{item.price}</td>
                        <td className="p-2 text-right font-semibold text-green-700">
                          {formatRupiah(total)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between mt-4 font-bold text-gray-800">
              <span>Payment Method:</span>
              <span className="capitalize">{order.paymentMethod}</span>
            </div>

            <div className="flex justify-between mt-1 font-bold text-lg text-green-700">
              <span>Order Total:</span>
              <span>{formatRupiah(order.total)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
