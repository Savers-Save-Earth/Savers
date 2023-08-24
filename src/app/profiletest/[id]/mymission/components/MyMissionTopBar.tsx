"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const MyMissionTopBar = () => {
	const params = useParams();
  const router = useRouter()
	console.log({params})
	const searchId = params.id;
  console.log("searchId=>",searchId)
	return (
		<>
		<button className="bg-blue-500"
		onClick={() => router.push(`/profiletest/${searchId}/mymission/missiondoing`)}
	>
		진행중인 미션
	</button>
	<button className="bg-blue-500"
		onClick={() => router.push(`/profiletest/${searchId}/mymission/missiondone`)}
	>
		완료한 미션
	</button>
	</>
	)
}
export default MyMissionTopBar