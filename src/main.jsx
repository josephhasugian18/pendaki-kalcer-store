import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter> 
      <WishlistProvider>
      <CartProvider> 
        <App />
      </CartProvider>
    </WishlistProvider>
    </BrowserRouter>
  </React.StrictMode>
);
