import { getCities, getFaqs } from '@/services/CoreServices';
import { getCategories, getCounterData, getLandingData, getProductDetail, getReviews, searchProducts } from '@/services/ProductsServices';
import { useQuery } from '@tanstack/react-query';

export const useFaqs = () => {
  return useQuery({
    queryKey: ['faqs'],
    queryFn: getFaqs
  });
};

export const useCities = () => {
  return useQuery({
    queryKey: ['cities'],
    queryFn: getCities
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });
};

export const useReviews = () => {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: getReviews
  });
};

export const useGetCounterData = () => {
  return useQuery({
    queryKey: ['counter-data'],
    queryFn: getCounterData
  });
};

export const useLandingData = () => {
  return useQuery({
    queryKey: ['landing-data'],
    queryFn: getLandingData
  });
};

export const useSearchProducts = () => {
  return useQuery({
    queryKey: ['search-products'],
    queryFn: searchProducts
  });
};

export const useProductDetails = (id) => {
  return useQuery({
    queryKey: ['product-details', id],
    queryFn: () => getProductDetail(id)
  });
};