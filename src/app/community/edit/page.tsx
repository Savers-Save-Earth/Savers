"use client";
import EditPost from "@/components/community/write/EditPost";
import supabase from "@/libs/supabase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CommunityEdit = () => {
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