import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";

// 게시글 수정
export const updateMissionHandler = async (missionId: string ) => {
  if(!missionId) return false;
  const { data, error } = await supabase.from("missionList").update({ doingYn: false}).eq("id", missionId);
  if (error) return error;
  return data;
 };

 export const getMissionHandler = async (user:any, currentDate:string, category:string, setMissionUid:any, bigCategory:string) => {
  if(!user) return
  const {data: missionLists, error} = await supabase.from("missionList").select("*").eq("createdAt", currentDate).eq("bigCategory", bigCategory).eq("user_uid", user?.id).eq("doingYn", true)
  if (error) return error;
  console.log("missionLists==>",missionLists)
  if (missionLists!.length < 1) return false 
  const matchingMission = missionLists!.find((missionList) => missionList.smallCategory === category)
  if (matchingMission) {
    console.log("미션매칭 성공")
    setMissionUid(matchingMission.id);
  } else {
    console.log("No matching mission found.");
    setMissionUid("")
  }
}