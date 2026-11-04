import api from "./api";
import axios from "axios";

export type ReviewsModel = {
    id: string;
    user: {
        'first_name': string;
        'last_name': string;
    };
    rate: number;
    review: string;
    created_at: string;
}

export const getReviews = async (): Promise<ReviewsModel[]> => {
  try {
    const response = await api.get<CategoryModel[]>('/apis/reviews/reviews/');
    return response.data['data'];
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const message = e.response.data['data'];
    }
    throw new Error("Unexpected error occurred");
  }
}


export type CategoryModel = {
    id: string;
    category_name: string;
    category_name_ar: string;
    image: string;
  }

export const getCategories = async (): Promise<CategoryModel[]> => {
  try {
    const response = await api.get<CategoryModel[]>('/apis/products/get_categories/');
    return response.data['data'];
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const message = e.response.data['data'];
    }
    throw new Error("Unexpected error occurred");
  }
}

export type CounterDataModel = {
  users_count: number;
  products_count: number;
  orders_count: number;
}

export const getCounterData = async (): Promise<CounterDataModel> => {
  try {
    const response = await api.get<CounterDataModel>('/apis/products/counter_data/');
    return response['data']['data'];
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const message = e.response.data['data'];
    }
    throw new Error("Unexpected error occurred");
  }
}

export type ProductModel = {
  id: string;
  category: {
    'id': string;
    'category_name': string;
    'category_name_ar': string;
  };
  product_name: string;
  product_name_ar: string;
  product_description: string;
  product_description_ar: string;
  short_description: string;
  short_description_ar: string;
  product_video: string;
  price: number;
  stock_qty: number;
  views_counter: number;
  imgs: {
    'id': string;
    'image_url': string;
  }[];
  orders_counter: number;
  reviews_counter: number;
  offer_details: {
    'offer_id': string,
    'discount_value': number,
  }
}

export const getLandingData = async (): Promise<LandingDataModel> => {
  try {
    const response = await api.get<CounterDataModel>('/apis/products/landing_data/');
    return response.data['data'];
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const message = e.response.data['data'];
    }
    throw new Error("Unexpected error occurred");
  }
}

export interface ProductDetailResponse {
  detail: ProductModel;
  related: ProductModel[];
}

export const getProductDetail = async (id: string): Promise<ProductDetailResponse> => {
  try {
    const response = await api.get<ProductDetailResponse>(`/apis/products/product_detail/?id=${id}`);
    return response.data['data'];
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const message = e.response.data['data'];
    }
    throw new Error("Unexpected error occurred");
  }
}

export const searchProducts = async (): Promise<ProductModel[]> => {
  try {
    const response = await api.get<ProductModel[]>(`/apis/products/search_products/`);
    return response.data['data'];
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const message = e.response.data['data'];
    }
    throw new Error("Unexpected error occurred");
  }
}

export type LandingDataModel = {
  products: ProductModel[];
  reviews: ReviewsModel[];
}