import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeadName from "../../components/head/Head";
import styles from "./MyReviewList.module.css";
import useReviewHook from "../../hooks/useReviewHook";
import reviewData from "../../hooks/MyReviewList.json";
import axios from "axios";
import image1 from "./이미지1.png";
import image2 from "./이미지2.png";
import image3 from "./이미지3.png";
const REVIEWS_PER_PAGE = 10;

const MyReviewList = () => {
  // const { reviews, getReviewsByUserId } = useReviewHook('');
  const { getReviewsByUserId } = useReviewHook();

  const [reviews, setReviews] = useState([
    {
      content: "수육백반은 진리",
      ratingPoint: 5,
      img: image1,
      season: "2023-Winter",
      reviewId: 313,
    },
    {
      content: "너무너무 맛있어여",
      ratingPoint: 5,
      img: image2,
      season: "2023-Winter",
      reviewId: 318,
    },
    {
      content: "덮밥 맛집",
      ratingPoint: 4,
      img: image3,
      season: "2023-Winter",
      reviewId: 320,
    },
  ]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentReviews, setCurrentReviews] = useState([]);

  // const handleReviewClick = (reviewId) => {
  //   // 리뷰 클릭 시 편집 페이지로 이동
  //   navigate(`/writereview/writereview?reviewId=${reviewId}`);
  // };

  useEffect(() => {
    // reveiws에 대한 데이터 가져오기

    axios
      .get("/reviews/member", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("에러:", error);
        console.log("요청 구성:", error.config);
      });
  }, []);

  // useEffect(() => {
  //   setTotalPages(Math.ceil(reviews.length / REVIEWS_PER_PAGE));
  //   const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  //   const selectedReviews = reviews.slice(
  //     startIndex,
  //     startIndex + REVIEWS_PER_PAGE
  //   );
  //   setCurrentReviews(selectedReviews);
  // }, [currentPage, reviews]);

  // Handlers for pagination
  // const handlePageClick = (page) => {
  //   setCurrentPage(page);
  // };

  return (
    <div className={styles.container}>
      <HeadName title="내 리뷰리스트" />

      {reviews ? (
        <div>
          {reviews.map((review, index) => (
            <div key={review.reviewId} className={styles.reviewCard}>
              <img
                src={review.img}
                alt="Review"
                className={styles.reviewImage}
              />
              <p className={styles.context}>{review.content}</p>
              <p className={styles.context}>⭐ {review.ratingPoint}</p>
            </div>
          ))}
          {/* <div className={styles.pagination}>
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
          </div> */}
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
