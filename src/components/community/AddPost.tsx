"use client";
import type { NextComponentType } from "next";

import { useAuth } from "@/hooks/useAuth";
import TextEditor from "./quill/TextEditor";
import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/community/post";
import { convertDate, convertTimestamp, removeHtmlTags } from "@/libs/util";

import { getMissionHandler, updateMissionHandler } from "@/api/mission/checkMission";
import { NewPostType } from "@/types/types";
import { ToastError, ToastSuccess, ToastWarn } from "@/libs/toastifyAlert";

const currentDate = convertDate(new Date());

const AddPost: NextComponentType = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 미션 관련 부분(동준님)
  const [missionUid, setMissionUid] = useState<any>("")
  const bigCategory = "글쓰기"

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
      ToastSuccess("게시글이 정상적으로 등록되었습니다.");
      location.href = "/community";
    },
    onError: (error) => {
      console.error("게시글 등록 에러:", error);
      ToastError("게시글이 정상적으로 등록되지 않았습니다. 다시 시도해주세요!");
    },
  });
  
  // 미션 관련 부분(동준님)
  useEffect(() => {
    // 사용함수는 api폴더의 checkMission.ts에 있음
    if(!currentUser) return
    getMissionHandler(currentUser, currentDate, category, setMissionUid, bigCategory)
  },[category])


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
      updated_date: convertTimestamp(writtenTime)
    }

    if (category === "") {
      ToastWarn("카테고리를 선택해주세요!");
      return false;
    }
    if (title.length < 1) {
      ToastWarn("제목을 입력해주세요!");
      return false;
    }
    if (removeHtmlTags(content).length < 1) {
      ToastWarn("본문을 작성해주세요!");
      return false;
    }
    createMutation.mutate(newPost);
  }

  return (
    <div className="w-full flex flex-col items-start self-stretch space-y-10">
      <h1 className="text-2xl font-semibold">글쓰기</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          updateMissionHandler(missionUid)
        }}
        className="flex flex-col space-y-5 w-full">
        <div className="flex space-x-2 items-center justify-center">
          <select
            name="category"
            onChange={(e) => {
              selectChangeHandler(e, setCategory)
            }}
            className="w-1/6 p-3 rounded-md focus:outline-none"
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
            className="w-full p-2 outline-none border-b text-lg"
          />
          <button
            type="submit"
            className="w-1/12 px-3 py-2 rounded-xl bg-gray-950 text-white">
            등록
          </button>
        </div>
        <div className="w-full h-[850px] mx-auto"> 
          <TextEditor
            content={content}
            setContent={setContent}
          />
        </div>
      </form>
    </div>
  )
}

export default AddPost