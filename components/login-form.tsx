"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "sonner"
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
import { Eye, EyeOff, User, Lock, X } from "lucide-react";
import Image from "next/image";

const FormSchema = z.object({
  emailOrUsername: z
    .string()
    .min(1, {
      message: "Email or username is required.",
    })
    .refine(
      (value) => {
        // Check if it's a valid email or a valid username (at least 3 characters)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
        return emailRegex.test(value) || usernameRegex.test(value);
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

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate successful login
      // toast.success("Login successful!", {
      //   description: `Welcome back! Redirecting to dashboard...`,
      // })

      console.log("Login data:", data);

      // Here you would typically:
      // 1. Make API call to authenticate user
      // 2. Store auth tokens
      // 3. Redirect to dashboard
    } catch (error) {
      console.log(error);
      // toast.error("Login failed", {
      //   description: "Please check your credentials and try again.",
      // })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl leading-[100%] tracking-[-2.3%] font-medium text-[#151515] text-center">
          Login
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="emailOrUsername"
            render={({ field }) => {
              const emailValue = form.watch("emailOrUsername");

              return (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#151515]" />
                      <Input
                        placeholder="Enter email or username"
                        className="pl-10 pr-10 placeholder:text-[#151515] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[100%] placeholder:tracking-[-2.8%]"
                        disabled={isLoading}
                        {...field}
                      />
                      {emailValue && (
                        <X
                          onClick={() => form.setValue("emailOrUsername", "")}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

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
                      className="pl-10 pr-10 placeholder:text-[#151515] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[100%] placeholder:tracking-[-2.8%]"
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

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Continue"}
          </Button>
        </form>
      </Form>

      <div className="mt-[32px]">
        <div className="">
          <Separator />
        </div>

        <div className="mt-[32px] flex items-center justify-center gap-3">
          <Button variant="outline" className="w-[56px] bg-transparent">
            <Image
              src="/google.svg"
              alt="Picture of the author"
              width={500}
              height={500}
            />
          </Button>
          <Button variant="outline" className="w-[56px] bg-transparent">
            <Image
              src="/apple.svg"
              alt="Picture of the author"
              width={500}
              height={500}
            />
          </Button>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/create-account"
          className="inline-flex items-center justify-center px-8 py-[12px] bg-[#DAE4FF] text-[#151515] text-base font-medium rounded-[12px] transition-colors"
        >
          Create new Account
        </Link>
      </div>
    </div>
  );
}
