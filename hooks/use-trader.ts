import { useQuery } from "@tanstack/react-query";
// import { toast } from "sonner";
import api from "@/lib/axios";
import { ApiResponse } from "@/types";

// Top Trader Type
export interface TopTrader {
  _id: string;
  email: string;
  image?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  isOnline: boolean;
  password: string;
  phone: string;
  role: "ANALYST" | "TRADER" | string;
  username: string;
  __v: number;
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
        "/user/top-traders"
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
