import { API_URL } from "contains/contants";
import HttpClient from "../httpClient";
import { WishlistParams, Wishlist as WishlistType } from "store/slices";
import { Paginate } from "../interface";

class Wishlist extends HttpClient {
  constructor() {
    super(`${API_URL}/wishlist`);
  }

  // TODO: fix paginate type
  all(): Promise<Paginate<WishlistType>> {
    return this.instance.get("/");
  }

  store(data: WishlistParams): Promise<WishlistType> {
    return this.instance.post("/", data, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  destroy(id: number): Promise<number> {
    return this.instance.delete(`/${id}`);
  }

  productInWishlist(productId: number): Promise<any> {
    return this.instance.get(`/productInWishlist/${productId}`);
  }
}

export const wishlistAPI = new Wishlist();
