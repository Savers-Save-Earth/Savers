const LoadingCarousel = () => {
  return (
    <div className="w-full h-full flex items-center">
      <div className="w-full h-full flex flex-col justify-center gap-2">
        <p className="bg-gray-300 w-[12rem] sm:w-[20rem] h-5 rounded-lg" />
        <p className="bg-gray-200 w-[9rem] h-3 sm:h-3 rounded-lg" />
      </div>
      <div className="w-[48px] h-[48px] sm:w-[96px] sm:h-[96px] bg-gray-300 rounded-md" />
    </div>
  );
};

export default LoadingCarousel;
