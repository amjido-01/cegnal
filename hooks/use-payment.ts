"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/lib/axios";
import { ApiResponse } from "@/types";
import { AxiosError } from "axios";
import { useCallback } from "react";

export interface InitializePaymentPayload {
  zoneId: string;
  // callback_url: string;
}

export interface VerifyPaymentPayload {
  reference: string;
}

export interface PaymentResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface VerifyResponse {
  zoneId: string;
  zoneName: string;
  amount: number;
  reference: string;
  paymentStatus: "success" | "failed" | "pending";
  paidAt: string;
}


export const paymentKeys = {
  all: ["payments"] as const,
  initialize: () => [...paymentKeys.all, "initialize"] as const,
  verify: () => [...paymentKeys.all, "verify"] as const,
};


export const usePayment = () => {
  const queryClient = useQueryClient();

  // ✅ Initialize Payment Mutation
 const initializePaymentMutation = useMutation({
  mutationKey: paymentKeys.initialize(),
  mutationFn: async (payload: InitializePaymentPayload): Promise<PaymentResponse> => {
    const { data } = await api.post<ApiResponse<PaymentResponse>>(
      "/payment/initiate",
      payload
    );
    if (data?.responseSuccessful) {
      return data.responseBody;
    }
    throw new Error(data?.responseMessage || "Failed to initialize payment");
  },
  onSuccess: (paymentData) => {
    toast.success("Redirecting to payment...");
    window.location.href = paymentData.authorization_url;
  },
  onError: (error: unknown) => {
    let message = "Failed to initialize payment";

    if (error instanceof AxiosError) {
      message =
        error.response?.data?.responseMessage ||
        error.message ||
        message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    toast.error(message);
  },
});


  // ✅ Verify Payment Mutation
const verifyPaymentMutation = useMutation({
  mutationKey: paymentKeys.verify(),
  mutationFn: async (payload: VerifyPaymentPayload): Promise<VerifyResponse> => {
    const { data } = await api.post<ApiResponse<VerifyResponse>>(
      "/payment/verify",
      payload
    );
    if (data?.responseSuccessful) {
      return data.responseBody;
    }
    throw new Error(data?.responseMessage || "Failed to verify payment");
  },
  onSuccess: () => {
    toast.success("Payment verified successfully");
    queryClient.invalidateQueries({ queryKey: ["zones"] });
    queryClient.invalidateQueries({ queryKey: ["user-zones"] });
  },
  onError: (error: unknown) => {
    let message = "Payment verification failed";

    if (error instanceof AxiosError) {
      message =
        error.response?.data?.responseMessage ||
        error.message ||
        message;
    } else if (error instanceof Error) {
      message = error.message;
    }

    toast.error(message);
  },
});



  const initializePayment = useCallback(
    async (payload: InitializePaymentPayload) => {
      return initializePaymentMutation.mutateAsync(payload);
    },
    [initializePaymentMutation]
  );

 const verifyPayment = useCallback(
  async (payload: VerifyPaymentPayload) => {
    return verifyPaymentMutation.mutateAsync(payload);
  },
  [verifyPaymentMutation.mutateAsync] // Use mutateAsync directly
);


  return {
    // Mutations
    initializePayment,
    verifyPayment,

    // Mutation states
    isInitializingPayment: initializePaymentMutation.isPending,
    isVerifyingPayment: verifyPaymentMutation.isPending,

    // Errors
    initializePaymentError: initializePaymentMutation.error,
    verifyPaymentError: verifyPaymentMutation.error,

    // Success states
    initializePaymentSuccess: initializePaymentMutation.isSuccess,
    verifyPaymentSuccess: verifyPaymentMutation.isSuccess,

    // Reset
    resetInitializePayment: initializePaymentMutation.reset,
    resetVerifyPayment: verifyPaymentMutation.reset,
  };
};
