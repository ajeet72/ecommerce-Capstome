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
import Features from "../components/Features";

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

  const [activeCategory, setActiveCategory] = useState<string>("All");

  const handleCategoryClick = (cat: string) => {
    setActiveCategory(cat);
    filterByCategory(cat);
  };

  const handleAllClick = () => {
    setActiveCategory("All");
    loadProducts();
  };

  const loadProducts = async () => {
    setLoading(true);
    const data = await getAllProducts();
    setProducts(data);
    setCurrentPage(1);
    setLoading(false);
  };

  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

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

      <section className="max-w-7xl mx-auto px-6 mt-10">
        <div className="flex items-center gap-3 mb-5">
          <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-black to-slate-600" />
          <h2 className="text-2xl font-bold">Categories</h2>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleAllClick}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
              activeCategory === "All"
                ? "bg-black text-white shadow-lg shadow-black/20 scale-105"
                : "bg-white text-slate-700 border border-slate-200 hover:border-black hover:shadow-md"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-black text-white shadow-lg shadow-black/20 scale-105"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-black hover:shadow-md"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <span className="h-6 w-1.5 rounded-full bg-gradient-to-b from-black to-slate-600" />
            <h2 className="text-3xl font-bold">Products</h2>
          </div>
          {!loading && (
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {currentProducts.length}
              </span>{" "}
              results
            </p>
          )}
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-100 p-4 animate-pulse bg-white"
              >
                <div className="h-48 w-full rounded-xl bg-slate-100" />
                <div className="h-4 w-3/4 rounded bg-slate-100 mt-4" />
                <div className="h-4 w-1/3 rounded bg-slate-100 mt-2" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
                  <ProductCard
                    id={product.id}
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    image={product.image}
                  />
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                  <div className="h-16 w-16 rounded-full bg-slate-100 flex items-center justify-center text-2xl mb-4">
                    🔍
                  </div>
                  <p className="text-lg font-semibold text-slate-800">
                    No products found
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Try a different category or check back later.
                  </p>
                </div>
              )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-14">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  ←
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) => (
                    <button
                      key={num}
                      onClick={() => goToPage(num)}
                      className={`h-10 w-10 flex items-center justify-center rounded-full text-sm font-semibold transition-all ${
                        currentPage === num
                          ? "bg-black text-white shadow-md shadow-black/20"
                          : "border border-slate-200 text-slate-600 hover:bg-black hover:text-white hover:border-black"
                      }`}
                    >
                      {num}
                    </button>
                  ),
                )}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="h-10 w-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:bg-black hover:text-white hover:border-black transition-all disabled:opacity-30 disabled:pointer-events-none"
                >
                  →
                </button>
              </div>
            )}
          </>
        )}
      </section>
      <Features />

      <Footer />
    </>
  );
}
