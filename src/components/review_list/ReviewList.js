import React, { useState } from "react";
import Review from "../review/Review";
import useReviewHook from "../../hooks/useReviewHook";

const ReviewList = () => {
  const [reviews, addReview, updateReview, deleteReview] = useReviewHook([]); // 초기값은 빈 배열
  const [sortType, setSortType] = useState("latest"); // 정렬 타입

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortType === "latest") {
      return new Date(b.time) - new Date(a.time);
    } else if (sortType === "oldest") {
      return new Date(a.time) - new Date(b.time);
    } else if (sortType === "rating") {
      return b.rating - a.rating;
    }
  });

  return (
    <div>
      <select onChange={(e) => setSortType(e.target.value)}>
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="rating">Highest Rating</option>
      </select>

      <div className="review-list">
        {sortedReviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
