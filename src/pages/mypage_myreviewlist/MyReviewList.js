import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./MyReviewList.module.css";
import useReviewHook from "../../hooks/useReviewHook";

const userID = "123453289";

const MyReviewList = ({userData}) => {
  const navigate = useNavigate();
  const { reviews, getReviewsByUserId } = useReviewHook();
  const [userReviews, setUserReviews] = useState([]);

  useEffect((userData) => {
    const user_reviews = getReviewsByUserId(userID); // 추후 벡엔드 연결시 userData로 수정
    setUserReviews(user_reviews);
  }, [reviews]);

  const handleReviewClick = (reviewId) => {
    // 리뷰 클릭 시 편집 페이지로 이동
    navigate(`/writereview/writereview?reviewId=${reviewId}`);
  };

  return (
    <div>
      <ul className={styles.reviewList}>
        {userReviews.map((review) => (
          <li
            key={review.id}
            className={styles.reviewItem}
            onClick={() => handleReviewClick(review.id)}
          >
            <img
              src={review.imageUrl}
              alt="Review"
              className={styles.reviewImage}
            />
            <div>
              <h2 className={styles.storeName}>{review.storeName}</h2>
              {/* 가게 이름과 평점, 리뷰 텍스트 등의 추가 정보 */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyReviewList;
