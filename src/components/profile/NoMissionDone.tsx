import React from "react";

const NoMissionDone = () => {
  
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src="https://dummyimage.com/720x600"
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              아직 완료한 미션이 없으신가요?
            </h1>
            <p className="mb-8 leading-relaxed">
             일일미션을 차곡차곡 수행해서 배지를 받아보세요!!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => window.open("/restaurant")}
                className="inline-flex text-white bg-[#5FD100] border-0 py-2 px-6 focus:outline-none hover:bg-[#0ad100] rounded text-lg"
              >
                여기 누르면 일일미션 뽑기 나오게 수정해야함.
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoMissionDone;
