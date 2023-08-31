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
      <div className="mt-20 w-[1200px] h-[3000px] flex items-start gap-x-8 bg-lightgreen bg-gray-100">
        <div className="w-[379px] h-full flex flex-col">
          <SideBar />
        </div>
        <section className="w-[789px] flex flex-col shrink-0 self-stretch p-8 bg-white">
          {children}
        </section>
      </div>
    </div>
  );
}
