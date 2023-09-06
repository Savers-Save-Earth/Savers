"use client";

import { Dispatch, SetStateAction } from "react";

interface FreezeModalProps {
  open?: boolean;
  onOpenChange?: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
  onClick?: () => void;
}

const FreezeModal = ({ open, onOpenChange, onClose, onClick }: FreezeModalProps) => {
  console.log("Modal Component open >>> ", open);
  if (open)
  return (
      <div
        id="modal-container"
        className="fixed top-0 left-0 w-screen h-screen bg-black/30 flex justify-center items-center z-10"
      >
        <div
          id="modal-content"
          className="bg-white w-96 h-64 px-4 py-2 flex flex-col space-y-8 justify-center items-center rounded-xl relative"
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <h2 className="text-md font-bold">안내</h2>
            <div className="flex flex-col items-center justify-center">
              <h3 className="text-lg font-extrabold">
                정말 게시글 작성을 그만두시겠어요?
              </h3>
              <p className="text-sm text-gray-600">
                변경사항은 저장되지 않습니다.
              </p>
            </div>
          </div>
          <div className="flex space-x-4 w-full justify-center">
            <div>
              <button
                onClick={onClick}
                className="bg-gray-100 px-10 py-3 rounded-md"
              >
                나가기
              </button>
            </div>
            <div>
              <button
                onClick={onClose}
                className="bg-mainGreen text-white px-10 py-3 rounded-md"
              >
                계속 작성하기
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default FreezeModal;