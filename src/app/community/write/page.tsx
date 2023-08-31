"use client";
import { NextPage } from "next";
import AddPost from "@/components/community/AddPost";
import { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { useRouter } from "next/navigation";

const Write: NextPage = () => {
  const router = useRouter();
  const [sessionState, setSessionState] = useState<any>(null);

  useEffect(() => {
    const getSessionState = async () => {
      const { data: session, error } = await supabase.auth.getSession();
      if (!session.session) router.push("/");
      setSessionState(session.session);
    }
    getSessionState();
  }, [sessionState]);

  return (
    <>
      <AddPost />
    </>
  )
}

export default Write;
