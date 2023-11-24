import React from "react";
import styles from "./Review.module.css";
import ReviewList from "../../components/review_list/ReviewList";

const Review = () => {
  return (
    <div>
      <h1>Review</h1>
      <ReviewList />
      {/* 페이지의 내용 */}
    </div>
  );
};

export default Review;
