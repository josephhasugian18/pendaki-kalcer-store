import { Link, useParams } from "react-router-dom";
import products from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useState } from "react";
import Toast from "../../components/Toast";

export default function CategoryPage({ showNew = false }) {
  const { category, subcategory } = useParams();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [toast, setToast] = useState(null);
  const [sizePopup, setSizePopup] = useState(null); 
  const [selectedSize, setSelectedSize] = useState(null);

  const showToast = (message, type) => setToast({ message, type });

  const toTitleCase = (text) =>
    text
      ? text
          .toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")
      : "";

  let filteredProducts = products;
  if (showNew) {
    filteredProducts = products.filter((p) => p.isNew);
  } else if (subcategory) {
    filteredProducts = products.filter(
      (product) =>
        product.category.toLowerCase() === category.toLowerCase() &&
        product.subcategory.toLowerCase() === subcategory.toLowerCase()
    );
  } else if (category) {
    filteredProducts = products.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
  }

  const handleAddToCart = (product) => {
    if (selectedSize) {
      addToCart({ ...product, selectedSize });
      showToast(`Added to Cart`, "cart");
      setSizePopup(null);
      setSelectedSize(null);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        {showNew
          ? "New Products"
          : subcategory
          ? `${toTitleCase(subcategory)} (${toTitleCase(category)})`
          : toTitleCase(category)}
      </h1>

      {filteredProducts.length === 0 ? (
        <p className="text-gray-600">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.some((item) => item.id === product.id);
            const isPopupOpen = sizePopup === product.id;

            return (
              <div
                key={product.id}
                className="bg-white border-3 border-amber-900 rounded-lg shadow hover:shadow-lg flex flex-col relative transform transition-transform duration-300 hover:scale-105"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-[230px] w-full object-contain"
                  />
                </Link>

                <div className="flex justify-between items-center px-4 mt-4 mb-4">
                  <div>
                    <h2 className="font-semibold text-lg">{product.name}</h2>
                    <p className="text-gray-700 font-medium">{product.price}</p>
                  </div>

                  <button
                    onClick={() => {
                      if (isWishlisted) {
                        removeFromWishlist(product.id);
                        showToast("Removed from Wishlist", "wishlist");
                      } else {
                        addToWishlist(product);
                        showToast("Added to Wishlist", "wishlist");
                      }
                    }}
                    className="text-2xl transition"
                  >
                    {isWishlisted ? (
                      <AiFillHeart className="text-amber-800" />
                    ) : (
                      <AiOutlineHeart className="text-black hover:text-pink-600" />
                    )}
                  </button>
                </div>

                <div className="mt-auto pb-4 mb-4">
                  <button
                    onClick={() => {
                      if (product.sizes && product.sizes.length > 0) {
                        setSizePopup(product.id);
                        setSelectedSize(null);
                      } else {
                        addToCart(product);
                        showToast("Added to Cart", "cart");
                      }
                    }}
                    className="bg-amber-900 text-white w-3/4 py-2 rounded hover:bg-green-700 block mx-auto font-semibold"
                  >
                    + Cart
                  </button>
                </div>

                {isPopupOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-12 bg-white border shadow-lg rounded-lg p-3 flex flex-col gap-2 z-50">
                    <div className="flex gap-2 flex-wrap justify-center">
                      {product.sizes?.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1 rounded border ${
                            selectedSize === size
                              ? "bg-amber-900 text-white"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>

                    <div className="flex justify-center gap-2 mt-2">
                      <button
                        onClick={() => handleAddToCart(product)}
                        disabled={!selectedSize}
                        className={`px-3 py-1 rounded font-semibold text-white ${
                          selectedSize
                            ? "bg-amber-900 hover:bg-green-700"
                            : "bg-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setSizePopup(null)}
                        className="px-3 py-1 rounded border text-gray-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div
        className={`fixed bottom-6 right-6 transition-all duration-500 ${
          toast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <Toast toast={toast} clearToast={() => setToast(null)} />
      </div>
    </div>
  );
}
