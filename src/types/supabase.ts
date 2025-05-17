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
      colors: {
        Row: {
          created_at: string | null
          hex_code: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          hex_code?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          hex_code?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          created_at: string | null
          furniture_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          furniture_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          furniture_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_furniture_id_fkey"
            columns: ["furniture_id"]
            isOneToOne: false
            referencedRelation: "furniture"
            referencedColumns: ["id"]
          }
        ]
      }
      furniture: {
        Row: {
          availability_status: string | null
          average_rating: number | null
          category_id: string | null
          created_at: string | null
          depth: number | null
          description: string | null
          height: number | null
          id: string
          image_url: string | null
          name: string
          price: number
          product_url: string | null
          store_id: string | null
          updated_at: string | null
          width: number | null
        }
        Insert: {
          availability_status?: string | null
          average_rating?: number | null
          category_id?: string | null
          created_at?: string | null
          depth?: number | null
          description?: string | null
          height?: number | null
          id?: string
          image_url?: string | null
          name: string
          price: number
          product_url?: string | null
          store_id?: string | null
          updated_at?: string | null
          width?: number | null
        }
        Update: {
          availability_status?: string | null
          average_rating?: number | null
          category_id?: string | null
          created_at?: string | null
          depth?: number | null
          description?: string | null
          height?: number | null
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          product_url?: string | null
          store_id?: string | null
          updated_at?: string | null
          width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "furniture_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "furniture_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "furniture_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["id"]
          }
        ]
      }
      furniture_categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      furniture_colors: {
        Row: {
          color_id: string
          furniture_id: string
        }
        Insert: {
          color_id: string
          furniture_id: string
        }
        Update: {
          color_id?: string
          furniture_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "furniture_colors_color_id_fkey"
            columns: ["color_id"]
            isOneToOne: false
            referencedRelation: "colors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "furniture_colors_furniture_id_fkey"
            columns: ["furniture_id"]
            isOneToOne: false
            referencedRelation: "furniture"
            referencedColumns: ["id"]
          }
        ]
      }
      furniture_materials: {
        Row: {
          furniture_id: string
          material_id: string
        }
        Insert: {
          furniture_id: string
          material_id: string
        }
        Update: {
          furniture_id?: string
          material_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "furniture_materials_furniture_id_fkey"
            columns: ["furniture_id"]
            isOneToOne: false
            referencedRelation: "furniture"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "furniture_materials_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "materials"
            referencedColumns: ["id"]
          }
        ]
      }
      materials: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string | null
          furniture_id: string | null
          id: string
          rating: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          furniture_id?: string | null
          id?: string
          rating: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          furniture_id?: string | null
          id?: string
          rating?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_furniture_id_fkey"
            columns: ["furniture_id"]
            isOneToOne: false
            referencedRelation: "furniture"
            referencedColumns: ["id"]
          }
        ]
      }
      stores: {
        Row: {
          created_at: string | null
          id: string
          logo_url: string | null
          name: string
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name: string
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          citta: string | null
          created_at: string | null
          eta: number | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          citta?: string | null
          created_at?: string | null
          eta?: number | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          citta?: string | null
          created_at?: string | null
          eta?: number | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_category_id: {
        Args: { category_name: string }
        Returns: string
      }
      get_color_id: {
        Args: { color_name: string }
        Returns: string
      }
      get_material_id: {
        Args: { material_name: string }
        Returns: string
      }
      get_store_id: {
        Args: { store_name: string }
        Returns: string
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