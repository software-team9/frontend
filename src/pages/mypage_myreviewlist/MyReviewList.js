import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeadName from "../../components/head/Head";
import styles from "./MyReviewList.module.css";
import useReviewHook from "../../hooks/useReviewHook";
import reviewData from "../../hooks/MyReviewList.json";

const REVIEWS_PER_PAGE = 10;

const MyReviewList = () => {
  const { reviews, getReviewsByUserId } = useReviewHook(reviewData);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentReviews, setCurrentReviews] = useState([]);


  // const handleReviewClick = (reviewId) => {
  //   // 리뷰 클릭 시 편집 페이지로 이동
  //   navigate(`/writereview/writereview?reviewId=${reviewId}`);
  // };

  useEffect(() => {
    // Fetch and update data based on conditions (city, category, etc.)
    // const stores = getStoreListByCondition(city);
    setTotalPages(Math.ceil(reviews.length / REVIEWS_PER_PAGE));
    const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
    const selectedReviews = reviews.slice(
      startIndex,
      startIndex + REVIEWS_PER_PAGE
    );
    setCurrentReviews(selectedReviews);
  }, [currentPage]);

    // Handlers for pagination
    const handlePageClick = (page) => {
      setCurrentPage(page);
    };

  return (
    <div className={styles.container}>
      <HeadName title="내 리뷰리스트" />


      {/* <ul className={styles.reviewList}>
        {userReviews.map((review) => (
          <li
            key={review.id}
            className={styles.reviewItem}
            onClick={() => handleReviewClick(review.id)}
          >
            <img
              src={review.imageUrl}
              alt="Review"
              className={styles.reviewImage}
            />
            <div>
              <h2 className={styles.storeName}>{review.storeName}</h2>
            </div>
          </li>
        ))}
      </ul> */}


      {reviews.length > 0 ? (

        <div>
          {currentReviews.map((review) => (
        <div key={review.id} className={styles.reviewCard}>
          <img
            src={review.imageUrl}
            alt="Review"
            className={styles.reviewImage}
          />
          <p className={styles.reviewText}>{review.text}</p>
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
        

            ) : (
              <div className={styles.emptyMessage}>
                리뷰리스트에 등록된 리뷰가 없어요 ㅠㅠ
              </div>
            )}

      
    </div>
  );
};

export default MyReviewList;
