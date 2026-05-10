export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  category_id: string | null;
  instructor_name: string | null;
  instructor_avatar: string | null;
  price: number | null;
  original_price: number | null;
  level: string | null;
  duration_hours: number | null;
  lessons_count: number | null;
  students_count: number | null;
  rating: number | null;
  reviews_count: number | null;
  is_featured: boolean | null;
  is_published: boolean | null;
  created_at: string | null;
  updated_at: string | null;
  parent_id?: string | null;
  sort_order?: number | null;
  children?: Course[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  parent_id: string | null;
  sort_order: number | null;
  created_at: string | null;
}

export interface Resource {
  id: string;
  title: string;
  description: string | null;
  category_id: string | null;
  file_url: string | null;
  file_size: number | null;
  file_type: string | null;
  cover_image: string | null;
  price: number | null;
  download_count: number | null;
  is_free: boolean | null;
  is_published: boolean | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface ResourceCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  sort_order: number | null;
  created_at: string | null;
}

export interface Chapter {
  id: string;
  course_id: string | null;
  title: string;
  description: string | null;
  sort_order: number | null;
  created_at: string | null;
  lessons?: Lesson[];
}

export interface Lesson {
  id: string;
  chapter_id: string | null;
  title: string;
  description: string | null;
  video_url: string | null;
  duration_minutes: number | null;
  is_free: boolean | null;
  sort_order: number | null;
  created_at: string | null;
}

export interface Review {
  id: string;
  user_id: string | null;
  course_id: string | null;
  rating: number | null;
  content: string | null;
  created_at: string | null;
  updated_at: string | null;
  profiles?: {
    username: string;
    avatar_url: string | null;
  };
}

export interface Profile {
  id: string;
  username: string;
  email: string | null;
  avatar_url: string | null;
  role: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface Membership {
  id: string;
  user_id: string | null;
  plan_type: string | null;
  start_date: string;
  end_date: string;
  is_active: boolean | null;
  created_at: string | null;
}

export interface Order {
  id: string;
  user_id: string | null;
  order_no: string;
  item_type: string | null;
  item_id: string | null;
  item_name: string | null;
  amount: number;
  status: string | null;
  payment_method: string | null;
  paid_at: string | null;
  created_at: string | null;
}

export interface UserCourse {
  id: string;
  user_id: string | null;
  course_id: string | null;
  progress: number | null;
  purchased_at: string | null;
  last_accessed_at: string | null;
}

export interface UserResource {
  id: string;
  user_id: string | null;
  resource_id: string | null;
  purchased_at: string | null;
}