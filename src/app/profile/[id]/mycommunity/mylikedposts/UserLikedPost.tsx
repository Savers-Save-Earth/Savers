import supabase from "@/libs/supabase";
import React, { useEffect, useState } from "react";
import { Database } from "@/types/supabase";

type PostType = Database["public"]["Tables"]["community"]["Row"];

export default function UserLikedPost({ post }: any) {
  const [userLikedPost, setUserLikedPost] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getPostDetail = async (post_uid: string) => {
      try {
        const { data: likedPost } = await supabase
          .from("community")
          .select("*")
          .eq("post_uid", post_uid);

        if (likedPost!.length === 0) {
          setUserLikedPost([]);
        } else {
          setUserLikedPost(likedPost!);
        }

        setIsLoading(false); // 데이터 로딩 완료 후 상태 업데이트
      } catch (error) {
        // console.log("데이터 가져오기 에러:", error);
        setIsLoading(false);
      }
    };

    getPostDetail(post.post_uid);
  }, [post.post_uid]);

  return (
    <>
      {isLoading ? (
        <></>
      ) : (
        <div className="flex flex-col items-start p-6 gap-4 self-stretch rounded-2xl bg-white border border-gray-200">
          {userLikedPost.length > 0 ? (
            <>
              <div className="flex items-center gap-2 self-stretch hover:underline">
                <div className="flex-[1,0,0%]">
                  <p
                    className={`overflow-hidden text-gray-900 text-ellipsis text-[16px] font-semibold leading-4 cursor-pointer`}
                    onClick={() =>
                      window.open(`/community/${userLikedPost[0]!.post_uid}`)
                    }
                  >
                    {/* md 이하의 크기에서만 글자수를 8자로 제한하고 '...'을 표시 : lg는 css용어이기 때문에 템플릿 리터럴로 조건을 주려면 */}
                    {/* 직접 브라우저 너비를 지칭하는 window.innerWidth를 조건분기로 사용해야 한다. */}
                    {window.innerWidth < 768
                      ? userLikedPost[0].title.length > 15
                        ? userLikedPost[0].title.slice(0, 15) +
                          "..." +
                          `[${userLikedPost[0].number_comments}]`
                        : userLikedPost[0].title
                      : userLikedPost[0].title +
                        `[${userLikedPost[0].number_comments}]`}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center self-stretch text-gray-400">
                {/* <div className="flex items-center gap-2 text-[14px] leading-[14px] font-normal">
                  {userLikedPost[0].title} [{userLikedPost[0].number_comments}]
                </div> */}
                <p>등록일&nbsp;{userLikedPost[0].created_date.slice(0, 10)}</p>
              </div>
            </>
          ) : (
            <p>북마크한 글이 없네요!</p>
          )}
        </div>
      )}
    </>
  );
}
