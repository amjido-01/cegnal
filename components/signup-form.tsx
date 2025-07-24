"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { toast } from "sonner"
import { z } from "zod";
import { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Eye,
  EyeOff,
  Mail,
  User,
  Lock,
  Gift,
  Check,
  X,
  Phone,
} from "lucide-react";

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

export function SignupForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: z.infer<typeof FormSchema>) => void;
  isLoading: boolean;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      countryCode: "NG",
      phoneNumber: "",
      referralCode: "",
    },
  });

  const password = form.watch("password");

  const passwordRequirements = [
    { label: "1 small letter", met: /[a-z]/.test(password), id: "lowercase" },
    { label: "1 number", met: /\d/.test(password), id: "number" },
    { label: "1 capital letter", met: /[A-Z]/.test(password), id: "uppercase" },
    { label: "8 characters", met: password.length >= 8, id: "length" },
  ];

  return (
    <div className="space-y-6">
      <div className="leading-[100%] tracking-[-2.8%]">
        <h2 className="text-3xl font-medium  text-[#151515] text-center">
          Create Account
        </h2>
        <p className="mt-2 text-[16px] font-normal text-[#5D5D5D] text-center">
          New users can earn up to ₦5000 upon Registration
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              const emailValue = form.watch("email");

              return (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#151515]" />
                      <Input
                        placeholder="Enter email"
                        className="pl-10 pr-10 placeholder:text-[#151515] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[100%] placeholder:tracking-[-2.8%]"
                        disabled={isLoading}
                        {...field}
                      />
                      {emailValue && (
                        <X
                          onClick={() => form.setValue("email", "")}
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
            name="username"
            render={({ field }) => {
              const usernameValue = form.watch("username");

              return (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#151515]" />
                      <Input
                        placeholder="Enter username"
                        className="pl-10 pr-10 placeholder:text-[#151515] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[100%] placeholder:tracking-[-2.8%]"
                        disabled={isLoading}
                        {...field}
                      />
                      {usernameValue && (
                        <X
                          onClick={() => form.setValue("username", "")}
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
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </FormControl>
                {password && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {passwordRequirements.map((req) => (
                      <div key={req.id} className="flex items-center space-x-2">
                        <div
                          className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            req.met ? "bg-green-100" : "bg-red-100"
                          }`}
                        >
                          {req.met ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <X className="w-3 h-3 text-red-600" />
                          )}
                        </div>
                        <span
                          className={`text-xs ${
                            req.met ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-4 gap-14">
            <FormField
              control={form.control}
              name="countryCode"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="NG">🇳🇬 +234</SelectItem>
                      <SelectItem value="US">🇺🇸 +1</SelectItem>
                      <SelectItem value="GB">🇬🇧 +44</SelectItem>
                      <SelectItem value="CA">🇨🇦 +1</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-3">
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => {
                  const phoneNumberValue = form.watch("phoneNumber");
                  return (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#151515]" />
                          <Input
                            placeholder="Phone number"
                            className="pl-10 placeholder:text-[#151515] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[100%] placeholder:tracking-[-2.8%]"
                            {...field}
                          />
                          {phoneNumberValue && (
                            <X
                              onClick={() => form.setValue("phoneNumber", "")}
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
            </div>
          </div>

          <FormField
            control={form.control}
            name="referralCode"
            render={({ field }) => {
              const referralCodeValue = form.watch("referralCode");
              return (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Gift className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#151515]" />
                      <Input
                        placeholder="Referral code (optional)"
                        className="pl-10 placeholder:text-[#151515] placeholder:text-[14px] placeholder:font-medium placeholder:leading-[100%] placeholder:tracking-[-2.8%]"
                        {...field}
                      />
                      {referralCodeValue && (
                        <X
                          onClick={() => form.setValue("referralCode", "")}
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

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            Submit
          </Button>
        </form>
      </Form>

      <div className="flex justify-between text-sm font-medium text-[16px] leading-[100%] tracking-[-2.8%]">
        <Link href="/signin" className="text-[#172DDE] hover:text-blue-500">
          Back to log in
        </Link>
        <Link href="/contact" className="text-[#172DDE] hover:text-blue-500">
          Contact us
        </Link>
      </div>
    </div>
  );
}
