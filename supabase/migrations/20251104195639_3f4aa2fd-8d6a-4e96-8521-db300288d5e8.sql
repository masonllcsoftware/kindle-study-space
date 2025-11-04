-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  course_count INTEGER NOT NULL DEFAULT 0,
  color_class TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create courses table
CREATE TABLE public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  duration TEXT NOT NULL,
  student_count INTEGER NOT NULL DEFAULT 0,
  level TEXT NOT NULL CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')),
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create stats table for platform statistics
CREATE TABLE public.platform_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL UNIQUE,
  metric_value TEXT NOT NULL,
  metric_icon TEXT NOT NULL,
  trend TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (learning platform is publicly viewable)
CREATE POLICY "Categories are viewable by everyone"
  ON public.categories
  FOR SELECT
  USING (true);

CREATE POLICY "Courses are viewable by everyone"
  ON public.courses
  FOR SELECT
  USING (true);

CREATE POLICY "Platform stats are viewable by everyone"
  ON public.platform_stats
  FOR SELECT
  USING (true);

-- Insert initial categories
INSERT INTO public.categories (title, icon_name, course_count, color_class) VALUES
  ('Programming', 'Code', 245, 'bg-gradient-to-br from-primary to-[hsl(var(--primary-glow))]'),
  ('Design', 'Palette', 189, 'bg-gradient-to-br from-accent to-[hsl(35_95%_65%)]'),
  ('Business', 'Briefcase', 167, 'bg-gradient-to-br from-[hsl(220_75%_55%)] to-[hsl(220_85%_65%)]'),
  ('Marketing', 'TrendingUp', 134, 'bg-gradient-to-br from-[hsl(280_75%_55%)] to-[hsl(280_85%_65%)]');

-- Insert initial courses
INSERT INTO public.courses (title, description, image_url, duration, student_count, level, category_id) VALUES
  (
    'Full Stack Web Development',
    'Master modern web development with React, Node.js, and MongoDB. Build production-ready applications from scratch.',
    'src/assets/course-coding.jpg',
    '12 weeks',
    15420,
    'Intermediate',
    (SELECT id FROM public.categories WHERE title = 'Programming' LIMIT 1)
  ),
  (
    'UI/UX Design Masterclass',
    'Learn to create stunning user interfaces and experiences. From wireframes to high-fidelity prototypes.',
    'src/assets/course-design.jpg',
    '10 weeks',
    12350,
    'Beginner',
    (SELECT id FROM public.categories WHERE title = 'Design' LIMIT 1)
  ),
  (
    'Business Strategy & Growth',
    'Develop strategic thinking and learn proven frameworks to grow any business in competitive markets.',
    'src/assets/course-business.jpg',
    '8 weeks',
    9870,
    'Advanced',
    (SELECT id FROM public.categories WHERE title = 'Business' LIMIT 1)
  );

-- Insert platform stats
INSERT INTO public.platform_stats (metric_name, metric_value, metric_icon, trend) VALUES
  ('Active Students', '50K+', 'Users', '+12% this month'),
  ('Total Courses', '500+', 'BookOpen', '20 new this week'),
  ('Success Rate', '94%', 'Target', '+5% increase'),
  ('Certificates', '25K+', 'Award', 'Growing daily');

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add trigger to courses table
CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON public.courses
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();