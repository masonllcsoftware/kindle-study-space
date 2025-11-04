import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  title: string;
  icon: LucideIcon;
  courseCount: number;
  color: string;
}

export const CategoryCard = ({ title, icon: Icon, courseCount, color }: CategoryCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] cursor-pointer border-border/50 hover:border-primary/30">
      <CardContent className="p-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`p-4 rounded-2xl ${color} transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="h-8 w-8 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground">{courseCount} courses</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
