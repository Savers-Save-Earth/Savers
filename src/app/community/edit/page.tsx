"use client";
import EditPost from "@/components/community/write/EditPost";
import supabase from "@/libs/supabase";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const CommunityEdit = () => {
  const router = useRouter();
  const [sessionState, setSessionState] = useState<any>(null);

  useEffect(() => {
    const getSessionState = async () => {
      const { data: session } = await supabase.auth.getSession();
      setSessionState(session.session);

      if (!session.session) {
        router.push("/");
      }
    };

    getSessionState();

    // 로그아웃 이벤트 감지
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        router.push("/");
      }
    });

    return () => {
      // 컴포넌트 언마운트시 리스너 제거
      authListener.data.subscription.unsubscribe();
    };
  }, [router]);

  // 새로고침, 창 닫기 방지
  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", preventClose);
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 뒤로가기 방지
  useEffect(() => {
    const preventGoBack = () => {
      if (confirm("페이지를 나가시겠습니까?")) {
        history.go(-1);
      } else {
        history.pushState(null, "", location.href);
      }
    };
    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);
    return () => window.removeEventListener("popstate", preventGoBack);
  }, []);
  
  return (
    <EditPost />
  )
}

export default CommunityEdit