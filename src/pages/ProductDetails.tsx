import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductById } from "../services/api";
import { addToCart } from "../redux/cart/cartSlice";
import { addToWishlist } from "../redux/wishlist/wishlistSlice";
import Header from "../components/Header";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface Review {
  id: number;
  name: string;
  avatarColor: string;
  rating: number;
  date: string;
  comment: string;
}

const SIZES = ["S", "M", "L", "XL", "XXL"];

function buildMockReviews(product: Product): Review[] {
  const names = [
    "Aarav Shah",
    "Priya Nair",
    "Rohan Mehta",
    "Sara Khan",
    "Wei Chen",
  ];
  const colors = [
    "bg-rose-500",
    "bg-blue-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-violet-500",
  ];
  const comments = [
    "Exactly as described, great quality for the price. Would buy again.",
    "Really happy with this purchase, fits well and looks premium.",
    "Good product overall, delivery was quick too.",
    "Decent value. Matches the pictures shown on the site.",
    "Loved it! Already recommended it to a friend.",
  ];

  const base = Math.round(product.rating.rate);
  return names.map((name, i) => ({
    id: i + 1,
    name,
    avatarColor: colors[i % colors.length],
    rating: Math.max(3, Math.min(5, base + (i % 2 === 0 ? 0 : -1))),
    date: new Date(Date.now() - i * 1000 * 60 * 60 * 24 * 7).toLocaleDateString(
      "en-US",
      { month: "short", day: "numeric", year: "numeric" }
    ),
    comment: comments[i % comments.length],
  }));
}

function StarRow({ rating, size = "text-base" }: { rating: number; size?: string }) {
  return (
    <div className={`flex items-center ${size}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < Math.round(rating) ? "text-amber-400" : "text-gray-300"}
        >
          ★
        </span>
      ))}
    </div>
  );
}

type Tab = "description" | "reviews" | "returns";

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("description");
  const [addedMessage, setAddedMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      const data = await getProductById(Number(id));
      setProduct(data);
      setQuantity(1);
      setSelectedSize("M");
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="h-10 w-10 border-4 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  const reviews = buildMockReviews(product);

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.min(10, Math.max(1, prev + delta)));
  };

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity,
        size: selectedSize,
      })
    );
    setAddedMessage(`Added ${quantity} × ${product.title} (${selectedSize}) to cart`);
    setTimeout(() => setAddedMessage(null), 2500);
  };

  const handleAddToWishlist = () => {
    dispatch(
      addToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
      })
    );
    setAddedMessage(`Added ${product.title} to wishlist`);
    setTimeout(() => setAddedMessage(null), 2500);
  };

  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[450px] object-contain"
            />
          </div>

          <div>
            <p className="text-sm uppercase tracking-wide text-gray-500 font-medium">
              {product.category}
            </p>

            <h1 className="text-4xl font-bold mt-2 leading-tight">
              {product.title}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <span className="flex items-center gap-1 bg-green-600 text-white px-2.5 py-1 rounded-md text-sm font-semibold">
                {product.rating.rate} ★
              </span>
              <span className="text-gray-500 text-sm">
                {product.rating.count} Reviews
              </span>
            </div>

            <h2 className="text-4xl font-bold mt-6">
              ${product.price.toFixed(2)}
            </h2>

            <div className="mt-8">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                Select Size
              </p>
              <div className="flex gap-3">
                {SIZES.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-11 w-11 rounded-xl border text-sm font-semibold transition-colors ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-700 border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm font-semibold text-gray-800 mb-3">
                Quantity
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="h-11 w-11 flex items-center justify-center text-lg font-semibold hover:bg-gray-100 disabled:opacity-40"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span className="h-11 w-12 flex items-center justify-center border-x border-gray-300 font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="h-11 w-11 flex items-center justify-center text-lg font-semibold hover:bg-gray-100 disabled:opacity-40"
                    disabled={quantity >= 10}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-500">Max 10 per order</span>
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button
                className="flex-1 bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                onClick={handleAddToCart}
              >
                Add To Cart
              </button>

              <button
                className="flex-1 border border-gray-300 px-8 py-4 rounded-xl font-semibold hover:border-black transition-colors"
                onClick={handleAddToWishlist}
              >
                ♡ Add To Wishlist
              </button>
            </div>

            {addedMessage && (
              <div className="mt-4 text-sm font-medium text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
                {addedMessage}
              </div>
            )}

            <div className="mt-8 grid grid-cols-3 gap-3 text-center">
              <div className="border border-gray-200 rounded-xl py-3 px-2">
                <p className="text-xs font-semibold text-gray-800">Free Delivery</p>
                <p className="text-[11px] text-gray-500 mt-0.5">On orders over $50</p>
              </div>
              <div className="border border-gray-200 rounded-xl py-3 px-2">
                <p className="text-xs font-semibold text-gray-800">Easy Returns</p>
                <p className="text-[11px] text-gray-500 mt-0.5">Within 30 days</p>
              </div>
              <div className="border border-gray-200 rounded-xl py-3 px-2">
                <p className="text-xs font-semibold text-gray-800">Secure Payment</p>
                <p className="text-[11px] text-gray-500 mt-0.5">100% protected</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="flex gap-8 border-b border-gray-200">
            {(
              [
                { key: "description", label: "Description" },
                { key: "reviews", label: `Reviews (${product.rating.count})` },
                { key: "returns", label: "Returns & Refund Policy" },
              ] as { key: Tab; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`pb-4 text-sm font-semibold border-b-2 -mb-px transition-colors ${
                  activeTab === tab.key
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="py-10">
            {activeTab === "description" && (
              <div className="max-w-3xl">
                <h3 className="text-xl font-bold mb-4">Product Description</h3>
                <p className="text-gray-600 leading-8">{product.description}</p>

                <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
                  <div className="flex justify-between border-b border-gray-100 py-2">
                    <span className="text-gray-500">Category</span>
                    <span className="font-medium capitalize">{product.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 py-2">
                    <span className="text-gray-500">Available Sizes</span>
                    <span className="font-medium">{SIZES.join(", ")}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="max-w-3xl">
                <div className="flex items-center gap-6 mb-8">
                  <div className="text-center">
                    <p className="text-5xl font-bold">{product.rating.rate}</p>
                    <StarRow rating={product.rating.rate} />
                    <p className="text-xs text-gray-500 mt-1">
                      {product.rating.count} reviews
                    </p>
                  </div>
                  <div className="flex-1 space-y-1">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const pct =
                        star === Math.round(product.rating.rate)
                          ? 65
                          : star === Math.round(product.rating.rate) - 1
                          ? 20
                          : 5;
                      return (
                        <div key={star} className="flex items-center gap-2 text-xs">
                          <span className="w-3 text-gray-500">{star}</span>
                          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-amber-400"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="border border-gray-100 rounded-xl p-5"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-9 w-9 rounded-full ${review.avatarColor} text-white flex items-center justify-center text-sm font-semibold`}
                        >
                          {review.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold">{review.name}</p>
                          <p className="text-xs text-gray-400">{review.date}</p>
                        </div>
                        <div className="ml-auto">
                          <StarRow rating={review.rating} size="text-sm" />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mt-3 leading-6">
                        {review.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "returns" && (
              <div className="max-w-3xl">
                <h3 className="text-xl font-bold mb-4">Returns & Refund Policy</h3>
                <div className="space-y-5 text-sm text-gray-600 leading-7">
                  <div>
                    <p className="font-semibold text-gray-800">30-Day Return Window</p>
                    <p>
                      You can return this item within 30 days of delivery for a
                      full refund, as long as it's unused and in its original
                      packaging with tags attached.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Refund Timeline</p>
                    <p>
                      Once we receive and inspect your return, refunds are
                      processed within 5–7 business days to your original
                      payment method.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Free Return Pickup</p>
                    <p>
                      Eligible orders qualify for a free pickup from your
                      address. Simply request a return from your orders page
                      and choose a convenient pickup slot.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Exchanges</p>
                    <p>
                      Need a different size instead? You can request a
                      free size exchange within the same 30-day window,
                      subject to stock availability.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Non-Returnable Items</p>
                    <p>
                      Items marked as final sale, or products showing signs of
                      wear or damage not related to a manufacturing defect,
                      are not eligible for return.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;