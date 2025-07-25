"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Mail } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

type FormState = "initial" | "loading" | "success";

export function ForgotPasswordForm() {
  const [formState, setFormState] = useState<FormState>("initial");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setFormState("success");
  };

  const handleTryAgain = () => {
    setFormState("initial");
    setEmail("");
  };

  if (formState === "success") {
    return (
      <div className="space-y-6 text-center py-8 px-4 sm:rounded-lg sm:px-10">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Image
              src="/success.svg"
              alt="Picture of the author"
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-[#151515]">
            Reset password link sent
          </h2>
          <p className="mt-2 text-sm text-[#5D5D5D]">
            We sent a message to{" "}
            <span className="font-medium text-[#151515]">{email}</span> with a
            link to get back into your account.
          </p>
        </div>

        <div className="space-y-3 mt-[32px]">
          <Button className="w-full bg-[#2E5DFC] hover:bg-blue-700">
            <Mail className="w-4 h-4 mr-2" />
            Open Email App
          </Button>

          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={handleTryAgain}
          >
            Try different email
          </Button>
        </div>

        <div className="text-center">
          <Link href="/" className="text-sm text-blue-600 hover:text-blue-500">
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-8 px-4 sm:px-10">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Forget Password
        </h2>
        <p className="mt-2 text-sm text-gray-600 text-center">
          Enter your email and we ll send you a link to reset your password.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <div className="relative my-[32px]">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="pl-10"
              placeholder="Enter email"
              required
              disabled={formState === "loading"}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setEmail("")}
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#2E5DFC] hover:bg-blue-700"
          disabled={formState === "loading"}
        >
          {formState === "loading" ? "Sending..." : "Continue"}
        </Button>
      </form>

      <div className="flex justify-between text-sm">
        <Link
          href="/signin"
          className="text-[#172DDE] text-base font-medium leading-[100%] tracking-[-2.8%]"
        >
          Back to login
        </Link>
        <Link
          href="/contact"
          className="text-[#172DDE] text-base font-medium leading-[100%] tracking-[-2.8%]"
        >
          Contact us
        </Link>
      </div>
    </div>
  );
}
