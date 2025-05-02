const BASE_URL = import.meta.env.VITE_API_URL;

export const serviceEntries = {
  login: BASE_URL + "auth/login",
  getOrders: BASE_URL + "orders",
}