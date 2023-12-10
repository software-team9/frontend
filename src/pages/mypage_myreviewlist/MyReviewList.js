import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeadName from "../../components/head/Head";
import styles from "./MyReviewList.module.css";
import useReviewHook from "../../hooks/useReviewHook";
import reviewData from "../../hooks/MyReviewList.json";
import axios from 'axios';

const REVIEWS_PER_PAGE = 10;

const MyReviewList = ({logoutHandler}) => {
  // const { reviews, getReviewsByUserId } = useReviewHook('');
  const { getReviewsByUserId } = useReviewHook();
  const navigate = useNavigate();
    const [reviews, setReviews] = useState([]);

    // State for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [currentReviews, setCurrentReviews] = useState([]);


  // const handleReviewClick = (reviewId) => {
  //   // 리뷰 클릭 시 편집 페이지로 이동
  //   navigate(`/writereview/writereview?reviewId=${reviewId}`);
  // };


  useEffect(()=> {
    axios.get('/members/auth', {
      'Content-Type': 'application/json', withCredentials:true,
    })
    .then(response => {
      if(!(response.status === 200)) {
      sessionStorage.setItem('IsLogin', false);
      navigate('/')
      logoutHandler()
      }
  
    })
    .catch((error) => {
      if (error.response) {
        // 서버가 응답을 반환한 경우
        console.error("Fetch error", error.response.data);
        alert(`에러 코드: ${error.response.data.errorCode}, 메시지: ${error.response.data.message}`);
      } else if (error.request) {
        // 서버가 응답하지 않은 경우
        console.error("No response was received", error.request);
      } else {
        // 그 외의 에러 발생 시
        console.error("Error", error.message);
      }
  
  })
  }, [])



  useEffect(() => {
    // reveiws에 대한 데이터 가져오기

    axios.get('/reviews/member', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      setReviews(response.data);
    })
    .catch(error => {
      console.error('에러:', error);
      console.log('요청 구성:', error.config);
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
                src={`http://15.165.26.32:8080/images/${review.img}`}
                alt="Review"
                className={styles.reviewImage}
              />
              <text><strong>{review.storeName}</strong></text>
              <text className={styles.context}>{review.content}</text>
              <text>{`⭐ ${review.ratingPoint}`}</text>
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
