"use client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

const FavoriteTopBar = () => {
  const searchId = useParams().id as string;
  const router = useRouter();
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
