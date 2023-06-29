import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { storeEncryptData } from "utils/storage";
import { AuthState } from "./interfaces";
import {
  generatePasscode,
  login,
  logout,
  register,
  updatePassword,
  updateProfile,
  verify,
  verifyPasscode,
} from "./thunks";

const initialState: AuthState = {
  loading: false,
  user: null,
  deviceInfo: "",
  passcodeResult: {
    mobile: "",
    expire_at: "",
    user_exist: false,
    passcode_count: 0,
  },
  passcodeVerified: false,
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
      state.passcodeResult = {
        mobile: "",
        expire_at: "",
        user_exist: false,
        passcode_count: 0,
      };
    },
  },
  extraReducers: (builder) => {
    // Generate passcode
    builder
      .addCase(generatePasscode.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: false,
        };
      })
      .addCase(generatePasscode.fulfilled, (state, action) => {
        return { ...state, loading: false, passcodeResult: action.payload };
      })
      .addCase(generatePasscode.rejected, (state, action) => {
        state = Object.assign(state, {
          loading: false,
        });
      });
    // Verify passcode
    builder
      .addCase(verifyPasscode.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: false,
        };
      })
      .addCase(verifyPasscode.fulfilled, (state, action) => {
        state = Object.assign(state, {
          loading: false,
          passcodeVerified: action.payload,
        });
      })
      .addCase(verifyPasscode.rejected, (state, action) => {
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
      .addCase(register.fulfilled, (state, action) => {
        storeEncryptData("@token", action.payload.token);
        return { ...state, loading: false, user: action.payload };
      })
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
      .addCase(login.fulfilled, (state, action) => {
        storeEncryptData("@token", action.payload.token);
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
      })
      .addCase(login.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: true,
        };
      });
    // Verify
    builder
      .addCase(verify.pending, (state, action) => {
        return {
          ...state,
          loading: true,
          error: false,
        };
      })
      .addCase(verify.fulfilled, (state, action) => {
        storeEncryptData("@token", action.payload.token);
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
      })
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
      .addCase(logout.fulfilled, (state, action) => {
        localStorage.removeItem("@token");
        toast.success("از حساب کاربری خارج شدید");
        return {
          ...state,
          loading: false,
          user: null,
        };
      })
      .addCase(logout.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: true,
        };
      });
    // Update profile
    builder
      .addCase(updateProfile.pending, (state) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        toast.success("اطلاعات با موفقیت بروز شد");
        return {
          ...state,
          loading: false,
          user: action.payload,
        };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: true,
        };
      });
    // Logout
    builder
      .addCase(updatePassword.pending, (state) => {
        return {
          ...state,
          loading: true,
          error: false,
        };
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        localStorage.removeItem("@token");
        toast.success("کلمه عبور تفییر کرد لطفا مجددا وارد شوید");
        return {
          ...state,
          loading: false,
          user: null,
        };
      })
      .addCase(updatePassword.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          error: true,
        };
      });
  },
});

export const { editNumber, setDeviceInfo } = authSlice.actions;
