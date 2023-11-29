import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useReviewHook from "../../hooks/useReviewHook";
import styles from "./MoreReview.module.css";

const REVIEWS_PER_PAGE = 10;

const MoreReview = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeId = queryParams.get("storeId");
  const { getReviewsByStoreId } = useReviewHook();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentReviews, setCurrentReviews] = useState([]);

  useEffect(() => {
    const storeReviews = getReviewsByStoreId(storeId);
    setTotalPages(Math.ceil(storeReviews.length / REVIEWS_PER_PAGE));
    const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
    const selectedReviews = storeReviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);
    setCurrentReviews(selectedReviews);
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className={styles.container}>
      <h1 className={styles.storeName}>{currentReviews.length > 0 ? currentReviews[0].storeName : ""}</h1>
      {currentReviews.map(review => (
        <div key={review.id} className={styles.reviewItem}>
          <img src={review.imageUrl} alt="Review" className={styles.reviewImage} />
          <div className={styles.reviewContent}>
            <div className={styles.reviewHeader}>
              <span className={styles.userId}>{review.userId}</span>
              <span className={styles.rating}>{`Rating: ${review.rating}`}</span>
            </div>
            <p className={styles.reviewText}>{review.text}</p>
            <span className={styles.reviewTime}>{review.time}</span>
          </div>
        </div>
      ))}
      <div className={styles.pagination}>
        {Array.from({length: totalPages}, (_,index) => index + 1).map(page => (
          <button
          key={page}
          className={currentPage === page ? styles.activePage : styles.pageNumber}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
      </div>
    </div>
  );
};

export default MoreReview;
