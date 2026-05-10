export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          id: string
          role: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      advertisements: {
        Row: {
          clicks: number | null
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          image_url: string
          impressions: number | null
          is_active: boolean | null
          link_url: string | null
          position: string | null
          priority: number | null
          start_date: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          clicks?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image_url: string
          impressions?: number | null
          is_active?: boolean | null
          link_url?: string | null
          position?: string | null
          priority?: number | null
          start_date?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          clicks?: number | null
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string
          impressions?: number | null
          is_active?: boolean | null
          link_url?: string | null
          position?: string | null
          priority?: number | null
          start_date?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      chapters: {
        Row: {
          course_id: string | null
          created_at: string | null
          description: string | null
          id: string
          sort_order: number | null
          title: string
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          sort_order?: number | null
          title: string
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          sort_order?: number | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "chapters_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          category_id: string | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          duration_hours: number | null
          id: string
          instructor_avatar: string | null
          instructor_name: string | null
          is_featured: boolean | null
          is_published: boolean | null
          lessons_count: number | null
          level: string | null
          original_price: number | null
          price: number | null
          rating: number | null
          reviews_count: number | null
          slug: string
          students_count: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          duration_hours?: number | null
          id?: string
          instructor_avatar?: string | null
          instructor_name?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          lessons_count?: number | null
          level?: string | null
          original_price?: number | null
          price?: number | null
          rating?: number | null
          reviews_count?: number | null
          slug: string
          students_count?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          duration_hours?: number | null
          id?: string
          instructor_avatar?: string | null
          instructor_name?: string | null
          is_featured?: boolean | null
          is_published?: boolean | null
          lessons_count?: number | null
          level?: string | null
          original_price?: number | null
          price?: number | null
          rating?: number | null
          reviews_count?: number | null
          slug?: string
          students_count?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          chapter_id: string | null
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          is_free: boolean | null
          sort_order: number | null
          title: string
          video_url: string | null
        }
        Insert: {
          chapter_id?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_free?: boolean | null
          sort_order?: number | null
          title: string
          video_url?: string | null
        }
        Update: {
          chapter_id?: string | null
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_free?: boolean | null
          sort_order?: number | null
          title?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_chapter_id_fkey"
            columns: ["chapter_id"]
            referencedRelation: "chapters"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          created_at: string | null
          end_date: string
          id: string
          is_active: boolean | null
          plan_type: string | null
          start_date: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_date: string
          id?: string
          is_active?: boolean | null
          plan_type?: string | null
          start_date: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string
          id?: string
          is_active?: boolean | null
          plan_type?: string | null
          start_date?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "memberships_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          item_id: string | null
          item_name: string | null
          item_type: string | null
          order_no: string
          paid_at: string | null
          payment_method: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          item_id?: string | null
          item_name?: string | null
          item_type?: string | null
          order_no: string
          paid_at?: string | null
          payment_method?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          item_id?: string | null
          item_name?: string | null
          item_type?: string | null
          order_no?: string
          paid_at?: string | null
          payment_method?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          id: string
          role: string | null
          updated_at: string | null
          username: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id: string
          role?: string | null
          updated_at?: string | null
          username: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          role?: string | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
      resource_categories: {
        Row: {
          created_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          sort_order?: number | null
        }
        Relationships: []
      }
      resources: {
        Row: {
          category_id: string | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          download_count: number | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          is_free: boolean | null
          is_published: boolean | null
          price: number | null
          title: string
          updated_at: string | null
        }
        Insert: {
          category_id?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_free?: boolean | null
          is_published?: boolean | null
          price?: number | null
          title: string
          updated_at?: string | null
        }
        Update: {
          category_id?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_free?: boolean | null
          is_published?: boolean | null
          price?: number | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "resource_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          content: string | null
          course_id: string | null
          created_at: string | null
          id: string
          rating: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          course_id?: string | null
          created_at?: string | null
          id?: string
          rating?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      sgcc_materials: {
        Row: {
          category: string | null
          cover_image: string | null
          created_at: string | null
          description: string | null
          download_count: number | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          is_featured: boolean | null
          is_free: boolean | null
          sort_order: number | null
          title: string
        }
        Insert: {
          category?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_free?: boolean | null
          sort_order?: number | null
          title: string
        }
        Update: {
          category?: string | null
          cover_image?: string | null
          created_at?: string | null
          description?: string | null
          download_count?: number | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_free?: boolean | null
          sort_order?: number | null
          title?: string
        }
        Relationships: []
      }
      user_courses: {
        Row: {
          course_id: string | null
          id: string
          last_accessed_at: string | null
          progress: number | null
          purchased_at: string | null
          user_id: string | null
        }
        Insert: {
          course_id?: string | null
          id?: string
          last_accessed_at?: string | null
          progress?: number | null
          purchased_at?: string | null
          user_id?: string | null
        }
        Update: {
          course_id?: string | null
          id?: string
          last_accessed_at?: string | null
          progress?: number | null
          purchased_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_courses_course_id_fkey"
            columns: ["course_id"]
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_courses_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_resources: {
        Row: {
          id: string
          purchased_at: string | null
          resource_id: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          purchased_at?: string | null
          resource_id?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          purchased_at?: string | null
          resource_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_resources_resource_id_fkey"
            columns: ["resource_id"]
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_resources_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_rdsvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfrabitq_vector_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: unknown
      }
      rds_float_normalize_i16: {
        Args: { "": unknown }
        Returns: unknown
      }
      rds_vector_norm: {
        Args: { "": string }
        Returns: number
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
