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
        <div className="w-1/4 h-full border-dashed border-2 border-indigo-600 flex flex-col">
          <SideBar />
        </div>
        <section className="w-3/4 border-dashed border-2 border-red-600 flex flex-col">
          {children}
        </section>
      </div>
    </div>
  );
}
