const LoadingProfilePage = () => {
  return (
    <div className="animate-pulse w-full h-full max-h-[224px] xl:max-h-0 xl:min-h-[480px] mt-10 xl:mt-0 flex flex-col relative bg-gray-50 p-6 rounded-md overflow-hidden">
      <div className="flex items-center justify-center">
        <div className="h-full rounded-md p-3 flex flex-col justify-center items-center space-y-2 relative">
          <div className="flex justify-center w-36 h-36 mx-auto">
            <div
              id="image"
              className="bg-gray-100 flex-shrink-0 w-[8.75rem] h-[8.75rem] aspect-w-1 aspect-h-1 rounded-full"
            />
          </div>
          <div className="w-3/4 h-8 rounded-md mt-5 bg-gray-200" />
          <div className="w-2/3 h-6 rounded-md mt-5 bg-gray-200" />
        </div>
      </div>
      {/* <div className="w-full h-full flex flex-col justify-start">
        <div className="w-16 h-3 rounded-md mt-5 bg-gray-200" />
        <div className="w-16 h-3 rounded-md mt-5 bg-gray-200" />
        <div className="w-16 h-3 rounded-md mt-5 bg-gray-200" />
        <div className="w-16 h-3 rounded-md mt-5 bg-gray-200" />
        <div className="w-16 h-3 rounded-md mt-5 bg-gray-200" />
      </div> */}
    </div>
  );
};

export default LoadingProfilePage;
