"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, User, Lock, X } from "lucide-react";
import Image from "next/image";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-4xl leading-[100%] tracking-[-2.3%] font-medium text-gray-900 text-center">
          Login
        </h2>
      </div>

      <form className=" mt-[32px]">
        <div>
          <div className="relative my-[32px]">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="pl-10"
              placeholder="Enter email or username"
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

        <div>
          <div className="relative my-[32px]">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              className="pl-10 pr-10"
              placeholder="Password"
            />
           
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#2E5DFC] py-3 text-base hover:bg-blue-700 mt-[20px]"
        >
          Continue
        </Button>

        <div className=" text-center mt-[22px]">
          <Link
            href="/forgot-password"
            className=" text-base text-[#151515] font-medium leading-[100%] tracking-[-2.8%]"
          >
            Forgot password?
          </Link>
        </div>
      </form>

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
