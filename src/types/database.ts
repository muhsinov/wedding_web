export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      rsvps: {
        Row: {
          id: string;
          guest_name: string;
          phone: string;
          phone_normalized: string;
          attendance_status: "attending" | "declining";
          guest_count: number;
          message: string | null;
          user_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          guest_name: string;
          phone: string;
          phone_normalized: string;
          attendance_status: "attending" | "declining";
          guest_count: number;
          message?: string | null;
          user_id?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["rsvps"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
