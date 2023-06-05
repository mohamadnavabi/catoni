import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  authAPI,
  DeviceInfo,
  GenerateOTPParams,
  LoginParams,
  RegisterParams,
  VerifyOTPParams,
} from "services/http/api";

export const generateOTP = createAsyncThunk(
  "auth/generateOTP",
  async (params: GenerateOTPParams) => {
    try {
      return authAPI.generateOTP(params);
    } catch (error) {}
  }
);

export const verifyOTP = createAsyncThunk(
  "auth/verifyOTP",
  async (params: VerifyOTPParams) => {
    try {
      return authAPI.verifyOTP(params);
    } catch (error) {}
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (params: RegisterParams) => {
    try {
      return authAPI.register(params);
    } catch (error) {}
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (params: LoginParams) => {
    try {
      return authAPI.login(params);
    } catch (error) {}
  }
);

export const verify = createAsyncThunk(
  "auth/verify",
  async (params: DeviceInfo) => {
    try {
      return authAPI.verify(params);
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    return authAPI.logout();
  } catch (error) {}
});
