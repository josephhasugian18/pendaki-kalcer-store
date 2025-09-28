import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/Logo.png";
import { AiOutlineSearch } from "react-icons/ai";
import products from "../data/products";

const categories = products.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = new Set();
  }
  if (product.subcategory) {
    acc[product.category].add(product.subcategory);
  }
  return acc;
}, {});

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?q=${searchTerm}`);
  };

  const capitalize = (text) =>
    text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";

  return (
    <nav className="bg-amber-900 text-white p-4 flex items-center justify-between relative z-50">
      <Link to="/" className="hover:opacity-80">
        <img src={Logo} alt="Pendaki Kalcer" className="h-12 w-auto" />
      </Link>

      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-full overflow-hidden w-1/3 mx-4 shadow-md"
      >
        <input
          type="text"
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 text-black w-full focus:outline-none font-semibold"
        />
        <button
          type="submit"
          className="px-4 bg-white text-gray-600 hover:text-amber-700"
        >
          <AiOutlineSearch size={20} />
        </button>
      </form>

      <div className="flex gap-6 font-bold items-center">
        <Link to="/new" className="hover:text-gray-300">
          New Arrival
        </Link>

        {Object.keys(categories).map((cat) => {
          if (categories[cat].size === 0) {
            return (
              <Link
                key={cat}
                to={`/category/${cat}`}
                className="hover:text-gray-300"
              >
                {capitalize(cat)}
              </Link>
            );
          }

          return (
            <div key={cat} className="relative group">
              <button
                className="hover:text-gray-300 flex items-center"
                type="button"
              >
                {capitalize(cat)} ▾
              </button>
              <div className="absolute left-0 top-full mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-amber-700 text-white rounded-lg shadow-lg min-w-[180px] z-50">
                {[...categories[cat]].map((sub) => (
                  <Link
                    key={sub}
                    to={`/category/${cat}/${sub}`}
                    className="block px-4 py-2 hover:bg-gray-100 hover:text-amber-700"
                  >
                    {capitalize(sub)}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}

        <Link to="/cart" className="hover:text-gray-300">
          🛒
        </Link>
        <Link to="/wishlist" className="hover:text-gray-300">
          ♡
        </Link>
      </div>
    </nav>
  );
}
