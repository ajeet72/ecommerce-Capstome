import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHeart,
  FiShoppingCart,
  FiSearch,
  FiMenu,
  FiUser,
  FiX,
} from "react-icons/fi";
import { getAllProducts } from "../services/api";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

export default function Header() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const cartCount = useSelector(
    (state: RootState) => state.cart.items.length
  );

  const wishlistCount = useSelector(
    (state: RootState) => state.wishlist.items.length
  );

  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
        console.log("Products fetched:", data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts([]);
      return;
    }

    const timer = setTimeout(() => {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
      );

      setFilteredProducts(filtered.slice(0, 6));
    }, 250);

    return () => clearTimeout(timer);
  }, [search, products]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setFilteredProducts([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setFilteredProducts([]);
        setSearch("");
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () =>
      document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-6">

          <Link
            to="/"
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-105 transition">
              L
            </div>

            <div>
              <h1 className="text-xl font-bold text-slate-900">
                LumaStore
              </h1>

              <p className="text-xs text-slate-500">
                Premium Shopping
              </p>
            </div>
          </Link>

          <div
            ref={searchRef}
            className="hidden lg:block flex-1 max-w-xl relative"
          >
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 rounded-full border border-slate-200 bg-slate-50 pl-12 pr-12 outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />

            {search && (
              <button
                onClick={() => {
                  setSearch("");
                  setFilteredProducts([]);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-black"
              >
                <FiX />
              </button>
            )}

            {search && (
              <div className="absolute top-14 left-0 w-full bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50">
                {loading ? (
                  <div className="p-5 text-center text-slate-500">
                    Loading...
                  </div>
                ) : filteredProducts.length === 0 ? (
                  <div className="p-6 text-center text-slate-500">
                    No products found
                  </div>
                ) : (
                  filteredProducts.map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={() => {
                        setSearch("");
                        setFilteredProducts([]);
                      }}
                      className="flex items-center gap-4 p-4 hover:bg-slate-100 transition"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-14 h-14 object-contain"
                      />

                      <div className="flex-1">
                        <h3 className="text-sm font-semibold line-clamp-1">
                          {product.title}
                        </h3>

                        <p className="text-blue-600 font-bold">
                          ${product.price}
                        </p>
                      </div>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/wishlist"
              className="relative w-11 h-11 rounded-full bg-slate-100 hover:bg-pink-100 hover:text-pink-600 flex items-center justify-center transition"
            >
              <FiHeart size={20} />

              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              className="relative w-11 h-11 rounded-full bg-slate-100 hover:bg-blue-100 hover:text-blue-600 flex items-center justify-center transition"
            >
              <FiShoppingCart size={20} />

              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              to="/login"
              className="hidden md:flex items-center gap-2 px-5 h-11 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition"
            >
              <FiUser />
              Login
            </Link>

            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="lg:hidden w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center"
            >
              <FiMenu size={22} />
            </button>
          </div>
        </div>

        {mobileMenu && (
          <div className="lg:hidden py-5 border-t border-slate-200 flex flex-col gap-4">
            <Link
              to="/wishlist"
              onClick={() => setMobileMenu(false)}
            >
              Wishlist
            </Link>

            <Link
              to="/cart"
              onClick={() => setMobileMenu(false)}
            >
              Cart
            </Link>

            <Link
              to="/login"
              onClick={() => setMobileMenu(false)}
            >
              Login
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}