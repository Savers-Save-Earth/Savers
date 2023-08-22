"use client";
import type { NextComponentType } from "next";
import TextEditor from "./quill/TextEditor";
import { useState } from "react";

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

  return (
    <>
      <select
        name="category"
        onChange={(e) => selectChangeHandler(e, setCategory)}>
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
      />
      <div className="w-1/2">
        <TextEditor
          content={content}
          setContent={setContent}
        />
      </div>
    </>
  )
}

export default AddPost