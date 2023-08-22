import type { NextPage } from "next";
import AddPost from "@/components/community/AddPost";

// 세션 여부 확인 후 로그인 유저 없으면 메인으로 이동

const Write: NextPage = () => {
  return (
    <>
      <div className="flex flex-col items-center w-11/12 mx-auto mt-10">
        <h1 className="text-2xl">게시글 작성 페이지</h1>
        <AddPost />
      </div>
    </>
  )
}

export default Write