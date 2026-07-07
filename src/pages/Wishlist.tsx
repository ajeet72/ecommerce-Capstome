import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { removeFromWishlist } from "../redux/wishlist/wishlistSlice";

function Wishlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state: RootState) => state.wishlist.items
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <p>Your wishlist is currently empty.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-4 shadow-sm"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-48 w-full object-contain"
              />

              <h2 className="font-semibold mt-4">{item.title}</h2>

              <p className="text-lg font-bold mt-2">
                ₹{item.price}
              </p>

              <button
                className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg"
                onClick={() =>
                  dispatch(removeFromWishlist(item.id))
                }
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;