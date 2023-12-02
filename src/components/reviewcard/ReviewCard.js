import React from "react";
import styles from "./ReviewCard.module.css";

const ReviewCard = ({ imageSrc, userId = "", name = "", rating, reviewText }) => {
    return (
        <div className={styles.card}>
          <img src={imageSrc} alt="Shop" className={styles.shopImage} />
          <div className={styles.cardContent}>
            <h3 className={styles.shopName}>{name}</h3>
            <h3 className={styles.userName}>{userId}</h3>
            <div className={styles.rating}>{`⭐ ${rating}`}</div>
            <p className={styles.shopAddress}>{reviewText}</p>
          </div>
          {/*<div className={styles.rankLabel}>{`#${rank}`}</div> */}

        </div>
      );
    };

export default ReviewCard;
