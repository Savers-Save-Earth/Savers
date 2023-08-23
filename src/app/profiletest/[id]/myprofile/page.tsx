import React from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";

type Profile = Database["public"]["Tables"]["user"]["Row"];
const MyProfile = async ({ params }: { params: { id: string } }) => {
  // let { data: user, error } = await supabase.from("user").select("*").eq("uid", "bd2125b8-d852-485c-baf3-9c7a8949beee")
  // let { data: user, error } = await supabase.from("user").select("*").eq("uid", "bd2125b8-d852-485c-baf3-9c7a8949beed")
  let { data: user, error } = await supabase.from("user").select("*").eq("uid", params.id);
  if (error) throw error;
  console.log("params.id=>", params.id);

  return (
    <div className="flex w-full h-full">
    
      <div className="w-1/2 p-4 border-dashed border-2 border-green-600 mx-3">
        일일미션 완료현황(잔디밭)
        <p>닉네임 : {user![0].nickname}</p>
        <p>user uid : {user![0].uid}</p>
      </div>
      <div className="w-1/2 p-4 border-dashed border-2 border-purple-600 mx-3">
        내가 획득한 뱃지
      </div>
    </div>
  );
};

export default MyProfile;
