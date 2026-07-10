import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiInstagram,
  FiTwitter,
  FiGithub,
  FiArrowUp,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-slate-900 text-white mt-20">
      {/* Newsletter */}

      <div className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold">
              Stay Updated
            </h2>

            <p className="text-slate-300 mt-2">
              Subscribe to receive offers and new arrivals.
            </p>
          </div>

          <div className="flex w-full lg:w-auto gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 lg:w-80 px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-blue-500"
            />

            <button className="bg-blue-600 hover:bg-blue-700 px-6 rounded-xl font-semibold transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer */}

      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}

          <div>
            <h2 className="text-3xl font-bold text-blue-400">
              LumaStore
            </h2>

            <p className="text-slate-400 mt-4 leading-7">
              Discover premium products with a seamless and
              modern shopping experience.
            </p>

            <div className="flex gap-4 mt-6 text-xl">

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-blue-400 transition"
              >
                <FiFacebook />
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-500 transition"
              >
                <FiInstagram />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-sky-400 transition"
              >
                <FiTwitter />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition"
              >
                <FiGithub />
              </a>

            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-xl font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">

              <li>
                <Link
                  to="/"
                  className="text-slate-400 hover:text-blue-400 transition"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/cart"
                  className="text-slate-400 hover:text-blue-400 transition"
                >
                  Cart
                </Link>
              </li>

              <li>
                <Link
                  to="/wishlist"
                  className="text-slate-400 hover:text-blue-400 transition"
                >
                  Wishlist
                </Link>
              </li>

              <li>
                <Link
                  to="/checkout"
                  className="text-slate-400 hover:text-blue-400 transition"
                >
                  Checkout
                </Link>
              </li>

            </ul>
          </div>

          {/* Customer */}

          <div>
            <h3 className="text-xl font-semibold mb-5">
              Customer Service
            </h3>

            <ul className="space-y-3">

              <li className="text-slate-400 hover:text-white cursor-pointer transition">
                FAQs
              </li>

              <li className="text-slate-400 hover:text-white cursor-pointer transition">
                Shipping Policy
              </li>

              <li className="text-slate-400 hover:text-white cursor-pointer transition">
                Return Policy
              </li>

              <li className="text-slate-400 hover:text-white cursor-pointer transition">
                Privacy Policy
              </li>

            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-xl font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-4 text-slate-400">

              <div className="flex items-center gap-3">
                <FiMail />
                support@lumastore.com
              </div>

              <div className="flex items-center gap-3">
                <FiPhone />
                +91 9876543210
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin />
                Mumbai, Maharashtra, India
              </div>

            </div>
          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-slate-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-slate-400 text-center">
            © {new Date().getFullYear()} LumaStore. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full transition"
          >
            <FiArrowUp />
            Back to Top
          </button>

        </div>
      </div>
    </footer>
  );
}