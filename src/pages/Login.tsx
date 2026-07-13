import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import {
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShoppingBag,
} from "react-icons/fi";

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  function handleClick() {
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-200 grid lg:grid-cols-2">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-black via-slate-900 to-slate-800 text-white p-14">
          <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
            <FiShoppingBag size={32} />
          </div>

          <h1 className="text-5xl font-bold leading-tight">
            Welcome
            <br />
            Back
          </h1>

          <p className="mt-6 text-slate-300 text-lg leading-8">
            Login to access your account, manage your orders,
            wishlist and enjoy a seamless shopping experience.
          </p>

          <div className="mt-12 space-y-5 text-slate-300">
            <div>✔ Secure Authentication</div>
            <div>✔ Fast Checkout</div>
            <div>✔ Track Orders Anytime</div>
            <div>✔ Save Wishlist Items</div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-12">

          <div className="text-center lg:text-left">
            <h2 className="text-4xl font-bold text-slate-900">
              Login
            </h2>

            <p className="mt-2 text-slate-500">
              Sign in to continue shopping.
            </p>
          </div>

          <form className="mt-10 space-y-6">

            {/* Email */}

            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Email Address
              </label>

              <div className="relative">
                <FiMail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-black transition"
                />
              </div>
            </div>

            {/* Password */}

            <div>
              <label className="block mb-2 text-sm font-semibold text-slate-700">
                Password
              </label>

              <div className="relative">
                <FiLock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-12 outline-none focus:border-black transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? (
                    <FiEyeOff size={20} />
                  ) : (
                    <FiEye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember */}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-600">
                <input type="checkbox" />
                Remember Me
              </label>

              <Link
                to="/"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}

            <button
              type="submit"
              onClick={handleClick}
              className="w-full rounded-xl bg-black py-3 font-semibold text-white transition hover:bg-slate-800 hover:scale-[1.02]"
            >
              Login
            </button>

            {/* Divider */}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>

              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-3 text-slate-500">
                  OR
                </span>
              </div>
            </div>

            {/* Continue Shopping */}

            <Link
              to="/"
              className="block text-center rounded-xl border border-slate-300 py-3 font-semibold hover:bg-slate-100 transition"
            >
              Continue Shopping
            </Link>

            {/* Signup */}

            <p className="text-center text-slate-600">
              Don't have an account?{" "}
              <Link
                to="/"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Create Account
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;