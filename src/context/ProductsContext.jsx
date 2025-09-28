import { createContext, useContext, useState } from "react";
import baseProducts from "../data/products"; 

const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(baseProducts);

  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
