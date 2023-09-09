"use client";

const LoadingProfilePage = () => {
  return (
    <div className="animate-pulse flex flex-col md:flex-row w-full h-[70%] items-start gap-5 gap-y-8 self-stretch justify-evenly">
      <div className="flex flex-col items-start gap-6 flex-[1,0,0%] rounded-xl self-stretch w-[100%] bg-white">
        <span className="self-stretch text-gray-900 text-[24px] non-italic font-semibold leading-6">
          일일미션 완료 현황
          <div className="w-full h-[370px] bg-white flex flex-col items-center rounded-[10px]">
            <span className="w-3/5 h-4 bg-gray-100 mt-5 rounded-full"></span>
            <div className="w-3/4 h-[220px] bg-gray-100 mt-5 rounded-lg " />
          </div>
        </span>
        <div />
      </div>
      <div className="flex flex-col items-start gap-6 flex-[1,0,0%] rounded-xl self-stretch bg-white w-[100%] mb-5 sm:py-0">
        <span className="self-stretch text-gray-900 text-[24px] non-italic font-semibold leading-6 ">
          내가 획득한 배지
        </span>
        <div className="flex flex-col w-[100%] items-start gap-[30px] ">
          <div className="flex justify-evenly items-start self-stretch">
            <div className="w-[88px] h-[110px] flex flex-col items-center gap-2">
              <div className="w-[88px] h-[88px] rounded-full bg-gray-100" />
              <span className="w-16 h-3 bg-gray-100" />
            </div>
            <div className="w-[88px] h-[110px] flex flex-col items-center gap-2">
              <div className="w-[88px] h-[88px] rounded-full bg-gray-100" />
              <span className="w-16 h-3 bg-gray-100" />
            </div>
            <div className="w-[88px] h-[110px] flex flex-col items-center gap-2">
              <div className="w-[88px] h-[88px] rounded-full bg-gray-100" />
              <span className="w-16 h-3 bg-gray-100" />
            </div>
          </div>
          <div className="flex justify-evenly items-start self-stretch">
            <div className="w-[88px] h-[110px] flex flex-col items-center gap-2">
              <div className="w-[88px] h-[88px] rounded-full bg-gray-100" />
              <span className="w-16 h-3 bg-gray-100" />
            </div>
            <div className="w-[88px] h-[110px] flex flex-col items-center gap-2">
              <div className="w-[88px] h-[88px] rounded-full bg-gray-100" />
              <span className="w-16 h-3 bg-gray-100" />
            </div>
            <div className="w-[88px] h-[110px] flex flex-col items-center gap-2">
              <div className="w-[88px] h-[88px] rounded-full bg-gray-100" />
              <span className="w-16 h-3 bg-gray-100" />
            </div>
          </div>
          <div className="flex justify-evenly items-start self-stretch">
            <div className="w-[88px] h-[110px] flex flex-col items-center gap-2">
              <div className="w-[88px] h-[88px] rounded-full bg-gray-100" />
              <span className="w-16 h-3 bg-gray-100" />
            </div>
            <div className="w-[88px] h-[110px] flex flex-col items-center gap-2">
              <div className="w-[88px] h-[88px] rounded-full bg-gray-100" />
              <span className="w-16 h-3 bg-gray-100" />
            </div>
            <div className="w-[88px] h-[110px] flex flex-col items-center gap-2">
              <div className="w-[88px] h-[88px] rounded-full bg-gray-100" />
              <span className="w-16 h-3 bg-gray-100" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingProfilePage;
