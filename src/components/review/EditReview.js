import React, { useState, useEffect } from "react";
import useReviewHook from "../../hooks/useReviewHook";

const EditReviewPage = () => {
  const { reviews, addReview, getReviewsByUserId } = useReviewHook();
  const [selectedReview, setSelectedReview] = useState(null);
  const [editData, setEditData] = useState({
    storeName: "",
    rating: 0,
    text: "",
    imageUrl: "",
  });

  useEffect(() => {
    // 초기에 선택된 리뷰가 없다면 첫 번째 리뷰를 선택
    if (reviews.length > 0 && !selectedReview) {
      setSelectedReview(reviews[0]);
      setEditData({ ...reviews[0] });
    }
  }, [reviews, selectedReview]);

  const handleSelectReview = (e) => {
    const reviewId = e.target.value;
    const review = reviews.find((r) => r.id === reviewId);
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
        {reviews.map((review) => (
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

export default EditReviewPage;
