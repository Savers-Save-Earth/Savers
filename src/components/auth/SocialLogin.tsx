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
      <div className="w-full mt-8 flex items-center justify-center space-x-6">
        <button onClick={() => signInWithOAuthAndLog("kakao")}>
          <div className="flex items-center justify-center bg-[#FEE500] rounded-full">
            <div className="rounded-full items-center justify-center">
              <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
                width="50" height="50" viewBox="0 0 78.000000 78.000000"
                preserveAspectRatio="xMidYMid meet">
                <g transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)"
                fill="#000000" stroke="none">
                <path d="M305 551 c-64 -30 -90 -64 -90 -121 0 -43 5 -54 36 -87 33 -35 36
                -41 27 -72 -5 -18 -7 -35 -4 -38 2 -3 25 9 50 26 27 19 57 31 78 31 43 1 106
                30 138 64 19 22 25 38 25 76 0 38 -6 54 -25 76 -57 61 -158 81 -235 45z"/>
                </g>
              </svg>
            </div>
          </div>
        </button>
        <button onClick={() => signInWithOAuthAndLog("google")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
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
        <button onClick={() => signInWithOAuthAndLog("facebook")}>
          <div className="rounded-full bg-white">
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
            width="48" height="48" viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet">
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
            fill="#1877F2" stroke="none">
            <path d="M2370 5080 c-510 -37 -999 -230 -1405 -554 -96 -77 -294 -274 -372
            -371 -83 -103 -207 -287 -267 -398 -293 -536 -377 -1203 -230 -1805 153 -623
            540 -1168 1084 -1524 123 -81 362 -201 505 -253 110 -41 332 -100 413 -111
            l52 -7 0 882 0 881 -320 0 -320 0 0 370 0 370 319 0 318 0 6 353 c4 269 9 372
            21 437 42 216 120 371 250 500 121 119 261 190 457 230 93 20 126 21 319 17
            180 -4 430 -26 478 -42 9 -3 12 -76 12 -319 l0 -314 -227 -4 c-207 -4 -233 -6
            -285 -27 -80 -31 -148 -96 -184 -173 l-29 -63 -3 -297 -3 -298 350 0 c193 0
            351 -1 351 -3 0 -2 -25 -164 -55 -360 -30 -196 -55 -361 -55 -367 0 -7 -96
            -10 -295 -10 l-295 0 0 -881 0 -882 52 7 c81 11 305 71 414 111 55 20 167 69
            249 110 499 244 906 651 1150 1150 156 318 231 598 257 960 25 361 -39 762
            -177 1105 -309 767 -985 1343 -1790 1524 -223 51 -517 72 -745 56z"/>
            </g>
            </svg>
          </div>
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
