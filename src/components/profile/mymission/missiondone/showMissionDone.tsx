import React from "react";

interface NoListToShownProps {
  listProp: string;
}

const NoListToShown: React.FC<NoListToShownProps> = ({ listProp }) => {
  const list = [
    {
      title: "noPost",
      mainText: "작성하신 글이 없습니다!",
      subText: "커뮤니티에 글을 남겨보세요!!",
      address: "/community",
      btnText: "글 쓰러가기",
      showBtn: true,
    },
    {
      title: "noComments",
      mainText: "작성한 댓글이 없습니다!",
      subText: "다른 세이버들의 글을 읽고 댓글을 남겨보세요!!",
      address: "/community",
      btnText: "댓글 쓰러가기",
      showBtn: true,
    },
    {
      title: "noBookmarkedPost",
      mainText: "북마크 한 글이 없습니다!",
      subText: "다른 세이버들의 글을 읽고 북마크를 해보세요!!",
      address: "/community",
      btnText: "글 보러가기",
      showBtn: true,
    },
    {
      title: "noMissionDone",
      mainText: "아직 완료한 미션이 없으신가요?",
      subText: "일일미션을 차곡차곡 수행해서 배지를 받아보세요!!",
      address: "/",
      btnText: "댓글 쓰러가기",
      showBtn: false,
    },
    {
      title: "noMissionDoing",
      mainText: "진행중인 일일미션이 없군요!",
      subText: "일일미션을 통해 배지를 획득할 수 있어요!",
      address: "/",
      btnText: "댓글 쓰러가기",
      showBtn: false,
    },
    {
      title: "noBookmarkedRestaurant",
      mainText: "좋아요를 누른 식당이 없습니다!",
      subText: "근처의 맛있는 건강 식당을 찾아볼까요?",
      address: "/restaurant",
      btnText: "식당 찾기",
      showBtn: true,
    },
    {
      title: "noBookmarkedProduct",
      mainText: "좋아요를 누른 제품이 없습니다!",
      subText: "Zero Waste를 실천하는 제품을 찾아볼까요?",
      address: "/product",
      btnText: "제품 둘러보기",
      showBtn: true,
    },
    
  ];
  const matchedProps = list.find((item) => item.title === listProp);

  return (
      <section className="w-full text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-12 items-center justify-center flex-col">
          <div className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center flex flex-col items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="216"
              height="50"
              viewBox="0 0 106 18"
              fill="none"
            >
              <path
                d="M13.5 8.4C12.9 8 12.2 7.8 11.5 7.6C10.7 7.4 10 7.3 9.2 7.2C8.5 7.1 7.9 7 7.2 6.8C6.6 6.7 6.1 6.5 5.7 6.3C5.3 6.1 5.2 5.8 5.2 5.3C5.2 4.8 5.5 4.4 6 4.1C6.5 3.8 7.3 3.7 8.4 3.7C9.2 3.7 10 3.8 10.8 4C11.7 4.2 12.5 4.5 13.3 5L15 1.5C14.2 1 13.2 0.6 12 0.4C10.8 0.1 9.6 0 8.4 0C6.7 0 5.3 0.2 4.1 0.7C2.9 1.2 2 1.9 1.3 2.7C0.7 3.5 0.4 4.5 0.4 5.6C0.4 6.6 0.6 7.4 0.9 8C1.3 8.6 1.8 9.1 2.4 9.5C3 9.9 3.7 10.1 4.4 10.3C5.1 10.5 5.9 10.6 6.6 10.7C7.3 10.8 8 10.9 8.6 11C9.2 11.1 9.7 11.3 10.1 11.5C10.5 11.7 10.7 12 10.7 12.4C10.7 12.9 10.5 13.3 10 13.6C9.6 13.8 8.8 14 7.6 14C6.6 14 5.5 13.9 4.4 13.6C3.3 13.3 2.4 12.9 1.6 12.4L0 15.9C0.8 16.4 1.9 16.9 3.2 17.2C4.6 17.5 6 17.7 7.5 17.7C9.2 17.7 10.7 17.5 11.9 17C13.1 16.5 14 15.9 14.7 15.1C15.3 14.3 15.7 13.3 15.7 12.3C15.7 11.3 15.5 10.5 15.1 9.9C14.6 9.3 14.1 8.8 13.5 8.4Z"
                fill="#101828"
              />
              <path
                d="M31.7 1.9C30.3 0.6 28.2 0 25.6 0C24.2 0 22.9 0.2 21.6 0.5C20.3 0.8 19.1 1.4 18.2 2L20 5.6C20.6 5.1 21.4 4.7 22.2 4.4C23.1 4.1 24 4 24.9 4C26.2 4 27.2 4.3 27.9 4.9C28.6 5.5 28.9 6.3 28.9 7.4H24.9C23.2 7.4 21.7 7.6 20.6 8.1C19.5 8.5 18.7 9.1 18.2 9.9C17.7 10.7 17.5 11.6 17.5 12.6C17.5 13.6 17.8 14.5 18.3 15.3C18.8 16.1 19.5 16.7 20.5 17.2C21.5 17.6 22.6 17.9 24 17.9C25.5 17.9 26.8 17.6 27.7 17C28.4 16.6 28.9 16.1 29.2 15.4V17.6H33.9V7.6C33.9 5 33.2 3.1 31.7 1.9ZM27.5 13.8C26.8 14.2 26.1 14.4 25.3 14.4C24.4 14.4 23.7 14.2 23.2 13.9C22.7 13.5 22.5 13 22.5 12.4C22.5 11.8 22.7 11.3 23.1 11C23.5 10.6 24.4 10.4 25.5 10.4H28.9V12C28.6 12.8 28.1 13.4 27.5 13.8Z"
                fill="#101828"
              />
              <path
                d="M70.1 1.1C68.8 0.4 67.3 0 65.6 0C63.9 0 62.3 0.4 60.9 1.2C59.5 1.9 58.4 3 57.6 4.3C56.8 5.6 56.4 7.1 56.4 8.9C56.4 10.6 56.8 12.1 57.6 13.5C58.4 14.8 59.6 15.9 61 16.6C62.5 17.4 64.2 17.8 66.2 17.8C67.8 17.8 69.1 17.6 70.3 17.1C71.5 16.6 72.5 15.9 73.3 15L70.6 12.1C70 12.7 69.4 13.1 68.7 13.3C68 13.6 67.2 13.7 66.3 13.7C65.3 13.7 64.4 13.5 63.6 13.2C62.9 12.8 62.3 12.3 61.8 11.6C61.6 11.2 61.4 10.8 61.3 10.3H74.3C74.3 10.1 74.3 9.9 74.4 9.6C74.4 9.3 74.4 9.1 74.4 8.9C74.4 7 74 5.5 73.2 4.1C72.6 2.8 71.5 1.8 70.1 1.1ZM63.3 4.4C64 4 64.7 3.8 65.6 3.8C66.5 3.8 67.2 4 67.8 4.4C68.4 4.8 68.9 5.3 69.3 5.9C69.5 6.3 69.7 6.8 69.8 7.4H61.3C61.4 6.9 61.5 6.4 61.8 6C62.2 5.2 62.7 4.7 63.3 4.4Z"
                fill="#101828"
              />
              <path
                d="M82.6 2.5V0.3H77.8V17.5H82.8V9.3C82.8 7.7 83.2 6.5 84 5.7C84.9 4.9 86 4.5 87.3 4.5C87.5 4.5 87.7 4.5 87.8 4.5C88 4.5 88.2 4.5 88.4 4.5V0C86.8 0 85.4 0.3 84.3 1C83.7 1.4 83.1 1.9 82.6 2.5Z"
                fill="#101828"
              />
              <path
                d="M105 9.9C104.6 9.3 104.1 8.8 103.5 8.5C102.9 8.1 102.2 7.9 101.5 7.7C100.8 7.5 100 7.4 99.3 7.3C98.6 7.2 97.9 7.1 97.3 6.9C96.7 6.8 96.2 6.6 95.8 6.4C95.4 6.2 95.3 5.9 95.3 5.4C95.3 4.9 95.6 4.5 96.1 4.2C96.6 3.9 97.4 3.8 98.5 3.8C99.3 3.8 100.1 3.9 100.9 4.1C101.8 4.3 102.6 4.6 103.4 5.1L105.1 1.5C104.3 1 103.3 0.6 102.1 0.4C100.7 0.1 99.5 0 98.4 0C96.7 0 95.3 0.2 94.1 0.7C92.9 1.2 92 1.8 91.3 2.7C90.7 3.5 90.4 4.5 90.4 5.6C90.4 6.6 90.6 7.4 90.9 8C91.3 8.6 91.8 9.1 92.4 9.5C93 9.9 93.7 10.1 94.4 10.3C95.1 10.5 95.9 10.6 96.6 10.7C97.3 10.8 98 10.9 98.6 11C99.2 11.1 99.7 11.3 100.1 11.5C100.5 11.7 100.7 12 100.7 12.4C100.7 12.9 100.5 13.3 100 13.6C99.5 13.9 98.7 14 97.6 14C96.6 14 95.5 13.9 94.4 13.6C93.3 13.3 92.4 12.9 91.6 12.4L90 15.9C90.8 16.4 91.9 16.9 93.2 17.2C94.6 17.5 96 17.7 97.5 17.7C99.2 17.7 100.7 17.5 101.9 17C103.1 16.5 104 15.9 104.7 15.1C105.3 14.3 105.7 13.3 105.7 12.3C105.6 11.3 105.4 10.5 105 9.9Z"
                fill="#101828"
              />
              <path
                d="M39.2291 15.6169C39.2291 15.6169 44.9599 15.2383 46.2135 11.2628C47.4671 7.28729 47.8253 2.93318 54.0933 0.472168C53.7351 2.74387 53.8426 4.31514 54.0575 6.20823C54.2724 8.08238 54.3619 9.95654 53.8605 11.7928C53.359 13.6859 52.195 15.2951 50.5116 16.1848C45.4971 18.8351 40.4827 16.7527 39.2291 15.6169Z"
                fill="url(#paint0_linear_957_21004)"
              />
              <path
                d="M51.36 15.6169C51.36 15.6169 45.6241 15.2383 44.3694 11.2628C43.1147 7.28729 42.7562 2.93318 36.4826 0.472168C36.8411 2.74387 36.7335 4.31514 36.5184 6.20823C36.3213 8.06345 36.2317 9.93761 36.7156 11.7739C37.2354 13.6859 38.3826 15.2951 40.0675 16.1848C45.0864 18.8351 50.1053 16.7527 51.36 15.6169Z"
                fill="url(#paint1_linear_957_21004)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_957_21004"
                  x1="53.7721"
                  y1="0"
                  x2="53.7721"
                  y2="17.9"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#66AB28" />
                  <stop offset="1" stopColor="#4F891C" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_957_21004"
                  x1="43.86"
                  y1="0.472168"
                  x2="43.86"
                  y2="17.4722"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#8AE63F" />
                  <stop offset="1" stopColor="#77CA33" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font lg:text-4xl text-3xl mb-4 font-medium break-words text-gray-900">
              {matchedProps?.mainText}
            </h1>
            <p className="mb-8 leading-relaxed break-words">{matchedProps?.subText}</p>
            {matchedProps?.showBtn ? (
              <div className="flex justify-center">
              <button
                onClick={() => window.open(`${matchedProps?.address}`)}
                className="inline-flex text-white bg-[#5FD100] border-0 py-2 px-6 focus:outline-none hover:bg-[#0ad100] rounded text-lg"
              >
                {matchedProps?.btnText}
              </button>
            </div>
            ) : (<></>)
            }
          </div>
        </div>
      </section>
  );
};

export default NoListToShown;
