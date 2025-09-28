import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import products from "../../data/products";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Slide from "../../assets/Slide.png";
import Slide1 from "../../assets/Slide1.png";
import Slide2 from "../../assets/Slide2.png";
import Toast from "../../components/Toast";

function AnimatedProductCard({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform
        ${isVisible ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-md translate-y-6"}
      `}
    >
      {children}
    </div>
  );
}

export default function Dashboard() {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  const slides = [Slide2, Slide1, Slide];
  const [current, setCurrent] = useState(0);

  const [toast, setToast] = useState(null);
  const showToast = (message, type) => setToast({ message, type });

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const filteredProducts = products.filter((product) => {
    const term = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  });

  const [visibleCount, setVisibleCount] = useState(8);
  const loaderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + 4, filteredProducts.length)
          );
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [filteredProducts.length]);

  const [sizePopup, setSizePopup] = useState(null); 
  const [selectedSize, setSelectedSize] = useState(null);

  const handleAddToCart = (product) => {
    if (selectedSize) {
      addToCart({ ...product, selectedSize });
      showToast(`Added to Cart`, "cart");
      setSizePopup(null);
      setSelectedSize(null);
    }
  };

  return (
    <div>
      <div className="relative w-[1300px] h-[450px] overflow-hidden mb-6 rounded-lg shadow bg-black mx-auto">
        {slides.map((slide, index) => (
          <img
            key={index}
            src={slide}
            alt={`slide-${index}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <span
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition ${
                index === current ? "bg-amber-900" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {filteredProducts.slice(0, visibleCount).map((product) => {
          const isWishlisted = wishlist.some((item) => item.id === product.id);
          const isPopupOpen = sizePopup === product.id;

          return (
            <AnimatedProductCard key={product.id}>
              <div className="bg-white border-3 border-amber-900 rounded-lg shadow hover:shadow-lg flex flex-col relative transform transition-transform duration-300 hover:scale-105">
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
                        showToast(`Removed from Wishlist`, "wishlist");
                      } else {
                        addToWishlist(product);
                        showToast(`Added to Wishlist`, "wishlist");
                      }
                    }}
                    className="text-2xl transition"
                  >
                    {isWishlisted ? (
                      <AiFillHeart className="text-amber-900" />
                    ) : (
                      <AiOutlineHeart className="text-black hover:text-amber-900" />
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
                        showToast(`Added to Cart`, "cart");
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
            </AnimatedProductCard>
          );
        })}
      </div>

      {visibleCount < filteredProducts.length && (
        <div ref={loaderRef} className="text-center py-6 text-gray-500">
          Loading more products...
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
