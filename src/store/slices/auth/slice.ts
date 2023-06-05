import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { storeEncryptData } from "utils/storage";
import { AuthState } from "./interfaces";
import {
  generateOTP,
  login,
  logout,
  register,
  verify,
  verifyOTP,
} from "./thunks";

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
          storeEncryptData("@token", action.payload.token);
          return { ...state, loading: false, user: action.payload };
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
          storeEncryptData("@token", action.payload.token);
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
    // Verify
    builder
      .addCase(verify.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: false,
        };
      })
      .addCase(
        verify.fulfilled,
        (state, action: PayloadAction<AuthState["user"]>) => {
          storeEncryptData("@token", action.payload.token);
          return {
            ...state,
            loading: false,
            user: action.payload,
          };
        }
      )
      .addCase(verify.rejected, (state, action) => {
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
          localStorage.removeItem("@token");
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

export const { editNumber, setDeviceInfo } = authSlice.actions;
