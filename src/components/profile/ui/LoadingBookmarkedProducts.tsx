const LoadingBookmarkedProducts = () => {
  const test = [1, 2, 3, 4];
  return (
    <div className="space-y-4 w-full">
      {/* <div className="flex flex-wrap justify-start gap-2 sm:gap-x-10 self-stretch bg-white mx-auto"> */}
      <div className="animate-pulse w-full grid md:grid-cols-4 md:gap-4 sm:grid-cols-3 sm:gap-3 grid-cols-2 gap-2 place-items-center">
        {test.map((item, i) => (
          <div
            className="w-full flex flex-col items-center gap-[0.5rem] cursor-pointer p-1" key={i}>
            <div className="w-full min-h-[162px] rounded-2xl shrink-0 bg-gray-200" />
            <p className="bg-gray-200 w-16 h-3 rounded-lg" />
            <p className="bg-gray-200 w-32 h-3 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingBookmarkedProducts;
