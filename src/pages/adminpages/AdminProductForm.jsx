import { useState, useEffect } from "react";

export default function AdminProductForm({ initialData, onSubmit, submitLabel }) {
  const [form, setForm] = useState({
    id: "",
    name: "",
    image: "",
    price: "",
    category: "",
    description: "",
    material: "",
    weight: "",
    features: [],
    sizes: [],
    ...initialData
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        features: initialData.features || [],
        sizes: initialData.sizes || [],
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    const arrayValue = value
      .split(",")
      .map((v) => v.trim())
      .filter((v) => v);
    setForm((prev) => ({ ...prev, [name]: arrayValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded shadow"
    >
      {["name","image","price","category","description","material","weight"].map((key) => (
        <div key={key} className="mb-4">
          <label className="block font-semibold capitalize mb-1">{key}</label>
          <input
            type="text"
            name={key}
            value={form[key]}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      ))}

      <div className="mb-4">
        <label className="block font-semibold mb-1">Features</label>
        <input
          type="text"
          name="features"
          value={form.features.join(", ")}
          onChange={handleArrayChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="e.g., Waterproof, Lightweight, Breathable"
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-1">Sizes</label>
        <input
          type="text"
          name="sizes"
          value={form.sizes.join(", ")}
          onChange={handleArrayChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="e.g., S, M, L, XL"
        />
      </div>

      <button
        type="submit"
        className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800"
      >
        {submitLabel || "Submit"}
      </button>
    </form>
  );
}
