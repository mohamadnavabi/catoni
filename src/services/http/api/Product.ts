import { API_URL } from "contains/contants";
import { HttpClient } from "../httpClient";

class Product extends HttpClient {
  constructor() {
    super(`${API_URL}/products`);
  }

  async all(perPage = 5, orderBy = "id", orderByDirection = "desc") {
    const response = await this.instance.get("/", {
      params: {
        perPage,
        orderBy,
        orderByDirection,
      },
    });
    // console.log("response", response);
    return response;
  }

  get(id: number) {
    // return http.get(`/tutorials/${id}`);
  }

  findBySlug(slug: string) {
    return this.instance.get(`/tutorials?title=${slug}`);
  }
}

export default new Product();
