"use client";
import React from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import Badges from "@/components/profile/Badges";
import MissionCalendar from "@/components/profile/MissionCalendar";
import EditProfile from "@/components/profile/EditProfile";

type Profile = Database["public"]["Tables"]["user"]["Row"];
const MyProfile = async ({ params: { id } }: { params: { id: string } }) => {
  let { data: user, error } = await supabase
    .from("user")
    .select("*")
    .eq("uid", id);
  if (error) throw error;

  return (
    
    <div className="flex w-full h-full min-h-[640px] items-start gap-8 self-stretch justify-evenly">
      <div className="flex flex-col items-start gap-6 flex-[1,0,0%] rounded-xl self-stretch bg-white">
        <p className="self-stretch text-gray-900 text-[24px] non-italic font-semibold leading-6">
          일일미션 완료 현황
        </p>
        <MissionCalendar />
      </div>
      <div className="flex flex-col items-start gap-6 flex-[1,0,0%] rounded-xl self-stretch bg-white">
        <p className="self-stretch text-gray-900 text-[24px] non-italic font-semibold leading-6">
          내가 획득한 배지
        </p>
        <Badges />
      </div>
    </div>
  );
};

export default MyProfile;
