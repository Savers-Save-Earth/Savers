"use client"
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const SideBar = () => {
	const params = useParams();
  const router = useRouter()
	console.log({params})
	const searchId = params.id;
  console.log("searchId=>",searchId)
	return (
		<>
		<button
		onClick={() => router.push(`/profiletest/${searchId}/myprofile`)}
	>
		나의 프로필
	</button>
	<button
		onClick={() => router.push(`/profiletest/${searchId}/mymission/missiondoing`)}
	>
		나의 미션
	</button>
	<button
		onClick={() => router.push(`/profiletest/${searchId}/mycommunity/myposts`)}
	>
		커뮤니티 활동
	</button>
	</>
	)
}
export default SideBar