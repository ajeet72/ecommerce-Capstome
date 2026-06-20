import axios from "axios";

const API_BASE = "https://fakestoreapi.com";

// Get all products
export const getAllProducts = async () => {
  const res = await axios.get(`${API_BASE}/products`);
  return res.data;
};

// Get categories
export const getCategories = async () => {
  const res = await axios.get(`${API_BASE}/products/categories`);
  return res.data;
};

// Get products by category
export const getProductsByCategory = async (category: string) => {
  const res = await axios.get(
    `${API_BASE}/products/category/${category}`
  );
  return res.data;
};