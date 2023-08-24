"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
        className="fixed z-10 text-gray-600 body-font w-full"
        style={{ background: scrollY < 3000 ? "none" : "white" }}
      >
        <div className="container mx-auto flex flex-wrap p-5 justify-between items-center">
          <a
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            onClick={() => {
              router.push("/");
            }}
          >
            <span
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
              style={{ color: scrollY < 3000 ? "white" : "black" }}
            >
              친환경 제품 구매
            </a>
            <a
              onClick={() => {
                router.push("/restaurant");
              }}
              className="mr-5 hover:text-gray-900"
              style={{ color: scrollY < 3000 ? "white" : "black" }}
            >
              비건식당 찾기
            </a>
            <a
              onClick={() => {
                router.push("/community");
              }}
              className="mr-5 hover:text-gray-900"
              style={{ color: scrollY < 3000 ? "white" : "black" }}
            >
              커뮤니티
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => {
                router.push("/login");
              }}
              className="border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
              style={{
                background: scrollY < 3000 ? "none" : "white",
                color: scrollY < 3000 ? "white" : "black",
              }}
            >
              로그인
            </button>
            <button
              onClick={() => {
                router.push("/signup");
              }}
              className="border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
              style={{
                background: scrollY < 3000 ? "none" : "white",
                color: scrollY < 3000 ? "white" : "black",
              }}
            >
              회원가입
            </button>
            <button
              className="border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
              style={{
                background: scrollY < 3000 ? "none" : "white",
                color: scrollY < 3000 ? "white" : "black",
              }}
            >
              다크모드
            </button>
          </div>
        </div>
      </header>
      <div className="header-placeholder h-16" />
    </>
  );
};

export default HeaderForMain;
