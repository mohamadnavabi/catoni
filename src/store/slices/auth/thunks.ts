import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAPI } from "services/http/api";
import {
  DeviceInfo,
  GeneratePasscodeParams,
  LoginParams,
  RegisterParams,
  UpdateParams,
  UpdatePasswordParams,
  VerifyPasscodeParams,
} from "./interfaces";

export const generatePasscode = createAsyncThunk(
  "auth/generatePasscode",
  (params: GeneratePasscodeParams) => authAPI.generatePasscode(params)
);

export const verifyPasscode = createAsyncThunk(
  "auth/verifyPasscode",
  (params: VerifyPasscodeParams) => authAPI.verifyPasscode(params)
);

export const register = createAsyncThunk(
  "auth/register",
  (params: RegisterParams) => authAPI.register(params)
);

export const login = createAsyncThunk("auth/login", (params: LoginParams) =>
  authAPI.login(params)
);

export const verify = createAsyncThunk("auth/verify", (params: DeviceInfo) =>
  authAPI.verify(params)
);

export const logout = createAsyncThunk("auth/logout", () => authAPI.logout());

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  (params: UpdateParams) => authAPI.update(params)
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  (params: UpdatePasswordParams) => authAPI.updatePassword(params)
);
