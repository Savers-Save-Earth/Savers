import React from "react";

const NicknameMaker = () => {
  const firstAdjective = [
    "잘생긴",
    "예쁜",
    "귀여운",
    "깜찍한",
    "근육질",
    "섹쉬한",
    "인기많은",
    "졸린",
    "못생긴",
    "날씬한",
    "또실한",
    "뚱뚱한",
    "똑똑한",
  ];
  const secondAdjective = [
    "초록색",
    "하늘색",
    "검정색",
    "흰색",
    "회색",
    "금색",
    "연두색",
    "민트색",
    "오랜지색",
    "베이지색",
    "쥐색",
    "고동색",
    "소라색",
    "노랑색",
  ];
  const noun = [
    "푸바오",
    "팬더",
    "다람쥐",
    "사슴",
    "곰",
    "멍뭉이",
    "냐옹이",
    "수달",
    "두더지",
    "앵무새",
    "팽귄",
    "호랑이",
    "사자",
    "돌고래",
    "물개",
    "치타",
    "하마",
    "코뿔소",
  ];

  const randomFirstAdjective =
    firstAdjective[Math.floor(Math.random() * firstAdjective.length)];
  const randomSecondAdjective =
    secondAdjective[Math.floor(Math.random() * secondAdjective.length)];
  const randomNoun = noun[Math.floor(Math.random() * noun.length)];

  const nickname = `${randomFirstAdjective} ${randomSecondAdjective} ${randomNoun}`;
};

export default NicknameMaker;
