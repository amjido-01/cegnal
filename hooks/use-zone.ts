import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ApiResponse, Zone } from "@/types";

// ============= QUERY KEYS =============
export const zoneKeys = {
  all: ["zones"] as const,
  lists: () => [...zoneKeys.all, "list"] as const,
  list: (filters?: string) => [...zoneKeys.lists(), filters] as const,
  details: () => [...zoneKeys.all, "detail"] as const,
  detail: (id: string) => [...zoneKeys.details(), id] as const,
};

// ============= API FUNCTIONS =============
const fetchZones = async (): Promise<Zone[]> => {
  const { data } = await api.get<ApiResponse<Zone[]>>("/user/zones");
  
  if (data?.responseSuccessful) {
    return data.responseBody;
  }
  
  throw new Error(data?.responseMessage || "Failed to fetch zones");
};

const fetchSingleZone = async (zoneId: string): Promise<Zone> => {
  const { data } = await api.get<ApiResponse<Zone>>(`/zones/${zoneId}`);
  
  if (data?.responseSuccessful) {
    return data.responseBody;
  }
  
  throw new Error(data?.responseMessage || "Failed to fetch zone");
};

// ============= HOOKS =============

/**
 * Hook to fetch all zones with optimized caching
 */
export const useZones = () => {
  const zonesQuery = useQuery({
    queryKey: zoneKeys.lists(),
    queryFn: fetchZones,
    staleTime: 5 * 60 * 1000, // ✅ Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // ✅ Keep in cache for 10 minutes
    refetchOnWindowFocus: false, // ✅ Don't refetch when user returns to tab
    refetchOnMount: false, // ✅ Don't refetch if data is fresh
    retry: 2, // ✅ Retry failed requests twice
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // ✅ Exponential backoff
  });

  return {
    zones: zonesQuery.data,
    isFetchingZones: zonesQuery.isLoading,
    isRefetchingZones: zonesQuery.isFetching && !zonesQuery.isLoading,
    zonesError: zonesQuery.error,
    refetchZones: zonesQuery.refetch,
    isStale: zonesQuery.isStale,
  };
};

/**
 * Hook to fetch a single zone by ID with intelligent caching
 * Falls back to cache from useZones if available
 */
export const useZone = (zoneId: string | undefined) => {
  const queryClient = useQueryClient();

  const zoneQuery = useQuery({
    queryKey: zoneKeys.detail(zoneId!),
    queryFn: async () => {
      // ✅ OPTIMIZATION: Check if zone exists in zones list cache first
      const cachedZones = queryClient.getQueryData<Zone[]>(zoneKeys.lists());

      if (cachedZones) {
        const cachedZone = cachedZones.find((z) => z.id === zoneId);
        if (cachedZone) {
          // Return cached data immediately
          return cachedZone;
        }
      }

      // If not in cache, fetch from API
      return fetchSingleZone(zoneId!);
    },
    enabled: !!zoneId, // ✅ Only run query if zoneId exists
    staleTime: 5 * 60 * 1000, // ✅ 5 minutes
    gcTime: 10 * 60 * 1000, // ✅ 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    placeholderData: () => {
      // ✅ OPTIMIZATION: Use placeholder data from zones cache while fetching
      const cachedZones = queryClient.getQueryData<Zone[]>(zoneKeys.lists());
      return cachedZones?.find((z) => z.id === zoneId);
    },
  });

  return {
    zone: zoneQuery.data,
    isFetchingZone: zoneQuery.isLoading,
    isRefetchingZone: zoneQuery.isFetching && !zoneQuery.isLoading,
    zoneError: zoneQuery.error,
    refetchZone: zoneQuery.refetch,
    isStale: zoneQuery.isStale,
  };
};

/**
 * Hook to prefetch a zone's data (useful for hover/link previews)
 */
export const usePrefetchZone = () => {
  const queryClient = useQueryClient();

  return {
    prefetchZone: (zoneId: string) => {
      queryClient.prefetchQuery({
        queryKey: zoneKeys.detail(zoneId),
        queryFn: async () => {
          // Check cache first
          const cachedZones = queryClient.getQueryData<Zone[]>(zoneKeys.lists());
          
          const cachedZone = cachedZones?.find((z) => z.id === zoneId);
          if (cachedZone) return cachedZone;
          
          return fetchSingleZone(zoneId);
        },
        staleTime: 5 * 60 * 1000,
      });
    },
  };
};

/**
 * Utility hook to manually set zone data in cache
 * Useful after mutations or when navigating with known data
 */
export const useSetZoneCache = () => {
  const queryClient = useQueryClient();

  return {
    setZoneInCache: (zone: Zone) => {
      queryClient.setQueryData(zoneKeys.detail(zone.id), zone);
    },
    updateZoneInCache: (zoneId: string, updater: (old: Zone | undefined) => Zone) => {
      queryClient.setQueryData(zoneKeys.detail(zoneId), updater);
    },
    invalidateZone: (zoneId: string) => {
      queryClient.invalidateQueries({ queryKey: zoneKeys.detail(zoneId) });
    },
    invalidateAllZones: () => {
      queryClient.invalidateQueries({ queryKey: zoneKeys.all });
    },
  };
};