const LoadingBookmarkedRestaurants = () => {
  const test = [1, 2, 3, 4];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between self-stretch bg-white mx-auto gap-2">
        {test.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-full lg:w-[49%] h-1/2"
          >
            <div className="w-full p-4 border border-gray-200 rounded-lg bg-white flex items-center">
              <div className="p-7 rounded-full mr-4 bg-[#F9FAFB]"/>

              <div style={{ display: "inline-block" }}>
                <p className="bg-gray-100 w-[10rem] h-6 rounded-lg mb-[6px]"></p>
                <p className="bg-gray-100 w-[10rem] h-4 rounded-lg mb-[6px]"></p>
                <div className="bg-gray-100 w-5 h-5 rounded-lg mb-[6px]"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingBookmarkedRestaurants;
