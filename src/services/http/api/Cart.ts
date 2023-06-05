import { API_URL } from "contains/contants";
import { CartItem, Product } from "data/data";
import HttpClient from "../httpClient";

class Cart extends HttpClient {
  constructor() {
    super(`${API_URL}/cart`);
  }

  get(): Promise<any[]> {
    return this.instance.get("/");
  }

  store(data: Product[]) {
    return this.instance.post("/", data, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  update(id: number, data: any) {
    // return this.instance.put(`/tutorials/${id}`, data);
  }

  addToCart(item: CartItem) {
    return this.instance.post("/addToCart", item, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  updateQuantity(item: CartItem) {
    return this.instance.put(
      `/updateQuantity/${item.item_id}`,
      { quantity: item.quantity },
      {
        headers: {
          xsrfHeaderName: "X-XSRF-TOKEN",
        },
      }
    );
  }

  removeItem(item: CartItem) {
    return this.instance.delete(`/removeItem`, {
      params: { id: item.item_id },
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }
}

export const cartAPI = new Cart();
