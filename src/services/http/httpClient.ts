import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "contains/contants";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import secureLocalStorage from "react-secure-storage";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this.initializeRequestInterceptor();
    this.initializeResponseInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest, null);
  };

  private handleRequest = (config: AxiosRequestConfig): any => {
    const token = secureLocalStorage.getItem("token");
    if (token) {
      config.headers = {
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

  private initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  };

  private handleResponse = (result: AxiosResponse) => result.data;

  private handleError = (error: any) => {
    toast.error(error.response.data.message);
    return Promise.reject(error.response.data);
  };

  private setCSRFToken = () => {
    return this.instance.get(`${BASE_URL}/sanctum/csrf-cookie`);
  };

  // public post(url: string, params?: any, headers?: any) {
  //   axios.defaults.withCredentials = true;
  //   axios
  //     .get(`http://127.0.0.1:8000/api/sanctum/csrf-cookie`, {
  //       headers: { "Access-Control-Allow-Origin": "*" },
  //     })
  //     .then((response) => {
  //       return this.instance.post(
  //         url,
  //         params ? params : null,
  //         headers
  //           ? {
  //               ...headers,
  //               xsrfHeaderName: "XSRF-TOKEN",
  //               withCredentials: true,
  //             }
  //           : {
  //               xsrfHeaderName: "XSRF-TOKEN",
  //               withCredentials: true,
  //             }
  //       );
  //     })
  //     .catch((error) => error);
  // }
}

// import axios, { AxiosInstance } from "axios";

// declare module "axios" {
//   interface AxiosResponse<T = any> extends Promise<T> {}
// }

// export abstract class HttpClient {
//   protected baseUrl: string;
//   private axiosInstance: AxiosInstance | any = null;

//   constructor(baseUrl: string) {
//     this.baseUrl = baseUrl;
//     this.axiosInstance = axios.create({});
//     this.enableInterceptors();
//   }

//   private enableInterceptors() {
//     // Here's where you can define common refetching logic
//   }

//   protected getHttp(url: string, params?: any, headers?: any): Promise<any> {
//     return this.axiosInstance({
//       method: "GET",
//       url: `${this.baseUrl}${url}`,
//       params: params ? params : null,
//       headers: headers ? headers : null,
//     });
//   }

//   protected postHttp(url: string, params?: any, headers?: any): Promise<any> {
//     return this.axiosInstance({
//       method: "POST",
//       url: `${this.baseUrl}${url}`,
//       params: params ? params : null,
//       headers: headers ? headers : null,
//     });
//   }
// }
