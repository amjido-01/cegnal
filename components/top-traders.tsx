import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useState } from "react";
import { TopTradersSkeleton } from "./top-traders-skeleton";
import { useAnalyst } from "@/hooks/use-analyst";
import { useQueryClient } from "@tanstack/react-query";
import { analystKeys } from "@/hooks/use-analyst";

export function TopTraders() {
  const queryClient = useQueryClient();
  const { topAnalysts, isFetchingTopAnalysts, topAnalystsError } = useAnalyst();
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

  // Prefetch analyst data on hover
  const prefetchAnalyst = (analystId: string) => {
    queryClient.prefetchQuery({
      queryKey: analystKeys.analyst(analystId),
      queryFn: async () => {
        const { data } = await import("@/lib/axios").then((mod) =>
          mod.default.get(`/user/analyst/${analystId}`)
        );
        if (data?.responseSuccessful) {
          return data.responseBody;
        }
        throw new Error(data?.responseMessage || "Failed to fetch analyst");
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  if (isFetchingTopAnalysts) return <TopTradersSkeleton />;

  if (topAnalystsError) {
    return (
      <div className="px-4 mb-4 pb-4">
        <div className="flex items-center justify-between my-4">
          <h3 className="text-[20px] font-medium text-[#151515]">Top Traders</h3>
        </div>
        <div className="text-center py-8 text-red-500">
          <p className="text-sm">Error loading traders. Please try again.</p>
        </div>
      </div>
    );
  }

  if (!topAnalysts || topAnalysts.length === 0) {
    return (
      <div className="px-4 mb-4 pb-4">
        <div className="flex items-center justify-between my-4">
          <h3 className="text-[20px] font-medium text-[#151515]">Top Traders</h3>
        </div>
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No traders available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mb-4 pb-4">
      <div className="flex items-center justify-between my-4 leading-[100%] tracking-[-2.8%]">
        <h3 className="text-[20px] font-medium text-[#151515]">Top Traders</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {topAnalysts.slice(0, visibleCount).map((analyst) => (
          <Link
            key={analyst._id}
            href={`/trader/${encodeURIComponent(analyst._id)}`}
            className="block"
            onMouseEnter={() => prefetchAnalyst(analyst._id)}
            onTouchStart={() => prefetchAnalyst(analyst._id)}
          >
            <Card className="text-center py-[12px] shadow-none border hover:border-blue-200 transition-colors">
              <CardContent className="p-[12px]">
                <Avatar className="w-12 h-12 mx-auto mb-3">
                  <AvatarImage
                    src="/user.jpg"
                    alt={analyst.username}
                  />
                  <AvatarFallback className="text-sm font-medium">
                    {analyst.firstName?.[0]?.toUpperCase() || 
                     analyst.username?.[0]?.toUpperCase() || 
                     analyst.email?.[0]?.toUpperCase() || 
                     "?"}
                  </AvatarFallback>
                </Avatar>
                <h4 className="font-medium text-sm text-gray-900 mb-1 truncate">
                  {analyst.username}
                </h4>
                <div className="flex justify-center gap-0.5">{renderStars(4)}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {/* View More Button */}
      {visibleCount < topAnalysts.length && (
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
  );
}