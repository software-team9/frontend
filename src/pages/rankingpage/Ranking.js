import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Rankinglist.module.css";
import useReviewHook from "../../hooks/useReviewHook";

const REVIEWS_PER_PAGE = 10;

const Ranking = () => {
  const navigate = useNavigate();
  const { getAllReviews } = useReviewHook();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentReviews, setCurrentReviews] = useState([]);

  useEffect(() => {
    const reviews = getAllReviews();
    setTotalPages(Math.ceil(reviews.length / REVIEWS_PER_PAGE));
    const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
    const selectedReviews = reviews.slice(startIndex, startIndex + REVIEWS_PER_PAGE);
    setCurrentReviews(selectedReviews);
  }, [currentPage]);

  const handleStoreClick = (storeId) => {
    navigate(`/morestore?storeId=${storeId}`);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.rankingContainer}>
      {currentReviews.map((review, index) => (
        <div
          key={review.id}
          className={styles.reviewItem}
          onClick={() => handleStoreClick(review.storeId)}
        >
          <div className={styles.rank}>{index + 1 + (currentPage - 1) * REVIEWS_PER_PAGE}</div>
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
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
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

export default Ranking;
