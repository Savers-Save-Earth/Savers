"use client";
import TextEditor from "./quill/TextEditor";
import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePost } from "@/api/community/post";
import { convertTimestamp } from "@/libs/util";
import { Database } from "@/types/supabase";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type PostType = Database["public"]["Tables"]["community"]["Update"];
type EditPostProps = {
  postDetail?: PostType;
  postUid: string | string[];
}

const EditPost: React.FC<EditPostProps> = ({ postDetail, postUid }) => {
  const currentUser = useAuth();
  const router = useRouter();

  const [category, setCategory] = useState(postDetail?.category ?? "");
  const [title, setTitle] = useState(postDetail?.title);
  const [content, setContent] = useState(postDetail?.content ?? "");

  const selectChangeHandler = (
    e: React.ChangeEvent<HTMLSelectElement>,
    setCategory: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    setCategory(e.currentTarget.value);
  };

  console.log("postDetail >>> ", postDetail)
  console.log("postuid >>> ", postUid)

  const queryClient = useQueryClient();
  const updateMutation = useMutation(updatePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["postDetail", postDetail?.post_uid] });
      window.alert("게시글이 정상적으로 수정되었습니다.");
      location.href = `/community/${postDetail?.post_uid}`;
    },
    onError: (error) => {
      console.error("게시글 수정 에러:", error);
      window.alert("게시글이 정상적으로 수정되지 않았습니다. 다시 시도해주세요!");
    },
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      return router.push("/login");
    } else {
      const writtenTime = new Date();
    const editPost: PostType = {
      post_uid: postDetail?.post_uid,
      category,
      title,
      content,
      author_name: currentUser.nickname,
      updated_date: convertTimestamp(writtenTime),
    };
  
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
  
    updateMutation.mutate(editPost);
    }
  };  

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-5/6 h-4/5 mt-10 flex flex-col space-y-5">
        <select
          name="category"
          value={category}
          onChange={(e) => selectChangeHandler(e, setCategory)}
          className="w-1/5"
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
          className="w-1/2 p-2 outline-none border-b text-lg"
        />
        <div className="h-96">
          <TextEditor
            content={content ?? ""}
            setContent={setContent}
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-green-200 w-48 py-3 mx-auto hover:bg-green-300">
          게시글 수정
        </button>
      </form>
    </>
  );
};

export default EditPost