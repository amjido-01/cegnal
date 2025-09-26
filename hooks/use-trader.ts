import { useQuery } from "@tanstack/react-query";
// import { toast } from "sonner";
import api from "@/lib/axios";
import { ApiResponse } from "@/types";

// Top Trader Type
export interface TopTrader {
  zoneName: string;
  description: string;
  avatarUrl: string;
  createdBy: string;
  noOfMembers: number;
  price: number;
}

// Response Type
export interface TopTradersResponse {
  topTraders: TopTrader[];
}

// Query Keys
export const traderKeys = {
  all: ["traders"] as const,
  topTraders: () => [...traderKeys.all, "top"] as const,
};

export const useTopTraders = () => {
  const topTradersQuery = useQuery({
    queryKey: traderKeys.topTraders(),
    queryFn: async (): Promise<TopTrader[]> => {
      const { data } = await api.get<ApiResponse<TopTrader[]>>(
        "/user/dashboard"
      );
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to fetch top traders");
    },
  });

  return {
    topTraders: topTradersQuery.data,
    isFetchingTopTraders: topTradersQuery.isLoading,
    topTradersError: topTradersQuery.error,
    refetchTopTraders: topTradersQuery.refetch,
  };
};
