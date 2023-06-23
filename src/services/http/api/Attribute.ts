import { API_URL } from "contains/contants";
import HttpClient from "../httpClient";

class Attribute extends HttpClient {
  constructor() {
    super(`${API_URL}/attributes`);
  }

  all() {
    return this.instance.get("/");
  }

  get(slug: string) {
    return this.instance.get("/" + slug);
  }
}

export const attributeAPI = new Attribute();
