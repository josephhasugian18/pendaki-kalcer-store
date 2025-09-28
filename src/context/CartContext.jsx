import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, quantity = 1) => {
    const q = Math.max(1, Number(quantity)); 
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === product.selectedSize
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.selectedSize === product.selectedSize
            ? { ...item, quantity: Number(item.quantity) + q }
            : item
        );
      }

      return [...prev, { ...product, quantity: q }];
    });
  };

  const removeFromCart = (id, selectedSize) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.id === id && item.selectedSize === selectedSize)
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const updateQuantity = (id, newQuantity, selectedSize) => {
    const q = Math.max(1, Number(newQuantity));
    if (Number.isNaN(q)) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === selectedSize
          ? { ...item, quantity: q }
          : item
      )
    );
  };

  const increaseQuantity = (id, selectedSize) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.selectedSize === selectedSize
          ? { ...item, quantity: Number(item.quantity) + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id, selectedSize) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id && item.selectedSize === selectedSize
            ? { ...item, quantity: Math.max(0, Number(item.quantity) - 1) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
