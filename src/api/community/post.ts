import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";

type PostType = Database["public"]["Tables"]["community"]["Row"];
type NewPostType = Database["public"]["Tables"]["community"]["Insert"];
type EditPostType = Database["public"]["Tables"]["community"]["Update"];

// 게시글 등록
export const createPost = async (newPost: NewPostType) => {
  const { error } = await supabase.from("community").insert(newPost);
  if (error) return error;
 };

// 게시글 수정
export const updatePost = async (editPost: EditPostType) => {
  const { data, error } = await supabase.from("community").update(editPost).eq("post_uid", editPost.post_uid);
  if (error) return error;
  return data;
 };

// 게시글 삭제
export const deletePost = async (post_uid: string | string[]): Promise<void> => {
  await supabase.from("community").delete().eq("post_uid", post_uid);
};
 
// 댓글 개수 조회
export const getCommentsNum = async (postUid: string) => {
  const { count } = await supabase
    .from("community_comment")
    .select("*", { count: "exact" })
    .eq("post_uid", postUid);
  return count ?? 0;
};

// 게시글 조회
export const getPosts = async (pathname: string): Promise<PostType[]> => {
  try {
    let posts;
    
    if (pathname === "/community/product") {
      posts = await getProductPosts();
    } else if (pathname === "/community/restaurant") {
      posts = await getRestaurantPosts();
    } else if (pathname === "/community/recipe") {
      posts = await getRecipePosts();
    } else if (pathname === "/community/ohjiwan") {
      posts = await getOhjiwanPosts();
    } else {
      // 다른 모든 경우에 대한 기본 처리
      const { data } = await supabase
        .from("community")
        .select("*")
        .order("created_date", { ascending: false });
      posts = data || [];
    }
    
    return posts;
  } catch (error) {
    throw error;
  }
};

// 게시글 상세내용 조회
export const getPostDetail = async (post_uid: string): Promise<PostType> => {
  try {
    const { data: post } = await supabase
      .from("community")
      .select("*")
      .eq("post_uid", post_uid)
      .single();
    return post;
  } catch (error) {
    throw error;
  }
};
 
// api/post.ts

// 1. 제품 카테고리 게시글 조회
const getProductPosts = async (): Promise<PostType[]> => {
  try {
    const { data } = await supabase
      .from("community")
      .select("*")
      .eq("category", "제품")
      .order("created_date", { ascending: false });
    return data || [];
  } catch (error) {
    throw error;
  }
};

// 2. 식당 카테고리 게시글 조회
const getRestaurantPosts = async (): Promise<PostType[]> => {
  try {
    const { data } = await supabase
      .from("community")
      .select("*")
      .eq("category", "식당")
      .order("created_date", { ascending: false });
    return data || [];
  } catch (error) {
    throw error;
  }
};

// 3. 레시피 카테고리 게시글 조회
const getRecipePosts = async (): Promise<PostType[]> => {
  try {
    const { data } = await supabase
      .from("community")
      .select("*")
      .eq("category", "레시피")
      .order("created_date", { ascending: false });
    return data || [];
  } catch (error) {
    throw error;
  }
};

// 4. 오지완 카테고리 게시글 조회
export const getOhjiwanPosts = async (): Promise<PostType[]> => {
  try {
    const { data } = await supabase
      .from("community")
      .select("*")
      .eq("category", "오지완")
      .order("created_date", { ascending: false });
    return data || [];
  } catch (error) {
    throw error;
  }
};