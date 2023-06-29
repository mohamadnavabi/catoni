import { API_URL } from "contains/contants";
import HttpClient from "../httpClient";
import {
  DeviceInfo,
  GeneratePasscodeParams,
  LoginParams,
  PasscodeResult,
  RegisterParams,
  UpdateParams,
  UpdatePasswordParams,
  User,
  VerifyPasscodeParams,
} from "store/slices";

class Auth extends HttpClient {
  constructor() {
    super(`${API_URL}/auth`);
  }

  generatePasscode(data: GeneratePasscodeParams): Promise<PasscodeResult> {
    return this.instance.post("/generate-passcode", data, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  verifyPasscode(data: VerifyPasscodeParams): Promise<boolean> {
    return this.instance.post("/verify-passcode", data, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  register(data: RegisterParams): Promise<User> {
    return this.instance.post("/register", data, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  login(data: LoginParams): Promise<User> {
    return this.instance.post(`/login`, data, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  verify(deviceInfo: DeviceInfo): Promise<User> {
    return this.instance.get(`/verify`, {
      params: { device_info: deviceInfo },
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  logout(): Promise<null> {
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

  update(data: UpdateParams): Promise<User> {
    return this.instance.put(`/update`, data, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }

  updatePassword(data: UpdatePasswordParams): Promise<null> {
    return this.instance.put(`/update-password`, data, {
      headers: {
        xsrfHeaderName: "X-XSRF-TOKEN",
      },
    });
  }
}

export const authAPI = new Auth();
