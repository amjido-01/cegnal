"use client";

import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
// import Link from "next/link";
import Image from "next/image";

interface Zone {
  id: number;
  status: string;
  name: string;
  avatar: string;
  reviews: number;
  stars: number;
  entryFee: string;
  subscribers: string;
  winRate: string;
  lossRate: string;
  marketType: string;
}

interface PaymentComponentProps {
  zone: Zone;
}

export default function PaymentComponent({ zone }: PaymentComponentProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("");

  const handleBack = () => {
    if (currentStep === 1) {
      router.back();
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePaymentSelect = (method: string) => {
    setSelectedPayment(method);
    setCurrentStep(2);
  };

  const handleEmailSubmit = () => {
      setCurrentStep(3);
  };

  const handleProceedToZone = () => {
    router.push(`/zone/${zone.id}`);
  };

  // Header component for consistency
  const Header = () => (
    <>
      <div className="flex items-center gap-4 p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="p-0 h-auto hover:bg-transparent"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </Button>
      </div>
    </>
  );

  // Step 1: Payment Method Selection
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-white">
        <Header />

        <div className="p-4">
          <h1 className="text-2xl leading-[100%] tracking-[-2.8%] font-medium text-[#151515] mb-2">
            Select payment type
          </h1>

          {/* Payment Options */}
          <div className="space-y-4 mt-[42px] mb-8">
            <Card
              className="cursor-pointer border-none py-1 shadow-none"
              onClick={() => handlePaymentSelect("paystack")}
            >
              <CardContent className="flex items-center px-0 justify-between">
                <div className="flex items-center gap-3">
                  <Badge className="bg-[#EEF3FF] p-[8px] rounded-[16px] text-[#000000] font-bold text-[12px]">
                    Paystack
                  </Badge>

                  <div className=" tracking-[-2.8%] leading-[100%] font-medium">
                    <p className="text-[#151515] text-[20px]">Paystack</p>
                    <p className="text-[16px] text-[#5D5D5D]">
                      Processing fee: $0.03
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-black" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Email Entry
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-white">
        <Header />

        <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
          {/* Payment Method Logo */}
          <div className="mb-[30px]">
            <Badge className="bg-[#EEF3FF] py-[12px] px-[20px] rounded-[16px] text-[#000000] font-bold text-[16px]">
              Paystack
            </Badge>
          </div>

          <div className="w-full max-w-sm font-medium tracking-[-2.8%] leading-[100%]">
            {/* Subscription Terms */}
            <div className="mt-12">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Subscription Terms
              </h3>
              <div className="bg-gray-50 p4 rounded-lg mb-20">
                <p className="text-sm text-gray-600 leading-relaxed">
                  • Access to <strong>{zone.name}</strong> trading signals
                  <br />• Entry fee: <strong>{zone.entryFee}</strong>
                  <br />• Join <strong>{zone.subscribers}</strong> active
                  subscribers
                  <br />• Proven <strong>{zone.winRate}</strong> win rate track
                  record
                  <br />• {zone.marketType} market focus
                  <br />
                  • Cancel anytime through your account settings
                  <br />• Refund policy applies as per terms of service
                </p>
              </div>
            </div>

            <Button
              onClick={handleEmailSubmit}
              className={`w-full text-white py-4 text-lg font-medium rounded-lg bg-[#2E5DFC] hover:bg-blue-700
              }`}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Success Page
  return (
    <div className="space-y-6 text-center mt-[120px] py-8 px-4 sm:rounded-lg sm:px-10">
      <div className="flex justify-center mb-[28px]">
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
        <h2 className="text-3xl font-bold mb-[16px] text-[#151515]">
          This Should Trigger Paystack modal
        </h2>
       
      </div>

      <Button
        onClick={handleProceedToZone}
        className={`w-full text-white py-4 text-lg font-medium rounded-lg bg-[#2E5DFC] hover:bg-blue-700
              `}
      >
        Proceed to Zone
      </Button>
    </div>
  );
}
