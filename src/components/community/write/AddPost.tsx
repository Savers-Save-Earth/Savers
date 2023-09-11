"use client";
import type { NextComponentType } from "next";
import { useAuth } from "@/hooks/useAuth";
import TextEditor from "./TextEditor";
import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/community/post";
import { convertDate, convertTimestamp, removeHtmlTags } from "@/libs/util";

import {
  getMissionHandler,
  updateMissionHandler,
} from "@/api/mission/checkMission";
import { NewPostType } from "@/types/types";
import { ToastError, ToastSuccess, ToastWarn } from "@/libs/toastifyAlert";
import { useIsLaptop } from "@/hooks/useIsLaptop";
import { useRouter } from "next/navigation";
import { COMMUNITY_TOAST_TEXT } from "@/enums/messages";

const currentDate = convertDate(new Date());

const AddPost: NextComponentType = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isLaptop = useIsLaptop();
  const router = useRouter();

  // 미션 관련 부분(동준님)
  const [missionUid, setMissionUid] = useState<any>("");
  const bigCategory = "글쓰기";

  const currentUser = useAuth();

  const selectChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setCategory: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setCategory(e.currentTarget.value);
  };

  const queryClient = useQueryClient();
  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityAllPosts"] });
      ToastSuccess(COMMUNITY_TOAST_TEXT.POST_ADD_SUCCESS);
      router.push("/community")
    },
    onError: (error) => {
      ToastError(COMMUNITY_TOAST_TEXT.POST_ADD_ERROR);
    },
  });

  // 미션 관련 부분(동준님)
  useEffect(() => {
    // 사용함수는 api폴더의 checkMission.ts에 있음
    if (!currentUser) return;
    getMissionHandler(
      currentUser,
      currentDate,
      category,
      setMissionUid,
      bigCategory,
    );
  }, [category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const writtenTime = new Date();
    const newPost: NewPostType = {
      category,
      title,
      content,
      author_uid: currentUser?.uid,
      author_name: currentUser?.nickname,
      created_date: convertTimestamp(writtenTime),
      updated_date: convertTimestamp(writtenTime),
    };

    if (category === "") {
      ToastWarn(COMMUNITY_TOAST_TEXT.CATEGORY_SELECT_ERROR);
      return false;
    }
    if (title.length < 1) {
      ToastWarn(COMMUNITY_TOAST_TEXT.TITLE_EMPTY_ERROR);
      return false;
    }
    if (removeHtmlTags(content).length < 1) {
      ToastWarn(COMMUNITY_TOAST_TEXT.CONTENT_EMPTY_ERROR);
      return false;
    }
    createMutation.mutate(newPost);
  };

  return (
    <div className="w-full flex flex-col items-start self-stretch space-y-10 mb-10">
      {isLaptop ? null : <h1 className="text-2xl font-semibold">글쓰기</h1>}
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          updateMissionHandler(missionUid);
        }}
        className="flex flex-col space-y-5 w-full items-stretch md:h-[970px]"
      >
        <div className="w-full flex xl:flex-row xl:space-y-0 space-y-3 flex-col xl:space-x-4 space-x-0 xl:items-center justify-center">
          <select
            name="category"
            onChange={(e) => {
              selectChangeHandler(e, setCategory);
            }}
            className="xl:w-1/6 p-4 bg-gray-50 text-sm text-gray-500 rounded-md focus:outline-none"
          >
            <option defaultValue="" disabled selected>
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
              등록
            </button>
          )}
        </div>
        <div className="w-full xl:h-[850px] h-[390px] mx-auto">
          <TextEditor content={content} setContent={setContent} />
        </div>
      </form>
      {isLaptop ? (
        <button
          onClick={handleSubmit}
          type="submit"
          className="w-16 mx-auto xl:w-1/12 px-3 py-2 rounded-xl bg-gray-950 text-white"
        >
          등록
        </button>
      ) : null}
    </div>
  );
};

export default AddPost;
