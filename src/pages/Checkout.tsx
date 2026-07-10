import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  FiCreditCard,
  FiSmartphone,
  FiCheckCircle,
  FiLock,
} from "react-icons/fi";

export default function Checkout() {
  const navigate = useNavigate();

  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [success, setSuccess] = useState(false);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const shipping = subtotal > 100 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (success) {
    return (
      <>
        <Header />

        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center">
            <FiCheckCircle
              className="mx-auto text-green-500 mb-6"
              size={80}
            />

            <h1 className="text-3xl font-bold mb-3">
              Payment Successful!
            </h1>

            <p className="text-slate-500 mb-6">
              Thank you for your purchase.
            </p>

            <div className="bg-slate-100 rounded-xl p-4 mb-6">
              <p className="text-sm text-slate-500">
                Order Total
              </p>

              <h2 className="text-3xl font-bold text-blue-600">
                ${total.toFixed(2)}
              </h2>
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-slate-100 py-10 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">

          {/* Payment */}

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">

            <h1 className="text-3xl font-bold mb-2">
              Checkout
            </h1>

            <p className="text-slate-500 mb-8">
              Choose your preferred payment method.
            </p>

            <div className="space-y-4">

              {/* Card */}

              <label
                className={`border rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition ${
                  paymentMethod === "card"
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200"
                }`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />

                <FiCreditCard size={24} />

                <span className="font-semibold">
                  Credit / Debit Card
                </span>
              </label>

              {/* UPI */}

              <label
                className={`border rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition ${
                  paymentMethod === "upi"
                    ? "border-blue-600 bg-blue-50"
                    : "border-slate-200"
                }`}
              >
                <input
                  type="radio"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />

                <FiSmartphone size={24} />

                <span className="font-semibold">
                  UPI Payment
                </span>
              </label>

            </div>

            {paymentMethod === "card" && (
              <div className="mt-8 space-y-5">

                <input
                  placeholder="Card Number"
                  className="w-full border rounded-xl p-4"
                />

                <input
                  placeholder="Card Holder Name"
                  className="w-full border rounded-xl p-4"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="MM/YY"
                    className="border rounded-xl p-4"
                  />

                  <input
                    placeholder="CVV"
                    className="border rounded-xl p-4"
                  />
                </div>

              </div>
            )}

            {paymentMethod === "upi" && (
              <div className="mt-8">

                <input
                  placeholder="Enter UPI ID"
                  className="w-full border rounded-xl p-4"
                />

                <div className="flex gap-3 mt-5">
                  <div className="px-5 py-3 rounded-xl bg-slate-100">
                    GPay
                  </div>

                  <div className="px-5 py-3 rounded-xl bg-slate-100">
                    PhonePe
                  </div>

                  <div className="px-5 py-3 rounded-xl bg-slate-100">
                    Paytm
                  </div>
                </div>

              </div>
            )}

            <div className="flex items-center gap-2 text-green-600 mt-8">
              <FiLock />
              <span className="text-sm">
                Secure Demo Checkout
              </span>
            </div>

          </div>

          {/* Order Summary */}

          <div className="bg-white rounded-3xl shadow-lg p-8 h-fit">

            <h2 className="text-2xl font-bold mb-6">
              Order Summary
            </h2>

            <div className="space-y-3">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm"
                >
                  <span>
                    {item.title.slice(0, 18)}...
                    <span className="text-slate-400">
                      {" "}
                      × {item.quantity}
                    </span>
                  </span>

                  <span>
                    $
                    {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <hr className="my-4" />

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span>
                  {shipping === 0
                    ? "FREE"
                    : `$${shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between">
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
              onClick={() => setSuccess(true)}
              className="w-full mt-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-semibold text-lg hover:scale-[1.02] transition"
            >
              Pay ${total.toFixed(2)}
            </button>

          </div>

        </div>
      </div>
    </>
  );
}