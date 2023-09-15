"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen flex flex-col space-y-6 justify-center items-center bg-white z-50">
        <Image
          src="/images/logo-basic.png"
          alt="404 페이지 로고"
          width={423}
          height={72}
          priority
        />
        <h1 className="text-2xl font-semibold">페이지를 찾을 수 없습니다.</h1>
        <button
          onClick={() => router.push("/")}
          className="bg-mainGreen p-4 text-white rounded-xl hover:bg-[#64c90c]">
          메인화면으로 돌아가기
        </button>
      </div>
    </>
  );
};

export default NotFound;
