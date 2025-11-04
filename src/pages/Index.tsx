import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/CourseCard";
import { CategoryCard } from "@/components/CategoryCard";
import { StatsCard } from "@/components/StatsCard";
import { BookOpen, Code, Palette, Briefcase, TrendingUp, Award, Target, Users } from "lucide-react";
import heroImage from "@/assets/hero-learning.jpg";
import codingImage from "@/assets/course-coding.jpg";
import designImage from "@/assets/course-design.jpg";
import businessImage from "@/assets/course-business.jpg";

const Index = () => {
  const categories = [
    { title: "Programming", icon: Code, courseCount: 245, color: "bg-gradient-to-br from-primary to-[hsl(var(--primary-glow))]" },
    { title: "Design", icon: Palette, courseCount: 189, color: "bg-gradient-to-br from-accent to-[hsl(35_95%_65%)]" },
    { title: "Business", icon: Briefcase, courseCount: 167, color: "bg-gradient-to-br from-[hsl(220_75%_55%)] to-[hsl(220_85%_65%)]" },
    { title: "Marketing", icon: TrendingUp, courseCount: 134, color: "bg-gradient-to-br from-[hsl(280_75%_55%)] to-[hsl(280_85%_65%)]" },
  ];

  const courses = [
    {
      title: "Full Stack Web Development",
      description: "Master modern web development with React, Node.js, and MongoDB. Build production-ready applications from scratch.",
      image: codingImage,
      duration: "12 weeks",
      students: 15420,
      level: "Intermediate"
    },
    {
      title: "UI/UX Design Masterclass",
      description: "Learn to create stunning user interfaces and experiences. From wireframes to high-fidelity prototypes.",
      image: designImage,
      duration: "10 weeks",
      students: 12350,
      level: "Beginner"
    },
    {
      title: "Business Strategy & Growth",
      description: "Develop strategic thinking and learn proven frameworks to grow any business in competitive markets.",
      image: businessImage,
      duration: "8 weeks",
      students: 9870,
      level: "Advanced"
    }
  ];

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
          <StatsCard title="Active Students" value="50K+" icon={Users} trend="+12% this month" />
          <StatsCard title="Total Courses" value="500+" icon={BookOpen} trend="20 new this week" />
          <StatsCard title="Success Rate" value="94%" icon={Target} trend="+5% increase" />
          <StatsCard title="Certificates" value="25K+" icon={Award} trend="Growing daily" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Explore Categories</h2>
          <p className="text-xl text-muted-foreground">Find the perfect course for your learning journey</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.title} {...category} />
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="container mx-auto px-4 py-20 bg-background/50 rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Courses</h2>
          <p className="text-xl text-muted-foreground">Start with our most popular courses</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.title} {...course} />
          ))}
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
