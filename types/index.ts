
export interface User {
  id: number;
  email: string;
  phone: string;
  password: string;
  role: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterPayload {
 email: string;
    username: string;
    password: string;
    // countryCode: string;
    phone: string;
    code?: string | undefined;
}

export interface VerifyOtpPayload {
  otp: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  responseSuccessful: boolean;
  responseMessage: string;
  responseBody: T;
}