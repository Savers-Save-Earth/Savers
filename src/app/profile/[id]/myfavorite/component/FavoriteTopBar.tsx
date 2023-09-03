"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const FavoriteTopBar = () => {
  const searchId = useParams().id as string;
  // const decodedParams = decodeURIComponent(params);
  const router = useRouter();
  // searchId값을 그냥 params로 할당하느냐 decodedParams로 할당하느냐에 따라 결과가 달라짐. 아, eq 컬럼은 바꿔줘야 함.
  // const searchId = params as string
  // const searchId = decodedParams as string;
  return (
    <div className="flex items-start gap-8 self-stretch">
      <div className="flex flex-col items-start py-[6.5px] gap-[13px] self-stretch">
      <button
        className="text-gray-300 text-[14px] non-italic font-medium leading-[22px] focus:text-gray-900 focus:font-medium"
        onClick={() =>
          router.push(`/profile/${searchId}/myfavorite/myfavoriteproducts`)
        }
      >
        내가 북마크한 제품
      </button>
      </div>
      <div className="flex flex-col items-start py-[6.5px] gap-[13px] self-stretch">
			<button
        className="text-gray-300 text-[14px] non-italic font-medium leading-[22px] focus:text-gray-900 focus:font-medium"
        onClick={() =>
          router.push(`/profile/${searchId}/myfavorite/myfavoriterestaurants`)
        }
      >
        내가 북마크한 식당
      </button>
      </div>
    </div>
  );
};
export default FavoriteTopBar;
