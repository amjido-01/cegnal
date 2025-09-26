import { useQuery } from "@tanstack/react-query";
// import { toast } from "sonner";
import api from "@/lib/axios";
import { ApiResponse } from "@/types";

// Top Trader Type
export interface Zone {
  id: string;
  zoneName: string;
  description: string;
  avatarUrl: string;
  createdBy: string;
  noOfMembers: number;
  price: number;
}

// Response Type
export interface TopTradersResponse {
  zones: Zone[];
}

// Query Keys
export const zoneKeys = {
  all: ["zones"] as const,
  list: () => [...zoneKeys.all, "list"] as const,
};

export const useZones = () => {
  const zonesQuery = useQuery({
    queryKey: zoneKeys.list(),
    queryFn: async (): Promise<Zone[]> => {
      const { data } = await api.get<ApiResponse<Zone[]>>("/user/zones");
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to fetch zones");
    },
  });

  return {
    zones: zonesQuery.data,
    isFetchingZones: zonesQuery.isLoading,
    zonesError: zonesQuery.error,
    refetchZones: zonesQuery.refetch,
  };
};
