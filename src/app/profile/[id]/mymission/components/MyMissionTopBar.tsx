"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const MyMissionTopBar = () => {
	const searchId = useParams().id as string
  const router = useRouter()
	return (
		<div className="flex items-start gap-8 self-stretch">
		<div className="flex flex-col items-start py-[6.5px] gap-[13px] self-stretch">
		<button className="btn-profile-topbar"
		onClick={() => router.push(`/profile/${searchId}/mymission/missiondoing`)}
	>
		진행중인 미션
	</button>
	</div>
	<div className="flex flex-col items-start py-[6.5px] gap-[13px] self-stretch">
	<button className="btn-profile-topbar"
		onClick={() => router.push(`/profile/${searchId}/mymission/missiondone`)}
	>
		완료한 미션
	</button>
	</div>
	</div>
	)
}
export default MyMissionTopBar