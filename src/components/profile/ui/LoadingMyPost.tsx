const LoadingMyPost = () => {
  const test = [1, 2];
  return (
    <div className="animate-pulse space-y-4">
      <form className="flex items-center gap-2 self-stretch px-[2px] py-[16px] rounded-lg bg-gray-50">
        <div className="w-full flex flex-[1,0,0%] p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8 4C6.93913 4 5.92172 4.42143 5.17157 5.17158C4.42143 5.92172 4 6.93914 4 8C4 9.06087 4.42143 10.0783 5.17157 10.8284C5.92172 11.5786 6.93913 12 8 12C9.06087 12 10.0783 11.5786 10.8284 10.8284C11.5786 10.0783 12 9.06087 12 8C12 6.93914 11.5786 5.92172 10.8284 5.17158C10.0783 4.42143 9.06087 4 8 4ZM2 8C1.99988 7.05571 2.22264 6.12472 2.65017 5.28274C3.0777 4.44077 3.69792 3.7116 4.4604 3.15453C5.22287 2.59746 6.10606 2.22822 7.03815 2.07684C7.97023 1.92546 8.92488 1.99621 9.82446 2.28335C10.724 2.57049 11.5432 3.06591 12.2152 3.7293C12.8872 4.39269 13.3931 5.20534 13.6919 6.10114C13.9906 6.99693 14.0737 7.9506 13.9343 8.88456C13.795 9.81852 13.4372 10.7064 12.89 11.476L17.707 16.293C17.8892 16.4816 17.99 16.7342 17.9877 16.9964C17.9854 17.2586 17.8802 17.5094 17.6948 17.6948C17.5094 17.8802 17.2586 17.9854 16.9964 17.9877C16.7342 17.99 16.4816 17.8892 16.293 17.707L11.477 12.891C10.5794 13.5293 9.52335 13.9082 8.42468 13.9861C7.326 14.0641 6.22707 13.8381 5.2483 13.333C4.26953 12.8278 3.44869 12.063 2.87572 11.1224C2.30276 10.1817 1.99979 9.10144 2 8Z"
              fill="#D0D5DD"
            />
          </svg>
          <input
            type="text"
            className="w-full flex-[1,0,0%] bg-gray-50 text-{14px} font-normal leading-4 text-gray-900 placeholder-gray-300 outline-none"
            placeholder="검색어를 입력하세요."
          />
        </div>
      </form>
      {test.map((item, i) => (
        <div
          className="flex flex-col items-start p-6 gap-4 self-stretch rounded-2xl bg-white border border-gray-200"
          key={i}
        >
          <div className="w-full flex flex-row justify-between">
          <div className="flex items-center gap-2 self-stretch ">
            <div className="flex px-4 py-2 justify-center items-center rounded-2xl bg-gray-200" />
            <div className="flex-[1,0,0%] items-center">
              <p className="w-[6rem] sm:w-[18rem] h-5 bg-gray-300 rounded-lg my-1" />
              <p className="w-[8rem] sm:w-[20rem] h-2 bg-gray-200 rounded-lg my-1" />
            </div>
          </div>
          <div className="w-[48px] h-[48px] sm:w-[96px] sm:h-[96px] bg-gray-300 rounded-md"/>
          </div>

          <div className="flex justify-between items-center self-stretch text-gray-200">
            <div className="flex items-center gap-2 ">
              <div className="flex items-center gap-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                  />
                </svg>
                <span className="text-[14px] leading-[14px] font-normal"></span>
              </div>

              <div className="flex items-center gap-0.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                  />
                </svg>
              </div>
            </div>
            <p className="w-[9rem] h-5 bg-gray-200 rounded-lg"></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingMyPost;
