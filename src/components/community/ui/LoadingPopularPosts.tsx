const LoadingPopularPosts = () => {
  return (
    <div className="animate-pulse w-full mt-10 xl:mt-0 flex flex-col relative bg-gray-50 p-6 rounded-md">
      <div className="rounded-md max-w-[120px] w-1/6 py-3 mb-2 bg-gray-200" />
      <div className="flex items-center justify-center">
        <div className="flex xl:grid xl:grid-cols-4 gap-2.5 overflow-x-auto xl:overflow-hidden no-scrollbar">
          {[1, 1, 1, 1].map((_, i) => (
            <div
              className="max-w-[170px] xl:w-[170px] h-[250px] rounded-md p-3 flex flex-col space-y-2 relative"
              key={i}
            >
              <div className="flex-shrink-0 w-36 h-36 mx-auto">
                <div
                  id="image"
                  className="bg-gray-100 flex-shrink-0 w-36 h-36 rounded-md"
                />
              </div>
              <div className="w-full h-4 rounded-md mt-2 bg-gray-200" />
              <div className="w-2/3 h-4 rounded-md mt-2 bg-gray-200" />
              <div className="flex flex-col absolute bottom-0">
                <div className="flex flex-col items-start">
                  <span className="flex items-start px-5 py-2 rounded-full text-xs font-medium bg-gray-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPopularPosts;
