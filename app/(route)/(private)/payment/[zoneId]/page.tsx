"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// 👇 Interface matches your "zone" but with placeholders for missing info
interface Zone {
  id: string;
  name: string;
  avatar?: string;
  entryFee?: string;
  subscribers?: string;
  winRate?: string;
  marketType?: string;
}

export default function PaymentPage() {
  const router = useRouter();
  const params = useParams();
  const { zoneId } = params;

  // TODO: replace with real API fetch when ready
  const zone: Zone = {
    id: String(zoneId),
    name: "Placeholder Zone",
    avatar: "/placeholder.svg",
    entryFee: "$500",
    subscribers: "120",
    winRate: "80%",
    marketType: "Forex",
  };

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

  // ✅ Header Component
  const Header = () => (
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
  );

  // ✅ Step 1: Select Payment Method
  if (currentStep === 1) {
    return (
      <div className="min-h-screen bg-white">
        <Header />

        <div className="p-4">
          <h1 className="text-2xl font-medium text-[#151515] mb-2">
            Select payment type
          </h1>

          <div className="space-y-4 mt-10 mb-8">
            <Card
              className="cursor-pointer border-none py-1 shadow-none"
              onClick={() => handlePaymentSelect("paystack")}
            >
              <CardContent className="flex items-center px-0 justify-between">
                <div className="flex items-center gap-3">
                  <Badge className="bg-[#EEF3FF] p-2 rounded-[16px] text-[#000000] font-bold text-[12px]">
                    Paystack
                  </Badge>

                  <div className="font-medium">
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

  // ✅ Step 2: Subscription Terms
  if (currentStep === 2) {
    return (
      <div className="min-h-screen bg-white">
        <Header />

        <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
          <div className="mb-8">
            <Badge className="bg-[#EEF3FF] py-3 px-6 rounded-[16px] text-[#000000] font-bold text-[16px]">
              Paystack
            </Badge>
          </div>

          <div className="w-full max-w-sm font-medium">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Subscription Terms
            </h3>
            <div className="bg-gray-50 p-4 rounded-lg mb-10">
              <p className="text-sm text-gray-600 leading-relaxed">
                • Access to <strong>{zone.name}</strong> trading signals
                <br />• Entry fee:{" "}
                <strong>{zone.entryFee ?? "N/A"}</strong>
                <br />• Join{" "}
                <strong>{zone.subscribers ?? "0"}</strong> active subscribers
                <br />• Proven{" "}
                <strong>{zone.winRate ?? "--%"}</strong> win rate record
                <br />• {zone.marketType ?? "General"} market focus
                <br />• Cancel anytime through account settings
                <br />• Refund policy applies
              </p>
            </div>

            <Button
              onClick={handleEmailSubmit}
              className="w-full text-white py-4 text-lg font-medium rounded-lg bg-[#2E5DFC] hover:bg-blue-700"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Step 3: Success Page
  return (
    <div className="space-y-6 text-center mt-28 py-8 px-4 sm:px-10">
      <div className="flex justify-center mb-7">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Image
            src="/success.svg"
            alt="success"
            width={40}
            height={40}
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-4 text-[#151515]">
        This Should Trigger Paystack modal
      </h2>

      <Button
        onClick={handleProceedToZone}
        className="w-full text-white py-4 text-lg font-medium rounded-lg bg-[#2E5DFC] hover:bg-blue-700"
      >
        Proceed to Zone
      </Button>
    </div>
  );
}
