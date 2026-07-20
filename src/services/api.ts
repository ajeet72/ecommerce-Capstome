import axios from "axios";

const API_BASE = "https://fakestoreapi.com";

export const getAllProducts = async () => {
  const res = await axios.get(`${API_BASE}/products`);
  return res.data;
};

export const getCategories = async () => {
  const res = await axios.get(`${API_BASE}/products/categories`);
  return res.data;
};

export const getProductsByCategory = async (category: string) => {
  const res = await axios.get(
    `${API_BASE}/products/category/${category}`
  );
  return res.data;
};

export const getProductById = async (id: number) => {
  const response = await axios.get(
    `${API_BASE}/products/${id}`
  );

  return response.data;
};
