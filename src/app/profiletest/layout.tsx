import supabase from "@/libs/supabase";
import Link from "next/link";
import SideBar from "./components/SideBar";

export default async function ProfiletestLayout ({
  children,
}: {
  children: React.ReactNode;
}) {
  // const profiledata = await getProfile(id)
  return (
    <div className="flex gap-2 h-screen">
      <div className="w-1/4 p-4 border-dashed border-2 border-indigo-600 flex flex-col">
        <h1>프로필테스트 레이아웃</h1>

        <SideBar />
      </div>
      <section className="w-3/4 p-4 border-dashed border-2 border-red-600 flex">{children}</section>
    </div>
  );
}


