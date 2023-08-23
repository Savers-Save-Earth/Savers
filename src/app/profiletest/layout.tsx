import supabase from "@/libs/supabase";
import Link from "next/link";
import { Router } from "next/router";

export default async function ProfiletestLayout ({
  children,
}: {
  children: React.ReactNode;
}) 

{
  const getProfile = async ( id: string ) => {
    let { data: user, error } = await supabase.from("user").select("*").eq("uid", id)
    return user![0]
  }
  const searchId = children!.props!.childProp.segment[1]
  // console.log("children.props+++==>",searchId)
  const profiledata = await getProfile(searchId)
  // console.log("profiledata===>",profiledata)
  return (
    <div className="flex gap-2 h-screen">
      <div className="w-1/4 p-4 border-dashed border-2 border-indigo-600 flex flex-col">
        <h1>프로필테스트 레이아웃</h1>
        <div className="rounded-full overflow-hidden w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 flex items-center justify-center">
            <img
              className="object-cover w-full h-full"
              src={profiledata.profileImage}
              alt="이미지"
            />
          </div>
        <div>{profiledata.nickname}</div>
        <Link
          href={`/profiletest/${searchId}/myprofile`}
        >
          나의 프로필
        </Link>
        <Link
          href={`/profiletest/${searchId}/mymission/missiondoing`}
        >
          나의 미션
        </Link>
        <Link
          href={`/profiletest/${searchId}/mycommunity/myposts`}
        >
          커뮤니티 활동
        </Link>
      </div>
      <section className="w-3/4 p-4 border-dashed border-2 border-red-600 flex">{children}</section>
    </div>
  );
}


