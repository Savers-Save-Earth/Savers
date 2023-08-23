"use client";
import { useRouter } from "next/navigation";

const Community = () => {
  const router = useRouter();
  return (
    <>
      <div className="w-1/2 mt-10 flex flex-col mx-auto items-center justify-center space-y-5">
        <h1 className="text-3xl">커뮤니티 메인 페이지</h1>
        <h2>아마 전체글 보기 페이지가 되지 않을까</h2>
        <button
          onClick={()=>router.push('/community/write')}
          className="w-24 py-2 bg-blue-100">
          글쓰기
        </button>
      </div>
    </>
  );
};

export default Community;
