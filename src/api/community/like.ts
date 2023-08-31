import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";

type LikesType = Database["public"]["Tables"]["like_post"]["Row"];
type newLikePostType = Database["public"]["Tables"]["like_post"]["Insert"];

// 해당 게시글과 현재 유저 좋아요 상태 조회
export const getLikeStatus = async (postUid: string, userUid: string): Promise<LikesType> => {
  const { data: likeStatusData } = await supabase.from("like_post").select("*").eq("post_uid", postUid).eq("like_user", userUid).single();
  return likeStatusData;
}

// 좋아요 추가
export const createLikePost = async (newLike: newLikePostType) => {
    const { error } = await supabase.from("like_post").insert(newLike);
    if (error) return error;
};

// 좋아요 데이터가 있으면 삭제하도록
export const cancelLikePost = async (cancleLike: newLikePostType) => {
  const { error } = await supabase.from("like_post").delete().eq("post_uid", cancleLike.post_uid).eq("like_user", cancleLike.like_user);
  if (error) return error;
};

// 좋아요 개수
export const getLikesNum = async (postUid: string) => {
  const { count } = await supabase
    .from("like_post")
    .select("*", { count: "exact" })
    .eq("post_uid", postUid);
  return count;
};