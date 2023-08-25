"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import supabase from "@/libs/supabase";

const Header = () => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [userNickname, setUserNickname] = useState<any>(null);

  const getUserNickname = async (id: string) => {
    const { data: userNickDB, error } = await supabase.from("user").select("nickname").eq("uid", id)
    if (error) {console.log(error); return false};
    const userNickname = userNickDB[0].nickname
    console.log("userNickname===>",userNickname)
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
      console.log("헤더에 찍힌 유저아이디 ==>", user!.id);
      getUserNickname(user.id)
    }
  };

  useEffect(() => {
    getUser();
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
      // router.push(`/profiletest/${user.id}/myprofile`);
      const queryEncode = encodeURIComponent(userNickname)
      router.push(`/profiletest/${queryEncode}/myprofile`);
    } else {
      router.push("/signup");
    }
  };
  return (
    <>
      <header className="fixed z-10 text-gray-600 body-font w-full">
        <div className="container mx-auto flex flex-wrap p-5 justify-between items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span
              onClick={() => {
                router.push("/");
              }}
              className="ml-3 text-xl"
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

          <div className="flex items-center space-x-4">
            <button
              onClick={loginLogoutSwitcher}
              className="border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
            >
              {user ? "로그아웃" : "로그인"}
            </button>
            {user ? (
              <button
                onClick={signupProfileSwitcher}
                className="border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
              >
                마이페이지
              </button>
            ) : (
              <button
                onClick={signupProfileSwitcher}
                className="border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
              >
                회원가입
              </button>
            )}
            <button
              onClick={signupProfileSwitcher}
              className="border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base"
            >
              다크모드
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
