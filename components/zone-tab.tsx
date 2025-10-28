/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useZones } from "@/hooks/use-zones"; // single hook now
import { TopTradersSkeleton } from "./top-traders-skeleton";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "./ui/alert-dialog";

const tabs = ["All", "My Zones"];

export default function ZonesTabs() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"All" | "My Zones">("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<any>(null);

  // Fetch all zones only once
  const { allZones, isFetchingAllZones, allZonesError } = useZones("all");

  const handleTabChange = (value: string) => {
    setActiveTab(value as "All" | "My Zones");
  };

 const handleZoneClick = (zone: any) => {
  if (zone.hasJoined) {
    // user already joined — go straight to the zone
    router.push(`/chat/${zone.id}`);
  } else {
    // not joined — show modal
    setSelectedZone(zone);
    setIsModalOpen(true);
  }
};


  const handleProceedToZone = (zone: any) => {
    router.push(`/zone/${zone.id}`);
    setIsModalOpen(false);
  };

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-2 gap-3">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-6 border-none shadow-none animate-pulse">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-gray-200 mb-3" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-1/2 mb-3" />
            <div className="h-8 bg-gray-200 rounded w-full" />
          </div>
        </Card>
      ))}
    </div>
  );

  const ErrorState = ({ message }: { message: string }) => (
    <div className="text-center py-8">
      <p className="text-red-500 text-sm mb-2">⚠️ Error loading zones</p>
      <p className="text-gray-600 text-xs">{message}</p>
    </div>
  );

  const EmptyState = ({ message }: { message: string }) => (
    <div className="text-center py-8">
      <p className="text-gray-500 text-sm">{message}</p>
    </div>
  );

  // Filter joined zones from allZones
  const joinedZones =
    allZones?.filter((zone: any) => zone.hasJoined === true) || [];

  const allZonesTab = allZones?.filter((zone: any) => zone.hasJoined === false);

  return (
    <div className="px-4 mb-6 bg-gray-100 min-h-screen">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="p-1 w-full">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* All Zones */}
        <TabsContent value="All" className="w-full">
          <div className="px-4 pb-20">
            {isFetchingAllZones ? (
              <TopTradersSkeleton />
            ) : allZonesError ? (
              <ErrorState message="Failed to load zones" />
            ) : !allZonesTab || allZonesTab.length === 0 ? (
              <EmptyState message="No zones available at the moment" />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {allZonesTab.map((zone: any) => (
                  <Card
                    key={zone.id}
                    className="p-4 border border-gray-100 shadow-sm rounded-lg bg-white"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mb-3">
                        <Image
                          src={"/user.jpg"}
                          alt={zone.zoneName}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">
                        {zone.zoneName}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">
                        {zone.noOfMembers} members
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {zone.description}
                      </p>
                      <Button
                        onClick={() => handleZoneClick(zone)}
                        variant="default"
                        size="sm"
                        className="w-full text-xs py-2 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>

        {/* My Zones (Filtered from allZones) */}
        <TabsContent value="My Zones" className="mt-6">
          <div className="px-4 pb-20">
            {isFetchingAllZones ? (
              <LoadingSkeleton />
            ) : allZonesError ? (
              <ErrorState message="Failed to load your zones" />
            ) : joinedZones.length === 0 ? (
              <EmptyState message="You haven’t joined any zones yet" />
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {joinedZones.map((zone: any) => (
                  <Card
                    key={zone.id}
                    className="p-4 border border-gray-100 shadow-sm rounded-lg bg-white"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full overflow-hidden mb-3">
                        <Image
                          src={"/user.jpg"}
                          alt={zone.zoneName}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-semibold text-sm mb-1">
                        {zone.zoneName}
                      </h3>
                      <p className="text-xs text-gray-500 mb-3">
                        {zone.noOfMembers} members
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {zone.description}
                      </p>
                      <Button
                        onClick={() => handleZoneClick(zone)}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
                      >
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Zone Modal */}
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
                  You can preview the zone details before joining.
                </>
              ) : (
                <>
                  Join this zone for free and start exploring signal insights.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex flex-col gap-2 mt-4">
            <Button
              onClick={() => selectedZone && handleProceedToZone(selectedZone)}
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
