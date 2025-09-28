import { useTopTraders } from "@/hooks/use-trader";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";
import { TopTradersSkeleton } from "./top-traders-skeleton";

export function TopTraders() {
  const { topTraders, isFetchingTopTraders, topTradersError, refetchTopTraders } = useTopTraders()

    const [visibleCount, setVisibleCount] = useState(6);

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

    const handleViewMore = () => {
    setVisibleCount((prev) => prev + 3);
  };
  console.log(topTraders)

   if (isFetchingTopTraders) return <TopTradersSkeleton />; // skeleton
  if (topTradersError) return <div>Error loading products</div>;
  if (!topTraders || topTraders.length === 0) return <div>No products found</div>;

    return (
              <div className="px4 mb-4 pb-4">
                <div className="flex items-center justify-between my-4 leading-[100%] tracking-[-2.8%]">
                  <h3 className="text-[20px] font-medium text-[#151515]">
                    Top Traders
                  </h3>
                </div>

                 <div className="grid grid-cols-3 gap-3">
                    {topTraders.slice(0, visibleCount).map((trader, idx) => (
                        <Link
                      key={idx}
                      href={`/trader/${encodeURIComponent(trader._id)}`}
                      className="block"
                    >
                    <Card
                      key={idx}
                      className="textcenter py-[12px] shadow-none border"
                    >
                      <CardContent className="p-[12px]">
                        <Avatar className="w-12 h-12 mxauto mb-3">
                            <AvatarImage
                              src={trader.image || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {trader.email[0]}
                            </AvatarFallback>
                          </Avatar>
                        <h4 className="font-medium text-sm text-gray-900 mb-1">
                          {trader.username}
                        </h4>
                        {/* <p className="text-sm font-medium leading-[100%] text-[#454545] mb-2">
                          {trader.price}
                        </p> */}
                        <div className="flex justify-center gap-0.5">
                          {renderStars(3)}
                        </div>
                      </CardContent>
                    </Card>
                    </Link>
                  ))}
                </div>

                {/* View More Button */}
                {visibleCount < topTraders.length && (
                  <div className="flex justify-end mt-4">
                    <Button
                      onClick={handleViewMore}
                      variant="ghost"
                      className="text-[#5B8BFF] text-[16px] hover:text-blue-700 p-0"
                    >
                      View More
                    </Button>
                  </div>
                )}
              </div>
    )
}