import supabase from "@/libs/supabase";
import { CommentType, EditCommentType, NewCommentType } from "@/types/types";

// 댓글 등록
export const createComment = async (newComment: NewCommentType) => {
  const { error } = await supabase.from("community_comment").insert(newComment);
  if (error) return error;
 };

// 댓글 수정
export const updateComment = async (editComment: EditCommentType) => {
  const { data, error } = await supabase.from("community_comment").update(editComment).eq("comment_uid", editComment.comment_uid);
  if (error) return error;
  return data;
 };

// 댓글 삭제
export const deleteComment = async (commentUid: string)=> {
  // await supabase.from("community_comment").delete().eq("comment_uid", commentUid);
  const { data, error } = await supabase.from("community_comment").update({isDeleted: true}).eq("comment_uid", commentUid);
  if (error) return error;
  return data;
};
 
// 댓글 조회
export const getComments = async (postUid: string): Promise<CommentType[]> => {
  try {
    const { data: comments } = await supabase
      .from("community_comment")
      .select("*")
      .eq("post_uid", postUid)
      .order("created_date");
    return comments || [];
  }
  catch (error) {
    throw error;
  }
};