"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signalZones, type SignalZone } from "@/lib/signal-zone"; // ✅ import type
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

const tabs = ["All", "My Zones"];

export default function ZonesTabs() {
  const router = useRouter();

const handleZoneClick = (zone: SignalZone) => {
  router.push(`/chat/${zone.id}`);
};

const myZones = signalZones.filter((zone) => zone.buttonText === "View Zone")

  return (
    <div className="px-4 mb-6 bg-gray-100 min-h-screen">
      <Tabs defaultValue="All" className="bgwhite">
        <TabsList className="p-1 w-full bgwhite">
          {tabs.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* All Zones */}
        <TabsContent value="All" className="w-full">
          <div className="px4 pb-20">
            <div className="grid grid-cols-2 gap-3">
              {signalZones.map((zone) => (
                <Card
                  key={zone.id}
                  className="p-4 border-none shadow-none border-gray-200 rounded-lg"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-3">
                      <Image
                        src={zone.avatar || "/placeholder.svg"}
                        alt={zone.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{zone.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{zone.status}</p>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {zone.description}
                    </p>
                    <Button
                      onClick={() => handleZoneClick(zone)}
                      variant={zone.buttonVariant}
                      size="sm"
                      className={`w-full text-xs py-2 ${
                        zone.buttonVariant === "default"
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {zone.buttonText}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* My Zones */}
        <TabsContent value="My Zones" className="mt-6">
           <div className="px4 pb-20">
            <div className="grid grid-cols-2 gap-3">
              {myZones.map((zone) => (
                <Card
                  key={zone.id}
                  className="p-4 border-none shadow-none border-gray-200 rounded-lg"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full overflow-hidden mb-3">
                      <Image
                        src={zone.avatar || "/placeholder.svg"}
                        alt={zone.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{zone.name}</h3>
                    <p className="text-xs text-gray-500 mb-3">{zone.status}</p>
                    <p className="text-xs text-gray-600 leading-relaxed mb-4 line-clamp-3">
                      {zone.description}
                    </p>
                    <Button
                      onClick={() => handleZoneClick(zone)}
                      variant={zone.buttonVariant}
                      size="sm"
                      className={`w-full text-xs py-2 ${
                        zone.buttonVariant === "default"
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {zone.buttonText}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
