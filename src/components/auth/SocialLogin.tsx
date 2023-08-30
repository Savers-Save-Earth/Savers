"use client";
import supabase from "@/libs/supabase";
import React, { useState, useEffect } from "react";
import NicknameMaker from "@/components/auth/NicknameMaker";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";

type Provider = "google" | "kakao" | "facebook";

const SocialLogin = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);

  const signInWithOAuthAndLog = async (provider: Provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: "http://localhost:3000/login/loginloading",
        },
      });

      console.log(data);
      if (error) {
        throw error;
      }

      await getUser();
      window.alert("로그인⚡️");
    } catch (error: any) {
      window.alert(`${provider} 로그인 에러: ${error.message}`);
    }
  };

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log();
    if (!user) {
      setUser(null);
    } else {
      setUser(user);
      console.log(user.id);
      console.log(user.user_metadata);
    }
  };

  useEffect(() => {
    if (user) {
      async function exeGetUserInfo() {
        await getUserInfo();
      }
      exeGetUserInfo();
    }
  }, [user]);

  const getUserInfo = async () => {
    const { data: userInfo } = await supabase
      .from("user")
      .select("id")
      .eq("uid", user!.id)
      .single();
    if (userInfo) {
      console.log("유저정보등록되어있음");
      return;
    } else {
      updateUserInfo();
    }
  };

  const updateUserInfo = async () => {
    await supabase.from("user").insert({
      uid: user!.id,
      email: user!.user_metadata["email"],
      nickname: generateNickname,
    });
    console.log("userInfo반영");
    setNickname(generateNickname);
  };

  const generateNickname = () => {
    const nickname = NicknameMaker();
    return nickname;
    console.log(nickname);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "48px",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "48px",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "16px",
          }}
        >
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                signInWithOAuthAndLog("kakao");
              }}
            >
              <button style={{ width: "48px", height: "48px", flexShrink: 0 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 1.04889C4.76667 1.04889 0 5.25556 0 8.81445C0 11.4811 1.73111 13.8333 4.36778 15.2311L3.25889 19.3044C3.16 19.6656 3.57 19.9522 3.88444 19.7444L8.74778 16.5167C9.15778 16.5567 9.57556 16.58 10 16.58C15.5222 16.58 20 13.1033 20 8.81445C20 5.25556 15.5222 1.04889 10 1.04889Z"
                    fill="#FEE500"
                  />
                </svg>
              </button>
            </form>
          </div>

          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                signInWithOAuthAndLog("google");
              }}
            >
              <button style={{ width: "48px", height: "48px", flexShrink: 0 }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                >
                  <g clipPath="url(#clip0_1010_22070)">
                    <path
                      d="M24 48C10.7429 48 0 37.2571 0 24C0 10.7429 10.7429 0 24 0C37.1429 0 48 10.7429 48 24C48 37.2571 37.2571 48 24 48Z"
                      fill="#FEE500"
                      stroke="#E4E7EC"
                    />
                    {/* 나머지 SVG 내용 */}
                  </g>
                  <defs>
                    <clipPath id="clip0_1010_22070">
                      <rect width="48" height="48" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </form>
          </div>
        </div>

        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signInWithOAuthAndLog("google");
            }}
          >
            <button className="pt-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
              >
                <g clip-path="url(#clip0_1010_22070)">
                  <path
                    d="M24 47.5C11.019 47.5 0.5 36.981 0.5 24C0.5 11.019 11.019 0.5 24 0.5C36.8683 0.5 47.5 11.0205 47.5 24C47.5 36.981 36.981 47.5 24 47.5Z"
                    fill="white"
                    stroke="#E4E7EC"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M33.6005 24.2273C33.6005 23.5182 33.5369 22.8364 33.4187 22.1819H24.0005V26.0501H29.3823C29.1505 27.3001 28.4459 28.3591 27.3869 29.0682V31.5773H30.6187C32.5096 29.8364 33.6005 27.2728 33.6005 24.2273Z"
                    fill="#4285F4"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24.0003 33.9999C26.7003 33.9999 28.964 33.1044 30.6185 31.5772L27.3867 29.0681C26.4912 29.6681 25.3458 30.0226 24.0003 30.0226C21.3958 30.0226 19.1912 28.2635 18.4049 25.8999H15.064V28.4908C16.7094 31.759 20.0912 33.9999 24.0003 33.9999Z"
                    fill="#34A853"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M18.4045 25.9001C18.2045 25.3001 18.0909 24.6592 18.0909 24.0001C18.0909 23.341 18.2045 22.7001 18.4045 22.1001V19.5092H15.0636C14.3864 20.8592 14 22.3864 14 24.0001C14 25.6137 14.3864 27.141 15.0636 28.491L18.4045 25.9001Z"
                    fill="#FBBC05"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M24.0003 17.9773C25.4685 17.9773 26.7867 18.4818 27.8231 19.4727L30.6912 16.6045C28.9594 14.9909 26.6958 14 24.0003 14C20.0912 14 16.7094 16.2409 15.064 19.5091L18.4049 22.1C19.1912 19.7364 21.3958 17.9773 24.0003 17.9773Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1010_22070">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SocialLogin;
