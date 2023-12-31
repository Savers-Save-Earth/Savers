import supabase from "@/libs/supabase";

import { PATHNAME_OHJIWAN, PATHNAME_PRODUCT, PATHNAME_RECIPE, PATHNAME_RESTAURANT } from "@/enums/community";
import { PostType, NewPostType, EditPostType, ToTalDataType } from "@/types/types";

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

// 게시글 조회
export const POSTS_NUMBER = 10;
export const getPosts = async (pathname: string, pageParam: number = 1, keyword: string | null): Promise<ToTalDataType> => {
  let data: any = [];
  let count = null;

  if (pathname && keyword) {
    const searchPosts = await supabase
      .from("community")
      .select("*")
      .ilike("content", `%${keyword}%`)
      .order("created_date", { ascending: false })
      .range(pageParam * 10 - 10, pageParam * 10 - 1);

    data = searchPosts.data;
    
    const { count: searchCount } = await supabase
      .from("community")
      .select("count", { count: "exact" })
      .ilike("content", `%${keyword}%`);
    
    count = searchCount;
    const total_pages = count
    ? Math.floor(count / 10) + (count % 10 === 0 ? 0 : 1)
    : 1;

    return { posts: data, page: pageParam, total_pages, total_results: count };
  }

  if (pathname === PATHNAME_PRODUCT) {
    const productPosts = await supabase
      .from("community")
      .select("*")
      .eq("category", "제품")
      .order("created_date", { ascending: false })
      .range(pageParam * 10 - 10, pageParam * 10 - 1);

    data = productPosts.data;

    const { count: productCount } = await supabase
      .from("community")
      .select("count", { count: "exact" })
      .eq("category", "제품");
    
    count = productCount;
  } else if (pathname === PATHNAME_RESTAURANT) {
    const restaurantPosts = await supabase
      .from("community")
      .select("*")
      .eq("category", "식당")
      .order("created_date", { ascending: false })
      .range(pageParam * 10 - 10, pageParam * 10 - 1);

    data = restaurantPosts.data;

    const { count: restaurantCount } = await supabase
      .from("community")
      .select("count", { count: "exact" })
      .eq("category", "식당");
    count = restaurantCount;

  } else if (pathname === PATHNAME_RECIPE) {
    const recipePosts = await supabase
      .from("community")
      .select("*")
      .eq("category", "레시피")
      .order("created_date", { ascending: false })
      .range(pageParam * 10 - 10, pageParam * 10 - 1);

    data = recipePosts.data;

    const { count: recipeCount } = await supabase
      .from("community")
      .select("count", { count: "exact" })
      .eq("category", "레시피");
    count = recipeCount;
    
  } else if (pathname === PATHNAME_OHJIWAN) {
    const ohjiwanPosts = await supabase
      .from("community")
      .select("*")
      .eq("category", "오지완")
      .order("created_date", { ascending: false })
      .range(pageParam * 10 - 10, pageParam * 10 - 1);

    data = ohjiwanPosts.data;

    const { count: ohjiwanCount } = await supabase
      .from("community")
      .select("count", { count: "exact" })
      .eq("category", "오지완");
    
    count = ohjiwanCount;
  } else {
    // 전체 데이터
    const allPosts = await supabase
      .from("community")
      .select("*")
      .order("created_date", { ascending: false })
      .range(pageParam * 10 - 10, pageParam * 10 - 1);

    data = allPosts.data;

    const { count: allCount } = await supabase
      .from("community")
      .select("count", { count: "exact" });
    
    count = allCount;
  }

  const total_pages = count
    ? Math.floor(count / 10) + (count % 10 === 0 ? 0 : 1)
    : 1;

  return { posts: data, page: pageParam, total_pages, total_results: count };
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

// 댓글+좋아요 많은 순서대로 8개만 가져오기
export const getPopularPosts = async (): Promise<PostType[]> => {
  const { data: popularPosts, error } = await supabase
    .from("community")
    .select("*")
    .order("number_comments", { ascending: false })
    .order("number_likes", { ascending: false })
    .limit(8);
  
  if (error) throw error;
  return popularPosts;
};

// 작성자 프로필 이미지 가져오기
export const getProfileImg = async (userUid: string): Promise<any> => {
  const { data: profileImg, error } = await supabase
    .from("user")
    .select("profileImage")
    .eq("uid", userUid);
  
  if (error) return error;
  return profileImg;
};

// 게시글 검색
export const getSearchPosts = async (keyword: string): Promise<PostType[] | null> => {
  const { data: searchPosts } = await supabase
    .from("community")
    .select()
    .textSearch("title", `"${keyword}"`);
  
  return searchPosts;
};