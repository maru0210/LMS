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
      chapters: {
        Row: {
          id: string
          number: number
          title: string
        }
        Insert: {
          id: string
          number: number
          title: string
        }
        Update: {
          id?: string
          number?: number
          title?: string
        }
        Relationships: []
      }
      contents: {
        Row: {
          chapter: number
          chapter_id: string
          id: string
          section: number
          title: string
        }
        Insert: {
          chapter: number
          chapter_id?: string
          id: string
          section: number
          title: string
        }
        Update: {
          chapter?: number
          chapter_id?: string
          id?: string
          section?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "contents_chapter_chapter_id_fkey"
            columns: ["chapter", "chapter_id"]
            isOneToOne: false
            referencedRelation: "chapters"
            referencedColumns: ["number", "id"]
          },
        ]
      }
      exam_log: {
        Row: {
          action: Database["public"]["Enums"]["exam_action"]
          created_at: string
          data: string | null
          exam: string
          id: string
          user: string
        }
        Insert: {
          action: Database["public"]["Enums"]["exam_action"]
          created_at?: string
          data?: string | null
          exam: string
          id?: string
          user: string
        }
        Update: {
          action?: Database["public"]["Enums"]["exam_action"]
          created_at?: string
          data?: string | null
          exam?: string
          id?: string
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "exam_log_exam_fkey"
            columns: ["exam"]
            isOneToOne: false
            referencedRelation: "exams"
            referencedColumns: ["id"]
          },
        ]
      }
      exams: {
        Row: {
          created_at: string
          data: Json
          id: string
          is_once: boolean
          is_public: boolean
          name: string
        }
        Insert: {
          created_at?: string
          data: Json
          id: string
          is_once?: boolean
          is_public?: boolean
          name: string
        }
        Update: {
          created_at?: string
          data?: Json
          id?: string
          is_once?: boolean
          is_public?: boolean
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          name: string
          registered_at: string
          status: Database["public"]["Enums"]["status"]
          student_id: string
        }
        Insert: {
          id?: string
          name: string
          registered_at?: string
          status?: Database["public"]["Enums"]["status"]
          student_id: string
        }
        Update: {
          id?: string
          name?: string
          registered_at?: string
          status?: Database["public"]["Enums"]["status"]
          student_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      exam_action: "start" | "finish"
      status: "student" | "teacher" | "administer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
