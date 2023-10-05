import supabase from "@/libs/supabase";

export type MissionList = {
  address: string;
  bigCategory: string;
  content: string;
  createdAt: string;
  doingYn: boolean;
  id: string;
  missionUid: number;
  point: number;
  smallCategory: string;
  title: string;
  user_uid: string;
  userId: string;
  icon: string;
}

export type MissionInsert =  Omit<MissionList, "id">

export type DailyMission = {
  id: string;
  uid: number;
  point: number;
  title: string;
  content: string;
  doingYn: boolean;
  address: string;
  bigCategory: string;
  smallCategory: string;
  icon: string;
}


export const createMission = async (newMissions: MissionInsert[]) => {
  const { error } = await supabase.from("missionList").insert(newMissions);
  if (error) return error;
 };

 export const updateMission = async (updatedMission: any[]) => {
  const { error } = await supabase.from("missionList").update({ doingYn: "false"}).eq('id', "updatedMission.id");
 }

 export const fetchMissionListDateAndUid = async (
  searchId: string, currentDate: string,
): Promise<DailyMission[] | null> => {
  try {
    const { data: missionList } = await supabase
      .from("missionList")
      .select("*")
      .eq("user_uid", searchId)
      .eq("createdAt", currentDate)

    if (!missionList) {
      return null;
    }

    return missionList;
  } catch (error) {
    throw error;
  }
};