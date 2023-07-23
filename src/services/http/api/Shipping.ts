import { API_URL } from "contains/contants";
import HttpClient from "../httpClient";

class Shipping extends HttpClient {
  constructor() {
    super(`${API_URL}/shipping`);
  }

  all(): Promise<any[]> {
    return this.instance.get("/");
  }
}

export const shippingAPI = new Shipping();
