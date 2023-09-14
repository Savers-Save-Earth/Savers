import { Metadata } from "next";
import MissionDoingComp from "../../../../../components/profile/mymission/missiondoing/MissionDoingComp";
import Seo from "@/components/Seo";

const MissionDoing = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
    <Seo title="진행중인 미션 | Savers" description= "진행중인 미션을 확인할 수 있어요."/>
      <MissionDoingComp id = {id} />
    </>
  );
};

export default MissionDoing;