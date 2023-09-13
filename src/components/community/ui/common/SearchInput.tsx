import React, { FormEvent, useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";
import { searchPostAtom } from "@/libs/atoms";

import { ToastWarn } from "@/libs/toastifyAlert";
import { COMMUNITY_TOAST_TEXT } from "@/enums/messages";

const SearchInput = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const setSearchPostAtomState = useSetRecoilState(searchPostAtom);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchKeyword.length < 1) ToastWarn(COMMUNITY_TOAST_TEXT.SEARCH_KEYWORD_EMPTY_ERROR);
    setSearchPostAtomState({ keyword: searchKeyword });
  };

  const onReset = () => {
    setSearchKeyword("");
    setSearchPostAtomState({ keyword: null });
  }

  useEffect(() => {
    if (searchKeyword.length < 1) onReset();
  }, [searchKeyword])

  return (
    <div className="flex relative">
      <div className="absolute text-gray-300 left-3 top-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </div>
      <form onSubmit={onSubmit}>
        <input
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.currentTarget.value)}
          className="w-80 bg-gray-100 pl-11 pr-4 py-3 rounded-md focus:outline-none text-gray-600 text-sm"
          placeholder="검색어 입력 후 엔터를 눌러주세요"
        />
      </form>
    </div>
  );
};

export default SearchInput;