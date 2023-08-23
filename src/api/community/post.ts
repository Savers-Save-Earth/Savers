import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";

type PostType = Database["public"]["Tables"]["community"]["Row"];
type NewPostType = Database["public"]["Tables"]["community"]["Insert"];

// 게시글 등록
export const createPost = async (newPost: NewPostType) => {
  const { error } = await supabase.from('community').insert(newPost);
  if (error) return error;
 };

// 게시글 수정
export const updatePost = async () => { };

// 게시글 삭제
export const deletePost = async (post_uid: string): Promise<void> => {
  await supabase.from("community").delete().eq("post_uid", post_uid);
 };

// 게시글 상세내용 조회
export const getPostDetail = async (post_uid: string): Promise<PostType> => {
  const { data } = await supabase.from("community").select("*").eq('post_uid', post_uid).single();
  return data;
 };