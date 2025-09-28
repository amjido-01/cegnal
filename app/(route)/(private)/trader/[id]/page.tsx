"use client";

import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
// import { useZones } from "@/hooks/use-zone";
import { useTopTraders } from "@/hooks/use-trader";
import { notFound } from "next/navigation";

export default function ZoneDetailPage() {
  const params = useParams();
  const router = useRouter();

  // ✅ safely extract zoneName as string
   const traderId = params?.id;

  // fetch zones
  const { topTraders, topTradersError, isFetchingTopTraders } = useTopTraders()

  
  if (!traderId) {
    notFound();
  }
  
  if (isFetchingTopTraders) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (topTradersError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500">
          <p className="text-xl mb-2">⚠️ Error loading traders</p> {/* ❌ Fix: Changed "zones" to "traders" */}
          <p className="text-sm text-gray-600">Please try refreshing the page</p>
        </div>
      </div>
    );
  }
  
  // ✅ Find trader by matching URL param with trader._id
  const trader = topTraders?.find((t) => t._id === traderId);
  
  console.log(trader, "from trader");
  
  if (!trader) {
    notFound(); // ❌ Fix: Use notFound() instead of custom div for consistency
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Back button */}
      <Button
        variant="ghost"
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Button>

      {/* Zone Info */}
      <div className="flex flex-col items-center">
        <Avatar className="w-24 h-24 mb-4">
          <AvatarImage src={trader.image || "/placeholder.svg"} />
          <AvatarFallback>{trader.email[0]}</AvatarFallback>
        </Avatar>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {trader.firstName}
        </h2>

        <p className="text-lg text-gray-700 mb-2 text-center">
          {trader.role}
        </p>

        {/* <p className="text-gray-600 mb-2">
          Created by: <span className="font-medium">{zone.createdBy}</span>
        </p> */}

        <div className="flex gap-6 mt-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-900">
              {trader.username}
            </p>
            <p className="text-sm text-gray-600">Members</p>
          </div>
          <div className="text-center">
            {/* <p className="text-xl font-semibold text-gray-900">
              ${zone.price}
            </p> */}
            <p className="text-sm text-gray-600">Price</p>
          </div>
        </div>
      </div>
    </div>
  );
}