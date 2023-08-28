import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";

export type LikesType = Database["public"]["Tables"]["like_post"]["Row"];
export type newLikePostType = Database["public"]["Tables"]["like_post"]["Insert"];

export const createLikePost = async (newLike: newLikePostType) => {
  const { error } = await supabase.from("like_post").insert(newLike);
  if (error) return error;
};

export const cancleLikePost = async (postUid: string, userUid: string) => {
  const { error } = await supabase.from("like_post").delete().eq("post_uid", postUid).eq("like_user", userUid);
};

export const getLikeStatus = async (postUid: string, userUid: string): Promise<LikesType[]> => {
  try {
    const { data: likes } = await supabase
      .from("like_post")
      .select("*")
      .eq("post_uid", postUid)
      .eq("like_user", userUid)
    return likes || [];
  }
  catch (error) {
    throw error;
  }
};

export const getLikesNum = async (postUid: string) => {
  const { count } = await supabase
    .from("community_comment")
    .select("*", { count: "exact" })
    .eq("post_uid", postUid);
  return count;
};