
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

// In your types file
export interface Zone {
  id: string;
  zoneName: string;
  description: string;
  isPaid: boolean;
  price: number;
  noOfMembers: number;
}

export interface TopAnalyst {
  _id: string
  username: string
  email: string
  phone: string
  firstName: string
  lastName: string
  middleName?: string
  password: string
  role: "ANALYST" | "ADMIN" | "USER" // add other roles if needed
  isOnline: boolean
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  __v: number
}

export interface Analyst {
  _id: string;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  password: string;
  role: "ANALYST" | "ADMIN" | "USER"; // extend roles if needed
  isOnline: boolean;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}
