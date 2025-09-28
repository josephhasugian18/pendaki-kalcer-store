import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  const addOrder = (order) => {
    setOrders((prev) => {
      const newOrders = [...prev, order];
      localStorage.setItem("orders", JSON.stringify(newOrders));
      return newOrders;
    });
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrders = () => useContext(OrderContext);
