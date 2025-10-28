import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ApiResponse, Zone } from "@/types";

// ==================== QUERY KEYS ====================
export const zoneKeys = {
  all: ["zones"] as const,
  list: () => [...zoneKeys.all, "list"] as const,
  detail: (id: string) => [...zoneKeys.all, "detail", id] as const,
  allZones: () => [...zoneKeys.all, "all"] as const,
  myZones: () => [...zoneKeys.all, "my"] as const,
};

// ==================== TYPES ====================
export interface JoinZoneResponse {
  responseSuccessful: boolean;
  responseMessage: string;
  responseBody: null;
}

export interface JoinZoneError {
  isPaid: boolean;
  message: string;
}

// ==================== API CALLS ====================
const getZones = async (filter?: "all"): Promise<Zone[]> => {
  const endpoint = "/user/zones";
  const { data } = await api.get<ApiResponse<Zone[]>>(endpoint, {
    params: filter === "all" ? { filter } : undefined,
  });

  if (data?.responseSuccessful) return data.responseBody;
  throw new Error(data?.responseMessage || "Failed to fetch zones");
};

const getSingleZone = async (zoneId: string): Promise<Zone> => {
  const { data } = await api.get<ApiResponse<Zone>>(`/zones/${zoneId}`);
  if (data?.responseSuccessful) return data.responseBody;
  throw new Error(data?.responseMessage || "Failed to fetch zone");
};

const joinZone = async (zoneId: string): Promise<JoinZoneResponse> => {
  const { data } = await api.post<JoinZoneResponse>("/chat/join/zone", { zoneId });
  return data;
};

// ==================== HOOKS ====================

/**
 * Fetch all zones or user zones
 * @param filter optional filter "all" | undefined
 */
export const useZones = (filter?: "all") => {
  const allZonesQuery = useQuery({
    queryKey: zoneKeys.allZones(),
    queryFn: () => getZones("all"),
    enabled: filter === "all",
  });

  const myZonesQuery = useQuery({
    queryKey: zoneKeys.myZones(),
    queryFn: () => getZones(),
    enabled: filter !== "all",
  });

  return {
    allZones: allZonesQuery.data,
    isFetchingAllZones: allZonesQuery.isLoading,
    allZonesError: allZonesQuery.error,
    refetchAllZones: allZonesQuery.refetch,

    myZones: myZonesQuery.data,
    isFetchingMyZones: myZonesQuery.isLoading,
    myZonesError: myZonesQuery.error,
    refetchMyZones: myZonesQuery.refetch,
  };
};

/**
 * Fetch single zone by ID
 */
export const useZone = (zoneId: string | undefined) => {
  const zoneQuery = useQuery({
    queryKey: zoneKeys.detail(zoneId ?? ""),
    queryFn: () => getSingleZone(zoneId!),
    enabled: !!zoneId,
  });

  return {
    zone: zoneQuery.data,
    isFetchingZone: zoneQuery.isLoading,
    zoneError: zoneQuery.error,
    refetchZone: zoneQuery.refetch,
  };
};

/**
 * Join a zone mutation
 */
export const useJoinZone = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinZone,
    onSuccess: (data) => {
      if (data.responseSuccessful) {
        queryClient.invalidateQueries({ queryKey: zoneKeys.all });
      }
    },
    onError: (error) => {
      console.error("Join zone error:", error);
    },
  });
};
