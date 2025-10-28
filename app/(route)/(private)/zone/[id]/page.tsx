"use client";

import { useParams } from "next/navigation";
import ZoneDetail from "@/components/zone-detail"; // ❌ Fix: Should be trader-detail, not zone-detail
import { notFound } from "next/navigation";
import { useZones } from "@/hooks/use-zone";

export default function Page() {
  const params = useParams();
  const zoneId = params?.id; // ❌ Fix: Extract 'id' from URL params
  
  const { zones, zonesError, isFetchingZones } = useZones()
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
  
  // ✅ Find trader by matching URL param with trader._id
  const zone = zones?.find((t) => t.id === zoneId);

  
  
  if (!zone) {
    notFound(); // ❌ Fix: Use notFound() instead of custom div for consistency
  }
  
  return <ZoneDetail zone={zone} />;
}