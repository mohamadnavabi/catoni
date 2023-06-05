export interface OTPResult {
  mobile: string;
  expire_at: string;
  user_exist: boolean;
  otp_count: number;
}

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
