import { Database } from "./supabase";

export interface Product {
  id: string;
  name: string;
  company: string;
  price: number;
  sales: number;
  context: string;
  img: string;
  sub_img: string;
  category: string;
  website: string;
  like_count: number;
  createdAt: number;
}

export interface Post {
  post_uid: string;
  category: string;
  author_uid: string;
  title: string;
  content: string;
  created_date: number;
  like_count: number;
  comment_count: number;
  number_comments: number;
  number_likes: number;
}

export interface ListMission {
  id: string;
  missionUid: string;
  createdAt: string;
  userId: string;
  title: string;
  content: string;
  bigCategory: string;
  smallCategory: string;
  doingYn: boolean;
  point: number;
  user_uid: string;
  address: string;
}

export type PostType = Database["public"]["Tables"]["community"]["Row"];
export type NewPostType = Database["public"]["Tables"]["community"]["Insert"];
export type EditPostType = Database["public"]["Tables"]["community"]["Update"];
export type CommentType = Database["public"]["Tables"]["community_comment"]["Row"];
export type NewCommentType = Database["public"]["Tables"]["community_comment"]["Insert"];
export type EditCommentType = Database["public"]["Tables"]["community_comment"]["Update"];
export type ReplyType = Database["public"]["Tables"]["community_reply"]["Row"];
export type NewReplyType = Database["public"]["Tables"]["community_reply"]["Insert"];
export type EditReplyType = Database["public"]["Tables"]["community_reply"]["Update"];
export interface ToTalDataType {
  posts: PostType[];
  page: number;
  total_pages: number;
  total_results: number | null;
}

export interface DetailPostProps {
  postDetail?: PostType;
  postUid: string;
}
