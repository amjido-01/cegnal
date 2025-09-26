"use client";

import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopTraders } from "./top-traders";
import { Zones } from "./zones";

export function TradingDashboard() {
  const tabs = ["All", "Zones", "Top-rated"];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="">
        <div className="px-4 my-6">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src="/card.png"
              alt="Trading banner"
              width={400}
              height={160}
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="px-4 mb-6">
          <Tabs defaultValue="All" className="">
            <TabsList className="p-1 w-full">
              {tabs.map((tab) => (
                <TabsTrigger key={tab} value={tab}>
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="All" className="w-full">
             <TopTraders />
            </TabsContent>

            <TabsContent value="Zones" className="mt-6">
              <Zones />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
