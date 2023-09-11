"use client";
import React from "react";
import Badges from "@/components/profile/Badges";
import MissionCalendar from "@/components/profile/MissionCalendar";
import { useQuery } from "@tanstack/react-query";
import { fetchBadges,fetchMissionDone,fetchProfileData } from "@/api/profile/fetchProfileData";
import LoadingProfilePage from "@/components/profile/ui/LoadingProfilePage";

const MyProfileComp = ({ id }: { id : string })  =>  {
  const searchId = id;
  const { data: profileData, isFetching: profileDataFetching } = useQuery(
    ["fetchProfileData", searchId],
    () => fetchProfileData(searchId),
    { cacheTime: 6000 },
  );

  const { data: missionDone, isFetching: missionDoneFetching } = useQuery(
    ["fetchMissionDone", searchId],
    () => fetchMissionDone(searchId),
    { cacheTime: 6000 },
  );

  const { data: badgeData, isFetching: badgeDataFetching } = useQuery(
    ["fetchBadges", searchId],
    () => fetchBadges(searchId),
    { cacheTime: 6000 },
  );
  if (profileDataFetching || missionDoneFetching || badgeDataFetching) {
    return <LoadingProfilePage />;
  }
  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-[70%] items-start gap-5 gap-y-8 self-stretch justify-evenly">
        <div className="flex flex-col items-start gap-6 flex-[1,0,0%] rounded-xl self-stretch w-[100%] bg-white">
          <p className="self-stretch text-gray-900 text-[24px] non-italic font-semibold leading-6">
            일일미션 완료 현황
          </p>
          <MissionCalendar
            profileData={profileData}
            missionDone={missionDone}
          />
        </div>
        <div className="flex flex-col items-start gap-6 flex-[1,0,0%] rounded-xl self-stretch bg-white w-[100%] mb-5 sm:py-0">
          <p className="self-stretch text-gray-900 text-[24px] non-italic font-semibold leading-6 ">
            내가 획득한 배지
          </p>
          {badgeData && missionDone && (
          <Badges badgeData={badgeData} missionDone={missionDone} />
          )}
        </div>
      </div>
    </>
  );
};

export default MyProfileComp;
