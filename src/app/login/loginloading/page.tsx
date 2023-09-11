"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import supabase from "@/libs/supabase";
import { useRouter } from "next/navigation";
import NicknameMaker from "@/components/auth/NicknameMaker";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastError, ToastSuccess } from "@/libs/toastifyAlert";

const LoginLoading = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    async function exe() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      await setUser(user);
      await getUserInfo(user);
      // ToastSuccess("로그인 되었습니다. 🌱");
      router.push("/");
    }
    exe();
  });

  const back = () => {
    router.back();
  };

  const getUserInfo = async (user: any) => {
    if (!user) {
      return;
    }

    const { data: userInfo } = await supabase
      .from("user")
      .select("*")
      .eq("uid", user!.id)
      .single();

    if (userInfo?.nickname) {
      return;
    } else {
      updateUserInfo(user);
    }
  };

  const updateUserInfo = async (user: any) => {
    const generatedNickname = generateNickname();
    // console.log("nickname>>", generatedNickname);

    await supabase.from("user").upsert({
      uid: user?.id,
      email: user!.user_metadata["email"],
      nickname: generatedNickname,
      provider: user!.app_metadata.provider,
    });

    // console.log("userInfo반영");
    setNickname(generatedNickname);
  };

  const generateNickname = () => {
    const nickname = NicknameMaker();
    return nickname;
    // console.log(nickname);
  };

  return (
    <>
      <div>loading</div>
    </>
  );
};

export default LoginLoading;
