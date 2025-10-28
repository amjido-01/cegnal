/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { useZones } from "@/hooks/use-zones";
import { TopTradersSkeleton } from "./top-traders-skeleton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export function Zones() {
   // Fetch all zones only once
  const { allZones, isFetchingAllZones, allZonesError } = useZones("all");
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<any>(null);

  // --- Star rendering ---
  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
      />
    ));

  // --- Handlers ---
  const handleZoneClick = (zone: any) => {
    setSelectedZone(zone);
    setIsModalOpen(true);
  };

  const handleProceedToZone = (zone: any) => {
    router.push(`/zone/${zone.id}`);
  };

  const handleSeeMore = () => {
    router.push("/dashboard/signal-zone");
  };

  // --- Conditional rendering ---
  if (isFetchingAllZones) return <TopTradersSkeleton />;
  if (allZonesError) return <div>Error loading zones</div>;
  if (!allZones || allZones.length === 0) return <div>No zones available at the moment.</div>;

    const allZonesTab = allZones?.filter((zone: any) => zone.hasJoined === false);
  const limitedZones = allZonesTab?.slice(0, 5);

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Signal Zones</h3>
        <button
          onClick={handleSeeMore}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          See More
        </button>
      </div>

      {/* Zone List */}
      <div className="space-y-4">
        {limitedZones?.map((zone) => (
          <Card key={zone.id} className="bg-white py-1 shadow-none border border-gray-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={"/placeholder.svg"} />
                    <AvatarFallback>{zone.zoneName[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-gray-900">{zone.zoneName}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">1000 Reviews</p>
                  <div className="flex gap-0.5 mt-1">{renderStars(5)}</div>
                </div>
              </div>

              <div className="bg-gray-100 rounded-lg p-2">
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 divide-x divide-gray-300">
                  <div className="text-center">
                    <p className="font-medium text-gray-900 text-sm">
                      {zone.isPaid ? `$${zone.price}` : "Free"}
                    </p>
                    <p className="text-xs text-gray-600">Entry Fee</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900 text-sm">{zone.noOfMembers}</p>
                    <p className="text-xs text-gray-600">Subscribers</p>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900 text-sm">{70}</p>
                    <p className="text-xs text-gray-600">Win Rates</p>
                  </div>
                </div>

                <Button
                  onClick={() => handleZoneClick(zone)}
                  className="w-full bg-[#454545] hover:bg-gray-900 text-white"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Clean Modal */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent className="max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold text-center">
              {selectedZone?.zoneName}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-sm text-gray-600 mt-2">
              {selectedZone?.isPaid ? (
                <>
                  This is a <strong>paid zone (${selectedZone.price})</strong>.  
                  You can preview the zone before payment.
                </>
              ) : (
                <>Join this zone for free and start exploring signal insights.</>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex flex-col gap-2 mt-4">
            <Button
              onClick={() => {
                if (selectedZone) {
                  handleProceedToZone(selectedZone);
                  setIsModalOpen(false);
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              Proceed
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              className="w-full"
            >
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
