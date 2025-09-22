"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, User, Lock, X, AlertCircleIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email or username is required.",
    })
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      },
      {
        message:
          "Please enter a valid email address or username (at least 3 characters).",
      }
    ),
  password: z
    .string()
    .min(1, {
      message: "Password is required.",
    })
    .min(6, {
      message: "Password must be at least 6 characters.",
    }),
});

export function LoginForm({
  onSubmit,
  isLoading,
  error,
}: {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  isLoading: boolean;
  error: string | null;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    formState: { errors },
    watch,
    setValue,
  } = form;

  const emailValue = watch("email");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl leading-[100%] tracking-[-2.3%] font-medium text-[#151515] text-center">
          Login
        </h2>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>{error}</AlertTitle>
          <AlertDescription></AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email or Username */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#151515]" />
                    <Input
                      placeholder="Enter email or username"
                      className={cn(
                        "pl-10 pr-10 placeholder:text-[#151515] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[100%] placeholder:tracking-[-2.8%]",
                        errors.email && "border border-[#DA2C38] bg-[#FEF2F3]"
                      )}
                      disabled={isLoading}
                      {...field}
                    />
                    {emailValue && (
                      <X
                        onClick={() => setValue("email", "")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 cursor-pointer"
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#151515]" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className={cn(
                        "pl-10 pr-10 placeholder:text-[#151515] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[100%] placeholder:tracking-[-2.8%]",
                        errors.password &&
                          "border border-[#DA2C38] bg-[#FEF2F3]"
                      )}
                      disabled={isLoading}
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-[#151515]" />
                      ) : (
                        <Eye className="h-4 w-4 text-[#151515]" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Continue"}
          </Button>
        </form>
      </Form>

      {/* OAuth Options */}
      <div className="mt-[32px]">
        <Separator />
        <div className="mt-[32px] flex items-center justify-center gap-3">
          <Button variant="outline" className="w-[56px] bg-transparent">
            <Image src="/google.svg" alt="Google" width={500} height={500} />
          </Button>
          <Button variant="outline" className="w-[56px] bg-transparent">
            <Image src="/apple.svg" alt="Apple" width={500} height={500} />
          </Button>
        </div>
      </div>

      {/* Create Account */}
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-8 py-[12px] bg-[#DAE4FF] text-[#151515] text-base font-medium rounded-[12px] transition-colors"
        >
          Create new Account
        </Link>
      </div>
    </div>
  );
}
