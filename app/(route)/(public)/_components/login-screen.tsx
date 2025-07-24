"use client";

import { useState } from "react";
import { LoginForm } from "@/components/login-form";
import { z } from "zod";

const FormSchema = z.object({
  emailOrUsername: z
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

interface LoginProps {
  onLoginSuccess: () => void;
}

export function Login({ onLoginSuccess }: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (formData: FormData) => {
    const result = FormSchema.safeParse(formData);

    if (!result.success) {
      console.error("Validation failed:", result.error.flatten().fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (response.ok) {
        localStorage.setItem("onboarding_completed", "true");
        localStorage.setItem("user_registered", "true");
        onLoginSuccess();
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      </div>
    </div>
  );
}
