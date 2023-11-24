import { useState, useEffect } from "react";

const useReviewHook = () => {
  const [reviews, setReviews] = useState([]); // 리뷰 데이터 저장하기
  const [error, setError] = useState(false); // 에러 발생 상태 저장

  // 리뷰를 로드하는 함수
  const loadReviews = async () => {
    // 서버에서 리뷰 데이터를 가져오는 로직을 구현합니다.
  };

  // 리뷰를 추가하는 함수
  const addReview = async (review) => {
    // 새 리뷰를 서버에 추가하는 로직을 구현합니다.
  };

  // 리뷰를 삭제하는 함수
  const deleteReview = async (id) => {
    // 리뷰를 서버에서 삭제하는 로직을 구현합니다.
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return { reviews, addReview, deleteReview };
};

export default useReviewHook;
