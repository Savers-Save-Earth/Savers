"use client";
import { updatePost } from "@/api/community/post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NextPage } from "next";

const EditPost: NextPage = () => {
  const queryClient = useQueryClient();
  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityAllPosts"] });
      window.alert("게시글이 정상적으로 수정되었습니다.");
      location.href = "/community";
    },
    onError: (error) => {
      console.error("게시글 수정 에러:", error);
      window.alert("게시글이 정상적으로 수정되지 않았습니다. 다시 시도해주세요!");
    },
  });
  return (
    <div>EditPost</div>
  )
}

export default EditPost;