interface DropButtonProps {
  toggleState: boolean;
  onEditClick: () => void;
  onDeleteClick: () => void;
  [key: string]: any;
}

const DropButtons = ({ toggleState, onEditClick, onDeleteClick }: DropButtonProps) => {
  const isToggled = toggleState;
  return (
    <div className="relative flex flex-col mr-2">
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-7 h-7 text-gray-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
          />
        </svg>
      </button>
      {isToggled ? (
        <div className="absolute top-5 -left-14 flex flex-col bg-white rounded-lg px-2 py-4 shadow-md space-y-1">
          <button
            onClick={onEditClick}
            className="text-sm text-gray-500 hover:bg-gray-100 px-3 py-1 rounded-md">
            수정
          </button>
          <button
            onClick={onDeleteClick}
            className="text-sm text-gray-500 hover:bg-gray-100 px-3 py-1 rounded-md">
            삭제
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default DropButtons;
