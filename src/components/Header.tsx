"use client";
import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import supabase from "@/libs/supabase";
import Link from "next/link";
import { cls } from "@/libs/util";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [userNickname, setUserNickname] = useState<any>(null);

  const getUserNickname = async (id: string) => {
    const { data: userNickDB, error } = await supabase
      .from("user")
      .select("nickname")
      .eq("uid", id);
    if (error) {
      console.log(error);
      return false;
    }
    const userNickname = userNickDB[0].nickname;
    setUserNickname(userNickname);
  };

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUser(null);
    } else {
      setUser(user);
      getUserNickname(user.id);
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
      const queryEncode = encodeURIComponent(userNickname);
      router.push(`/profile/${queryEncode}/myprofile`);
    } else {
      router.push("/signup");
    }
  };
  return (
    <>
      {pathname === "/" ? (
        <header
          className={cls(
            "fixed z-10 text-gray-600 body-font w-full",
            scrollY < 3000 ? "bg-transparent" : "bg-white/30 backdrop-blur-md",
          )}
        >
          <div className="container mx-auto flex flex-wrap p-5 justify-between items-center">
            <Link href={`/`}>
              <span
                className={cls(
                  "ml-3 text-xl flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0",
                  scrollY < 3000 ? "text-white" : "text-black",
                )}
              >
                Savers
              </span>
            </Link>
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
              <Link
                href={`/product`}
                className={cls(
                  "mr-5",
                  scrollY < 3000 ? "text-white" : "text-gray-900",
                )}
              >
                친환경 제품 구매
              </Link>
              <Link
                href={`/restaurant`}
                className={cls(
                  "mr-5",
                  scrollY < 3000 ? "text-white" : "text-gray-900",
                )}
              >
                비건식당 찾기
              </Link>
              <Link
                href={`/community`}
                className={cls(
                  "mr-5",
                  scrollY < 3000 ? "text-white" : "text-gray-900",
                )}
              >
                커뮤니티
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button
                onClick={loginLogoutSwitcher}
                className={cls(
                  "border-0 py-1 px-3 focus:outline-none rounded text-base",
                  scrollY < 3000 ? "text-white" : "text-gray-900",
                )}
              >
                {user ? "로그아웃" : "로그인"}
              </button>
              {user ? (
                <button
                  onClick={signupProfileSwitcher}
                  className={cls(
                    "border-0 py-1 px-3 focus:outline-none rounded text-base",
                    scrollY < 3000 ? "text-white" : "text-gray-900",
                  )}
                >
                  마이페이지
                </button>
              ) : (
                <button
                  onClick={signupProfileSwitcher}
                  className={cls(
                    "border-0 py-1 px-3 focus:outline-none rounded text-base",
                    scrollY < 3000 ? "text-white" : "text-gray-900",
                  )}
                >
                  회원가입
                </button>
              )}
            </div>
          </div>
        </header>
      ) : (
        <header className="bg-white/50 backdrop-blur-md fixed z-10 text-gray-600 body-font w-full">
          <div className="container mx-auto flex flex-wrap p-5 justify-between items-center">
            <Link href={`/`}>
              <span className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0 ml-3 text-xl">
                Savers
              </span>
            </Link>
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
              <Link href={`/product`} className="mr-5 hover:text-gray-900">
                친환경 제품 구매
              </Link>
              <Link href={`/restaurant`} className="mr-5 hover:text-gray-900">
                비건식당 찾기
              </Link>
              <Link href={`/community`} className="mr-5 hover:text-gray-900">
                커뮤니티
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={loginLogoutSwitcher}
                className="border-0 py-1 px-3 focus:outline-none rounded text-base"
              >
                {user ? "로그아웃" : "로그인"}
              </button>
              {user ? (
                <button
                  onClick={signupProfileSwitcher}
                  className="border-0 py-1 px-3 focus:outline-none rounded text-base"
                >
                  마이페이지
                </button>
              ) : (
                <button
                  onClick={signupProfileSwitcher}
                  className="border-0 py-1 px-3 focus:outline-none rounded text-base"
                >
                  회원가입
                </button>
              )}
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
