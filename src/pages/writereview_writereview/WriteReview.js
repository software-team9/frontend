import React, { useState, useEffect } from "react";
import styles from "./WriteReview.module.css";
import useReviewHook from "../../hooks/useReviewHook";
import { useLocation } from "react-router-dom";

const userID = 123453289;

const WriteReview = () => {
  const { reviews, addReview, getReviewsByUserId } = useReviewHook();
  const [userReviews, setUserReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [editData, setEditData] = useState({
    storeName: "",
    rating: 0,
    text: "",
    imageUrl: "",
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const reviewIdFromUrl = queryParams.get("reviewId");

  useEffect(() => {
    setUserReviews(getReviewsByUserId(String(userID))); // Converting userID to string
  }, [reviews]);

  useEffect(() => {
    if (userReviews.length > 0) {
      if (reviewIdFromUrl) {
        const reviewToEdit = userReviews.find(
          (review) => review.id === reviewIdFromUrl
        );
        if (reviewToEdit) {
          setSelectedReview(reviewToEdit);
          setEditData({ ...reviewToEdit });
        }
      } else if (!selectedReview) {
        setSelectedReview(userReviews[0]);
        setEditData({ ...userReviews[0] });
      }
    }
  }, [userReviews, reviewIdFromUrl]);

  const handleSelectReview = (e) => {
    const reviewId = e.target.value;
    const review = userReviews.find((r) => r.id === reviewId);
    setSelectedReview(review);
    setEditData({ ...review });
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview(editData);
    alert("Review updated!");
  };

  return (
    <div>
      <h2>Edit Review</h2>
      <select onChange={handleSelectReview} value={selectedReview?.id || ""}>
        {userReviews.map((review) => (
          <option key={review.id} value={review.id}>
            {review.storeName}
          </option>
        ))}
      </select>

      <form onSubmit={handleSubmit}>
        {/* ----------- 이 부분은 나중에 이미지를 업로드 하는 기능으로 변경해야 함 -----------*/}{" "}
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUrl"
            value={editData.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        {/* ----------- --------------------------------------------------------- -----------*/}{" "}
        <div>
          <label>Store Name:</label>
          <input
            type="text"
            name="storeName"
            value={editData.storeName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Rating:</label>
          <input
            type="number"
            name="rating"
            value={editData.rating}
            onChange={handleInputChange}
            min="0"
            max="5"
          />
        </div>
        <div>
          <label>Review Text:</label>
          <textarea
            name="text"
            value={editData.text}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default WriteReview;
