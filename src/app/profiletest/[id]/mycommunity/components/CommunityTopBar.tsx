"use client"
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const CommunityTopBar = () => {
	const params = useParams().id as string
	const decodedParams = decodeURIComponent(params)
  const router = useRouter()
	// searchId값을 그냥 params로 할당하느냐 decodedParams로 할당하느냐에 따라 결과가 달라짐. 아, eq 컬럼은 바꿔줘야 함.
	// const searchId = params as string
	const searchId = decodedParams as string
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

	<button className="bg-blue-500"
		onClick={() => router.push(`/profiletest/${searchId}/mycommunity/mylikedposts`)}
	>
		내가 북마크한 글
	</button>

	<button className="bg-blue-500"
		onClick={() => router.push(`/profiletest/${searchId}/mycommunity/mylikedproducts`)}
	>
		내가 북마크한 제품
	</button>
		</>
	)
}
export default CommunityTopBar