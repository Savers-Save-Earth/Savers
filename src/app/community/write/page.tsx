"use client";
import { NextPage } from "next";
import AddPost from "@/components/community/AddPost";

const Write: NextPage = () => {
  // 서버사이드에서 user session 있는지 판단해서 세션 없으면 redirect 홈
  return (
    <>
      <AddPost />
    </>
  )
}

export default Write;