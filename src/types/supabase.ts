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
      community: {
        Row: {
          author_uid: string
          category: string
          content: string
          created_date: string
          number_comments: number | null
          post_uid: string
          title: string
          updated_date: string
        }
        Insert: {
          author_uid?: string
          category?: string
          content?: string
          created_date?: string
          number_comments?: number | null
          post_uid?: string
          title?: string
          updated_date?: string
        }
        Update: {
          author_uid?: string
          category?: string
          content?: string
          created_date?: string
          number_comments?: number | null
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
          post_uid: string
          updated_date: string | null
          writer_uid: string
        }
        Insert: {
          comment_uid?: string
          content?: string
          created_date?: string
          post_uid?: string
          updated_date?: string | null
          writer_uid?: string
        }
        Update: {
          comment_uid?: string
          content?: string
          created_date?: string
          post_uid?: string
          updated_date?: string | null
          writer_uid?: string
        }
        Relationships: []
      }
      like_comment: {
        Row: {
          comment_uid: string
          number_likes: number
          user_likes: string | null
        }
        Insert: {
          comment_uid: string
          number_likes?: number
          user_likes?: string | null
        }
        Update: {
          comment_uid?: string
          number_likes?: number
          user_likes?: string | null
        }
        Relationships: []
      }
      like_post: {
        Row: {
          number_likes: number
          post_uid: string
          user_likes: string | null
        }
        Insert: {
          number_likes: number
          post_uid?: string
          user_likes?: string | null
        }
        Update: {
          number_likes?: number
          post_uid?: string
          user_likes?: string | null
        }
        Relationships: []
      }
      product: {
        Row: {
          category: string | null
          company: string | null
          context: string | null
          createdAt: string | null
          id: string
          img: string | null
          liked: Json | null
          liked_num: number | null
          name: string | null
          price: number | null
          sales: number | null
          website: string | null
        }
        Insert: {
          category?: string | null
          company?: string | null
          context?: string | null
          createdAt?: string | null
          id?: string
          img?: string | null
          liked?: Json | null
          liked_num?: number | null
          name?: string | null
          price?: number | null
          sales?: number | null
          website?: string | null
        }
        Update: {
          category?: string | null
          company?: string | null
          context?: string | null
          createdAt?: string | null
          id?: string
          img?: string | null
          liked?: Json | null
          liked_num?: number | null
          name?: string | null
          price?: number | null
          sales?: number | null
          website?: string | null
        }
        Relationships: []
      }
      user: {
        Row: {
          activePoint: number | null
          badges: string | null
          commentPosts: string | null
          email: string | null
          isActiveDone: boolean | null
          likedPosts: string | null
          likePosts: string | null
          likeProducts: string | null
          likeRestaurants: string | null
          nickname: string | null
          password: string | null
          profileImage: string | null
          provider: string | null
          uid: string
          writePosts: string | null
        }
        Insert: {
          activePoint?: number | null
          badges?: string | null
          commentPosts?: string | null
          email?: string | null
          isActiveDone?: boolean | null
          likedPosts?: string | null
          likePosts?: string | null
          likeProducts?: string | null
          likeRestaurants?: string | null
          nickname?: string | null
          password?: string | null
          profileImage?: string | null
          provider?: string | null
          uid: string
          writePosts?: string | null
        }
        Update: {
          activePoint?: number | null
          badges?: string | null
          commentPosts?: string | null
          email?: string | null
          isActiveDone?: boolean | null
          likedPosts?: string | null
          likePosts?: string | null
          likeProducts?: string | null
          likeRestaurants?: string | null
          nickname?: string | null
          password?: string | null
          profileImage?: string | null
          provider?: string | null
          uid?: string
          writePosts?: string | null
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
