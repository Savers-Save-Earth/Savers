import supabase from "@/libs/supabase";
import { EditReplyType, NewReplyType, ReplyType } from "@/types/types";

// 대댓글 등록
export const createReply = async (newReply: NewReplyType) => {
  const { error } = await supabase.from("community_reply").insert(newReply);
  if (error) return error;
 };

// 대댓글 수정
export const updateReply = async (editReply: EditReplyType) => {
  const { data, error } = await supabase.from("community_reply").update(editReply).eq("reply_uid", editReply.reply_uid);
  if (error) return error;
  return data;
 };

// 대댓글 삭제
export const deleteReply = async (replyUid: string): Promise<void> => {
  await supabase.from("community_reply").delete().eq("reply_uid", replyUid);
};
 
// 대댓글 조회
export const getReplies = async (postUid: string): Promise<ReplyType[]> => {
  try {
    const { data: replies } = await supabase
      .from("community_reply")
      .select("*")
      .eq("post_uid", postUid)
      .order("created_date");
    return replies || [];
  }
  catch (error) {
    throw error;
  }
};