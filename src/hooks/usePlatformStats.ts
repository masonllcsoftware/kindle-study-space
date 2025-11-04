import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export interface PlatformStat {
  id: string;
  metric_name: string;
  metric_value: string;
  metric_icon: string;
  trend: string | null;
}

export const usePlatformStats = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const channel = supabase
      .channel('platform-stats-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'platform_stats'
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["platform-stats"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [queryClient]);

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
