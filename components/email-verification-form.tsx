"use client";

import type React from "react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Image from "next/image";

const FormSchema = z.object({
  otp: z
    .string()
    .min(4, {
      message: "Your verification code must be 4 characters.",
    })
    .max(4, {
      message: "Your verification code must be 4 characters.",
    })
    .regex(/^\d+$/, {
      message: "Verification code must contain only digits.",
    }),
});

type VerificationState = "initial" | "loading" | "success";

export function EmailVerificationForm() {
  const [verificationState, setVerificationState] =
    useState<VerificationState>("initial");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      otp: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setVerificationState("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setVerificationState("success");
    console.log("Email verified:", data);
  }

  const handleProceed = () => {
    console.log("Proceeding to dashboard...");
    // Navigate to next step
  };

  if (verificationState === "success") {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Image
              src="/success.svg"
              alt="Verification Success"
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-medium tracking-[-2.8%] text-[#151515]">
            Email Verified
          </h2>
          <p className="mt-4 text-[16px] leading-[140%] font-normal text-[#5D5D5D] px-4">
            Your email has been successfully verified. You can now proceed to use your account.
          </p>
        </div>

        <Button
          onClick={handleProceed}
          className="w-full bg-[#2E5DFC] hover:bg-blue-500 py-3"
        >
          Proceed
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-medium tracking-[-2.8%] text-[#151515]">
          Verify Email
        </h2>
        <p className="mt-2 text-[16px] leading-[100%] font-medium text-[#5D5D5D]">
          We sent a message to{" "}
          <span className="font-medium text-[#151515]">Ric...@gmail.com</span>{" "}
          with a code to verify your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="otp"
            render={({ field, fieldState }) => (
              <FormItem className="flex flex-col items-center space-y-4">
                <FormControl>
                  <InputOTP
                    maxLength={4}
                    pattern={REGEXP_ONLY_DIGITS}
                    {...field}
                  >
                    <InputOTPGroup className="gap-[10px]">
                      {[0, 1, 2, 3].map((index) => (
                        <InputOTPSlot
                          key={index}
                          index={index}
                          className={`w-12 h-12 text-center text-lg font-semibold border-2 rounded-md transition-colors duration-150 focus:outline-none ${
                            fieldState.invalid
                              ? "border-[#DA2C38] focus:ring-2 focus:ring-[#DA2C38] bg-[#FEF2F3]"
                              : "border-gray-300 focus:ring-2 focus:ring-blue-500"
                          }`}
                        />
                      ))}
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="text-center">
            <span className="text-sm text-[#5D5D5D]">{"Didn't receive code? "}</span>
            <button
              type="button"
              onClick={() => console.log("Resend logic here")}
              className="text-sm text-[#172DDE] font-medium"
            >
              Resend Code
            </button>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#2E5DFC] hover:bg-blue-500"
            disabled={verificationState === "loading"}
          >
            {verificationState === "loading" ? "Verifying..." : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
