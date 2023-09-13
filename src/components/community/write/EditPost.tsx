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
import { useIsLaptop } from "@/hooks/useIsLaptop";
import { COMMUNITY_TOAST_TEXT } from "@/enums/messages";

const EditPost = () => {
  const currentUser = useAuth();
  const router = useRouter();
  const isLaptop = useIsLaptop();
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
      queryClient.invalidateQueries({
        queryKey: ["postDetail", postDetail?.post_uid],
      });
      ToastSuccess(COMMUNITY_TOAST_TEXT.POST_EDIT_SUCCESS);
      router.push(`/community/${postDetail?.post_uid}`);
    },
    onError: (error) => {
      ToastError(COMMUNITY_TOAST_TEXT.POST_EDIT_ERROR);
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
        ToastWarn(COMMUNITY_TOAST_TEXT.CATEGORY_SELECT_ERROR);
        return false;
      }
      if (title === "") {
        ToastWarn(COMMUNITY_TOAST_TEXT.TITLE_EMPTY_ERROR);
        return false;
      }
      if (removeHtmlTags(content).length < 1) {
        ToastWarn(COMMUNITY_TOAST_TEXT.CONTENT_EMPTY_ERROR);
        return false;
      }

      updateMutation.mutate(editPost);
    }
  };

  return (
    <div className="w-full flex flex-col items-start self-stretch space-y-10 mb-10">
      {isLaptop ? null : (
        <h1 className="text-2xl font-semibold">작성 글 수정</h1>
      )}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-5 w-full items-stretch md:h-[970px]"
      >
        <div className="w-full flex xl:flex-row xl:space-y-0 space-y-3 flex-col xl:space-x-4 space-x-0 xl:items-center justify-center">
          <select
            name="category"
            value={category}
            onChange={(e) => selectChangeHandler(e, setCategory)}
            className="xl:w-1/6 p-4 bg-gray-50 text-sm text-gray-500 rounded-md focus:outline-none"
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
            className="w-full p-4 outline-none text-sm bg-gray-50 rounded-xl"
          />
          {isLaptop ? null : (
            <button
              type="submit"
              className="xl:w-1/12 px-3 py-2 rounded-xl bg-gray-950 text-white"
            >
              수정
            </button>
          )}
        </div>
        <div className="w-full xl:h-[700px] md:h-[600px] h-[320px] mx-auto">
          <TextEditor content={content ?? ""} setContent={setContent} />
        </div>
      </form>
      {isLaptop ? (
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-16 mx-auto xl:w-1/12 px-3 py-2 rounded-xl bg-gray-950 text-white"
        >
          수정
        </button>
      ) : null}
    </div>
  );
};

export default EditPost;
