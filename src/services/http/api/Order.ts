import { API_URL } from "contains/contants";
import HttpClient from "../httpClient";
import { Paginate } from "../interface";

class Order extends HttpClient {
  constructor() {
    super(`${API_URL}/order`);
  }

  all(pageNumber: number): Promise<Paginate<any>> {
    return this.instance.get(`/?page=${pageNumber}`);
  }

  store(data: any): Promise<any> {
    return this.instance.post("/", data, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  destroy(id: number): Promise<number> {
    return this.instance.delete(`/${id}`);
  }
}

export const orderAPI = new Order();
