import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Category {
  id: string;
  title: string;
  icon_name: string;
  course_count: number;
  color_class: string;
}

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("course_count", { ascending: false });

      if (error) throw error;
      return data as Category[];
    },
  });
};
