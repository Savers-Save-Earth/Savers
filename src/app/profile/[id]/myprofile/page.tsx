"use client";
import React from "react";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import Badges from "@/components/profile/Badges";
import MissionCalendar from "@/components/profile/MissionCalendar";
import { useQuery } from "@tanstack/react-query";
import {
  ProfileType,
  fetchBadges,
  fetchMissionDone,
  fetchProfileData,
} from "@/api/profile/fetchProfileData";
import Loading from "@/app/loading";
import LoadingProfilePage from "@/components/profile/ui/LoadingProfilePage";

type Profile = Database["public"]["Tables"]["user"]["Row"];
const MyProfile = ({ params: { id } }: { params: { id: string } }) => {
  const searchId = id;
  const { data: profileData, isFetching: profileDataFetching } =
    useQuery<ProfileType>(
      ["fetchProfileData", searchId],
      () => fetchProfileData(searchId),
      { cacheTime: 6000 },
    );

  const { data: missionDone, isFetching: missionDoneFetching } = useQuery<any>(
    ["fetchMissionDone", searchId],
    () => fetchMissionDone(searchId),
    { cacheTime: 6000 },
  );

  const { data: badgeData, isFetching: badgeDataFetching } = useQuery<any>(
    ["fetchBadges", searchId],
    () => fetchBadges(searchId),
    { cacheTime: 6000 },
  );
  if (profileDataFetching || missionDoneFetching || badgeDataFetching) {
    return <LoadingProfilePage />
  }
  return (
    <>
    <div className="flex flex-col md:flex-row w-full h-[70%] items-start gap-5 gap-y-8 self-stretch justify-evenly">
      <div className="flex flex-col items-start gap-6 flex-[1,0,0%] rounded-xl self-stretch w-[100%] bg-white">
        <p className="self-stretch text-gray-900 text-[24px] non-italic font-semibold leading-6">
          일일미션 완료 현황
        </p>
        <MissionCalendar profileData={profileData} missionDone={missionDone} />
      </div>
      <div className="flex flex-col items-start gap-6 flex-[1,0,0%] rounded-xl self-stretch bg-white w-[100%] mb-5 sm:py-0">
        <p className="self-stretch text-gray-900 text-[24px] non-italic font-semibold leading-6 ">
          내가 획득한 배지
        </p>
        <Badges badgeData={badgeData} missionDone={missionDone} />
      </div>
    </div>
    </>
  );
};

export default MyProfile;
