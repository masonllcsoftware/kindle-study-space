import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { CategoryCard } from "@/components/CategoryCard";
import { StatsCard } from "@/components/StatsCard";
import { Code, Palette, Briefcase, TrendingUp, BookOpen, Users, Award, Target } from "lucide-react";
import { useCourses } from "@/hooks/useCourses";
import { useCategories } from "@/hooks/useCategories";
import { usePlatformStats } from "@/hooks/usePlatformStats";
import heroImage from "@/assets/hero-learning.jpg";
import { Skeleton } from "@/components/ui/skeleton";

const iconMap: Record<string, any> = {
  Code,
  Palette,
  Briefcase,
  TrendingUp,
  BookOpen,
  Users,
  Award,
  Target,
};

const Index = () => {
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: courses, isLoading: coursesLoading } = useCourses();
  const { data: stats, isLoading: statsLoading } = usePlatformStats();

  return (
    <div className="min-h-screen bg-[var(--gradient-hero)]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                🚀 Start Learning Today
              </span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Unlock Your
              <span className="block bg-gradient-to-r from-primary via-[hsl(var(--primary-glow))] to-accent bg-clip-text text-transparent">
                Potential
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Join thousands of learners mastering new skills. Learn at your own pace with expert-led courses.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-to-r from-primary to-[hsl(var(--primary-glow))] hover:opacity-90 transition-opacity text-lg px-8">
                Explore Courses
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 border-2 hover:border-primary hover:text-primary">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl rounded-full"></div>
            <img 
              src={heroImage} 
              alt="Students learning together" 
              className="relative rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))}
            </>
          ) : (
            stats?.map((stat) => {
              const IconComponent = iconMap[stat.metric_icon];
              return (
                <StatsCard
                  key={stat.id}
                  title={stat.metric_name}
                  value={stat.metric_value}
                  icon={IconComponent}
                  trend={stat.trend || undefined}
                />
              );
            })
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Explore Categories</h2>
          <p className="text-xl text-muted-foreground">Find the perfect course for your learning journey</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-48 w-full" />
              ))}
            </>
          ) : (
            categories?.map((category) => {
              const IconComponent = iconMap[category.icon_name];
              return (
                <CategoryCard
                  key={category.id}
                  title={category.title}
                  icon={IconComponent}
                  courseCount={category.course_count}
                  color={category.color_class}
                />
              );
            })
          )}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container mx-auto px-4 py-20 bg-background/50 rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
          <p className="text-xl text-muted-foreground">Start with our most popular courses</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coursesLoading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-96 w-full" />
              ))}
            </>
          ) : (
            courses?.slice(0, 3).map((course) => (
              <CourseCard
                key={course.id}
                title={course.title}
                description={course.description}
                image={course.image_url}
                duration={course.duration}
                students={course.student_count}
                level={course.level}
              />
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 opacity-90">Join our community and transform your career today</p>
          <Button size="lg" variant="secondary" className="text-lg px-8 bg-white text-primary hover:bg-white/90">
            Get Started Free
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
