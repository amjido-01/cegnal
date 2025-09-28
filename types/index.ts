
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

export interface Trader {
  _id: string;
  email: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  isOnline: boolean;
  password: string;
  phone: string;
  role: "ANALYST" | "TRADER" | string;
  username: string;
  __v: number;
}

export interface Zone {
  id: string;
  zoneName: string;
  description: string;
  avatarUrl: string;
  createdBy: string;
  noOfMembers: number;
  isPaid: boolean;
  price: number;
};
