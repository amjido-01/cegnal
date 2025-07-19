"use client";

import type React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
// import { toast } from "sonner"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS } from "input-otp"

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
})

export function PhoneVerificationForm() {
     const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        otp: "",
      },
    })

      function onSubmit(data: z.infer<typeof FormSchema>) {
        // toast.success("Email verification successful!", {
        //   description: `Code ${data.otp} verified successfully.`,
        // })
        // Handle successful verification here
        console.log("Email verified:", data)
      }
    

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-medium tracking-[-2.8%] text-[#151515]">Verify Phone</h2>
        <p className="mt-2 text-[16px] leading-[100%] font-medium text-[#5D5D5D]">
          We have sent an OTP message with the verification code to{" "}
          <span className="font-medium text-[#151515]">+234XXXXXXXX</span>
        </p>
      </div>

    
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center space-y-4">
                    <FormControl>
                      <InputOTP maxLength={4} pattern={REGEXP_ONLY_DIGITS} {...field}>
                        <InputOTPGroup className="gap-[10px]">
                          <InputOTPSlot
                            index={0}
                           className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-blue-500"
                          />
                          <InputOTPSlot
                            index={1}
                           className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-blue-500"
                          />
                          <InputOTPSlot
                            index={2}
                           className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-blue-500"
                          />
                          <InputOTPSlot
                            index={3}
                            className="w-12 h-12 text-center text-lg font-semibold border-2 focus:border-blue-500"
                          />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
    
              <div className="text-center">
                 <span className="text-sm text-[#5D5D5D]">{"Didn't receive code? "}</span>
            <button className="text-sm text-[#172DDE] font-medium">Resend Code</button>
              </div>
    
              <Button type="submit" className="w-full bg-[#2E5DFC] hover:bg-blue-500" >
                Continue
              </Button>
            </form>
          </Form>
    </div>
  );
}
