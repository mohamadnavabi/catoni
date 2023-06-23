import { API_URL } from "contains/contants";
import HttpClient from "../httpClient";

class Category extends HttpClient {
  constructor() {
    super(`${API_URL}/categories`);
  }

  get(slug: string) {
    return this.instance.get("/" + slug);
  }
}

export const categoryAPI = new Category();
