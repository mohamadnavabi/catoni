import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "contains/contants";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { getDecryptData } from "utils/storage";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export default abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      headers: {
        Accept: "application/json",
      },
    });

    this.requestInterceptor();
    this.responseInterceptor();
  }

  private requestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest, null);
  };

  private handleRequest = (config: AxiosRequestConfig): any => {
    const token = getDecryptData("@token");
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    if (
      (config.method === "post" ||
        config.method === "put" ||
        config.method === "delete") &&
      !Cookies.get("XSRF-TOKEN")
    ) {
      return this.setCSRFToken().then((response) => {
        return config;
      });
    }

    return config;
  };

  private responseInterceptor = () => {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  };

  private handleResponse = (result: AxiosResponse) => result.data;

  private handleError = (error: any) => {
    if (error.response.status === 401) {
      // TODO: relogin here...
    } else {
      toast.error(error.response.data.message);
    }

    return Promise.reject(error.response.data);
  };

  private setCSRFToken = () => {
    return this.instance.get(`${BASE_URL}/sanctum/csrf-cookie`);
  };
}
