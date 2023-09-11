import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { CommunityComment, LikePost, PostType } from "@/types/types";

type PostWithCountType = {
  myPosts: PostType[]
  count: number|null
}

type CommentType = {
  myComments: CommunityComment[]
  count: number|null
}

type LikePostType = {
  favoritePosts: LikePost[]
  count: number|null
}

export const fetchMyComments = async (searchId: string, loadCount: number) : Promise<CommentType> => {
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
      myComments: myComments as CommunityComment[],
      count,
    };
  } catch (error) {
    throw error;
  }
};

export const fetchMyPosts = async (searchId: string, loadCount: number) : Promise<PostWithCountType> => {
  try {
    const { data: myPosts, count } = await supabase
      .from("community")
      .select("*", { count: "exact" })
      .eq("author_uid", searchId)
      .range(0, loadCount - 1);

    if (!myPosts) {
      console.log("포스트 없음")
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
    throw error;
  }
};

export const fetchFavoritePosts = async (searchId: string, loadCount: number) : Promise<LikePostType> => {
  try {
    const { data: favoritePosts, count } = await supabase
      .from("like_post")
      .select("*", { count: "exact" })
      .eq("like_user", searchId)
      .range(0, loadCount - 1);
    if (!favoritePosts) {
      console.log("포스트 없음")
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
    throw error;
  }
};

export const fetchPostsByPostUid = async (searchId: string) : Promise<PostType[]> => {
  try {
    const { data: postsByPostUid  } = await supabase
      .from("community")
      .select("*")
      .eq("post_uid", searchId)
    if (!postsByPostUid) {
      console.log("포스트 없음")
      return []
    }

    return postsByPostUid
  } catch (error) {
    throw error;
  }
};
