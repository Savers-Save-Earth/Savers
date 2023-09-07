import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";

export const fetchMyComments = async (searchId: string, loadCount: number) => {
  try {
    const { data: myComments, count } = await supabase
      .from("community_comment")
      .select("*", { count: "exact" })
      .eq("writer_uid", searchId)
      .eq("isDeleted", false)
      .range(0, loadCount - 1);

    if (!myComments) {
      return {
        myComments: [],
        count: 0,
      };
    }

    return {
      myComments,
      count,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchMyPosts = async (searchId: string, loadCount: number) => {
  try {
    const { data: myPosts, count } = await supabase
      .from("community")
      .select("*", { count: "exact" })
      .eq("author_uid", searchId)
      .range(0, loadCount - 1);

    if (!myPosts) {
      console.log("포스트가 없다는데?")
      return {
        myPosts: [],
        count: 0,
      };
    }

    return {
      myPosts,
      count,
    };
  } catch (error) {
    console.log("그냥 완전 에러인가????")
    throw error;
  }
};

export const fetchFavoritePosts = async (searchId: string, loadCount: number) => {
  try {
    const { data: favoritePosts, count } = await supabase
      .from("like_post")
      .select("*", { count: "exact" })
      .eq("like_user", searchId)
      .range(0, loadCount - 1);

    if (!favoritePosts) {
      console.log("포스트가 없다는데?")
      return {
        favoritePosts: [],
        count: 0,
      };
    }

    return {
      favoritePosts,
      count,
    };
  } catch (error) {
    console.log("그냥 완전 에러인가????")
    throw error;
  }
};
