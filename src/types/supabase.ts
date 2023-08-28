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
      badge: {
        Row: {
          badge_title: string | null;
          id: number;
          user_id: string | null;
        };
        Insert: {
          badge_title?: string | null;
          id?: number;
          user_id?: string | null;
        };
        Update: {
          badge_title?: string | null;
          id?: number;
          user_id?: string | null;
        };
        Relationships: [];
      };
      community: {
        Row: {
          author_name: string;
          author_uid: string;
          category: string;
          content: string;
          created_date: string;
          number_comments: number;
          post_uid: string;
          title: string;
          updated_date: string;
        };
        Insert: {
          author_name?: string;
          author_uid?: string;
          category?: string;
          content?: string;
          created_date?: string;
          number_comments?: number;
          post_uid?: string;
          title?: string;
          updated_date?: string;
        };
        Update: {
          author_name?: string;
          author_uid?: string;
          category?: string;
          content?: string;
          created_date?: string;
          number_comments?: number;
          post_uid?: string;
          title?: string;
          updated_date?: string;
        };
        Relationships: [];
      };
      community_comment: {
        Row: {
          comment_uid: string;
          content: string;
          created_date: string;
          isDeleted: boolean;
          post_uid: string;
          updated_date: string;
          writer_name: string;
          writer_uid: string;
        };
        Insert: {
          comment_uid?: string;
          content?: string;
          created_date: string;
          isDeleted?: boolean;
          post_uid?: string;
          updated_date: string;
          writer_name: string;
          writer_uid?: string;
        };
        Update: {
          comment_uid?: string;
          content?: string;
          created_date?: string;
          isDeleted?: boolean;
          post_uid?: string;
          updated_date?: string;
          writer_name?: string;
          writer_uid?: string;
        };
        Relationships: [];
      };
      like_comment: {
        Row: {
          comment_uid: string;
          number_likes: number;
          user_likes: string | null;
        };
        Insert: {
          comment_uid: string;
          number_likes?: number;
          user_likes?: string | null;
        };
        Update: {
          comment_uid?: string;
          number_likes?: number;
          user_likes?: string | null;
        };
        Relationships: [];
      };
      like_map: {
        Row: {
          num_likes: number;
          num_people: number | null;
          place_name: string | null;
          place_region: string | null;
          place_uid: number;
        };
        Insert: {
          num_likes: number;
          num_people?: number | null;
          place_name?: string | null;
          place_region?: string | null;
          place_uid?: number;
        };
        Update: {
          num_likes?: number;
          num_people?: number | null;
          place_name?: string | null;
          place_region?: string | null;
          place_uid?: number;
        };
        Relationships: [];
      };
      like_post: {
        Row: {
          number_likes: number;
          post_uid: string;
          user_likes: string | null;
        };
        Insert: {
          number_likes: number;
          post_uid?: string;
          user_likes?: string | null;
        };
        Update: {
          number_likes?: number;
          post_uid?: string;
          user_likes?: string | null;
        };
        Relationships: [];
      };
      like_product: {
        Row: {
          createdAt: string | null;
          img: string | null;
          like_id: string;
          product_uid: string;
          user_id: string | null;
        };
        Insert: {
          createdAt?: string | null;
          img?: string | null;
          like_id?: string;
          product_uid: string;
          user_id?: string | null;
        };
        Update: {
          createdAt?: string | null;
          img?: string | null;
          like_id?: string;
          product_uid?: string;
          user_id?: string | null;
        };
        Relationships: [];
      };
      mission: {
        Row: {
          address: string | null;
          bigCategory: string | null;
          content: string | null;
          doingYn: boolean | null;
          id: string | null;
          point: number | null;
          smallCategory: string | null;
          title: string | null;
          uid: number;
        };
        Insert: {
          address?: string | null;
          bigCategory?: string | null;
          content?: string | null;
          doingYn?: boolean | null;
          id?: string | null;
          point?: number | null;
          smallCategory?: string | null;
          title?: string | null;
          uid?: number;
        };
        Update: {
          address?: string | null;
          bigCategory?: string | null;
          content?: string | null;
          doingYn?: boolean | null;
          id?: string | null;
          point?: number | null;
          smallCategory?: string | null;
          title?: string | null;
          uid?: number;
        };
        Relationships: [];
      };
      missionList: {
        Row: {
          address: string | null;
          bigCategory: string | null;
          content: string | null;
          createdAt: string | null;
          doingYn: boolean | null;
          id: string;
          missionUid: string | null;
          point: number | null;
          smallCategory: string | null;
          title: string | null;
          user_uid: string | null;
          userId: string | null;
        };
        Insert: {
          address?: string | null;
          bigCategory?: string | null;
          content?: string | null;
          createdAt?: string | null;
          doingYn?: boolean | null;
          id?: string;
          missionUid?: string | null;
          point?: number | null;
          smallCategory?: string | null;
          title?: string | null;
          user_uid?: string | null;
          userId?: string | null;
        };
        Update: {
          address?: string | null;
          bigCategory?: string | null;
          content?: string | null;
          createdAt?: string | null;
          doingYn?: boolean | null;
          id?: string;
          missionUid?: string | null;
          point?: number | null;
          smallCategory?: string | null;
          title?: string | null;
          user_uid?: string | null;
          userId?: string | null;
        };
        Relationships: [];
      };
      product: {
        Row: {
          category: string | null;
          company: string | null;
          context: string | null;
          createdAt: string | null;
          id: string;
          img: string | null;
          like_count: number | null;
          name: string | null;
          price: number | null;
          sales: number | null;
          sub_img: string | null;
          website: string | null;
        };
        Insert: {
          category?: string | null;
          company?: string | null;
          context?: string | null;
          createdAt?: string | null;
          id?: string;
          img?: string | null;
          like_count?: number | null;
          name?: string | null;
          price?: number | null;
          sales?: number | null;
          sub_img?: string | null;
          website?: string | null;
        };
        Update: {
          category?: string | null;
          company?: string | null;
          context?: string | null;
          createdAt?: string | null;
          id?: string;
          img?: string | null;
          like_count?: number | null;
          name?: string | null;
          price?: number | null;
          sales?: number | null;
          sub_img?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      user: {
        Row: {
          activePoint: number | null;
          badges: string | null;
          commentPosts: string | null;
          email: string | null;
          isActiveDone: boolean | null;
          isLogin: boolean | null;
          likedPosts: string | null;
          likePosts: string | null;
          likeProducts: Json | null;
          likeRestaurants: string | null;
          nickname: string | null;
          profileImage: string | null;
          provider: string | null;
          uid: string;
          writePosts: string | null;
        };
        Insert: {
          activePoint?: number | null;
          badges?: string | null;
          commentPosts?: string | null;
          email?: string | null;
          isActiveDone?: boolean | null;
          isLogin?: boolean | null;
          likedPosts?: string | null;
          likePosts?: string | null;
          likeProducts?: Json | null;
          likeRestaurants?: string | null;
          nickname?: string | null;
          profileImage?: string | null;
          provider?: string | null;
          uid: string;
          writePosts?: string | null;
        };
        Update: {
          activePoint?: number | null;
          badges?: string | null;
          commentPosts?: string | null;
          email?: string | null;
          isActiveDone?: boolean | null;
          isLogin?: boolean | null;
          likedPosts?: string | null;
          likePosts?: string | null;
          likeProducts?: Json | null;
          likeRestaurants?: string | null;
          nickname?: string | null;
          profileImage?: string | null;
          provider?: string | null;
          uid?: string;
          writePosts?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
