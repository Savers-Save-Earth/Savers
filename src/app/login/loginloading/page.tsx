"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import supabase from "@/libs/supabase";
import { useRouter } from "next/navigation";
import NicknameMaker from "@/components/auth/NicknameMaker";

const LoginLoading = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    async function exe() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("getUser>>>", user);

      await setUser(user);
      await getUserInfo(user);
      back();
    }
    exe();
  });

  const back = () => {
    router.back();
    router.back();
    router.back();
  };

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
      <div>loading</div>
    </>
  );
};

export default LoginLoading;
