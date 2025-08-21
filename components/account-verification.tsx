"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { AlertCircleIcon, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertTitle } from "./ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const FormSchema = z.object({
  accountType: z.string().min(1, "Please select an account type"),
  bankName: z.string().min(1, "Please select a bank"),
  accountNumber: z
    .string()
    .min(10, "Account number must be at least 8 digits")
    .max(17, "Account number must be no more than 17 digits")
    .regex(/^\d+$/, "Account number must contain only numbers"),
});

type VerificationState = "initial" | "loading" | "success";

export function AccountVerificationForm() {
  const [verificationState, setVerificationState] =
    useState<VerificationState>("initial");
  const [accountNumber, setAccountNumber] = useState("");

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      accountType: "",
      bankName: "",
      accountNumber: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setVerificationState("loading");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setVerificationState("success");
    console.log("Account verified:", data);
  }

  const handleProceed = () => {
    console.log("Proceeding to dashboard...");
    // Navigate to next step
  };

  const isFormValid =
    form.formState.isValid &&
    Object.values(form.getValues()).every((value) => value !== "");
  const isLoading = verificationState === "loading";

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
            Account Added
          </h2>
          <p className="mt-4 text-[16px] leading-[140%] font-normal text-[#5D5D5D] px-4">
            Your account has been successfully added. You can now proceed to the
            next step.
          </p>
        </div>
        <Button
          onClick={handleProceed}
          className="w-full bg-[#2E5DFC] hover:bg-blue-500 m-0"
        >
          Proceed
        </Button>


          <Alert className="border-none flex mt-0 justify-center items-center gap-0">
            <AlertCircleIcon className="" />
            <AlertTitle>
              Up Next: Bio Verification
            </AlertTitle>
          </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl leading-[100%] tracking-[-2.3%] font-medium text-[#151515] text-center">
          Setup Withdrawal Account
        </h2>
        <p className="mt-2 text-[16px] leading-[100%] font-medium text-[#5D5D5D]">
          Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus
          vivamus dolor. Dolor ultricies lacus
        </p>
      </div>

        <div className="space-y-4">
              <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="accountType"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={`w-full h-12 border-gray-200 text-gray-500 ${
                        fieldState.error ? "border-red-500 border-2" : ""
                      }`}
                    >
                      <SelectValue placeholder="Account Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="savings">Savings Account</SelectItem>
                      <SelectItem value="checking">Checking Account</SelectItem>
                      <SelectItem value="business">Business Account</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger
                      className={`w-full h-12 border-gray-200 text-gray-500 ${
                        fieldState.error ? "border-red-500 border-2" : ""
                      }`}
                    >
                      <SelectValue placeholder="Bank Name" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="chase">Chase Bank</SelectItem>
                      <SelectItem value="bofa">Bank of America</SelectItem>
                      <SelectItem value="wells">Wells Fargo</SelectItem>
                      <SelectItem value="citi">Citibank</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Account Number"
                      {...field}
                      className={`w-full h-12 border-gray-200 pr-10 ${
                        fieldState.error ? "border-red-500 border-2" : ""
                      }`}
                    />
                    {field.value && (
                      <button
                        type="button"
                        onClick={() => field.onChange("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 text-sm" />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-center space-x-3 py-2 bg-blue-50 rounded-lg">
            <Avatar className="w-6 h-6 border-[#5B8BFF] border-[1.5px]">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback className="bg-[#EEF3FF] text-blue-700 text-[10px]">
                <Check className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <span className="text-[#5D5D5D] font-medium text-[16px]">Victor Drason</span>
          </div>

          <div className="mt-20">
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
        </div>
     

      {/* <div className="space-y-4">
        <Select>
          <SelectTrigger className="w-full h-12 border-gray-200 text-gray-500">
            <SelectValue placeholder="Account Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="savings">Savings Account</SelectItem>
            <SelectItem value="checking">Checking Account</SelectItem>
            <SelectItem value="business">Business Account</SelectItem>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-full h-12 border-gray-200 text-gray-500">
            <SelectValue placeholder="Bank Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="chase">Chase Bank</SelectItem>
            <SelectItem value="bofa">Bank of America</SelectItem>
            <SelectItem value="wells">Wells Fargo</SelectItem>
            <SelectItem value="citi">Citibank</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative">
          <Input
            type="text"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full h-12 border-gray-200 pr-10"
          />
          {accountNumber && (
            <button
              type="button"
              onClick={() => setAccountNumber("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex items-center justify-center space-x-3 py-2 bg-blue-50 rounded-lg">
          <Avatar className="w-6 h-6">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback className="bg-blue-200 text-blue-700 text-[10px]">
              VD
            </AvatarFallback>
          </Avatar>
          <span className="text-gray-700 font-medium">Victor Drason</span>
        </div>
        <div className="mt-20">
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700"
            // disabled={isLoading}
          >
            Submit
          </Button>
        </div>
      </div> */}
    </div>
  );
}
