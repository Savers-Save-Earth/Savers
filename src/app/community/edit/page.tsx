"use client";
import EditPost from "@/components/community/EditPost";
import supabase from "@/libs/supabase";
import { Database } from "@/types/supabase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type PostType = Database["public"]["Tables"]["community"]["Update"];
type EditPostProps = {
  postDetail?: PostType;
  postUid: string | string[];
}

const CommunityEdit = ({ postDetail, postUid }: EditPostProps) => {
  const router = useRouter();
  const [sessionState, setSessionState] = useState<any>(null);

  console.log("sessionState >>>> ", sessionState);

  useEffect(() => {
    const getSessionState = async () => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) router.push("/");
      setSessionState(session.session);
    }
    getSessionState();
  }, [router]);
  return (
    <EditPost />
  )
}

export default CommunityEdit