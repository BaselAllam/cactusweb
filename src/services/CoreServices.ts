import api from "@/services/api";
import axios from "axios";

export type FAQModel = {
    id: string;
    faq_title: string;
    faq_title_ar: string;
    faq_type: string;
    faq_description: string;
    faq_description_ar: string;
}

export const getFaqs = async (): Promise<FAQModel[]> => {
  try {
    const response = await api.get<FAQModel[]>('/apis/core/faq/');
    return response['data']['data'];
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const message = e.response.data['data'];
    }
    throw new Error("Unexpected error occurred");
  }
}

export type CityModel = {
    id: string;
    city_name: string;
    city_name_ar: string;
    areas: AreaModel[];
  }
  
export type AreaModel = {
    id: string;
    area_name: string;
    area_name_ar: string;
    delivery_fee: number;
  }

export const getCities = async (): Promise<CityModel[]> => {
  try {
    const response = await api.get<CityModel[]>('/apis/core/cities/');
    return response['data']['data'];
  } catch (e) {
    if (axios.isAxiosError(e)) {
      const message = e.response.data['data'];
    }
    throw new Error("Unexpected error occurred");
  }
}

export const submitContactUs = async (formData: {
  full_name: string;
  user_email: string;
  user_phone: string;
  subject: string;
  message: string;
}) => {
  const data = new FormData();
  data.append("full_name", formData.full_name);
  data.append("user_email", formData.user_email);
  data.append("user_phone", formData.user_phone);
  data.append("subject", formData.subject);
  data.append("message", formData.message);
  const response = await api.post("/apis/core/contactus/", data);
  return response;
};