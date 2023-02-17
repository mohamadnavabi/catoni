import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Auth,
  GenerateOTPParams,
  LoginParams,
  RegisterParams,
  VerifyOTPParams,
} from "services/http/api";
import secureLocalStorage from "react-secure-storage";
import toast from "react-hot-toast";

type OTPResult = {
  mobile: string;
  expire_at: string;
  user_exist: boolean;
  otp_count: number;
};

export interface User {
  token: string;
  user: {
    id: number;
    email: null | string;
    mobile: null | string;
    created_at: string;
    updated_at: string;
  };
}

export interface AuthState {
  loading: boolean;
  user: User;
  otpResult: OTPResult;
  otpVerified: boolean;
  deviceInfo: string;
  error: boolean;
}

const initialState: AuthState = {
  loading: false,
  user: {
    token: "",
    user: {
      id: -1,
      email: null,
      mobile: null,
      created_at: "",
      updated_at: "null",
    },
  },
  deviceInfo: "",
  otpResult: {
    mobile: "",
    expire_at: "",
    user_exist: false,
    otp_count: 0,
  },
  otpVerified: false,
  error: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<AuthState["loading"]>) => {
      state.loading = action.payload;
    },
    setDeviceInfo: (state, action: PayloadAction<AuthState["deviceInfo"]>) => {
      state.deviceInfo = action.payload;
    },
    editNumber: (state) => {
      state.otpResult = {
        mobile: "",
        expire_at: "",
        user_exist: false,
        otp_count: 0,
      };
    },
  },
  extraReducers: (builder) => {
    // Generate otp
    builder
      .addCase(generateOTP.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: false,
        };
      })
      .addCase(
        generateOTP.fulfilled,
        (state, action: PayloadAction<AuthState["otpResult"]>) => {
          return { ...state, loading: false, otpResult: action.payload };
        }
      )
      .addCase(generateOTP.rejected, (state, action) => {
        state = Object.assign(state, {
          loading: false,
        });
      });
    // verify otp
    builder
      .addCase(verifyOTP.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: false,
        };
      })
      .addCase(
        verifyOTP.fulfilled,
        (state, action: PayloadAction<AuthState["otpResult"]>) => {
          state = Object.assign(state, {
            loading: false,
            otpVerified: action.payload,
          });
        }
      )
      .addCase(verifyOTP.rejected, (state, action) => {
        state = Object.assign(state, {
          loading: false,
        });
      });
    // Register
    builder
      .addCase(register.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: false,
        };
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<AuthState["user"]>) => {
          secureLocalStorage.setItem("token", action.payload.token);
          return {
            ...state,
            loading: false,
            user: action.payload,
          };
        }
      )
      .addCase(register.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: true,
        };
      });
    // Login
    builder
      .addCase(login.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: false,
        };
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthState["user"]>) => {
          secureLocalStorage.setItem("token", action.payload.token);
          return {
            ...state,
            loading: false,
            user: action.payload,
          };
        }
      )
      .addCase(login.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: true,
        };
      });
    // Logout
    builder
      .addCase(logout.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: false,
        };
      })
      .addCase(
        logout.fulfilled,
        (state, action: PayloadAction<AuthState["user"]>) => {
          secureLocalStorage.removeItem("token");
          toast.success("از حساب کاربری خارج شدید");
          return {
            ...state,
            loading: false,
            user: action.payload,
          };
        }
      )
      .addCase(logout.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: true,
        };
      });
  },
});

export const generateOTP = createAsyncThunk(
  "auth/generateOTP",
  async (params: GenerateOTPParams) => {
    try {
      return Auth.generateOTP(params);
    } catch (error) {}
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (params: VerifyOTPParams) => {
    try {
      return Auth.verifyOTP(params);
    } catch (error) {}
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (params: RegisterParams) => {
    try {
      return Auth.register(params);
    } catch (error) {}
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (params: LoginParams) => {
    try {
      return Auth.login(params);
    } catch (error) {}
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return Auth.logout();
  } catch (error) {}
});

export const { setLoading, setDeviceInfo, editNumber } = authSlice.actions;

export default authSlice.reducer;
