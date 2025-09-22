"use client";

import { useState } from "react";
import { LoginForm } from "@/components/login-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/use-auth-store";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email or username is required.",
    })
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
        return emailRegex.test(value) || usernameRegex.test(value);
      },
      {
        message: "Enter a valid email or username (at least 3 characters).",
      }
    ),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    }),
});

type FormData = z.infer<typeof FormSchema>;


export default function Login() {
  const router = useRouter();
  const { login, loading } = useAuthStore();
  // const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

  const handleLogin = async (formData: FormData) => {
    setError(null);
    const result = FormSchema.safeParse(formData);

    if (!result.success) {
      console.error("Validation failed:", result.error.flatten().fieldErrors);
      return;
    }


    try {
     await login({
        email: formData.email,
        password: formData.password,
      });
      setSubmitSuccess(true);
      router.push('/dashboard')
      console.log("Login successful");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <LoginForm error={error} onSubmit={handleLogin} isLoading={loading} />
      </div>
    </div>
  );
}
