"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { usePayment } from "@/hooks/use-payment";
import { toast } from "sonner";
import { useZones } from "@/hooks/use-zone";
import { notFound } from "next/navigation";
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
  const { initializePayment, isInitializingPayment } = usePayment()
   const { zones, zonesError, isFetchingZones } = useZones()
  const router = useRouter();
  const params = useParams();
  const { zoneId } = params;

   const [currentStep, setCurrentStep] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("");


  if (!zoneId) {
      notFound();
    }

      
  if (isFetchingZones) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (zonesError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl mb-2">⚠️ Error loading zone</p> {/* ❌ Fix: Changed "zones" to "traders" */}
          <p className="text-sm text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }

    const foundZone = zones?.find((t) => t.id === zoneId);

      if (!foundZone) {
    notFound(); // ❌ Fix: Use notFound() instead of custom div for consistency
  }

    

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

  const handleInintiate = () => {
    if (!zoneId) return toast.error("Zone ID not found");
    initializePayment({ zoneId: String(zoneId)});
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
                      {`Processing fee: ₦${foundZone.price}`}
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
                • Access to <strong>{foundZone?.zoneName}</strong> trading signals
                <br />• Entry fee:{" "}
                <strong>₦{foundZone?.price}</strong>
                <br />• Join{" "}
                <strong>{foundZone?.noOfMembers}</strong> active subscribers
                <br />• Proven{" "}
                <strong>{zone.winRate ?? "--%"}</strong> win rate record
                <br />• {zone.marketType ?? "General"} market focus
                <br />• Cancel anytime through account settings
                <br />• Refund policy applies
              </p>
            </div>

            <Button
              onClick={handleInintiate}
              disabled={isInitializingPayment}
              className="w-full text-white py-4 text-lg font-medium rounded-lg bg-[#2E5DFC] hover:bg-blue-700"
            >
               {isInitializingPayment ? "Redirecting..." : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

}
