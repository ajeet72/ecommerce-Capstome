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

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      const data = await getProductById(Number(id));
      setProduct(data);
    }

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Header />
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white rounded-2xl p-8 shadow">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-[450px] object-contain"
          />
        </div>

        <div>
          <p className="text-sm uppercase text-gray-500">
            {product.category}
          </p>

          <h1 className="text-4xl font-bold mt-2">
            {product.title}
          </h1>

          <div className="mt-4 flex items-center gap-3">
            <span className="bg-green-600 text-white px-2 py-1 rounded">
              {product.rating.rate} ★
            </span>

            <span>{product.rating.count} Reviews</span>
          </div>

          <h2 className="text-4xl font-bold mt-6">
            ₹{product.price}
          </h2>

          <p className="mt-8 text-gray-600 leading-8">
            {product.description}
          </p>

          <div className="mt-10 flex gap-4">
            <button
              className="bg-black text-white px-8 py-4 rounded-xl"
              onClick={() =>
                dispatch(
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                  })
                )
              }
            >
              Add To Cart
            </button>

            <button
              className="border px-8 py-4 rounded-xl"
              onClick={() =>
                dispatch(
                  addToWishlist({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                  })
                )
              }
            >
              Add To Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ProductDetails;