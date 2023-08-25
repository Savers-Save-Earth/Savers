"use client";
import type { NextComponentType } from "next";
import TextEditor from "./quill/TextEditor";
import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/community/post";
import { convertDate, convertTimestamp } from "@/libs/util";
import { Database } from "@/types/supabase";
import supabase from "@/libs/supabase";

type NewPost = Database["public"]["Tables"]["community"]["Insert"];

export const currentDate = convertDate(new Date());

const AddPost: NextComponentType = () => {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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
      window.alert("게시글이 정상적으로 등록되었습니다.");
      location.href = "/community";
    },
    onError: (error) => {
      console.error("게시글 등록 에러:", error);
      window.alert("게시글이 정상적으로 등록되지 않았습니다. 다시 시도해주세요!");
    },
  });

  // Supabase로 현재 유저가 가지고 있는 미션 리스트 get(or supabase)
const getMission = async () => {
  const {data: missionLists, error} = await supabase.from("missionList").select("*").eq("createdAt", currentDate)

}
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const writtenTime = new Date();
    const newPost: NewPost = {
      category,
      title,
      content,
      author_uid: "bd2125b8-d852-485c-baf3-9c7a8949beee",
      author_name: "테스트닉네임",
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
        onSubmit={handleSubmit}
        className="w-5/6 h-4/5 mt-10 flex flex-col space-y-5">
        <select
          name="category"
          onChange={(e) => {
            // 현재 user가 해당 카테고리에 대한 미션을 갖고있는지를 체크
            // missionLists를 가지고 해당 카테고리가 미션에 있는지 확인
            // if (missionLists.find(e~~)~~~) {
            //   setMissionUId(여기에 set);
            // }

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