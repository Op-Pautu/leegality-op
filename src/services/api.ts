import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { Product, Category, ApiResponse } from '../types';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts = async (
  limit: number = 10,
  skip: number = 0,
  category?: string
): Promise<ApiResponse<Product>> => {
  try {
    const endpoint = category && category !== 'all'
      ? `/products/category/${category}`
      : '/products';

    const response = await api.get(endpoint, {
      params: { limit, skip },
    });

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const getProductById = async (id: number): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch product');
  }
};
