import React from "react";
import styles from "./RankingCard.module.css";

const RankingCard = ({ rank, imageSrc, name = "", rating, address }) => {
    return (
        <div className={styles.card}>
          <img src={imageSrc} alt="Shop" className={styles.shopImage} />
          <div className={styles.cardContent}>
            <h3 className={styles.shopName}>{name}</h3>
            <div className={styles.rating}>{`⭐ ${rating}`}</div>
            <p className={styles.shopAddress}>{address}</p>
          </div>
          <div className={styles.rankLabel}>{`#${rank}`}</div>
        </div>
      );
    };

export default RankingCard;
