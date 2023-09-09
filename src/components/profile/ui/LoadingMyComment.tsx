const LoadingMyComment = () => {
  const test = [1, 2];
  return (
    <div className="animate-pulse space-y-4">
      {test.map((item, i) => (
        <div
          className="flex flex-col items-start p-6 gap-4 self-stretch rounded-2xl bg-white border border-gray-200"
          key={i}
        >
          <div className="flex items-center gap-2 self-stretch hover:underline">
            <div className="w-full h-full flex-[1,0,0%]">
              <p className="w-[12rem] sm:w-[30rem] h-5 bg-gray-300 rounded-lg cursor-pointer" />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-2 lg:gap-0 self-stretch">
            <p className="w-[12rem] h-3 bg-gray-200 rounded-lg" />
            <p className="w-[9rem] h-3 lg:h-5 bg-gray-200 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingMyComment;
