"use client";
import React from "react";
import Link from "next/link";

type Name = "EH" | "WJ" | "DJ" | "JW" | "DY" | "JH";

const Footer = () => {
  const moveToLink = async (provider: Name) => {
    let linkUrl = "";

    switch (provider) {
      case "EH":
        linkUrl = "https://github.com/TerryEHLee";
        break;
      case "WJ":
        linkUrl = "https://github.com/Passionhruit";
        break;
      case "DJ":
        linkUrl = "https://github.com/podoDJ";
        break;
      case "JW":
        linkUrl = "https://github.com/xoxojw";
        break;
      case "DY":
        linkUrl = "https://github.com/cheddaryeon";
        break;
      case "JH":
        linkUrl =
          "https://drive.google.com/file/d/12_woSM0IkUmUxK3ryJ5dpC7rXAspT7Uc/view?usp=sharing";
        break;
    }

    window.open(linkUrl, "_blank");
  };

  return (
    <footer>
      <div className="flex-col justify-center items-center">
        <div className="xl:flex xl:justify-between justify-center w-full">
          <div className="xl:flex justify-center">
            <div
              className="pb-8 pt-5 text-gray-900 font-semibold text-xl text-left justify-center
        xl:pr-10 xl:items-start xl:pt-8 "
            >
              Ice climber
            </div>

            <div
              className="flex items-start gap-6 
        xl:flex xl:gap-10 xl:pl-10 xl:pt-8"
            >
              <div className="flex flex-col items-start gap-5 xl:gap-3 text-xs">
                <button
                  className="flex items-center gap-1"
                  onClick={() => moveToLink("EH")}
                >
                  <span>이은한 | FE Developer</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8.00016 1.33337C7.12468 1.33337 6.25778 1.50581 5.44894 1.84084C4.6401 2.17588 3.90517 2.66694 3.28612 3.286C2.03588 4.53624 1.3335 6.23193 1.3335 8.00004C1.3335 10.9467 3.24683 13.4467 5.8935 14.3334C6.22683 14.3867 6.3335 14.18 6.3335 14V12.8734C4.48683 13.2734 4.0935 11.98 4.0935 11.98C3.78683 11.2067 3.3535 11 3.3535 11C2.74683 10.5867 3.40016 10.6 3.40016 10.6C4.06683 10.6467 4.42016 11.2867 4.42016 11.2867C5.00016 12.3 5.98016 12 6.36016 11.84C6.42016 11.4067 6.5935 11.1134 6.78016 10.9467C5.30016 10.78 3.74683 10.2067 3.74683 7.66671C3.74683 6.92671 4.00016 6.33337 4.4335 5.86004C4.36683 5.69337 4.1335 5.00004 4.50016 4.10004C4.50016 4.10004 5.06016 3.92004 6.3335 4.78004C6.86016 4.63337 7.4335 4.56004 8.00016 4.56004C8.56683 4.56004 9.14016 4.63337 9.66683 4.78004C10.9402 3.92004 11.5002 4.10004 11.5002 4.10004C11.8668 5.00004 11.6335 5.69337 11.5668 5.86004C12.0002 6.33337 12.2535 6.92671 12.2535 7.66671C12.2535 10.2134 10.6935 10.7734 9.20683 10.94C9.44683 11.1467 9.66683 11.5534 9.66683 12.1734V14C9.66683 14.18 9.7735 14.3934 10.1135 14.3334C12.7602 13.44 14.6668 10.9467 14.6668 8.00004C14.6668 7.12456 14.4944 6.25766 14.1594 5.44882C13.8243 4.63998 13.3333 3.90505 12.7142 3.286C12.0952 2.66694 11.3602 2.17588 10.5514 1.84084C9.74255 1.50581 8.87564 1.33337 8.00016 1.33337Z"
                      fill="#475467"
                    />
                  </svg>
                </button>

                <button
                  className="flex items-center gap-1"
                  onClick={() => moveToLink("WJ")}
                >
                  <span>이우정 | FE Developer</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8.00016 1.33337C7.12468 1.33337 6.25778 1.50581 5.44894 1.84084C4.6401 2.17588 3.90517 2.66694 3.28612 3.286C2.03588 4.53624 1.3335 6.23193 1.3335 8.00004C1.3335 10.9467 3.24683 13.4467 5.8935 14.3334C6.22683 14.3867 6.3335 14.18 6.3335 14V12.8734C4.48683 13.2734 4.0935 11.98 4.0935 11.98C3.78683 11.2067 3.3535 11 3.3535 11C2.74683 10.5867 3.40016 10.6 3.40016 10.6C4.06683 10.6467 4.42016 11.2867 4.42016 11.2867C5.00016 12.3 5.98016 12 6.36016 11.84C6.42016 11.4067 6.5935 11.1134 6.78016 10.9467C5.30016 10.78 3.74683 10.2067 3.74683 7.66671C3.74683 6.92671 4.00016 6.33337 4.4335 5.86004C4.36683 5.69337 4.1335 5.00004 4.50016 4.10004C4.50016 4.10004 5.06016 3.92004 6.3335 4.78004C6.86016 4.63337 7.4335 4.56004 8.00016 4.56004C8.56683 4.56004 9.14016 4.63337 9.66683 4.78004C10.9402 3.92004 11.5002 4.10004 11.5002 4.10004C11.8668 5.00004 11.6335 5.69337 11.5668 5.86004C12.0002 6.33337 12.2535 6.92671 12.2535 7.66671C12.2535 10.2134 10.6935 10.7734 9.20683 10.94C9.44683 11.1467 9.66683 11.5534 9.66683 12.1734V14C9.66683 14.18 9.7735 14.3934 10.1135 14.3334C12.7602 13.44 14.6668 10.9467 14.6668 8.00004C14.6668 7.12456 14.4944 6.25766 14.1594 5.44882C13.8243 4.63998 13.3333 3.90505 12.7142 3.286C12.0952 2.66694 11.3602 2.17588 10.5514 1.84084C9.74255 1.50581 8.87564 1.33337 8.00016 1.33337Z"
                      fill="#475467"
                    />
                  </svg>
                </button>

                <button
                  className="flex items-center gap-1"
                  onClick={() => moveToLink("DJ")}
                >
                  <span>이동준 | FE Developer</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8.00016 1.33337C7.12468 1.33337 6.25778 1.50581 5.44894 1.84084C4.6401 2.17588 3.90517 2.66694 3.28612 3.286C2.03588 4.53624 1.3335 6.23193 1.3335 8.00004C1.3335 10.9467 3.24683 13.4467 5.8935 14.3334C6.22683 14.3867 6.3335 14.18 6.3335 14V12.8734C4.48683 13.2734 4.0935 11.98 4.0935 11.98C3.78683 11.2067 3.3535 11 3.3535 11C2.74683 10.5867 3.40016 10.6 3.40016 10.6C4.06683 10.6467 4.42016 11.2867 4.42016 11.2867C5.00016 12.3 5.98016 12 6.36016 11.84C6.42016 11.4067 6.5935 11.1134 6.78016 10.9467C5.30016 10.78 3.74683 10.2067 3.74683 7.66671C3.74683 6.92671 4.00016 6.33337 4.4335 5.86004C4.36683 5.69337 4.1335 5.00004 4.50016 4.10004C4.50016 4.10004 5.06016 3.92004 6.3335 4.78004C6.86016 4.63337 7.4335 4.56004 8.00016 4.56004C8.56683 4.56004 9.14016 4.63337 9.66683 4.78004C10.9402 3.92004 11.5002 4.10004 11.5002 4.10004C11.8668 5.00004 11.6335 5.69337 11.5668 5.86004C12.0002 6.33337 12.2535 6.92671 12.2535 7.66671C12.2535 10.2134 10.6935 10.7734 9.20683 10.94C9.44683 11.1467 9.66683 11.5534 9.66683 12.1734V14C9.66683 14.18 9.7735 14.3934 10.1135 14.3334C12.7602 13.44 14.6668 10.9467 14.6668 8.00004C14.6668 7.12456 14.4944 6.25766 14.1594 5.44882C13.8243 4.63998 13.3333 3.90505 12.7142 3.286C12.0952 2.66694 11.3602 2.17588 10.5514 1.84084C9.74255 1.50581 8.87564 1.33337 8.00016 1.33337Z"
                      fill="#475467"
                    />
                  </svg>
                </button>
              </div>

              <div className="flex flex-col items-start gap-5 xl:gap-3 text-xs">
                <button
                  className="flex items-center gap-1"
                  onClick={() => moveToLink("JW")}
                >
                  <span>박지원 | FE Developer</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8.00016 1.33337C7.12468 1.33337 6.25778 1.50581 5.44894 1.84084C4.6401 2.17588 3.90517 2.66694 3.28612 3.286C2.03588 4.53624 1.3335 6.23193 1.3335 8.00004C1.3335 10.9467 3.24683 13.4467 5.8935 14.3334C6.22683 14.3867 6.3335 14.18 6.3335 14V12.8734C4.48683 13.2734 4.0935 11.98 4.0935 11.98C3.78683 11.2067 3.3535 11 3.3535 11C2.74683 10.5867 3.40016 10.6 3.40016 10.6C4.06683 10.6467 4.42016 11.2867 4.42016 11.2867C5.00016 12.3 5.98016 12 6.36016 11.84C6.42016 11.4067 6.5935 11.1134 6.78016 10.9467C5.30016 10.78 3.74683 10.2067 3.74683 7.66671C3.74683 6.92671 4.00016 6.33337 4.4335 5.86004C4.36683 5.69337 4.1335 5.00004 4.50016 4.10004C4.50016 4.10004 5.06016 3.92004 6.3335 4.78004C6.86016 4.63337 7.4335 4.56004 8.00016 4.56004C8.56683 4.56004 9.14016 4.63337 9.66683 4.78004C10.9402 3.92004 11.5002 4.10004 11.5002 4.10004C11.8668 5.00004 11.6335 5.69337 11.5668 5.86004C12.0002 6.33337 12.2535 6.92671 12.2535 7.66671C12.2535 10.2134 10.6935 10.7734 9.20683 10.94C9.44683 11.1467 9.66683 11.5534 9.66683 12.1734V14C9.66683 14.18 9.7735 14.3934 10.1135 14.3334C12.7602 13.44 14.6668 10.9467 14.6668 8.00004C14.6668 7.12456 14.4944 6.25766 14.1594 5.44882C13.8243 4.63998 13.3333 3.90505 12.7142 3.286C12.0952 2.66694 11.3602 2.17588 10.5514 1.84084C9.74255 1.50581 8.87564 1.33337 8.00016 1.33337Z"
                      fill="#475467"
                    />
                  </svg>
                </button>

                <button
                  className="flex items-center gap-1"
                  onClick={() => moveToLink("DY")}
                >
                  <span>최다연 | FE Developer</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8.00016 1.33337C7.12468 1.33337 6.25778 1.50581 5.44894 1.84084C4.6401 2.17588 3.90517 2.66694 3.28612 3.286C2.03588 4.53624 1.3335 6.23193 1.3335 8.00004C1.3335 10.9467 3.24683 13.4467 5.8935 14.3334C6.22683 14.3867 6.3335 14.18 6.3335 14V12.8734C4.48683 13.2734 4.0935 11.98 4.0935 11.98C3.78683 11.2067 3.3535 11 3.3535 11C2.74683 10.5867 3.40016 10.6 3.40016 10.6C4.06683 10.6467 4.42016 11.2867 4.42016 11.2867C5.00016 12.3 5.98016 12 6.36016 11.84C6.42016 11.4067 6.5935 11.1134 6.78016 10.9467C5.30016 10.78 3.74683 10.2067 3.74683 7.66671C3.74683 6.92671 4.00016 6.33337 4.4335 5.86004C4.36683 5.69337 4.1335 5.00004 4.50016 4.10004C4.50016 4.10004 5.06016 3.92004 6.3335 4.78004C6.86016 4.63337 7.4335 4.56004 8.00016 4.56004C8.56683 4.56004 9.14016 4.63337 9.66683 4.78004C10.9402 3.92004 11.5002 4.10004 11.5002 4.10004C11.8668 5.00004 11.6335 5.69337 11.5668 5.86004C12.0002 6.33337 12.2535 6.92671 12.2535 7.66671C12.2535 10.2134 10.6935 10.7734 9.20683 10.94C9.44683 11.1467 9.66683 11.5534 9.66683 12.1734V14C9.66683 14.18 9.7735 14.3934 10.1135 14.3334C12.7602 13.44 14.6668 10.9467 14.6668 8.00004C14.6668 7.12456 14.4944 6.25766 14.1594 5.44882C13.8243 4.63998 13.3333 3.90505 12.7142 3.286C12.0952 2.66694 11.3602 2.17588 10.5514 1.84084C9.74255 1.50581 8.87564 1.33337 8.00016 1.33337Z"
                      fill="#475467"
                    />
                  </svg>
                </button>

                <button
                  className="flex items-center gap-1"
                  onClick={() => moveToLink("JH")}
                >
                  <span>한지희 | Designer</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8.005 3C6.964 3 6.128 3.00951 6.1335 3.02235C6.1385 3.03186 6.9875 4.44936 8.0205 6.17023L9.9005 9.29624H11.7805C12.821 9.29624 13.657 9.28673 13.6515 9.27389C13.649 9.26438 12.7975 7.84689 11.764 6.12601L9.884 3H8.005ZM5.625 3.82263C5.01514 4.82156 4.41014 5.82316 3.81 6.82739L2 9.83928L2.945 11.4075L3.8875 12.9753L5.6975 9.96291L7.5065 6.95292L6.5665 5.38992C6.05 4.53067 5.6275 3.82549 5.625 3.82263ZM6.7545 9.83928L6.653 10.0048C6.596 10.0989 6.173 10.7998 5.713 11.5678C5.432 12.0396 5.149 12.5104 4.864 12.98C4.859 12.9924 6.484 13 8.475 13H12.097L12.995 11.4988C13.491 10.6743 13.92 9.96291 13.948 9.91869L14 9.83928H10.3755H6.7545Z"
                      fill="#475467"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div
            className="text-gray-900 font-normal text-[10px] pt-8
        xl:text-right xl:pt-8 xl:justify-between xl:mt-16"
          >
            COPYRIGHT @ 2023 Ice climber ALL RIGHT RESERVED
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
