import { API_URL } from "contains/contants";
import HttpClient from "../httpClient";
import { Address as AddressInterface } from "data/data";

class Address extends HttpClient {
  constructor() {
    super(`${API_URL}/address`);
  }

  all(): Promise<AddressInterface[]> {
    return this.instance.get("/");
  }

  get(id: number): Promise<AddressInterface> {
    return this.instance.get(`/${id}`);
  }

  store(data: AddressInterface): Promise<AddressInterface[]> {
    return this.instance.post("/", data, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  update(id: number, data: AddressInterface): Promise<AddressInterface[]> {
    return this.instance.put(`/${id}`, data);
  }

  destroy(id: number): Promise<AddressInterface[]> {
    return this.instance.delete(`/${id}`);
  }

  touch(id: number): Promise<AddressInterface[]> {
    return this.instance.put(`/touch/${id}`);
  }
}

export const addressAPI = new Address();
