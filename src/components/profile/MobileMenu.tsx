"use client";

import supabase from "@/libs/supabase";
import { UserType } from "@/types/types";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Dispatch, SetStateAction } from "react";

type MobileMenuProps = {
  toggleMobileMenu: () => void;
  searchId: string;
  hideProfile: (value: string) => void;
  currentUser: UserType | null;
  profileDataId: string | undefined;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

const MobileMenu = ({
  toggleMobileMenu,
  searchId,
  hideProfile,
  currentUser,
  profileDataId,
  setShowModal,
}: MobileMenuProps) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null); //편의상 any로 썼는데, 만약 타입정의가 필요하다면 다음 링크 참조: https://github.com/orgs/supabase/discussions/2222
  const path = usePathname();

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        setUser(null);
      } else {
        setUser(session.user);
      }
    });
  }, [path]);

  const loginLogoutSwitcher = async () => {
    if (user) {
      const ok = window.confirm("로그아웃 하시겠습니까?");
      if (ok) {
        await supabase.auth.signOut();
        router.push("/");
      }
    } else {
      router.push("/login");
    }
  };

  const handleMenuClick = (value: string, name: string) => {
    toggleMobileMenu();
    hideProfile(value);
    router.push(`/profile/${searchId}/${name}`);
  };

  const menuList = [
    { btnName: "myprofile", btnValue: "프로필" },
    { btnName: "mymission/missiondoing", btnValue: "나의 미션" },
    { btnName: "mycommunity/myposts", btnValue: "커뮤니티 활동" },
    { btnName: "myfavorite/myfavoriteproducts", btnValue: "좋아요" },
  ];

  return (
    <div className="sidebar fixed top-0 bottom-0 right-0 p-2 w-[300px] overflow-y-auto text-center bg-white z-[1]">
      <div className="p-2.5 mt-3 flex items-center justify-between rounded-md px-4 duration-300 cursor-pointer bg-white text-white">
        <p className="text-[15px] ml-4 text-gray-900 font-bold">메뉴</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="hover:scale-[120%] cursor-pointer"
          onClick={() => {
            toggleMobileMenu();
          }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29294C17.6834 4.90242 18.3166 4.90242 18.7071 5.29294C19.0976 5.68347 19.0976 6.31663 18.7071 6.70716L13.4142 12L18.7071 17.2928C19.0976 17.6834 19.0976 18.3165 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z"
            fill="#98A2B3"
          />
        </svg>
      </div>
      {menuList.map((menu) => (
        <button
          key={menu.btnValue}
          value={menu.btnValue}
          name={menu.btnName}
          className="w-full p-2.5 mt-3 flex items-center justify-between rounded-md px-4 duration-300 cursor-pointer hover:bg-[#E8FFD4] text-white"
          onClick={(e) =>
            handleMenuClick(e.currentTarget.value, e.currentTarget.name)
          }
        >
          <p className="text-[15px] ml-4 text-gray-400 font-bold">
            {menu.btnValue}
          </p>
          <p className="text-[15px] ml-4 text-gray-400 font-bold">{`>`}</p>
        </button>
      ))}

      {currentUser && currentUser.uid == profileDataId && (
        <>
          <button
            className="w-full p-2.5 mt-3 flex items-center justify-between rounded-md px-4 duration-300 cursor-pointer hover:bg-[#E8FFD4] text-white"
            onClick={(e) => setShowModal(true)}
          >
            <p className="text-[15px] ml-4 text-gray-400 font-bold">
              일일미션 뽑기
            </p>
            <p className="text-[15px] ml-4 text-gray-400 font-bold">{`>`}</p>
          </button>
        </>
      )}

      {currentUser && currentUser.uid == profileDataId && (
        <>
          <button
            value="회원정보 수정"
            name="setting"
            className="w-full p-2.5 mt-3 flex items-center justify-between rounded-md px-4 duration-300 cursor-pointer hover:bg-[#E8FFD4] text-white"
            onClick={(e) =>
              handleMenuClick(e.currentTarget.value, e.currentTarget.name)
            }
          >
            <p className="text-[15px] ml-4 text-gray-400 font-bold">
              회원정보 수정
            </p>
            <p className="text-[15px] ml-4 text-gray-400 font-bold">{`>`}</p>
          </button>
          <div className="my-4 bg-gray-600 h-[1px]"></div>
        </>
      )}

      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-[#E8FFD4] text-white"
        onClick={loginLogoutSwitcher}
      >
        <i className="bi bi-box-arrow-in-right"></i>
        <span className="text-[15px] ml-4 text-gray-400 font-bold">
          로그아웃
        </span>
      </div>
    </div>
  );
};

export default MobileMenu;
