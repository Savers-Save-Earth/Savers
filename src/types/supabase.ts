export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      badge: {
        Row: {
          badge_title: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          badge_title?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          badge_title?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      community: {
        Row: {
          author_name: string
          author_uid: string
          category: string
          content: string
          created_date: string
          number_comments: number
          number_likes: number
          post_uid: string
          title: string
          updated_date: string
        }
        Insert: {
          author_name?: string
          author_uid?: string
          category?: string
          content?: string
          created_date?: string
          number_comments?: number
          number_likes?: number
          post_uid?: string
          title?: string
          updated_date?: string
        }
        Update: {
          author_name?: string
          author_uid?: string
          category?: string
          content?: string
          created_date?: string
          number_comments?: number
          number_likes?: number
          post_uid?: string
          title?: string
          updated_date?: string
        }
        Relationships: []
      }
      community_comment: {
        Row: {
          comment_uid: string
          content: string
          created_date: string
          isDeleted: boolean
          post_uid: string
          updated_date: string
          writer_name: string
          writer_uid: string
        }
        Insert: {
          comment_uid?: string
          content?: string
          created_date: string
          isDeleted?: boolean
          post_uid?: string
          updated_date: string
          writer_name: string
          writer_uid?: string
        }
        Update: {
          comment_uid?: string
          content?: string
          created_date?: string
          isDeleted?: boolean
          post_uid?: string
          updated_date?: string
          writer_name?: string
          writer_uid?: string
        }
        Relationships: []
      }
      community_reply: {
        Row: {
          comment_uid: string
          content: string
          created_date: string
          post_uid: string
          reply_uid: string
          update_date: string
          writer_name: string
          writer_uid: string
        }
        Insert: {
          comment_uid?: string
          content?: string
          created_date?: string
          post_uid?: string
          reply_uid?: string
          update_date?: string
          writer_name?: string
          writer_uid?: string
        }
        Update: {
          comment_uid?: string
          content?: string
          created_date?: string
          post_uid?: string
          reply_uid?: string
          update_date?: string
          writer_name?: string
          writer_uid?: string
        }
        Relationships: []
      }
      like_comment_reply: {
        Row: {
          data_uid: string
          like_id: string
          like_user: string
        }
        Insert: {
          data_uid?: string
          like_id?: string
          like_user: string
        }
        Update: {
          data_uid?: string
          like_id?: string
          like_user?: string
        }
        Relationships: []
      }
      like_post: {
        Row: {
          like_id: string
          like_user: string
          post_uid: string
        }
        Insert: {
          like_id?: string
          like_user: string
          post_uid: string
        }
        Update: {
          like_id?: string
          like_user?: string
          post_uid?: string
        }
        Relationships: []
      }
      like_product: {
        Row: {
          createdAt: string
          img: string
          like_id: string
          product_company: string
          product_name: string
          product_uid: string
          user_id: string
        }
        Insert: {
          createdAt?: string
          img: string
          like_id?: string
          product_company: string
          product_name: string
          product_uid: string
          user_id: string
        }
        Update: {
          createdAt?: string
          img?: string
          like_id?: string
          product_company?: string
          product_name?: string
          product_uid?: string
          user_id?: string
        }
        Relationships: []
      }
      like_restaurant: {
        Row: {
          created_at: string
          id: number
          restaurant_address: string
          restaurant_category: string
          restaurant_map: string
          restaurant_name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          restaurant_address: string
          restaurant_category: string
          restaurant_map: string
          restaurant_name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          restaurant_address?: string
          restaurant_category?: string
          restaurant_map?: string
          restaurant_name?: string
          user_id?: string
        }
        Relationships: []
      }
      mission: {
        Row: {
          address: string | null
          bigCategory: string | null
          content: string | null
          doingYn: boolean | null
          id: string | null
          point: number | null
          smallCategory: string | null
          title: string | null
          uid: number
        }
        Insert: {
          address?: string | null
          bigCategory?: string | null
          content?: string | null
          doingYn?: boolean | null
          id?: string | null
          point?: number | null
          smallCategory?: string | null
          title?: string | null
          uid?: number
        }
        Update: {
          address?: string | null
          bigCategory?: string | null
          content?: string | null
          doingYn?: boolean | null
          id?: string | null
          point?: number | null
          smallCategory?: string | null
          title?: string | null
          uid?: number
        }
        Relationships: []
      }
      missionList: {
        Row: {
          address: string | null
          bigCategory: string | null
          content: string | null
          createdAt: string | null
          doingYn: boolean | null
          id: string
          missionUid: string | null
          point: number | null
          smallCategory: string | null
          title: string | null
          user_uid: string | null
          userId: string | null
        }
        Insert: {
          address?: string | null
          bigCategory?: string | null
          content?: string | null
          createdAt?: string | null
          doingYn?: boolean | null
          id?: string
          missionUid?: string | null
          point?: number | null
          smallCategory?: string | null
          title?: string | null
          user_uid?: string | null
          userId?: string | null
        }
        Update: {
          address?: string | null
          bigCategory?: string | null
          content?: string | null
          createdAt?: string | null
          doingYn?: boolean | null
          id?: string
          missionUid?: string | null
          point?: number | null
          smallCategory?: string | null
          title?: string | null
          user_uid?: string | null
          userId?: string | null
        }
        Relationships: []
      }
      product: {
        Row: {
          category: string
          company: string
          context: string
          createdAt: string | null
          id: string
          img: string
          like_count: number
          name: string
          price: number
          sales: number | null
          sub_img: string
          website: string
        }
        Insert: {
          category: string
          company: string
          context: string
          createdAt?: string | null
          id?: string
          img: string
          like_count?: number
          name: string
          price: number
          sales?: number | null
          sub_img: string
          website: string
        }
        Update: {
          category?: string
          company?: string
          context?: string
          createdAt?: string | null
          id?: string
          img?: string
          like_count?: number
          name?: string
          price?: number
          sales?: number | null
          sub_img?: string
          website?: string
        }
        Relationships: []
      }
      restaurant: {
        Row: {
          address: string | null
          count: number
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          address?: string | null
          count?: number
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          address?: string | null
          count?: number
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          activePoint: number | null
          birthday: string | null
          email: string
          nickname: string
          number: string | null
          profileImage: string
          provider: string
          uid: string
        }
        Insert: {
          activePoint?: number | null
          birthday?: string | null
          email: string
          nickname: string
          number?: string | null
          profileImage?: string
          provider?: string
          uid: string
        }
        Update: {
          activePoint?: number | null
          birthday?: string | null
          email?: string
          nickname?: string
          number?: string | null
          profileImage?: string
          provider?: string
          uid?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
