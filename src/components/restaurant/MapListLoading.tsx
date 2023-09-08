const MapListLoading = () => {
  const testData = [1, 1, 1, 1];
  return (
    <div className="animate-pulse ">
      {testData.map((_, i) => (
        <div className="border rounded-lg  h-[105px] mb-3 lg:w-[95%] " key={i}>
          <div className="ml-[19px] mt-[30px] w-[40px] h-[40px] bg-gray-600 rounded-full float-left"></div>
          <div className="float-left ml-2">
            <div className="mt-[15px] w-[150px] h-[17px] bg-gray-500 border rounded-md"></div>
            <div className="mt-1 w-[150px] h-[16px] bg-gray-400 border rounded-md"></div>
            <div className="mt-[10px] w-[150px] h-[30px] bg-gray-400 border rounded-md"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MapListLoading;
