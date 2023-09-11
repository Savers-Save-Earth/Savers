const LoadingMission = () => {
  const test=[1,2,3,4]
  return (
    <div className="animate-pulse grid md:grid-cols-4 md:gap-4 grid-cols-2 gap-3 place-items-center">
    {test?.map((item, i) => {
      return (
        <div
        className="relative py-6 px-4 flex flex-col justify-between items-center w-[8rem] h-[13rem] sm:w-[180px] sm:h-[300px] rounded-2xl break-words hover:scale-110 hover:duration-500 bg-gray-50"
          key={i}
        >
          <div className="flex flex-col gap-3 items-start self-stretch">
          <div className="w-[5rem] h-[2rem] sm:w-[7rem] sm:h-[3rem] bg-gray-200 rounded-2xl"/>

            <div className="flex flex-col items-start gap-2 self-stretch ">
            <div className="w-full h-full min-w-[5rem] min-h-[6rem] sm:min-w-[121px] sm:min-h-[127px] flex py-4 px-2 flex-col justify-between items-start gap-2 self-stretch bg-gray-200 rounded-2xl">
              </div>
            </div>
          </div>

          <div className="absolute bottom-3 w-[5rem] h-6 sm:w-[7rem] sm:h-10 justify-center items-center bg-gray-200 rounded-2xl"/>
        </div>
      );
    })}
  </div>
  );
};

export default LoadingMission;
