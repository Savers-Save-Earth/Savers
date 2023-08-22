import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { NewPostType } from "@/types/types";

  // 전체 게시글 조회
export const getPosts = async () => { };

// 게시글 등록
export const createPost = async (newPost: NewPostType) => {
  const { error } = await supabase.from('community').insert(newPost);
  if (error) return error;
 };

// 게시글 수정
export const updatePost = async () => { };

// 게시글 삭제
export const deletePost = async (post_uid: Database): Promise<void> => {
  await supabase.from("community").delete().eq("post_uid", post_uid);
 };

 // 게시글 상세내용 조회
export const getPostDetail = async (post_uid: Database): Promise<Database> => {
  const { data } = await supabase.from("community").select("*").eq('post_uid', post_uid).single();
  return data;
 };