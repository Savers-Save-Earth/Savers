"use client";
import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

import TextEditor from "./TextEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "@/api/community/post";

import { editPostAtom } from "@/libs/atoms";
import { useRecoilValue } from "recoil";

import { convertTimestamp, removeHtmlTags } from "@/libs/util";

import { EditPostType } from "@/types/types";
import { ToastError, ToastSuccess, ToastWarn } from "@/libs/toastifyAlert";

const EditPost = () => {
  const currentUser = useAuth();
  const router = useRouter();
  const { postDetail } = useRecoilValue(editPostAtom);

  const [category, setCategory] = useState(postDetail?.category ?? "");
  const [title, setTitle] = useState(postDetail?.title);
  const [content, setContent] = useState(postDetail?.content ?? "");

  const selectChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setCategory: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setCategory(e.currentTarget.value);
  };

  const queryClient = useQueryClient();
  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postDetail", postDetail?.post_uid] });
      ToastSuccess("게시글이 정상적으로 수정되었습니다.");
      location.href = `/community/${postDetail?.post_uid}`;
    },
    onError: (error) => {
      console.error("게시글 수정 에러:", error);
      ToastError("게시글이 정상적으로 수정되지 않았습니다. 다시 시도해주세요!");
    },
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      return router.push("/login");
    } else {
      const writtenTime = new Date();
    const editPost: EditPostType = {
      post_uid: postDetail?.post_uid,
      category,
      title,
      content,
      author_name: currentUser.nickname,
      updated_date: convertTimestamp(writtenTime),
    };
  
    if (category === "") {
      ToastWarn("카테고리를 선택해주세요!");
      return false;
    }
    if (title === "") {
      ToastWarn("제목을 입력해주세요!");
      return false;
    }
    if (removeHtmlTags(content).length < 1) {
      ToastWarn("본문을 작성해주세요!");
      return false;
    }
  
    updateMutation.mutate(editPost);
    }
  };  

  return (
    <div className="w-full flex flex-col items-start self-stretch space-y-10">
      <h1 className="text-2xl font-semibold">작성 글 수정</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-5 w-full">
        <div className="flex space-x-2 items-center justify-center">
          <select
            name="category"
            value={category}
            onChange={(e) => selectChangeHandler(e, setCategory)}
            className="w-1/6 p-3 rounded-md focus:outline-none"
          >
            <option defaultValue="" disabled>
              카테고리
            </option>
            <option value="제품">제품</option>
            <option value="식당">식당</option>
            <option value="레시피">레시피</option>
            <option value="오지완">오.지.완</option>
          </select>
          <input
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            placeholder="제목을 입력해주세요."
            className="w-full p-2 outline-none border-b text-lg"
          />
          <button
            type="submit"
            className="w-1/12 px-3 py-2 rounded-xl bg-gray-950 text-white">
            수정
          </button>
          </div>
        <div className="w-full h-[850px] mx-auto">
          <TextEditor
            content={content ?? ""}
            setContent={setContent}
          />
        </div>
      </form>
    </div>
  );
};

export default EditPost