import { cls } from "@/libs/util";

interface PageButtonProps {
  reverse: boolean;
  onClick: () => void;
}

const PageButton = ({ reverse, onClick }: PageButtonProps) => {
  return (
    <button
      className={cls(
        "z-10 absolute top-1/2 p-1.5 rounded-full bg-white text-gray-900 shadow-md duration-150 ease-in-out",
        reverse ? "-right-[32px]" : "-left-[32px]",
      )}
      onClick={onClick}
    >
      {reverse ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      )}
    </button>
  );
};

export default PageButton;
