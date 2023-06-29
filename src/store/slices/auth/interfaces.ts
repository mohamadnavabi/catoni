export interface PasscodeResult {
  mobile: string;
  expire_at: string;
  user_exist: boolean;
  passcode_count: number;
}

export interface User {
  id: number;
  email: null | string;
  mobile: null | string;
  created_at: string;
  about: null | string;
  banking_number: null | string;
  company_name: null | string;
  date_of_birth: null | string;
  email_verified_at: null | string;
  first_name: null | string;
  last_name: null | string;
  mobile_verified_at: string;
  national_id: null | string;
  role_id: null | number;
  updated_at: string;
  token: string;
}

export interface AuthState {
  loading: boolean;
  user: null | User;
  passcodeResult: PasscodeResult;
  passcodeVerified: boolean;
  deviceInfo: string;
  error: boolean;
}

export type DeviceInfo = string;

export interface GeneratePasscodeParams {
  mobile?: string;
  email?: string;
  ip: string;
  device_info: DeviceInfo;
}

export interface VerifyPasscodeParams {
  phone?: string;
  mobile?: string;
  passcode: number | string;
}

export interface RegisterParams {
  mobile: string;
  email?: string;
  password: string;
  password_confirmation: string;
  passcode: string;
  device_info: DeviceInfo;
}

export interface UpdateParams {
  first_name: string;
  last_name: string;
  mobile: string;
  national_id?: string;
  date_of_birth?: string;
  banking_number?: string;
  email?: string;
  password?: string;
}

export interface LoginParams {
  mobile?: string;
  email?: string;
  password: string;
  device_info: DeviceInfo;
}

export interface UpdatePasswordParams {
  currentPassword: string;
  password: string;
  confirmPassword: string;
}
