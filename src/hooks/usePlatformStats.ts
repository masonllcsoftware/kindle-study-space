import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface PlatformStat {
  id: string;
  metric_name: string;
  metric_value: string;
  metric_icon: string;
  trend: string | null;
}

export const usePlatformStats = () => {
  return useQuery({
    queryKey: ["platform-stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platform_stats")
        .select("*");

      if (error) throw error;
      return data as PlatformStat[];
    },
  });
};
