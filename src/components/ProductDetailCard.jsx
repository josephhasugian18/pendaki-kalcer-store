import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

export default function ProductDetailCard({ product, showToast }) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes ? product.sizes[0] : null
  );

  useEffect(() => {
    if (product?.sizes) setSelectedSize(product.sizes[0]);
  }, [product]);

  if (!product) return <p>Product not found</p>;

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => quantity > 1 && setQuantity(quantity - 1);

  const priceNumber = parseInt(product.price.replace(/[^0-9]/g, "")) || 0;

  const handleAddToCart = () => {
    const productWithSize = { ...product, selectedSize };
    addToCart(productWithSize, quantity);
    showToast && showToast("Added to Cart", "cart");
  };

  const handleBuyNow = () => {
    const productWithSize = { ...product, selectedSize };
    addToCart(productWithSize, quantity);
    navigate("/checkout");
  };

  const isWishlisted = wishlist.some(
    (item) => item.id === product.id && item.selectedSize === selectedSize
  );

  const handleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id, selectedSize);
      showToast && showToast("Removed from Wishlist", "wishlist");
    } else {
      addToWishlist({ ...product, selectedSize });
      showToast && showToast("Added to Wishlist", "wishlist");
    }
  };

  return (
    <div className="w-full max-w-sm border rounded-xl p-4 shadow-md">
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-4">
          <p className="font-medium mb-2">Select Size:</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1 border rounded-lg ${
                  selectedSize === size
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-black border-gray-400 hover:bg-gray-100"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDecrease}
            className="px-3 py-1 border rounded text-lg"
          >
            -
          </button>
          <span className="px-3">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="px-3 py-1 border rounded text-lg"
          >
            +
          </button>
        </div>
        <p className="text-sm text-gray-600">
          Total Stock: <span className="font-semibold">{product.stock ?? 50}</span>
        </p>
      </div>

      <div className="flex flex-col gap-2 mb-3">
        <button
          onClick={handleAddToCart}
          className="bg-amber-800 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          + Cart
        </button>
        <button
          onClick={handleBuyNow}
          className="border border-black text-red-600 py-2 rounded-lg font-semibold hover:bg-green-400 transition"
        >
          Checkout
        </button>
      </div>

      <div className="flex justify-between text-sm text-gray-500">
        <button
          onClick={handleWishlist}
          className={`hover:text-green-600 ${
            isWishlisted ? "text-amber-800 font-bold" : ""
          }`}
        >
          {isWishlisted ? "♥ Wishlist" : "♡ Wishlist"}
        </button>
      </div>
    </div>
  );
}
