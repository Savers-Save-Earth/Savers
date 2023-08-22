import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";

  // 전체 게시글 조회
export const getPosts = async () => { };

export const createPost = async () => { };

export const updatePost = async () => { };

export const deletePost = async (post_uid: Database): Promise<void> => {
  await supabase.from("community").delete().eq("post_uid", post_uid);
 };

 // 상세 페이지
export const getPostDetail = async (post_uid: Database): Promise<Database> => {
  const { data } = await supabase.from("community").select("*").eq('post_uid', post_uid).single();
  return data;
 };