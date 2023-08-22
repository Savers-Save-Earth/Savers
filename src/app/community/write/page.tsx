import type { NextPage } from "next";
import AddPost from "@/components/community/AddPost";

// 세션 여부 확인 후 로그인 유저 없으면 메인으로 이동

const Write: NextPage = () => {
  return (
    <>
      <h1>write page</h1>
      <AddPost />
    </>
  )
}

export default Write