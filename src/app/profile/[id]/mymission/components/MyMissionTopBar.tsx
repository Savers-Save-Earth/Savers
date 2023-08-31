"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const MyMissionTopBar = () => {
	const params = useParams().id as string
	const decodedParams = decodeURIComponent(params)
  const router = useRouter()
	// searchId값을 그냥 params로 할당하느냐 decodedParams로 할당하느냐에 따라 결과가 달라짐. 아, eq 컬럼은 바꿔줘야 함.
	// const searchId = params as string
	const searchId = decodedParams as string
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