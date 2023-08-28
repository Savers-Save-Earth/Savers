"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const FavoriteTopBar = () => {
  const params = useParams().id as string;
  const decodedParams = decodeURIComponent(params);
  const router = useRouter();
  // searchId값을 그냥 params로 할당하느냐 decodedParams로 할당하느냐에 따라 결과가 달라짐. 아, eq 컬럼은 바꿔줘야 함.
  // const searchId = params as string
  const searchId = decodedParams as string;
  return (
    <>
      <button
        className="bg-blue-500"
        onClick={() =>
          router.push(`/profile/${searchId}/myfavorite/myfavoriteproducts`)
        }
      >
        내가 북마크한 제품
      </button>

			<button
        className="bg-blue-500"
        onClick={() =>
          router.push(`/profile/${searchId}/myfavorite/myfavoriterestaurants`)
        }
      >
        내가 북마크한 식당
      </button>
    </>
  );
};
export default FavoriteTopBar;
