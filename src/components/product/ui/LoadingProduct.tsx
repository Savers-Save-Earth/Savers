const LoadingProduct = () => {
  let category = [];
  for (let i = 0; i < 5; i++) {
    category.push(i);
  }

  let product = [];
  for (let i = 0; i < 12; i++) {
    product.push(i);
  }

  return (
    <div className="animate-pulse space-y-4">
      <div className="flex justify-center items-center mt-16 mb-16">
        {category.map((item, i) => (
          <div
            key={i}
            className="xl:w-[96px] md:w-[76px] w-[50px] bg-gray-300 h-[50px] md:h-[76px] xl:h-[96px] rounded-full m-2 md:m-3"
          ></div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="xl:w-[10rem] h-[3rem] w-[5rem] bg-gray-100 rounded-xl "></div>
        <div className="xl:w-[22rem] h-[3rem] w-[13rem] bg-gray-100 rounded-xl"></div>
      </div>
      <div className="mt-16 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {product.map((item, i) => (
          <div key={i} className="flex-1 min-w-0 max-w-md mb-9 animate-pulse">
            <div className="w-full aspect-square bg-gray-300 rounded-xl"></div>
            <p className="w-[3rem] h-[1rem] bg-gray-200 rounded-xl mt-1"></p>
            <p className="w-[10rem] h-[1rem] bg-gray-300 rounded-xl mt-1"></p>
            <p className="w-[8rem] h-[1rem] bg-gray-300 rounded-xl mt-1"></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingProduct;
