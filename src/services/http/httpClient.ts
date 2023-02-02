import axios, { AxiosInstance, AxiosResponse } from "axios";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => Promise.reject(error);
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
