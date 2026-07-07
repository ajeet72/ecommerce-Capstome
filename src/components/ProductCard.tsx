import { FiHeart } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cart/cartSlice";
import { addToWishlist } from "../redux/wishlist/wishlistSlice";


type ProductProps = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ id, title, price, image }: ProductProps) {
  const dispatch = useDispatch();
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition">
      <div className="relative">
        <img src={image} alt={title} className="h-64 w-full object-cover" />

        <button className="absolute top-4 right-4 bg-white p-2 rounded-full"
          onClick={() =>
            dispatch(
              addToWishlist({
                id,
                title,
                price,
                image,
              })
            )
          }
        >
          <FiHeart />
        </button>
      </div>

      <div className="p-4">
        <h3 className="font-semibold mb-2 line-clamp-2">{title}</h3>

        <p className="text-xl font-bold mb-4">₹{price}</p>

        <button
          className="w-full py-3 rounded-xl bg-black text-white"
          onClick={() =>
            dispatch(
              addToCart({
                id,
                title,
                price,
                image,
                quantity: 1,
              }),
            )
          }
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
