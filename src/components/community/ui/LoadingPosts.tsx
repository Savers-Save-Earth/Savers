const LoadingPosts = () => {
  return (
    <div className="animate-pulse w-full min-w-[780px] flex flex-col mt-10 mb-20">
      {
        <div className="flex flex-col mb-5 justify-center">
          {[1, 1, 1, 1].map((_, i) => (
            <div
              key={i}
              className="flex flex-col justify-between px-4 py-4 overflow-hidden last:border-b border-t"
            >
              <div className="flex justify-between">
                <div className="flex w-full flex-col space-y-2 items-start">
                  <span className="flex items-start px-5 py-2 rounded-full text-xs font-medium bg-gray-100" />
                  <div className="w-1/3 h-4 rounded-md mt-2 bg-gray-200" />
                  <div className="w-1/2 h-4 rounded-md mt-2 bg-gray-200" />
                </div>
                <div
                  id="image"
                  className="bg-gray-100 flex-shrink-0 w-36 h-36 rounded-md"
                />
                <div className="flex justify-between mt-5">
                  <div className="w-1/3 h-4 rounded-md mt-2 bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    </div>
  );
};

export default LoadingPosts;
