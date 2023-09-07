import supabase from "@/libs/supabase";
import { UserType } from "@/types/types";
import { useState, useEffect } from "react";

export const useAuth = (): UserType | null => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session === null) {
          setCurrentUser(null);
        } else {
          const userUid = session.user.id;
          const { data: users, error } = await supabase
            .from("user")
            .select("*")
            .eq("uid", userUid)
            .single();

          if (error) {
            // console.error("사용자 정보 로딩 에러 >> ", error);
            setCurrentUser(null);
          } else {
            setCurrentUser(users);
          }
        }
      } catch (error) {
        // console.error("세션 로딩 에러 >> ", error);
        setCurrentUser(null);
      }
    };

    fetchAuthData();
  }, []);

  return currentUser;
};
