import { Link } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiSearch } from "react-icons/fi";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight"
        >
          LumaStore
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <button>
            <FiSearch size={20} />
          </button>

          <Link to="/wishlist">
            <FiHeart size={20} />
          </Link>

          <Link to="/cart">
            <FiShoppingCart size={20} />
          </Link>

          <Link
            to="/login"
            className="px-4 py-2 rounded-xl bg-black text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}