import supabase from "@/libs/supabase";
import Link from "next/link";
import SideBar from "./components/SideBar";

export default async function profileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const profiledata = await getProfile(id)
  return (
    <div className="flex h-full">
      <div className="mt-20 w-[1200px] h-full flex items-start gap-x-8 bg-lightgreen bg-white">
        {/* <div className="sticky top-20 w-[379px] h-full flex flex-col"> */}
        <div className="sticky top-20 w-[339px] min-h-[690px] h-full flex flex-col shadow-xl shadow-black/20 rounded-2xl p-6 border-t-2">
          <SideBar/>
        </div>
        <section className="w-[829px] flex flex-col shrink-0 self-stretch bg-white shadow-xl shadow-black/20 rounded-2xl p-6 border-t-2 cursor-default">
          {children}
        </section>
      </div>
    </div>
  );
}
