"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
import { Suspense } from "react";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/use-auth-store";
import { useResendTimer } from "@/hooks/use-resend-timer";
import { useAlertManager } from "@/hooks/use-alert-manager";
import { AxiosError } from "axios";
import { CustomAlert } from "./custom-alert";

const FormSchema = z.object({
  otp: z
    .string()
    .min(6, { message: "Your verification code must be 6 characters." })
    .max(6, { message: "Your verification code must be 6 characters." })
    .regex(/^\d+$/, {
      message: "Verification code must contain only digits.",
    }),
});

type VerificationState = "initial" | "success";

function OTPContent() {
  const { verifyOtp, resendOtp, loading } = useAuthStore();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  const [resendLoading, setResendLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [verificationState, setVerificationState] =
    useState<VerificationState>("initial");

  const {
    isDisabled: resendDisabled,
    formattedTime,
    startTimer,
    resetTimer,
    initializeTimer,
  } = useResendTimer();

  const { showAlert, alertType, alertMessage, showAlertMessage, hideAlert } =
    useAlertManager();

  useEffect(() => {
    if (isInitialized) return;

    const fromRegistration = localStorage.getItem("fromRegistration");
    const hasActiveTimer = initializeTimer();

    if (fromRegistration === "true") {
      if (!hasActiveTimer) startTimer();
      showAlertMessage("success", "OTP has been sent to your email");
      localStorage.removeItem("fromRegistration");
    }

    setIsInitialized(true);
  }, [isInitialized, initializeTimer, startTimer, showAlertMessage]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { otp: "" },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (!email) {
      showAlertMessage("error", "Invalid email");
      return;
    }

    try {
      await verifyOtp({ email, otp: data.otp });
      setVerificationState("success");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.responseMessage || "Verification failed";
        showAlertMessage("error", message);
        console.error("OTP verification error (Axios):", err.response?.data);
      } else if (err instanceof Error) {
        showAlertMessage("error", err.message);
        console.error("OTP verification error:", err.message);
      } else {
        showAlertMessage("error", "An unexpected error occurred");
        console.error("OTP verification error (unknown):", err);
      }
    }
  }

  const handleResend = async () => {
    if (!email || resendLoading || resendDisabled) return;
    setResendLoading(true);
    try {
      await resendOtp(email);
      startTimer(3000);
      showAlertMessage("success", "A new OTP has been sent to your email");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        const message =
          err.response?.data?.responseMessage || "Failed to resend OTP";
        resetTimer();
        showAlertMessage("error", message);
        console.error("Resend OTP error (Axios):", err.response?.data);
      } else if (err instanceof Error) {
        resetTimer();
        showAlertMessage("error", err.message);
        console.error("Resend OTP error:", err.message);
      } else {
        resetTimer();
        showAlertMessage("error", "An unexpected error occurred");
        console.error("Resend OTP error (unknown):", err);
      }
    } finally {
      setResendLoading(false);
    }
  };

  const handleProceed = () => {
    const role = useAuthStore.getState().user?.role; // TRADER | ANALYST
    switch (role) {
      case "TRADER":
        router.push("/dashboard");
        break;
      case "ANALYST":
        router.push("/account-verification");
        break;
      default:
        router.push("/signin");
        break;
    }
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

        <h2 className="text-2xl font-medium text-[#151515]">Email Verified</h2>
        <p className="mt-4 text-[16px] text-[#5D5D5D]">
          Your email has been successfully verified. You can now proceed to use
          your account.
        </p>

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
        {showAlert && (
          <CustomAlert
            type={alertType}
            message={alertMessage}
            onClose={hideAlert}
          />
        )}

        <h2 className="text-2xl font-medium text-[#151515]">Verify Email</h2>
        <p className="mt-2 text-[16px] text-[#5D5D5D]">
          We sent a message to{" "}
          <span className="font-medium text-[#151515]">{email}</span> with a
          code to verify your account
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
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    {...field}
                  >
                    <InputOTPGroup className="gap-[10px]">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
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
            <p className="text-gray-600">
              {"Didn't receive code? "}
              {resendLoading ? (
                <span className="text-gray-400 font-medium">Sending...</span>
              ) : resendDisabled ? (
                <span className="text-gray-400">
                  Resend in{" "}
                  <span className="font-semibold">{formattedTime}</span>
                </span>
              ) : (
                <Button
                  variant="link"
                  onClick={handleResend}
                  className="px-0 font-medium text-blue-600 hover:text-blue-800"
                >
                  Resend
                </Button>
              )}
            </p>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#2E5DFC] hover:bg-blue-500"
            disabled={loading}
          >
            {loading ? "Processing..." : "Continue"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export function EmailVerificationForm() {
  return(
  <Suspense fallback={<div>Loading...</div>}>
      <OTPContent />
    </Suspense>
  )
}
