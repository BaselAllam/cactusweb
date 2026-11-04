import api from "./api";

export const placeOrder = async (formData: {
  products?: Array<{
    product_id: string;
    quantity: number;
    notes?: string;
    offer?: string;
  }>;
  new_user: {
    first_name: string;
    gender: string;
    last_name: string;
    phone: string;
  };
  new_address: {
    street_name: string;
    apartment_number: string;
    flat_number: string;
    area_id: string;
  };
  payment_method: string;
  customer_notes?: string;
}) => {
  const data = new FormData();
  formData.products?.forEach((item, index) => {
    data.append(`products[${index}][product_id]`, item.product_id);
    data.append(`products[${index}][quantity]`, item.quantity.toString());
    data.append(`products[${index}][notes]`, item.notes || '');
    data.append(`products[${index}][offer]`, item.offer || '');
  });
  data.append("user", JSON.stringify(formData.new_user));
  data.append("address", JSON.stringify(formData.new_address));
  data.append("payment_method", formData.payment_method);
  data.append("customer_notes", formData.customer_notes);
  const response = await api.post("/apis/orders/user_place_order/", data);
  return response;
};