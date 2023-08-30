import supabase from "@/libs/supabase";
import { useState, useEffect } from "react";

interface currentUserType {
  uid: string;
  nickname: string;
  email: string;
  profileImage: string;
}

export const useAuth = (): currentUserType | null => {
  const [currentUser, setCurrentUser] = useState<currentUserType | null>(null);

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session === null) {
          setCurrentUser(null);
        } else {
          const userUid = session.user.id;
          const { data: users, error } = await supabase
            .from("user")
            .select("uid, nickname, email, profileImage")
            .eq("uid", userUid)
            .single();

          if (error) {
            console.error("사용자 정보 로딩 에러 >> ", error);
            setCurrentUser(null);
          } else {
            setCurrentUser(users);
          }
        }
      } catch (error) {
        console.error("세션 로딩 에러 >> ", error);
        setCurrentUser(null);
      }
    };

    fetchAuthData();
  }, []);

  return currentUser;
};
