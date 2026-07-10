import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";


export default function Cart() {
  const cartItems = useSelector(
    (state: RootState) => state.cart.items
  );
  const navigate = useNavigate();

  return (
    <>      
      <Header />
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <div
            onClick={() => navigate(`/product/${item.id}`)}
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4 mb-4 cursor-pointer hover:bg-gray-100 transition"
          >
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p>₹{item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </div>

            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-contain"
            />
          </div>
        ))
      )}
    </div>
    </>
  );
}