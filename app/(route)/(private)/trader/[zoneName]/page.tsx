"use client";

import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useZones } from "@/hooks/use-zone";

export default function ZoneDetailPage() {
  const params = useParams();
  const router = useRouter();

  // ✅ safely extract zoneName as string
  const zoneName = Array.isArray(params.zoneName)
    ? params.zoneName[0]
    : params.zoneName ?? "";

  // fetch zones
  const { zones, isFetchingZones, zonesError } = useZones();

  if (isFetchingZones) {
    return <p className="p-4 text-gray-600">Loading zone...</p>;
  }

  if (zonesError) {
    return <p className="p-4 text-red-600">Error loading zone</p>;
  }

  // ✅ find zone safely
  const zone = zones?.find(
    (z) => z.zoneName.toLowerCase() === decodeURIComponent(zoneName).toLowerCase()
  );

  if (!zone) {
    return <p className="p-4 text-gray-600">Zone not found</p>;
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
          <AvatarImage src={zone.avatarUrl || "/placeholder.svg"} />
          <AvatarFallback>{zone.zoneName[0]}</AvatarFallback>
        </Avatar>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          {zone.zoneName}
        </h2>

        <p className="text-lg text-gray-700 mb-2 text-center">
          {zone.description}
        </p>

        <p className="text-gray-600 mb-2">
          Created by: <span className="font-medium">{zone.createdBy}</span>
        </p>

        <div className="flex gap-6 mt-4">
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-900">
              {zone.noOfMembers}
            </p>
            <p className="text-sm text-gray-600">Members</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-semibold text-gray-900">
              ${zone.price}
            </p>
            <p className="text-sm text-gray-600">Price</p>
          </div>
        </div>
      </div>
    </div>
  );
}
