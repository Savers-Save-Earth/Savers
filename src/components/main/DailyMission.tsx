"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import supabase from "@/libs/supabase";
import { useRouter } from "next/navigation";

const DailyMission = () => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: userData } = await supabase
        .from("user")
        .select()
        .eq("uid", user?.id);

      if (!user) {
        setUser(false);
      } else {
        setUser(userData);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const missionHandler = () => {
    if (!user) {
      console.log("로그인 후 이용해주세요.");
    } else {
      router.push(`/profile/${user[0]?.nickname}/mymission/missiondoing`);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <h1 className="text-2xl mb-6">일일미션</h1>
      <div
        onClick={missionHandler}
        className="flex items-center justify-between w-full rounded-2xl p-8 mb-16 cursor-pointer"
        style={{ background: "#5FD100" }}
      >
        <div>
          <span className="text-white text-[20px]">지구를 지키는</span>
          <br />
          <span className="font-semibold text-white text-[20px]">
            일일미션 랜덤 뽑기
          </span>
        </div>
        <img
          src="/assets/arrow_right.png"
          className="inline-block"
          style={{ verticalAlign: "middle" }}
        />
      </div>
    </>
  );
};

export default DailyMission;
