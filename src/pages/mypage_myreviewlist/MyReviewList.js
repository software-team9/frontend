import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeadName from "../../components/head/Head";
import styles from "./MyReviewList.module.css";
import axios from "axios";

const MyReviewList = ({ logoutHandler }) => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get("/members/auth", {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((response) => {
        if (!(response.status === 200)) {
          sessionStorage.setItem("IsLogin", false);
          navigate("/");
          logoutHandler();
        }
      })
      .catch((error) => {
        if (error.response) {
          // 서버가 응답을 반환한 경우
          console.error("Fetch error", error.response.data);
          alert(
            `에러 코드: ${error.response.data.errorCode}, 메시지: ${error.response.data.message}`
          );
        } else if (error.request) {
          // 서버가 응답하지 않은 경우
          console.error("No response was received", error.request);
        } else {
          // 그 외의 에러 발생 시
          console.error("Error", error.message);
        }
      });
  }, []);

  useEffect(() => {
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

  return (
    <div className={styles.container}>
      <HeadName title="내 리뷰리스트" />
      {reviews.length ? (
        <div>
          {reviews.map((review, index) => (
            <div key={review.reviewId} className={styles.reviewCard}>
              <img
                src={`http://15.165.26.32:8080/images/${review.img}`}
                alt="Review"
                className={styles.reviewImage}
              />
              <text>
                <strong>{review.storeName}</strong>
              </text>
              <text className={styles.context}>{review.content}</text>
              <text>{`⭐ ${review.ratingPoint}`}</text>
            </div>
          ))}
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
