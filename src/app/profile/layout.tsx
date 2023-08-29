import supabase from "@/libs/supabase";
import Link from "next/link";
import SideBar from "./components/SideBar";

export default async function profileLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  // const profiledata = await getProfile(id)
  return (
    <div className="flex gap-2">
      <div className="w-1/4 p-4 border-dashed border-2 border-indigo-600 flex flex-col mt-10">
        <h1>프로필테스트 레이아웃</h1>
          {/* <div className="bg-pink-400 sticky top-1/3 flex flex-col "> */}
          <SideBar/>
          {/* </div> */}
        
      </div>
      <section className="w-3/4 p-4 border-dashed border-2 border-red-600 flex flex-col mt-10">{children}</section>
    </div>
  );
}


