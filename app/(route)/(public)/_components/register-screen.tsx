"use client";

import { useState } from "react";
import { SignupForm } from "@/components/signup-form"; // Assuming this is your form component
import { z } from "zod";

// Define the form schema type
const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  username: z
    .string()
    .min(3, {
      message: "Username must be at least 3 characters.",
    })
    .max(20, {
      message: "Username must be less than 20 characters.",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/\d/, { message: "Password must contain at least one number." })
    .regex(/[!@#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character.",
    }),
  countryCode: z.string().min(1, {
    message: "Please select a country code.",
  }),
  phoneNumber: z
    .string()
    .min(10, {
      message: "Phone number must be at least 10 digits.",
    })
    .regex(/^\d+$/, {
      message: "Phone number must contain only digits.",
    }),
  referralCode: z.string().optional(),
});

type FormData = z.infer<typeof FormSchema>;

interface RegisterProps {
  userRole: string;
  onRegisterSuccess: () => void;
}

export function Register({ userRole, onRegisterSuccess }: RegisterProps) {
  const [isLoading, setIsLoading] = useState(false);

const handleRegister = async (formData: FormData) => {
  const result = FormSchema.safeParse(formData);

  if (!result.success) {
    console.error("Validation failed:", result.error.flatten().fieldErrors);
    // You might want to show a toast or UI error here
    return;
  }

  setIsLoading(true);

  const dataToSend = {
    ...formData,
    role: userRole,
  };

  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });

    if (response.ok) {
      localStorage.setItem("onboarding_completed", "true");
      localStorage.setItem("user_registered", "true");
      onRegisterSuccess();
    } else {
      const errorData = await response.json();
      console.error("Registration failed:", errorData);
    }
  } catch (error) {
    console.error("Registration error:", error);
  } finally {
    setIsLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <SignupForm onSubmit={handleRegister} isLoading={isLoading} />
      </div>
    </div>
  );
}
