import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useReviewHook from "../../hooks/useReviewHook";
import styles from "./MoreReview.module.css";
import useStoreHook from "../../hooks/useStoreHook";
import ReviewCard from "../../components/reviewcard/ReviewCard";

const REVIEWS_PER_PAGE = 10;

const MoreReview = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeId = queryParams.get("storeId");
  const { getReviewsByStoreId } = useReviewHook();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentReviews, setCurrentReviews] = useState([]);
  const [store, setStore] = useState(null);
  const [season, setSeason] = useState("2023-Winter")

  useEffect(() => {
    const fetchStoreReviews = async () => {
      try {
        const storeReviews = await getReviewsByStoreId(storeId, season, currentPage, REVIEWS_PER_PAGE);
        setTotalPages(Math.ceil(storeReviews.length / REVIEWS_PER_PAGE));
        setCurrentReviews(storeReviews);
      } catch (error) {
        console.error('Error fetching store reviews:', error);
      }
    };

    fetchStoreReviews();
  }, [storeId, currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <section className={styles.reviewSection}></section>
      {currentReviews.map((review) => (
        <div>
          <ReviewCard
            imageSrc={review.imageUrl}
            userId={review.userId}
            rating={review.rating}
            reviewText={review.text}
          />
        </div>
      ))}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={
                currentPage === page ? styles.activePage : styles.pageNumber
              }
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default MoreReview;
