import React from "react";
import useReviewHook from "../../hooks/useReviewHook";
import Review from "../review/Review";

const ReviewList = () => {
  const { reviews } = useReviewHook();

  return (
    <div>
      {reviews.map((review) => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
