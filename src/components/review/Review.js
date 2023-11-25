import React from "react";

const Review = ({ review }) => {
  return (
    <div className="review">
      <img src={review.imageUrl} alt="Store" />
      <h3>{review.storeName}</h3>
      <p>Rating: {review.rating}</p>
      <p>{review.text}</p>
      <p>Reviewed on: {review.time}</p>
    </div>
  );
};

export default Review;
