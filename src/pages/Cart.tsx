import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/cart/cartSlice";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import {
  FiPlus,
  FiMinus,
  FiTrash2,
  FiArrowLeft,
  FiShoppingBag,
  FiTruck,
  FiShield,
} from "react-icons/fi";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discount = subtotal > 200 ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 15;
  const tax = (subtotal - discount) * 0.08;
  const total = subtotal - discount + shipping + tax;

  return (
    <>
      <Header />

      <div className="min-h-screen bg-slate-50 py-10">
        <div className="max-w-7xl mx-auto px-5">

          <div className="flex items-center justify-between mb-10">
            <div>
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-3 transition"
              >
                <FiArrowLeft />
                Continue Shopping
              </button>

              <h1 className="text-4xl font-bold text-slate-900">
                Shopping Cart
              </h1>

              <p className="text-slate-500 mt-2">
                {cartItems.length} item
                {cartItems.length !== 1 ? "s" : ""} in your cart
              </p>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FiTruck className="text-green-600" />
                Free Shipping
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FiShield className="text-blue-600" />
                Secure Checkout
              </div>
            </div>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-sm p-20 text-center">
              <div className="w-28 h-28 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-6">
                <FiShoppingBag
                  className="text-blue-600"
                  size={50}
                />
              </div>

              <h2 className="text-3xl font-bold text-slate-800 mb-3">
                Your cart is empty
              </h2>

              <p className="text-slate-500 mb-8">
                Looks like you haven't added anything yet.
              </p>

              <button
                onClick={() => navigate("/")}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold hover:shadow-lg transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">

              <div className="lg:col-span-2 space-y-6">

                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col md:flex-row gap-6"
                  >

                    <div
                      onClick={() =>
                        navigate(`/product/${item.id}`)
                      }
                      className="w-full md:w-52 h-52 bg-slate-100 rounded-2xl flex items-center justify-center p-5 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full object-contain hover:scale-105 transition"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">

                      <div>

                        <h2
                          onClick={() =>
                            navigate(`/product/${item.id}`)
                          }
                          className="text-2xl font-bold text-slate-800 cursor-pointer hover:text-blue-600 transition"
                        >
                          {item.title}
                        </h2>

                        <p className="text-slate-500 mt-3">
                          Premium quality product with
                          excellent customer reviews.
                          Fast delivery and easy returns.
                        </p>

                        <div className="flex items-center gap-4 mt-5">
                          <span className="text-3xl font-bold text-blue-600">
                            ${item.price.toFixed(2)}
                          </span>

                          <span className="line-through text-slate-400">
                            $
                            {(item.price * 1.25).toFixed(2)}
                          </span>

                          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                            20% OFF
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-5 mt-8">

                        <div className="flex items-center bg-slate-100 rounded-xl overflow-hidden">

                          <button
                            onClick={() =>
                              dispatch(
                                decreaseQuantity(item.id)
                              )
                            }
                            className="w-12 h-12 flex items-center justify-center hover:bg-slate-200 transition"
                          >
                            <FiMinus />
                          </button>

                          <div className="w-14 text-center font-bold text-lg">
                            {item.quantity}
                          </div>

                          <button
                            onClick={() =>
                              dispatch(
                                increaseQuantity(item.id)
                              )
                            }
                            className="w-12 h-12 flex items-center justify-center hover:bg-slate-200 transition"
                          >
                            <FiPlus />
                          </button>

                        </div>

                        <button
                          onClick={() =>
                            dispatch(removeFromCart(item.id))
                          }
                          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                        >
                          <FiTrash2 />
                          Remove
                        </button>

                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:sticky lg:top-28 h-fit">
                <div className="bg-white rounded-3xl shadow-sm p-7">

                  <h2 className="text-2xl font-bold text-slate-800 mb-6">
                    Order Summary
                  </h2>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-slate-600 mb-2">
                      Coupon Code
                    </label>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter coupon"
                        className="flex-1 border border-slate-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                      />

                      <button className="px-5 rounded-xl bg-slate-900 text-white hover:bg-black transition">
                        Apply
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">

                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>- ${discount.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>

                      {shipping === 0 ? (
                        <span className="font-semibold text-green-600">
                          FREE
                        </span>
                      ) : (
                        <span>${shipping.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="flex justify-between text-slate-600">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>

                    <hr />

                    <div className="flex justify-between text-2xl font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">
                        ${total.toFixed(2)}
                      </span>
                    </div>

                  </div>

                  <button
                    onClick={() => navigate("/checkout")}
                    className="w-full mt-8 bg-gradient-to-r from-blue-600 to-violet-600 text-white py-4 rounded-2xl font-semibold text-lg hover:scale-[1.02] hover:shadow-xl transition"
                  >
                    Proceed to Checkout
                  </button>

                  <div className="mt-6">
                    <p className="text-sm text-slate-500 mb-3">
                      We Accept
                    </p>

                    <div className="flex flex-wrap gap-2">
                      <div className="px-3 py-2 rounded-lg bg-slate-100 text-sm font-medium">
                        Visa
                      </div>

                      <div className="px-3 py-2 rounded-lg bg-slate-100 text-sm font-medium">
                        Mastercard
                      </div>

                      <div className="px-3 py-2 rounded-lg bg-slate-100 text-sm font-medium">
                        RuPay
                      </div>

                      <div className="px-3 py-2 rounded-lg bg-slate-100 text-sm font-medium">
                        UPI
                      </div>

                      <div className="px-3 py-2 rounded-lg bg-slate-100 text-sm font-medium">
                        Paytm
                      </div>

                      <div className="px-3 py-2 rounded-lg bg-slate-100 text-sm font-medium">
                        GPay
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 rounded-2xl bg-blue-50 border border-blue-100 p-4">

                    <h3 className="font-semibold text-blue-700">
                      Estimated Delivery
                    </h3>

                    <p className="text-sm text-slate-600 mt-2">
                      3–5 business days
                    </p>

                    <p className="text-sm text-green-600 mt-2 font-medium">
                      ✓ Free shipping on orders above $100
                    </p>

                  </div>

                </div>
              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
}