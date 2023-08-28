"use client";
import type { NextComponentType } from "next";
import TextEditor from "./quill/TextEditor";
import { useEffect, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/community/post";
import { convertDate, convertTimestamp } from "@/libs/util";
import { Database } from "@/types/supabase";

import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import supabase from "@/libs/supabase";
import { getMissionHandler, updateMissionHandler } from "@/api/mission/checkMission";


type NewPost = Database["public"]["Tables"]["community"]["Insert"];

const currentDate = convertDate(new Date());

const AddPost: NextComponentType = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  ///===================👇동준작업👇=========================================================
  const [missionUid, setMissionUid] = useState<any>("")

  const bigCategory = "글쓰기"
///===================👆동준작업👆=========================================================

  const currentUser = useAuth();

  const selectChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setCategory: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setCategory(e.currentTarget.value);
  };
  // (1) queryClient 가져오기
  const queryClient = useQueryClient();
  // (2) mutation 함수
  const createMutation = useMutation(createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["communityAllPosts"] });
      window.alert("게시글이 정상적으로 등록되었습니다.");
      location.href = "/community";
    },
    onError: (error) => {
      console.error("게시글 등록 에러:", error);
      window.alert("게시글이 정상적으로 등록되지 않았습니다. 다시 시도해주세요!");
    },
  });
  ///===================👇동준작업👇=========================================================
  useEffect(() => {
    // 사용함수는 api폴더의 checkMission.ts에 있음
    if(!currentUser) return
    getMissionHandler(currentUser, currentDate, category, setMissionUid, bigCategory)
  },[category])
  ///===================👆동준작업👆=========================================================
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const writtenTime = new Date();
    const newPost: NewPost = {
      category,
      title,
      content,
      author_uid: currentUser?.uid,
      author_name: currentUser?.nickname,
      created_date: convertTimestamp(writtenTime),
      updated_date: convertTimestamp(writtenTime)
    }

    if (category === "") {
      window.alert("카테고리를 선택해주세요!");
      return false;
    }
    if (title === "") {
      window.alert("제목을 입력해주세요!");
      return false;
    }
    if (content === "") {
      window.alert("본문을 작성해주세요!");
      return false;
    }

    createMutation.mutate(newPost);

    // mutate가 하나 더

    // missionList를 업데이트하는(수파베이스) 로직
    
  }
  return (
    <>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          updateMissionHandler(missionUid)
        }}
        className="w-5/6 h-4/5 mt-10 flex flex-col space-y-5">
        <select
          name="category"
          onChange={(e) => {
            selectChangeHandler(e, setCategory)
          }}
          className="w-1/5"
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
          className="w-1/2 p-2 outline-none border-b text-lg"
        />
        <div className="h-96"> 
          <TextEditor
            content={content}
            setContent={setContent}
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-green-200 w-48 py-3 mx-auto hover:bg-green-300">
          게시글 등록
        </button>
      </form>
    </>
  )
}

export default AddPost