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
  // const currentUrl = window.location.href;
  // console.log(`${currentUrl}/loginloading`);

  // const signInWithOAuthAndLog = async (provider: Provider) => {
  //   try {
  //     const { data, error } = await supabase.auth.signInWithOAuth({
  //       provider: provider,

  //       // options: {
  //       //   redirectTo: `${currentUrl}/loginloading`,
  //       // },
  //     });

  //     console.log("소셜로그인 되었을 때 data", data);

  //     if (error) {
  //       throw error;
  //     }

  //     await getUser();
  //     window.alert("로그인⚡️");
  //   } catch (error: any) {
  //     window.alert(`${provider} 로그인 에러: ${error.message}`);
  //   }
  // };

  const signInWithOAuthAndLog = async (provider: Provider) => {
    try {
      const currentUrl = window.location.href;
      const options = {
        redirectTo:
          currentUrl === "http://localhost:3000/login"
            ? `${currentUrl}/loginloading`
            : "https://savers-git-dev-team-climbers.vercel.app/login/loginloading",
      };

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: options,
      });

      console.log("소셜로그인 되었을 때 data", data);
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

  // useEffect(() => {
  //   console.log("마운트됐다.");
  //   supabase.auth.onAuthStateChange((event, session) => {
  //     console.log("onAuthStateChanged: ", event, session);
  //     if (!session?.user) {
  //       setUser(null);
  //     } else {
  //       setUser(session.user);
  //       getUserInfo(session.user);
  //       console.log("getUserInfo>>>", getUserInfo);
  //     }
  //   });
  // async function exe() {
  //   const {
  //     data: { user },
  //   } = await supabase.auth.getUser();

  //   console.log("getUser>>>", user);

  //   // loginUpdater();
  //   await setUser(user);
  //   await getUserInfo(user);
  //   router.push("/");
  // }
  // exe();
  // }, []);

  const getUserInfo = async (user: any) => {
    if (!user) {
      console.log("getUerInfo User 없음");
      return;
    }

    const { data: userInfo } = await supabase
      .from("user")
      .select("*")
      .eq("uid", user!.id)
      .single();

    if (userInfo?.nickname) {
      console.log("닉네임등록되어있음", userInfo.nickname);
      return;
    } else {
      updateUserInfo(user);
      console.log("닉네임 및 유저정보 등록하러감");
    }
  };

  const updateUserInfo = async (user: any) => {
    const generatedNickname = generateNickname();
    console.log("nickname>>", generatedNickname);
    console.log("user가져왔나?>>>", user);

    await supabase.from("user").upsert({
      uid: user?.id,
      email: user!.user_metadata["email"],
      nickname: generatedNickname,
      provider: user!.app_metadata.provider,
    });

    console.log("userInfo반영");
    setNickname(generatedNickname);
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
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 78.000000 78.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,78.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M305 551 c-64 -30 -90 -64 -90 -121 0 -43 5 -54 36 -87 33 -35 36
                -41 27 -72 -5 -18 -7 -35 -4 -38 2 -3 25 9 50 26 27 19 57 31 78 31 43 1 106
                30 138 64 19 22 25 38 25 76 0 38 -6 54 -25 76 -57 61 -158 81 -235 45z"
                  />
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
        <button onClick={() => signInWithOAuthAndLog("facebook")} className="">
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 1072.000000 1067.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,1067.000000) scale(0.100000,-0.100000)"
              fill="#1877f2"
              stroke="none"
            >
              <path
                d="M5145 10653 c-1562 -62 -3013 -805 -3981 -2038 -921 -1172 -1304
          -2680 -1058 -4165 181 -1088 701 -2096 1488 -2883 829 -829 1881 -1352 3046
          -1512 433 -59 985 -60 1430 0 1246 166 2408 781 3249 1720 664 741 1098 1623
          1276 2592 98 534 112 1138 40 1673 -185 1378 -893 2616 -1990 3481 -991 781
          -2233 1183 -3500 1132z m1495 -2937 c19 -3 78 -10 130 -16 167 -17 319 -38
          330 -45 7 -4 10 -168 10 -496 l0 -489 -302 0 c-283 0 -395 -8 -440 -31 -10 -5
          -24 -9 -31 -9 -7 0 -44 -16 -82 -35 -123 -63 -213 -179 -261 -335 -14 -47 -17
          -120 -21 -487 l-5 -433 540 0 c439 0 542 -2 551 -13 6 -8 9 -16 6 -18 -2 -3
          -20 -108 -39 -234 -19 -127 -37 -246 -40 -265 -10 -56 -35 -228 -46 -315 -5
          -44 -14 -96 -20 -115 -5 -19 -12 -62 -15 -95 -4 -33 -9 -70 -12 -82 l-5 -23
          -459 0 -459 0 0 -1370 0 -1370 -26 -10 c-14 -6 -47 -10 -74 -10 -30 0 -50 -5
          -52 -12 -6 -18 -918 -19 -939 -2 -8 6 -42 14 -76 17 -34 3 -66 8 -72 12 -8 4
          -11 415 -11 1375 l0 1370 -497 2 -498 3 -3 569 c-2 449 0 571 10 578 7 4 232
          8 499 8 l486 0 5 533 c5 438 8 550 23 637 9 58 21 114 25 125 5 11 11 41 15
          67 3 26 10 50 15 53 4 3 11 23 15 45 4 22 11 42 16 46 5 3 9 13 9 23 0 31 116
          249 173 325 84 111 188 212 292 281 33 22 62 43 65 46 10 12 197 98 260 120
          88 30 219 59 365 82 38 7 598 0 645 -7z"
              />
            </g>
          </svg>
        </button>
      </div>
    </>
  );
};

export default SocialLogin;
