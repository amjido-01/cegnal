"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, CircleDollarSign } from "lucide-react";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { traders } from "@/lib/trader";
import { zones } from "@/lib/zones";
import Link from "next/link";

export function TradingDashboard() {
  const tabs = ["All", "Zones", "Top-rated"];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };


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
              {/* Subscription Section */}
              <div className="">
                <Card className="bg-white py-2 shadow-none">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 border-[1.5px] border-[#D1D1D1] flex items-center justify-center text-[#151515] font-medium text-[16px] leading-[100%] tracking-[-2.8%] rounded-[8px]">
                        <CircleDollarSign className=" text-[#151515]" />
                      </div>
                      <span className="">Upcoming subscription</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-medium text-[#000000] text-[18px] leading-[100%] tracking-[-2.8%] ">
                          1 Payment Due
                        </p>
                      </div>
                      <Button className="bg-[#2E5DFC] hover:bg-blue-700 font-medium text-[16px] leading-[100%] tracking-[-2.8%] text-white px-4 py-1.5 text-sm rounded-[12px]">
                        Subscribe
                      </Button>
                    </div>

                    <div className="border-t border-gray-200 my-3"></div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-7 h-7">
                          <AvatarImage src="/abstract-geometric-pattern.png" />
                          <AvatarFallback className="text-xs">K</AvatarFallback>
                        </Avatar>
                        <span className="text-[#888888] text-[18px] leading-[100%] tracking-[-2.8%]">
                          Katforex
                        </span>
                      </div>
                      <span className="font-medium text-[#888888] text-[16px] leading-[100%] tracking-[-2.8%]">
                        $50
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Traders */}
              <div className="px4 mb-4 pb-4">
                <div className="flex items-center justify-between mb-4 leading-[100%] tracking-[-2.8%]">
                  <h3 className="text-[20px] font-medium text-[#151515]">
                    Top Traders
                  </h3>
                  <Button
                    variant="ghost"
                    className="text-[#5B8BFF] text-[16px] hover:text-blue-700 p-0"
                  >
                    View all
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {traders.map((trader) => (
                    <Card
                      key={trader.id}
                      className="textcenter py-[12px] shadow-none border"
                    >
                      <CardContent className="p-[12px]">
                        <Avatar className="w-12 h-12 mxauto mb-3">
                          <AvatarImage
                            src={trader.avatar || "/placeholder.svg"}
                          />
                          <AvatarFallback>{trader.name[0]}</AvatarFallback>
                        </Avatar>
                        <h4 className="font-medium text-sm text-gray-900 mb-1">
                          {trader.name}
                        </h4>
                        <p className="text-sm font-medium leading-[100%] text-[#454545] mb-2">
                          {trader.earnings}
                        </p>
                        <div className="flex justify-center gap-0.5">
                          {renderStars(trader.rating)}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="Zones" className="mt-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Signal Zones
                  </h3>
                </div>

                <div className="space-y-4">
                  {zones.map((zone, idx) => (
                    <Card key={idx} className="bg-white py-1 shadow-none">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={zone.avatar} />
                              <AvatarFallback>{zone.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-gray-900">
                              {zone.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">
                              {zone.reviews} Reviews
                            </p>
                            <div className="flex gap-0.5 mt-1">
                              {renderStars(zone.stars)}
                            </div>
                          </div>
                        </div>

                        <div className="bg-[#E7E7E7] rounded-[8px] p-2">
                          <div className="grid grid-cols-3 gap-4 mb-4 p-3 divide-x divide-[#D1D1D1]">
                            <div className="text-center">
                              <p className="font-medium text-gray-900 text-sm">
                                {zone.entryFee}
                              </p>
                              <p className="text-xs text-gray-600">Entry Fee</p>
                            </div>
                            <div className="text-center">
                              <p className="font-medium text-gray-900 text-sm">
                                {zone.subscribers}
                              </p>
                              <p className="text-xs text-gray-600">
                                Subscribers
                              </p>
                            </div>
                            <div className="text-center">
                              <p className="font-medium text-gray-900 text-sm">
                                {zone.winRate}
                              </p>
                              <p className="text-xs text-gray-600">Win Rates</p>
                            </div>
                          </div>

                          <Link
                            href={`/zone/${zone.id}`}
                            className="w-full bg-[#454545] hover:bg-gray-900 text-white px-4 py-2 rounded-md text-center block"
                          >
                            View Details
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
