"use client";

import { useParams, useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Star } from "lucide-react";
import { useTopTraders } from "@/hooks/use-trader";
import { notFound } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

const fakeSignals = [
  {
    id: "68d689cbb20bd1d58852f76a",
    zoneName: "EUR/USD Pro Signals",
    avatarUrl: "/trader-avatar.jpg",
    isPaid: false,
    price: 25,
    noOfMembers: 1250,
    winRate: 85,
  },
  {
    id: "68d689cbb20bd1d58852f76b",
    zoneName: "GBP/JPY Master Zone",
    avatarUrl: "/trader-avatar-purple.jpg",
    isPaid: true,
    price: 35,
    noOfMembers: 890,
    winRate: 78,
  },
  {
    id: "signal-3",
    zoneName: "Crypto Swing Trades",
    avatarUrl: "/trader-avatar-male.jpg",
    isPaid: false,
    price: 0,
    noOfMembers: 2100,
    winRate: 72,
  },
  {
    id: "signal-4",
    zoneName: "Gold Trading Signals",
    avatarUrl: "/female-trader-avatar.jpg",
    isPaid: true,
    price: 45,
    noOfMembers: 650,
    winRate: 88,
  },
  {
    id: "signal-5",
    zoneName: "Scalping Zone Premium",
    avatarUrl: "/trader-avatar.jpg",
    isPaid: true,
    price: 60,
    noOfMembers: 420,
    winRate: 82,
  },
];

export default function TopTraderPage() {
  const params = useParams();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedZone, setSelectedZone] = useState<any>(null);
  const [showAll, setShowAll] = useState(false);

  const traderId = params?.id;

  const { topTraders, topTradersError, isFetchingTopTraders } = useTopTraders();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleZoneClick = (zone: any) => {
    if (zone.isPaid) {
      router.push(`/payment/${zone.id}`);
    } else {
      setSelectedZone(zone);
      console.log("Selected Zone:", zone);
      setIsModalOpen(true);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleProceedToZone = (zone: any) => {
    router.push(`/zone/${zone.id}`);
  };

  if (!traderId) {
    notFound();
  }

  if (isFetchingTopTraders) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (topTradersError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center text-red-500">
          <p className="text-xl mb-2">⚠️ Error loading trader</p>
          <p className="text-sm text-gray-600">
            Please try refreshing the page
          </p>
        </div>
      </div>
    );
  }

  const trader = topTraders?.find((t) => t._id === traderId);

  if (!trader) {
    notFound();
  }

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

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-white px-4 py-4 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold">Zones</h1>
      </div>

      <div className="px-4 pb-6">
        <div className="text-center mb-8">
          <Avatar className="w-24 h-24 mx-auto mb-4">
            <AvatarImage src={trader.image || "/placeholder.svg"} />
            <AvatarFallback className="text-xl font-semibold">
              {trader.email[0]}
            </AvatarFallback>
          </Avatar>

          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {trader.username}
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed px-4">
            Lorem ipsum dolor sit amet consectetur. Nec volutpat nunc lectus
            vivamus dolor. Dolor ultrices lacus Lorem ipsum dolor sit amet
            consectetur
          </p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Status</span>
            <span className="text-green-500 font-medium">Verified</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Win Rate</span>
            <span className="text-gray-900 font-medium">80%</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Loss Rate</span>
            <span className="text-gray-900 font-medium">25%</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Ratings</span>
            <div className="flex gap-0.5">{renderStars(4)}</div>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-gray-100">
            <span className="text-gray-600">Market Type</span>
            <span className="text-gray-900 font-medium">Spot</span>
          </div>
        </div>

       <div className="mb-8">
  <h3 className="text-lg font-semibold text-gray-900 mb-4">
    Trading Signals
  </h3>

  <div className="space-y-4">
    {(showAll ? fakeSignals : fakeSignals.slice(0, 2)).map((zone, idx) => (
      <Card key={idx} className="bg-white py-1 shadow-none">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={zone.avatarUrl || "/placeholder.svg"} />
                <AvatarFallback>{zone.zoneName[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium text-gray-900">
                {zone.zoneName}
              </span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">1000 Reviews</p>
              <div className="flex gap-0.5 mt-1">{renderStars(5)}</div>
            </div>
          </div>

          <div className="bg-[#E7E7E7] rounded-[8px] p-2">
            <div className="grid grid-cols-3 gap-4 mb-4 p-3 divide-x divide-[#D1D1D1]">
              <div className="text-center">
                {zone.isPaid ? (
                  <p className="font-medium text-gray-900 text-sm">
                    ${zone.price}
                  </p>
                ) : (
                  <p className="font-medium text-gray-900 text-sm">Free</p>
                )}
                <p className="text-xs text-gray-600">Entry Fee</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-900 text-sm">
                  {zone.noOfMembers}
                </p>
                <p className="text-xs text-gray-600">Subscribers</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-gray-900 text-sm">
                  {zone.winRate}%
                </p>
                <p className="text-xs text-gray-600">Win Rates</p>
              </div>
            </div>

            <button
              onClick={() => handleZoneClick(zone)}
              className="w-full bg-[#454545] hover:bg-gray-900 text-white px-4 py-2 rounded-md text-center block"
            >
              View Details
            </button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>

  {fakeSignals.length > 2 && (
    <div className="text-center mt-4">
      <button
        onClick={() => setShowAll(!showAll)}
        className="text-blue-600 font-medium hover:underline"
      >
        {showAll ? "View Less" : "View More"}
      </button>
    </div>
  )}
</div>

      </div>

      {/* ✅ Confirmation Modal */}
      {/* {isModalOpen && selectedZone && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-50">
          <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Image
                  src="/success.svg"
                  alt="success"
                  width={40}
                  height={40}
                />
              </div>
            </div>

            <h2 className="text-xl font-bold mb-4 text-[#151515]">
              Are you sure you want to join{" "}
              <span className="text-blue-600">{selectedZone.zoneName}</span> for
              free?
            </h2>

            <div className="flex flex-col gap-3">
              <Button
                onClick={() => handleProceedToZone(selectedZone)}
                className="w-full text-white py-3 text-lg font-medium rounded-lg bg-[#2E5DFC] hover:bg-blue-700"
              >
                Proceed to Zone
              </Button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full py-3 text-lg font-medium rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )} */}
         <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <AlertDialogTitle className="text-center text-xl">
              Are you sure you want to join <span className="text-blue-600">{selectedZone?.zoneName}</span> for free?
            </AlertDialogTitle>
            <AlertDialogDescription className="sr-only">
              Confirm joining {selectedZone?.zoneName} zone for free
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-3 sm:flex-col">
            <Button
              onClick={() => {
                if (selectedZone) {
                  handleProceedToZone(selectedZone)
                  setIsModalOpen(false)
                }
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="lg"
            >
              Proceed to Zone
            </Button>
            <Button onClick={() => setIsModalOpen(false)} variant="outline" className="w-full" size="lg">
              Cancel
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
