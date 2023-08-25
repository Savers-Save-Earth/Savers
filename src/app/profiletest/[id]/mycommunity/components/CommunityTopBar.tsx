"use client"
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const CommunityTopBar = () => {
	const params = useParams();
  const router = useRouter()
	console.log({params})
	const searchId = params.id;
  console.log("searchId=>",searchId)
	return (
		<>
		<button className="bg-blue-500"
		onClick={() => router.push(`/profiletest/${searchId}/mycommunity/myposts`)}
	>
		내가 쓴 글
	</button>
	<button className="bg-blue-500"
		onClick={() => router.push(`/profiletest/${searchId}/mycommunity/mycomments`)}
	>
		내가 쓴 댓글
	</button>
	</>
	)
}
export default CommunityTopBar