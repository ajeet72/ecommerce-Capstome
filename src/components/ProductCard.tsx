import { FiHeart, FiShoppingCart, FiEye } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/cart/cartSlice";
import {
  addToWishlist,
  removeFromWishlist,
} from "../redux/wishlist/wishlistSlice";

import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

type ProductProps = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ id, title, price, image }: ProductProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  // Cast both sides with Number(...) so a string id sneaking in from the
  // API (e.g. "3" instead of 3) doesn't silently break the match.
  const isWishlisted = wishlist.some((item) => Number(item.id) === Number(id));

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isWishlisted) {
      dispatch(removeFromWishlist(id));
    } else {
      dispatch(addToWishlist({ id, title, price, image }));
    }
  };

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="
      group
      bg-white
      rounded-3xl
      overflow-hidden
      shadow-sm
      border
      border-slate-200
      hover:shadow-2xl
      hover:-translate-y-2
      transition-all
      duration-300
      cursor-pointer
      flex
      flex-col
      "
    >
      <div className="relative bg-slate-100 h-72 flex items-center justify-center p-8">
        <span className="absolute left-4 top-4 z-20 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
          SALE
        </span>

        <button
          type="button"
          onClick={handleWishlistClick}
          aria-pressed={isWishlisted}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-4 right-4 z-30 flex h-10 w-10 items-center justify-center rounded-full shadow-md transition-colors duration-200 ${
            isWishlisted
              ? "bg-red-500 hover:bg-red-600"
              : "bg-white hover:bg-red-50"
          }`}
        >
          <FiHeart
            size={18}
            className={`transition-colors duration-200 ${
              isWishlisted
                ? "fill-white stroke-white"
                : "fill-none stroke-slate-700"
            }`}
          />
        </button>

        <img
          src={image}
          alt={title}
          className="h-52 w-full object-contain transition-transform duration-500 group-hover:scale-110"
        />

        <div
          className="
      absolute
      inset-0
      bg-black/10
      opacity-0
      group-hover:opacity-100
      transition
      duration-300
      flex
      items-center
      justify-center
      pointer-events-none
    "
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${id}`);
            }}
            className="
        pointer-events-auto
        rounded-full
        bg-white
        p-4
        shadow-xl
        hover:scale-110
        transition
      "
          >
            <FiEye size={20} />
          </button>
        </div>
      </div>


      <div className="flex flex-1 flex-col p-6">

        <span className="mb-3 text-xs font-semibold uppercase tracking-wider text-blue-600">
          Premium Collection
        </span>


        <h3
          className="
          min-h-[56px]
          text-lg
          font-semibold
          text-slate-900
          line-clamp-2
          "
        >
          {title}
        </h3>

        <div className="mt-3 flex items-center gap-2">
          <span className="rounded bg-green-600 px-2 py-1 text-xs text-white">
            ★ 4.8
          </span>

          <span className="text-sm text-slate-500">(245 Reviews)</span>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <span className="text-3xl font-bold">${price}</span>

          <span className="text-slate-400 line-through">
            ${(price * 1.25).toFixed(2)}
          </span>
        </div>

        <div className="flex-1" />

        <div className="mt-8 flex gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();

              dispatch(
                addToCart({
                  id,
                  title,
                  price,
                  image,
                  quantity: 1,
                }),
              );
            }}
            className="
            flex-1
            rounded-xl
            bg-black
            py-3
            font-semibold
            text-white
            hover:bg-slate-800
            transition
            flex
            items-center
            justify-center
            gap-2
            "
          >
            <FiShoppingCart />
            Add to Cart
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${id}`);
            }}
            className="
            rounded-xl
            border
            px-5
            hover:bg-slate-100
            transition
            "
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
}
