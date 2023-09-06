"use client";
import { NextPage } from "next";
import AddPost from "@/components/community/write/AddPost";
import { useEffect, useState } from "react";
import supabase from "@/libs/supabase";
import { useRouter } from "next/navigation";
import useLeaveConfirm from "@/hooks/useLeaveConfirm";

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
  }, [router]);

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', preventClose);
    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const confirmModal = useLeaveConfirm(true);

  return (
    <>
      <AddPost />
      {confirmModal}
    </>
  )
}

export default Write;
