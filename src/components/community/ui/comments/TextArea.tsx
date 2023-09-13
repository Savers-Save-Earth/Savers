import { cls } from "@/libs/util";
import { UserType } from "@/types/types";
import { ChangeEventHandler } from "react";

interface TextAreaProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onClick?: () => void;
  currentUser?: UserType | null;
}

const TextArea = ({
  value,
  onChange,
  onClick,
  currentUser,
}: TextAreaProps) => {
  return (
    <div className="relative flex flex-col mt-5">
      <textarea
        id="commentInput"
        value={value}
        onChange={onChange}
        placeholder={
          currentUser
            ? "댓글을 입력하세요."
            : "댓글을 등록하려면 로그인 해주세요."
        }
        disabled={!currentUser}
        rows={2}
        maxLength={200}
        className="w-full no-scrollbar mt-2 px-4 pt-3 pb-16 border focus:outline-none resize-none rounded-2xl"
      />
      <button
        onClick={onClick}
        disabled={value.length === 0 || !currentUser}
        className={cls(
          "absolute bottom-2 right-1 px-4 py-1 rounded-md",
          value.length === 0 || !currentUser
            ? "text-gray-200"
            : "text-mainGreen",
        )}
      >
        등록
      </button>
    </div>
  );
};

export default TextArea;
