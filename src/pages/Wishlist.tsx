import { FiHeart, FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import type { RootState } from "../redux/store";
import { removeFromWishlist } from "../redux/wishlist/wishlistSlice";
import { addToCart } from "../redux/cart/cartSlice";

function Wishlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center gap-3 mb-8">
            <FiHeart className="text-red-500 text-3xl" />
            <h1 className="text-4xl font-bold text-gray-800">
              My Wishlist
            </h1>

            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
              {wishlistItems.length} Items
            </span>
          </div>

          {wishlistItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <FiHeart className="text-7xl text-gray-300 mb-5" />

              <h2 className="text-3xl font-bold text-gray-700">
                Your Wishlist is Empty
              </h2>

              <p className="text-gray-500 mt-3">
                Save your favourite products here.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-5 flex flex-col md:flex-row gap-6 items-center"
                >

                  <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-full object-contain hover:scale-105 transition"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-800">
                      {item.title}
                    </h2>

                    <p className="text-gray-500 mt-3">
                      Premium quality product with excellent customer
                      reviews. Perfect choice for everyday use.
                    </p>

                    <div className="mt-5 flex items-center gap-5">
                      <span className="text-3xl font-bold text-green-600">
                        ${item.price}
                      </span>

                      <span className="line-through text-gray-400">
                        ${(item.price * 1.25).toFixed(2)}
                      </span>

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        20% OFF
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 w-full md:w-56">
                    <button
                      onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                      className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition"
                    >
                      <FiShoppingCart />
                      Add to Cart
                    </button>

                    <button
                      onClick={() =>
                        dispatch(removeFromWishlist(item.id))
                      }
                      className="flex items-center justify-center gap-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-3 rounded-xl font-semibold transition"
                    >
                      <FiTrash2 />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;