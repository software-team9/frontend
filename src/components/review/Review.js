import React from "react";
import styles from "./Review.module.css"; // 스타일 모듈 임포트

const Review = ({ review }) => {
  return (
    <div className={styles.review}>
      <img src={review.imageUrl} alt="가게 사진" className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.storeName}>{review.storeName}</h3>
        <div className={styles.rating}>{`별점: ${review.rating}`}</div>
        <p className={styles.textReview}>{review.text}</p>
      </div>
    </div>
  );
};

export default Review;
