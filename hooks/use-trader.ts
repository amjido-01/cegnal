import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ApiResponse } from "@/types";

// ============= TYPES =============
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

export interface TopTradersResponse {
  topTraders: TopTrader[];
}

// ============= QUERY KEYS =============
export const traderKeys = {
  all: ["traders"] as const,
  topTraders: () => [...traderKeys.all, "top"] as const,
  trader: (id: string) => [...traderKeys.all, "detail", id] as const,
};

// ============= API FUNCTIONS =============
const fetchTopTraders = async (): Promise<TopTrader[]> => {
  const { data } = await api.get<ApiResponse<TopTrader[]>>("/user/top-traders");
  
  if (data?.responseSuccessful) {
    return data.responseBody;
  }
  
  throw new Error(data?.responseMessage || "Failed to fetch top traders");
};

const fetchSingleTrader = async (traderId: string): Promise<TopTrader> => {
  const { data } = await api.get<ApiResponse<TopTrader>>(
    `/user/traders/${traderId}`
  );
  console.log("Fetched trader:", data);
  if (data?.responseSuccessful) {
    return data.responseBody;
  }
  
  throw new Error(data?.responseMessage || "Failed to fetch trader");
};

// ============= HOOKS =============

/**
 * Hook to fetch all top traders with optimized caching
 */
export const useTopTraders = () => {
  const topTradersQuery = useQuery({
    queryKey: traderKeys.topTraders(),
    queryFn: fetchTopTraders,
    staleTime: 5 * 60 * 1000, // ✅ Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // ✅ Keep in cache for 10 minutes (formerly cacheTime)
    refetchOnWindowFocus: false, // ✅ Don't refetch when user returns to tab
    refetchOnMount: false, // ✅ Don't refetch if data is fresh
    retry: 2, // ✅ Retry failed requests twice
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // ✅ Exponential backoff
  });

  return {
    topTraders: topTradersQuery.data,
    isFetchingTopTraders: topTradersQuery.isLoading,
    isRefetchingTopTraders: topTradersQuery.isFetching && !topTradersQuery.isLoading,
    topTradersError: topTradersQuery.error,
    refetchTopTraders: topTradersQuery.refetch,
    isStale: topTradersQuery.isStale,
  };
};

/**
 * Hook to fetch a single trader by ID with intelligent caching
 * Falls back to cache from useTopTraders if available
 */
export const useTrader = (traderId: string | undefined) => {
  const queryClient = useQueryClient();

  const traderQuery = useQuery({
    queryKey: traderKeys.trader(traderId!),
    queryFn: async () => {
      // ✅ OPTIMIZATION: Check if trader exists in topTraders cache first
      const cachedTopTraders = queryClient.getQueryData<TopTrader[]>(
        traderKeys.topTraders()
      );

      if (cachedTopTraders) {
        const cachedTrader = cachedTopTraders.find((t) => t._id === traderId);
        if (cachedTrader) {
          // Return cached data immediately, optionally fetch fresh data in background
          return cachedTrader;
        }
      }

      // If not in cache, fetch from API
      return fetchSingleTrader(traderId!);
    },
    enabled: !!traderId, // ✅ Only run query if traderId exists
    staleTime: 5 * 60 * 1000, // ✅ 5 minutes
    gcTime: 10 * 60 * 1000, // ✅ 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    placeholderData: () => {
      // ✅ OPTIMIZATION: Use placeholder data from topTraders cache while fetching
      const cachedTopTraders = queryClient.getQueryData<TopTrader[]>(
        traderKeys.topTraders()
      );
      return cachedTopTraders?.find((t) => t._id === traderId);
    },
  });

  return {
    trader: traderQuery.data,
    isFetchingTrader: traderQuery.isLoading,
    isRefetchingTrader: traderQuery.isFetching && !traderQuery.isLoading,
    traderError: traderQuery.error,
    refetchTrader: traderQuery.refetch,
    isStale: traderQuery.isStale,
  };
};

/**
 * Hook to prefetch a trader's data (useful for hover/link previews)
 */
export const usePrefetchTrader = () => {
  const queryClient = useQueryClient();

  return {
    prefetchTrader: (traderId: string) => {
      queryClient.prefetchQuery({
        queryKey: traderKeys.trader(traderId),
        queryFn: async () => {
          // Check cache first
          const cachedTopTraders = queryClient.getQueryData<TopTrader[]>(
            traderKeys.topTraders()
          );
          
          const cachedTrader = cachedTopTraders?.find((t) => t._id === traderId);
          if (cachedTrader) return cachedTrader;
          
          return fetchSingleTrader(traderId);
        },
        staleTime: 5 * 60 * 1000,
      });
    },
  };
};

/**
 * Utility hook to manually set trader data in cache
 * Useful after mutations or when navigating with known data
 */
export const useSetTraderCache = () => {
  const queryClient = useQueryClient();

  return {
    setTraderInCache: (trader: TopTrader) => {
      queryClient.setQueryData(traderKeys.trader(trader._id), trader);
    },
    updateTraderInCache: (traderId: string, updater: (old: TopTrader | undefined) => TopTrader) => {
      queryClient.setQueryData(traderKeys.trader(traderId), updater);
    },
  };
};