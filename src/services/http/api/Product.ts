import { API_URL } from "contains/contants";
import HttpClient from "../httpClient";

class Product extends HttpClient {
  constructor() {
    super(`${API_URL}/products`);
  }

  all(perPage = 5, orderBy = "id", orderByDirection = "desc") {
    return this.instance.get("/", {
      params: {
        perPage,
        orderBy,
        orderByDirection,
      },
    });
  }

  get(id: number) {
    // return http.get(`/tutorials/${id}`);
  }

  findBySlug(slug: string) {
    return this.instance.get(`/tutorials?title=${slug}`);
  }
}

export const productAPI = new Product();
