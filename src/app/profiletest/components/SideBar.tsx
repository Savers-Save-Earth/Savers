"use client"
import supabase from "@/libs/supabase";
import { useParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Database } from "@/types/supabase";
import Loading from "@/app/loading";
import { convertDate } from "@/libs/util";

type Profile = Database["public"]["Tables"]["user"]["Row"]
interface DailyMission {
	id: string,
	uid: number,
	point: number,
	title: string,
	content: string,
	doingYn: boolean
}
const SideBar = () => {

	const params = useParams().id as string
	const decodedParams = decodeURIComponent(params)
	console.log("decodedParams--->",decodedParams)
  const router = useRouter()
	console.log("router--->",router)
	// searchId값을 그냥 params로 할당하느냐 decodedParams로 할당하느냐에 따라 결과가 달라짐. 아, eq 컬럼은 바꿔줘야 함.
	// const searchId = params as string
	const searchId = decodedParams as string
	console.log("searchId================================>",searchId)
	const getProfile = async (id: string) => {
    // let { data: user, error } = await supabase.from("user").select("*").eq("uid", id);
    let { data: user, error } = await supabase.from("user").select("*").eq("nickname", searchId);
    return user![0];
  };

	const getMission = async () => {
		let { data: mission, error } = await supabase.from("mission").select("*");
		console.log("mission=>",mission)
		return mission
	}

  const [profile, setProfile] = useState<Profile>({});
	const [dailyMission, setDailyMission] = useState<DailyMission[]>([])

  useEffect(() => {
    const fetchProfile = async () => {
      const fetchedProfile = await getProfile(searchId);
      setProfile(fetchedProfile);
			// console.log("profile=>",profile)
    };
      fetchProfile();
  }, [searchId]);

	// const testId = "userId4"
	const insertMissionListData = async () => {
		const currentDate = convertDate(new Date())
		console.log("currentDate=>",currentDate)
		// let { data: myMissions, error } = await supabase.from("missionList").select("dailyMission").eq("createdAt", currentDate).eq("userId", testId)
		let { data: myMissions, error } = await supabase.from("missionList").select("dailyMission").eq("createdAt", currentDate).eq("userId", searchId)
		console.log("myMissions==>",myMissions)
		if ((myMissions.length > 0) && (myMissions![0].dailyMission.length > 0)) {
			console.log("myMissions==>",myMissions)
			setDailyMission(myMissions)
			return false
		}
		else {
			try {
				let { data: mission, error } = await supabase.from("mission").select("*");
				if (error) {
					console.error("Error fetching mission data:", error);
					return;
				}
				const randomMission = mission!.sort(() => Math.random() - 0.5).slice(0, 2)
				const data = [
					{
						userId: searchId,
						createdAt: convertDate(new Date()),
						dailyMission: randomMission,
					},
				];
				const { data: insertedData, error: insertError } = await supabase
					.from("missionList")
					.insert(data);

				if (insertError) {
					console.error("Error inserting data:", insertError);
				} else {
					setDailyMission(randomMission)
					console.log("Inserted data:", insertedData);
				}
			} catch (error) {
				console.error("An error occurred:", error);
			}
		}
	};
	if (dailyMission) {
		console.log("dailyMission===>",dailyMission)
	} else {
		console.log("dailyMission 에러뜸")
	}
	

	return (
		<>
		{profile ? (
			<>
			        <div className="rounded-full overflow-hidden w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 flex items-center justify-center">
            <img
              className="object-cover w-full h-full"
              src={profile.profileImage || ""}
              alt="이미지"
            />
          </div>
        <div>{profile.nickname}</div>
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
	<button
		onClick={insertMissionListData}
	>
		미션뽑기
	</button>
			</>
		) : (
<>
<Loading/>
</>
		)}

	</>
	)
}
export default SideBar