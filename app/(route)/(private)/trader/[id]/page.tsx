"use client";

import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Star } from "lucide-react";
import { notFound } from "next/navigation";
import { useAnalystById } from "@/hooks/use-analyst";
import { useState } from "react";
import { Zone } from "@/types";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

export default function TopTraderPage() {
  const params = useParams();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<Zone>();
  const [showAll, setShowAll] = useState(false);

  const analystId = typeof params?.id === 'string' ? params.id : undefined;
  
  const { data: analystData, isLoading, error } = useAnalystById(analystId || '');
  
  console.log("Analyst data:", analystData);

  const handleZoneClick = (zone: Zone) => {
    if (zone.isPaid) {
      router.push(`/payment/${zone.id}`);
    } else {
      setSelectedZone(zone);
      setIsModalOpen(true);
    }
  };

  const handleProceedToZone = (zone: Zone) => {
    router.push(`/zone/${zone.id}`);
  };

  if (!analystId) {
    notFound();
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading analyst details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center text-red-500">
          <p className="text-xl mb-2">⚠️ Error loading analyst</p>
          <p className="text-sm text-gray-600">
            {error instanceof Error ? error.message : "Please try refreshing the page"}
          </p>
        </div>
      </div>
    );
  }

  // Not found state
  if (!analystData?.analyst) {
    notFound();
  }

  const { analyst, zones = [] } = analystData;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-orange-400 text-orange-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  // Calculate win rate based on zones (you can adjust this logic)
  const calculateWinRate = () => {
    if (zones.length === 0) return 0;
    // Mock calculation - you can replace with actual data
    return 80;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center gap-4 border-b">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Back</h1>
      </div>

      <div className="px-4 pb-6">
        {/* Analyst Profile */}
        <div className="text-center mb-8 pt-6">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src="/placeholder.svg" alt={analyst.username} />
            <AvatarFallback className="text-xl font-semibold">
              {analyst.firstName?.[0]?.toUpperCase() || analyst.username[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {analyst.username}
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed px-4">
            {analyst.firstName && analyst.lastName 
              ? `${analyst.firstName} ${analyst.lastName} - Professional analyst providing expert market analysis and trading signals` 
              : "Professional analyst providing expert market analysis and trading signals"}
          </p>
        </div>

        {/* Analyst Stats */}
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Email</span>
            <span className="text-gray-900 font-medium text-sm">
              {analyst.email}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Role</span>
            <span className="text-gray-900 font-medium capitalize">
              {analyst.role.toLowerCase()}
            </span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Total Zones</span>
            <span className="text-gray-900 font-medium">{zones.length}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Win Rate</span>
            <span className="text-gray-900 font-medium">{calculateWinRate()}%</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Ratings</span>
            <div className="flex gap-0.5">{renderStars(4)}</div>
          </div>
        </div>

        {/* Trading Signals / Zones */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Trading Zones ({zones.length})
          </h3>

          {zones.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No trading zones available yet</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {(showAll ? zones : zones.slice(0, 2)).map((zone: Zone) => (
                  <Card key={zone.id} className="bg-white py-1 shadow-none">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback>{zone.zoneName[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">
                              {zone.zoneName}
                            </p>
                            {zone.description && (
                              <p className="text-xs text-gray-500 mt-1">
                                {zone.description}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Reviews</p>
                          <div className="flex gap-0.5 mt-1">{renderStars(5)}</div>
                        </div>
                      </div>

                      <div className="bg-[#E7E7E7] rounded-[8px] p-2">
                        <div className="grid grid-cols-3 gap-4 mb-4 p-3 divide-x divide-[#D1D1D1]">
                          <div className="text-center">
                            {zone.isPaid ? (
                              <p className="font-medium text-gray-900 text-sm">
                                ${(zone.price / 100).toFixed(2)}
                              </p>
                            ) : (
                              <p className="font-medium text-gray-900 text-sm">Free</p>
                            )}
                            <p className="text-xs text-gray-600">Entry Fee</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-gray-900 text-sm">
                              {zone.noOfMembers.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-600">Members</p>
                          </div>
                          <div className="text-center">
                            <p className="font-medium text-gray-900 text-sm">
                              {zone.isPaid ? 'Premium' : 'Free'}
                            </p>
                            <p className="text-xs text-gray-600">Access</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleZoneClick(zone)}
                          className="w-full bg-[#454545] hover:bg-gray-900 text-white px-4 py-2 rounded-md text-center block transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {zones.length > 2 && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    {showAll ? "View Less" : `View All (${zones.length})`}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <AlertDialogTitle className="text-center text-xl">
              Are you sure you want to join{" "}
              <span className="text-blue-600">{selectedZone?.zoneName}</span> for
              free?
            </AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              Confirm joining {selectedZone?.zoneName} zone for free
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-3 sm:flex-col">
            <Button
              onClick={() => {
                if (selectedZone) {
                  handleProceedToZone(selectedZone);
                  setIsModalOpen(false);
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              Proceed to Zone
            </Button>
            <Button
              onClick={() => setIsModalOpen(false)}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}