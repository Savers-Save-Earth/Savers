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
    console.log({ getUser: user });
    if (!user) {
      setUser(null);
    } else {
      setUser(user);
      getUserNickname(user.id);
    }
  };

  // onAuthStateChanged
  // supabase
  useEffect(() => {
    console.log("Header가 마운트됐다.");
    // onAuthStateChange는 실제로 supabase에 회원가입, 로그인, 로그아웃의 변경을 계속 주시하고 있는 놈
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("onAuthStateChanged: ", event, session);
      if (!session?.user) {
        setUser(null);
      } else {
        setUser(session.user);
        getUserNickname(session.user.id);
      }
    });
    // getUser();
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
            "fixed top-0 left-1/2 -translate-x-1/2 z-10 text-gray-900 w-screen",
            scrollY < 3000 ? "bg-transparent" : "bg-white/30 backdrop-blur-md",
          )}
        >
          <div className="w-[1280px] container mx-auto flex flex-wrap p-5 justify-between items-center">
            <Link href={`/`}>
              <span
                className={cls(
                  "ml-3 text-xl flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0",
                )}
              >
                {scrollY < 3000 ? (
                  <img src="/assets/logo_white.png" />
                ) : (
                  <img src="/assets/logo_basic.png" />
                )}
              </span>
            </Link>
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l flex flex-wrap items-center text-base justify-center">
              <Link
                href={`/product`}
                className={cls(
                  "mr-5",
                  scrollY < 3000
                    ? "text-white border-gray-100"
                    : "text-gray-900 border-gray-500",
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
              >                {user ? "로그아웃" : "로그인"}
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
        <header className="fixed top-0 left-1/2 -translate-x-1/2 z-10 text-gray-900 w-screen bg-white/30 backdrop-blur-md">
          <div className="w-[1280px] container mx-auto flex flex-wrap p-5 justify-between items-center">
            <Link href={`/`}>
              <span className="flex font-medium items-center text-gray-900 mb-4 md:mb-0 ml-3 text-xl">
                <img src="/assets/logo_basic.png" />
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
