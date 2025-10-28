"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePayment } from "@/hooks/use-payment";
import { Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export interface VerifyResponse {
  zoneId: string;
  zoneName: string;
  amount: number;
  reference: string;
  paymentStatus: "success" | "failed" | "pending";
  paidAt: string; // ISO timestamp
}

export default function VerifyPaymentContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const router = useRouter();

  const { verifyPayment } = usePayment();

  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading");
  const [paymentData, setPaymentData] = useState<VerifyResponse | null>(null);

  useEffect(() => {
    if (!reference) return;

    let mounted = true;
    const verify = async () => {
      try {
        const res = await verifyPayment({ reference });
        if (!mounted) return;
        setPaymentData(res);
        setStatus("success");
      } catch (err) {
        if (!mounted) return;
        console.error(err);
        setStatus("failed");
        toast.error("Payment verification failed. Please contact support.");
      }
    };

    verify();
    return () => {
      mounted = false;
    };
  }, [reference, verifyPayment]); // safe because verifyPayment is memoized in the hook

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
        <p className="text-gray-700 text-lg font-medium">
          Verifying your payment, please wait...
        </p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-4">
        <AlertTriangle className="w-10 h-10 text-red-600" />
        <h2 className="text-xl font-semibold text-red-700">
          Payment Verification Failed
        </h2>
        <p className="text-gray-500">
          Please contact support or try again later.
        </p>
        <Button onClick={() => router.push("/dashboard/signal-zone")}>
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="p-6 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
          <h2 className="text-2xl font-semibold text-green-700">
            Payment Successful!
          </h2>

          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Zone:</strong> {paymentData?.zoneName || "N/A"}</p>
            <p><strong>Amount:</strong> ₦{paymentData?.amount?.toLocaleString() || "—"}</p>
            <p><strong>Reference:</strong> {paymentData?.reference}</p>
            <p><strong>Date:</strong> {paymentData?.paidAt ? new Date(paymentData.paidAt).toLocaleString() : "N/A"}</p>
          </div>

          <Button
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-3 text-white text-sm rounded-lg"
            onClick={() => router.push(`/chat/${paymentData?.zoneId}`)}
          >
            Continue to Chat
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
