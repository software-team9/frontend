import React from "react";
import styles from "./More_ReviewCard.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const ReviewCard = ({ imageSrc, rating, reviewText, reviewId }) => {
  const navigate = useNavigate();
  const handleReportReview = () => {
    navigate(`/reportreview?reviewId=${reviewId}`);
  };
    return (
        <div className={styles.card}>
                <button
                  onClick={handleReportReview}
                  className={styles.rankLabel}
                >
                  +
                </button>
          <img src={imageSrc} alt="Shop" className={styles.shopImage} />
          <div className={styles.cardContent}>
            <div className={styles.rating}>{`⭐ ${rating}`}</div>
            <p className={styles.shopAddress}>{reviewText}</p>
          </div>
          {/*<div className={styles.rankLabel}>{`#${rank}`}</div> */}

        </div>
      );
    };

export default ReviewCard;
