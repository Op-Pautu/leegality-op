import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { Product, ApiResponse } from '../types';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts = async (
  limit: number = 12,
  skip: number = 0,
  category?: string,
  search?: string
): Promise<ApiResponse<Product>> => {
  try {
    let endpoint: string;
    let params: Record<string, unknown> = { limit, skip };

    if (search && search.trim()) {
      endpoint = '/products/search';
      params.q = search.trim();
    } else if (category && category !== 'all') {
      endpoint = `/products/category/${category}`;
    } else {
      endpoint = '/products';
    }

    const response = await api.get(endpoint, { params });
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
