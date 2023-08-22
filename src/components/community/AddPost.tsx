"use client";
import type { NextComponentType } from "next";
import TextEditor from "./quill/TextEditor";
import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/api/community/post";
import { convertTimestamp } from "@/libs/util";

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
      queryClient.invalidateQueries({ queryKey: ['post'] });
      window.alert("게시글이 정상적으로 등록되었습니다.");
    },
    onError: (error) => {
      console.error('게시글 등록 에러:', error);
      window.alert('글이 정상적으로 등록되지 않았습니다.');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const writtenTime = new Date();
    const newPost = {
      author_uid: 'bd2125b8-d852-485c-baf3-9c7a8949beee',
      category,
      title,
      content,
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
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-2/3 h-4/5 mt-10 flex flex-col space-y-5">
        <select
          name="category"
          onChange={(e) => selectChangeHandler(e, setCategory)}
          className="w-1/5"
        >
          <option value="" disabled selected>
            카테고리를 선택해주세요
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
          className="rounded-md bg-green-200 w-52 py-3">
          게시글 등록
        </button>
      </form>
    </>
  )
}

export default AddPost