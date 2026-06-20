import { useEffect, useState } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

import {
  getAllProducts,
  getCategories,
  getProductsByCategory,
} from "../services/api";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Load all products
  const loadProducts = async () => {
    setLoading(true);
    const data = await getAllProducts();
    setProducts(data);
    setCurrentPage(1);
    setLoading(false);
  };

  // Load categories
  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  // Filter by category
  const filterByCategory = async (category: string) => {
    setLoading(true);
    const data = await getProductsByCategory(category);
    setProducts(data);
    setCurrentPage(1);
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  // ---------------- PAGINATION LOGIC ----------------
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;

  const currentProducts = products.slice(indexOfFirst, indexOfLast);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <Header />
      <Banner />

      {/* CATEGORY FILTER */}
      <section className="max-w-7xl mx-auto px-6 mt-10">
        <h2 className="text-2xl font-bold mb-4">Categories</h2>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={loadProducts}
            className="px-4 py-2 rounded-full bg-black text-white"
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => filterByCategory(cat)}
              className="px-4 py-2 rounded-full border border-slate-300 hover:bg-black hover:text-white transition"
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-10">Products</h2>

        {loading ? (
          <p className="text-slate-500">Loading products...</p>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                  />
                ))
              ) : (
                <p>No products found</p>
              )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">

                {/* Prev */}
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  className="px-3 py-2 border rounded hover:bg-black hover:text-white"
                >
                  ←
                </button>

                {/* Pages */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      onClick={() => goToPage(num)}
                      className={`px-4 py-2 border rounded ${
                        currentPage === num
                          ? "bg-black text-white"
                          : "hover:bg-black hover:text-white"
                      }`}
                    >
                      {num}
                    </button>
                  )
                )}

                {/* Next */}
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  className="px-3 py-2 border rounded hover:bg-black hover:text-white"
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </>
  );
}