"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
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

function VerifyPaymentContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get("reference");
  const router = useRouter();
  const { verifyPayment } = usePayment();
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [paymentData, setPaymentData] = useState<VerifyResponse | null>(null);
  console.log(reference);

  useEffect(() => {
    const verify = async () => {
      if (!reference) return;
      try {
        const res = await verifyPayment({ reference });
        setPaymentData(res);
        console.log(res, "kkkk");
        setStatus("success");
      } catch (err) {
        setStatus("failed");
        toast.error("Payment verification failed. Please contact support.");
      }
    };
    verify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reference]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="text-lg text-center text-muted-foreground">
              Verifying your payment, please wait...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
            <AlertTriangle className="h-16 w-16 text-destructive" />
            <h2 className="text-2xl font-bold text-center">
              Payment Verification Failed
            </h2>
            <p className="text-center text-muted-foreground">
              Please contact support or try again later.
            </p>
            <Button onClick={() => router.push("/dashboard/signal-zone")}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 space-y-6">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <h2 className="text-2xl font-bold text-center">
            Payment Successful!
          </h2>
          <div className="w-full space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="font-semibold">Zone:</span>
              <span>{paymentData?.zoneName || "N/A"}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Amount:</span>
              <span>₦{paymentData?.amount || "—"}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Reference:</span>
              <span>{paymentData?.reference}</span>
            </p>
            <p className="flex justify-between">
              <span className="font-semibold">Date:</span>
              <span>
                {paymentData?.paidAt
                  ? new Date(paymentData.paidAt).toLocaleString()
                  : "N/A"}
              </span>
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push(`/chat/${paymentData?.zoneId}`)}>
            Continue to Chat
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function VerifyPaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
            <Loader2 className="h-16 w-16 animate-spin text-primary" />
            <p className="text-lg text-center text-muted-foreground">
              Loading...
            </p>
          </CardContent>
        </Card>
      </div>
    }>
      <VerifyPaymentContent />
    </Suspense>
  );
}