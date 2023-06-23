import { API_URL } from "contains/contants";
import HttpClient from "../httpClient";

export interface CategoryParams {
  slug: string;
  color: string[];
  size: string[];
}

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

  getProductsByCategory(categoryParams: CategoryParams) {
    return this.instance.get("/getProductsByCategory/" + categoryParams.slug, {
      params: {
        color: categoryParams?.color,
        size: categoryParams?.size,
      },
    });
  }

  getMaximumProductPrice(categorySlug: string) {
    return this.instance.get("/getMaximumProductPrice/" + categorySlug);
  }
}

export const productAPI = new Product();
