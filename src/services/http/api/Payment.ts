import { API_URL } from "contains/contants";
import HttpClient from "../httpClient";

class Payment extends HttpClient {
  constructor() {
    super(`${API_URL}/payment`);
  }

  all(): Promise<any[]> {
    return this.instance.get("/");
  }
}

export const paymentAPI = new Payment();
