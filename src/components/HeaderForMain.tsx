"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const HeaderForMain = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const router = useRouter();
  return (
    <>
      <header
        className="fixed z-10 text-gray-600 body-font"
        style={{ color: scrollY < 3000 ? "white" : "black" }}
      >
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span
              onClick={() => {
                router.push("/");
              }}
              className="ml-3 text-xl"
              style={{ color: scrollY < 3000 ? "white" : "black" }}
            >
              Savers
            </span>
          </a>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
            <a
              onClick={() => {
                router.push("/product");
              }}
              className="mr-5 hover:text-gray-900"
            >
              친환경 제품 구매
            </a>
            <a
              onClick={() => {
                router.push("/restaurant");
              }}
              className="mr-5 hover:text-gray-900"
            >
              비건식당 찾기
            </a>
            <a
              onClick={() => {
                router.push("/community");
              }}
              className="mr-5 hover:text-gray-900"
            >
              커뮤니티
            </a>
          </nav>
          <button
            onClick={() => {
              router.push("/login");
            }}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            style={{ background: scrollY < 3000 ? "gray" : "white" }}
          >
            로그인
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
          <button
            onClick={() => {
              router.push("/signup");
            }}
            className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
            style={{ background: scrollY < 3000 ? "gray" : "white" }}
          >
            회원가입
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </header>
    </>
  );
};

export default HeaderForMain;
