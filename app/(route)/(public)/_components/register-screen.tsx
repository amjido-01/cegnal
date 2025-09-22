"use client";

import { useState } from "react";
import { SignupForm } from "@/components/signup-form";
import { z } from "zod";
import { useAuthStore } from "@/store/use-auth-store";
import { AxiosError } from "axios";

// ✅ Form validation schema
const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters." })
    .max(20, { message: "Username must be less than 20 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }), // match backend
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." })
    .regex(/^\d+$/, { message: "Phone number must contain only digits." }),
  code: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

// ✅ Strongly typed role
export type UserRole = "trader" | "analyst";

interface RegisterProps {
  userRole: UserRole;
  onRegisterSuccess: (email: string) => void;
}

export function Register({ userRole, onRegisterSuccess }: RegisterProps) {
  const { register, loading } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleRegister = async (formData: FormData) => {
    setError(null);

    // ✅ convert role safely
    const payload = { ...formData, role: userRole.toUpperCase() };

    const result = FormSchema.safeParse(formData);
    if (!result.success) {
      console.error("Validation failed:", result.error.flatten().fieldErrors);
      return;
    }

    try {
      await register(payload);
      setSubmitSuccess(true);
      console.log("Registration successful");

      // ✅ Mark onboarding
      localStorage.setItem("onboarding_completed", "true");
      localStorage.setItem("user_registered", "true");

      setTimeout(() => {
        onRegisterSuccess(formData.email);
      }, 3000);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.responseMessage || "Registration request failed";
        setError(message);
        console.error("Registration error (Axios):", message, err.response?.data);
      } else if (err instanceof Error) {
        setError(err.message);
        console.error("Registration error:", err.message);
      } else {
        setError("An unexpected error occurred");
        console.error("Registration error (unknown):", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <SignupForm
          error={error}
          submitSuccess={submitSuccess}
          onSubmit={handleRegister}
          isLoading={loading}
        />
      </div>
    </div>
  );
}
