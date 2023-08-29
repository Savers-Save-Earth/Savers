"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/libs/supabase";

const HeaderForMain = () => {
  const [scrollY, setScrollY] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [userNickname, setUserNickname] = useState<any>(null);

  const getUserNickname = async (id: string) => {
    const { data: userNickDB, error } = await supabase.from("user").select("nickname").eq("uid", id)
    if (error) {console.log(error); return false};
    const userNickname = userNickDB[0].nickname
    setUserNickname(userNickname)
}

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(false);
    } else {
      setUser(user);
      getUserNickname(user.id)
    }
  };

  useEffect(() => {
    getUser();
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const loginLogoutSwitcher = async () => {
    if (user) {
      await supabase.auth.signOut();
      location.reload();
      alert("로그아웃되었습니다");
    } else {
      router.push("/login");
    }
  };

  const signupProfileSwitcher = () => {
    if (user) {
      // router.push(`/profile/${user.id}/myprofile`);
      const queryEncode = encodeURIComponent(userNickname)
      router.push(`/profile/${queryEncode}/myprofile`);
    } else {
      router.push("/signup");
    }
  };

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
              onClick={loginLogoutSwitcher}
              className="border-0 py-1 px-3 focus:outline-nonerounded text-base"
              style={{ color: scrollY < 3000 ? "white" : "black" }}
            >
              {user ? "로그아웃" : "로그인"}
            </button>
            {user ? (
              <button
                onClick={signupProfileSwitcher}
                className="border-0 py-1 px-3 focus:outline-none rounded text-base"
                style={{ color: scrollY < 3000 ? "white" : "black" }}
              >
                마이페이지
              </button>
            ) : (
              <button
                onClick={signupProfileSwitcher}
                className="border-0 py-1 px-3 focus:outline-nonerounded text-base"
                style={{ color: scrollY < 3000 ? "white" : "black" }}
              >
                회원가입
              </button>
            )}
            <button
              onClick={signupProfileSwitcher}
              className="border-0 py-1 px-3 focus:outline-none rounded text-base"
              style={{ color: scrollY < 3000 ? "white" : "black" }}
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
