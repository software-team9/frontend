import React, { useState } from "react";
import styles from "./ReviewList.module.css";

const ReviewList = ({ reviews }) => {
  const [expanded, setExpanded] = useState({});

  // 상세 정보 접기/펼치기 함수
  const toggleDetails = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  // 별점 계산을 위한 함수
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 > 0.75 ? 1 : rating % 1 < 0.25 ? 0 : 0.5;
    return [...Array(5)].map((_, i) => {
      if (i < fullStars) {
        return (
          <span key={i} className={styles.fullStar}>
            ★
          </span>
        );
      } else if (i === fullStars && halfStar) {
        return (
          <span key={i} className={styles.halfStar}>
            ★
          </span>
        );
      } else {
        return (
          <span key={i} className={styles.emptyStar}>
            ☆
          </span>
        );
      }
    });
  };

  return (
    <div className={styles.reviewList}>
      {reviews.map((review, index) => (
        <div key={index} className={styles.reviewItem}>
          <img src={review.image} alt={review.name} className={styles.image} />
          <div className={styles.info}>
            <div className={styles.name}>{review.name}</div>
            <div className={styles.stars}>
              {renderStars(review.rating)}
              <span className={styles.rating}>{review.rating}</span>
            </div>
            <div className={styles.details}>
              {expanded[index]
                ? review.details
                : `${review.details.substring(0, 100)}...`}
              <button onClick={() => toggleDetails(index)}>
                {expanded[index] ? "Less" : "More"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
