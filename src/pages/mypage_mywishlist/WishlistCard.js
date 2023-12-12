import React from "react";
import styles from "./WishlistCard.module.css";

const WishListCard = ({ imageSrc, name, rating, address = "", wishState, storeId }) => {

  const handleWishChange = () => {
    fetch(`/wish/change/${storeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => json())
      .catch((error) => {
        console.error("위시 데이터 변경 실패:", error);
      });
  }
  // wish/change/:storeId

  return (
    <div className={styles.card}>
      <img src={imageSrc} alt="Shop" className={styles.shopImage} />
      <div className={styles.cardContent}>
        <h3 className={styles.shopName}>{name}</h3>
        <div className={styles.rating}>{`⭐ ${rating}`}</div>
        <p className={styles.shopAddress}>{address}</p>
      </div>
      <div
        className={`${styles.wishButton} ${wishState ? styles.wished : ""}`}
        onClick={() => handleWishChange()}
      >
        {wishState ? "♥" : "♡"} {/* 찜한 상태에 따라 아이콘 변경 */}
      </div>
    </div>
  );
};

export default WishListCard;
