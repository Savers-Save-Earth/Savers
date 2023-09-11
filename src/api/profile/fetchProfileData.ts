import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { BadgeType, MissionListType, UserType } from "@/types/types";

// 유저 프로필 데이터 조회
export const fetchProfileData = async (
  searchId: string,
): Promise<UserType|null> => {
  try {
    const { data: profileData } = await supabase
      .from("user")
      .select("*")
      .eq("uid", searchId);

    // 데이터가 없는 경우 null 반환
    if (!profileData) {
      return null;
    }

    // 데이터가 있는 경우 해당 데이터를 반환
    return profileData[0];
  } catch (error) {
    throw error;
  }
};

// 유저 프로필 닉네임 조회
export const fetchNicknameData = async (
  nickname: string,
  userId: string,
): Promise<UserType|null> => {
  try {
    const { data: nicknameData } = await supabase
      .from("user")
      .select("*")
      .neq("uid", userId)
      .eq("nickname", nickname);

    // 데이터가 없는 경우 null 반환
    if (!nicknameData) {
      return null;
    }

    // 데이터가 있는 경우 해당 데이터를 반환
    return nicknameData[0];
  } catch (error) {
    throw error;
  }
};

//모든 미션리스트 조회
export const fetchMissionList = async (
  searchId: string,
): Promise<MissionListType[] | null> => {
  try {
    const { data: missionList } = await supabase
      .from("missionList")
      .select("*")
      .eq("user_uid", searchId);

    if (!missionList) {
      return null;
    }

    return missionList;
  } catch (error) {
    throw error;
  }
};

// 완료된 미션리스트만 조회
export const fetchMissionDone = async (
  searchId: string,
): Promise<MissionListType[] | null> => {
  try {
    const { data: missionList } = await supabase
      .from("missionList")
      .select("*")
      .eq("user_uid", searchId)
      .eq("doingYn", false);
    if (!missionList) {
      return null;
    }
    return missionList;
  } catch (error) {
    throw error;
  }
};

// 진행중인 미션리스트만 조회
export const fetchMissionDoing = async (
  searchId: string, currentData: string
): Promise<MissionListType[]> => {
  try {
    const { data: missionList } = await supabase
      .from("missionList")
      .select("*")
      .eq("createdAt", currentData)
      .eq("user_uid", searchId)
      .eq("doingYn", true);
    if (!missionList) {
      return []
    }
    return missionList;
  } catch (error) {
    throw error;
  }
};

export const fetchBadges = async (
  searchId: string,
): Promise<BadgeType[]> => {
  try {
    const { data: badgeData } = await supabase
      .from("badge")
      .select("*")
      .eq("user_id", searchId);

    if (!badgeData) {
      return [];
    }

    return badgeData;
  } catch (error) {
    throw error;
  }
};
