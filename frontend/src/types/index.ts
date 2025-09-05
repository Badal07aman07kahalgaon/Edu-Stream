export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  color: string;
  created_at?: string;
  updated_at?: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  instructor_id: number;
  category_id: number;
  is_published: boolean;
  duration: number;
  difficulty_level: 'beginner' | 'intermediate' | 'advanced';
  created_at?: string;
  updated_at?: string;
  instructor?: User;
  category?: Category;
  lessons?: Lesson[];
}

export interface Lesson {
  id: number;
  title: string;
  description?: string;
  video_url?: string;
  duration: number;
  course_id: number;
  order: number;
  is_free: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Enrollment {
  id: number;
  user_id: number;
  course_id: number;
  enrolled_at: string;
  completed_at?: string;
  created_at?: string;
  updated_at?: string;
  course?: Course;
}

export interface CartItem {
  id: number;
  user_id: number;
  course_id: number;
  created_at?: string;
  updated_at?: string;
  course?: Course;
}

export interface ChatMessage {
  id: number;
  user_id: number;
  message: string;
  created_at?: string;
  updated_at?: string;
  user?: User;
}

export interface DashboardStats {
  total_courses: number;
  enrolled_courses: number;
  completed_lessons: number;
  total_lessons: number;
  completion_percentage: number;
}

export interface ProgressItem {
  id: number;
  title: string;
  thumbnail?: string;
  completed_lessons: number;
  total_lessons: number;
}
