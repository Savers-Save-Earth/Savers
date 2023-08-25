"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import supabase from "@/libs/supabase";
import { useRouter } from "next/navigation";
import NicknameMaker from "@/components/auth/NicknameMaker";
import { User } from "@supabase/supabase-js";

const LoginLoading = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    async function exe() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user", user);
      loginUpdater();
      setUser(user);
      getUserInfo();
      router.push("/");
    }
    exe();
  }, []);

  console.log("getUser확인", user?.id);

  const loginUpdater = async () => {
    await supabase.from("user").upsert({
      isLogin: true,
    });
  };

  const getUserInfo = async () => {
    const { data: userInfo } = await supabase
      .from("user")
      .select("uid")
      .eq("uid", user?.id)
      .single();
    if (userInfo) {
      console.log("유저정보등록되어있음");
      return;
    } else {
      updateUserInfo();
    }
  };

  const updateUserInfo = async () => {
    await supabase.from("user").upsert({
      uid: user!.id,
      email: user!.user_metadata["email"],
      nickname: generateNickname,
      provider: user!.app_metadata.provider,
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
      <div>loading</div>
    </>
  );
};

export default LoginLoading;
