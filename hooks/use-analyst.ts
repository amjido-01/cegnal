import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "@/lib/axios";
import { ApiResponse, Analyst, Zone } from "@/types";

// Query Keys
export const analystKeys = {
  all: ["analysts"] as const,
  topAnalysts: () => [...analystKeys.all, "top"] as const,
  analyst: (id: string) => [...analystKeys.all, "detail", id] as const,
};

export const useAnalyst = () => {
  const queryClient = useQueryClient();

  // ✅ Fetch Top Analysts
  const topAnalystsQuery = useQuery({
    queryKey: analystKeys.topAnalysts(),
    queryFn: async (): Promise<Analyst[]> => {
      const { data } = await api.get<ApiResponse<Analyst[]>>("/user/top-analyst");
      console.log("Fetched top analysts:", data);
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to fetch top analysts");
    },
  });

  return {
    // 🔹 Top Analysts
    topAnalysts: topAnalystsQuery.data,
    isFetchingTopAnalysts: topAnalystsQuery.isLoading,
    topAnalystsError: topAnalystsQuery.error,
    refetchTopAnalysts: topAnalystsQuery.refetch,
  };
};

// ✅ Separate hook for fetching a single analyst by ID
// In your use-analyst.ts file
export const useAnalystById = (id: string) => {
  return useQuery({
    queryKey: analystKeys.analyst(id),
    queryFn: async (): Promise<{ analyst: Analyst; zones: Zone[] }> => {
      const { data } = await api.get<ApiResponse<{ analyst: Analyst; zones: Zone[] }>>(
        `/user/analyst/${id}` // Update with your actual endpoint
      );
      if (data?.responseSuccessful) {
        return data.responseBody;
      }
      throw new Error(data?.responseMessage || "Failed to fetch analyst details");
    },
    enabled: !!id,
  });
};