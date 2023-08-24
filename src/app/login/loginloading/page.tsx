"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import supabase from "@/libs/supabase";
import { useRouter } from "next/navigation";
import NicknameMaker from "@/components/auth/NicknameMaker";

const LoginLoading = () => {
  const [user, setUser] = useState<user | null>(null);
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    async function exe() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log("user", user);
      setUser(user);
      getUserInfo();
    }
    exe();
  }, []);

  console.log("getUser확인", user);

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
      <div>loading</div>
    </>
  );
};

export default LoginLoading;
