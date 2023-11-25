import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Rankinglist.module.css";
import useReviewHook from "../../hooks/useReviewHook";

const Ranking = () => {
  const navigate = useNavigate();
  const { getAllReviews } = useReviewHook();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setReviews(getAllReviews());
  }, [reviews]);

  const handleStoreClick = (storeId) => {
    navigate(`/morestore?storeId=${storeId}`);
  };

  return (
    <div className={styles.rankingContainer}>
      {reviews.map((review, index) => (
        <div
          key={review.id}
          className={styles.reviewItem}
          onClick={() => handleStoreClick(review.storeId)} // 클릭 시 handleStoreClick 함수 호출
        >
          <div className={styles.rank}>{index + 1}</div>
          <img
            src={review.imageUrl}
            alt="Store"
            className={styles.storeImage}
          />
          <div className={styles.storeInfo}>
            <h2 className={styles.storeName}>{review.storeName}</h2>
            <div className={styles.rating}>{`Rating: ${review.rating}`}</div>
            <p className={styles.reviewText}>{review.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ranking;
