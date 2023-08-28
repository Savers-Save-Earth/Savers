"use client";
import React from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import Badges from "@/components/profile/Badges";
import MissionCalendar from "@/components/profile/MissionCalendar";
import BadgesTest from "@/components/profile/Badgestest";
// export const revalidate = 1 // revalidate every seconds

type Profile = Database["public"]["Tables"]["user"]["Row"];
const MyProfile = async ({ params: { id } }: { params: { id: string } }) => {
  // let { data: user, error } = await supabase.from("user").select("*").eq("uid", "bd2125b8-d852-485c-baf3-9c7a8949beee")
  // let { data: user, error } = await supabase.from("user").select("*").eq("uid", "bd2125b8-d852-485c-baf3-9c7a8949beed")
  let { data: user, error } = await supabase
    .from("user")
    .select("*")
    .eq("uid", id);
  if (error) throw error;

  return (
    <div className="flex w-full h-full">
      <div className="w-1/2 p-4 border-dashed border-2 border-green-600 mx-3 h-full">
        일일미션 완료현황(잔디밭)
        <MissionCalendar />
        {/* <p>닉네임 : {user![0].nickname}</p>
        <p>user uid : {user![0].uid}</p> */}
      </div>
      <div className="w-1/2 p-4 border-dashed border-2 border-purple-600 mx-3 h-full">
        내가 획득한 뱃지
        {/* <Badges /> */}
        <BadgesTest/>
      </div>
    </div>
  );
};

export default MyProfile;
