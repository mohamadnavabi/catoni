import { API_URL } from "contains/contants";
import { HttpClient } from "../httpClient";

class Cart extends HttpClient {
  constructor() {
    super(`${API_URL}/cart`);
  }

  get(): Promise<any[]> {
    return this.instance.get("/");
    // return http.get(`/tutorials/${id}`);
  }

  create(data: any) {
    // return http.post("/tutorials", data);
  }

  update(id: number, data: any) {
    // return http.put(`/tutorials/${id}`, data);
  }

  delete(id: number) {
    // return http.delete(`/tutorials/${id}`);
  }
}

export default new Cart();
