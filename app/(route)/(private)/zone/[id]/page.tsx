"use client";

import { useParams } from "next/navigation";
import TraderDetail from "@/components/zone-detail";
import { useZones } from "@/hooks/use-zone";

export default function ZonePage() {
  const params = useParams();

  // ✅ safely extract id param as string
  const paramsId = Array.isArray(params.id) ? params.id[0] : params.id ?? "";

  const { zones, isFetchingZones, zonesError } = useZones();

  if (isFetchingZones) {
    return <div className="p-6 text-gray-500">Loading zone...</div>;
  }

  if (zonesError) {
    return <div className="p-6 text-red-500">Error loading zones 🚨</div>;
  }

  // ✅ match with backend string ID
  const zone = zones?.find((t) => t.id === paramsId);

  if (!zone) {
    return <div className="p-6 text-red-500">Zone not found 🚫</div>;
  }

  return <TraderDetail zoneId={zone.id} />;
}
