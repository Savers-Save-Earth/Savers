"use client";
import supabase from "@/libs/supabase";
import React, { useEffect } from "react";
import { useState } from "react";

interface Review {
  id: number;
  score: number;
  restaurant_name: string;
  restaurant_address: string;
}

const MarkerLists = ({ markerList }) => {
  const [reviewList, setReviewList] = useState<Review[]>([]);
  const [score, setScore] = useState(0);

  const fetchReviewList = async () => {
    const { data: reviewData } = await supabase
      .from("like_restaurant")
      .select();

    if (reviewData) {
      setReviewList(reviewData);
    } else {
      return;
    }
  };

  const averageHandler = (place: string) => {
    let averageScore = 0;
    const thisRestaurantReview = reviewList.filter(
      (item) => item.restaurant_name === place,
    );

    const averagelength = thisRestaurantReview.length;

    const average = thisRestaurantReview.map(
      (item) => (averageScore = averageScore + item.score),
    );

    return +averageScore / averagelength;
  };

  const addReview = async (name: string, address: string, score: number) => {
    const { error: addReviewError } = await supabase
      .from("like_restaurant")
      .insert({
        restaurant_address: address,
        restaurant_name: name,
        score: score,
      });
  };

  useEffect(() => {
    fetchReviewList();
  }, []);

  return (
    <div>
      <h2>마커 리스트 컴포넌트</h2>
      <ul>
        {/* markerList 정보를 사용하여 리스트를 렌더링합니다 */}
        {markerList.map((place: any, index: number) => (
          <div
            key={index}
            style={{ border: "1px solid black", width: "300px" }}
          >
            <p>{place.category_name}</p>
            <p>{place.place_name}</p>
            <p>{place.address_name}</p>
            <p>
              별점:
              {averageHandler(place.place_name)
                ? averageHandler(place.place_name)
                : "평점 정보가 없습니다."}
            </p>
            <form>
              <input
                type="number"
                style={{ border: "1px solid gray" }}
                value={score}
                onChange={(e) => setScore(parseInt(e.target.value))}
              />
              <button
                onClick={(e) => {
                  addReview(place.place_name, place.address_name, score);
                  e.preventDefault();
                  setScore(0);
                  fetchReviewList();
                }}
              >
                평점 등록
              </button>
            </form>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default MarkerLists;
