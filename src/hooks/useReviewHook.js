import { useState } from "react";
import reviewsData from "./ReviewList";

const useReviewHook = () => {
  const [reviews, setReviews] = useState(reviewsData);

  // // 서버에서 데이터를 가져오는 비동기 요청을 수행하는 함수
  // const init = async () => {
  //   try {
  //     const response = await fetch("/api/reviews"); // 서버에서 리뷰 데이터를 가져오는 URL
  //     const data = await response.json();
  //     setReviews(data);
  //   } catch (error) {
  //     console.error("Failed to fetch reviews:", error);
  //   }
  // };

  // 리뷰 추가
  const addReview = (newReview) => {
    setReviews([...reviews, { ...newReview, id: Date.now().toString() }]);
    // 서버에 데이터 전송 로직 추가 가능
  };

  // 리뷰 수정
  const updateReview = (updatedReview) => {
    setReviews(
      reviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
    // 서버에 데이터 업데이트 로직 추가 가능
  };

  // 리뷰 삭제
  const deleteReview = (reviewId) => {
    setReviews(reviews.filter((review) => review.id !== reviewId));
    // 서버에서 데이터 삭제 로직 추가 가능
  };

  // 특정 사용자 ID에 해당하는 리뷰 필터링
  const getReviewsByUserId = () => {
    fetch(`http://15.165.26.32:8080/reviews/member/`, {
      method : "GET",
      headers : {
        "Content-Type" : "application/json; charset=utf-8",
        // "Access-Control-Allow-Origin": `http://localhost:3000`,
        // 'Access-Control-Allow-Credentials':"true",
      },
    }) 
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      else {
        return response.json();
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      // Handle errors here
      console.error('Fetch error:', error);
    });
  };

  // 특정 가게 ID에 해당하는 리뷰 필터링
  const getReviewsByStoreId = async (storeId, season, page, size) => {
    try {
      const response = await fetch(`http://15.165.26.32:8080/reviews/store/${storeId}?season=${season}&page=${page}&size=${size}`, {
        method: "GET",
        headers: {
          "Content-Type" : "application/json; charset=utf-8",
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching store reviews:', error);
      return [];
    }

  };
  
  // 모든 리뷰 반환
  const getAllReviews = () => {
    return reviews;
  };

  return {
    reviews,
    addReview,
    updateReview,
    deleteReview,
    getReviewsByUserId,
    getReviewsByStoreId,
    getAllReviews,
  };
};

export default useReviewHook;
