import React from "react";
import styles from "./WishlistCard.module.css";

const WishListCard = ({ imageSrc, name, rating, address="", wishState}) => {
  return (
    <div className={styles.card}>
      <img src={imageSrc} alt="Shop" className={styles.shopImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.shopName}>{name}</h3>
        <div className={styles.rating}>{`Rating: ${rating}`}</div>
        <p className={styles.shopAddress}>{address}</p>
      </div>
      <div 
        className={`${styles.wishButton} ${wishState ? styles.wished : ''}`} 
        onClick={() => {/* 찜하기 상태 변경 로직 */}}
      >
        {wishState ? '♥' : '♡'} {/* 찜한 상태에 따라 아이콘 변경 */}
      </div>
    </div>
  );
};

export default WishListCard;
