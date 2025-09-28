import { useParams } from "react-router-dom";
import ProductDetailCard from "../../components/ProductDetailCard";
import { useToast } from "../../context/ToastContext";
import { useEffect, useState } from "react";
import products from "../../data/products";

export default function ProductDetail() {
  const { id } = useParams();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = products.find((p) => p.id === parseInt(id));
    setProduct(found || null);
  }, [id]);

  if (!product) return <p className="p-6 text-amber-800 font-semibold">Product not found</p>;

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6">
      <div className="flex-1 flex justify-center items-center bg-white rounded-lg shadow p-4">
        <img
          src={product.image}
          alt={product.name}
          className="max-h-[400px] object-contain transition-transform duration-300 hover:scale-110"
        />
      </div>

      <div className="flex-1 flex flex-col">
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <p className="text-lg font-semibold mb-2">{product.price}</p>

        {product.material && (
          <p className="mb-1">
            <span className="font-semibold">Material:</span> {product.material}
          </p>
        )}
        {product.weight && (
          <p className="mb-1">
            <span className="font-semibold">Weight:</span> {product.weight}
          </p>
        )}

        {product.features && product.features.length > 0 && (
          <ul className="list-disc list-inside mb-4">
            {product.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        )}

        <ProductDetailCard product={product} showToast={showToast} />
      </div>
    </div>
  );
}
