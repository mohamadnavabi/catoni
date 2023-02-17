import { API_URL } from "contains/contants";
import { HttpClient } from "../httpClient";

export type GenerateOTPParams = {
  mobile: string;
  ip: string;
  device_info: string;
};

export type VerifyOTPParams = {
  mobile: string;
  otp: number | string;
};

export type RegisterParams = {
  mobile: string;
  email?: string;
  password: string;
  password_confirmation: string;
  otp: string;
  device_info: string;
};

export type LoginParams = {
  mobile: string;
  email?: string;
  password: string;
  device_info: string;
};

class Auth extends HttpClient {
  constructor() {
    super(`${API_URL}/auth`);
  }

  generateOTP(data: GenerateOTPParams) {
    return this.instance.post("/generate-otp", data, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  verifyOTP(data: VerifyOTPParams) {
    return this.instance.post("/verify-otp", data, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  register(data: RegisterParams) {
    return this.instance.post("/register", data, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  login(data: LoginParams) {
    return this.instance.post(`/login`, data, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  logout() {
    return this.instance.post(
      `/logout`,
      {},
      {
        headers: {
          xsrfHeaderName: "X-XSRF-TOKEN",
        },
      }
    );
  }
}

export default new Auth();
