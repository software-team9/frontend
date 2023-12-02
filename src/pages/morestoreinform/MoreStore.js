import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./MoreStore.module.css";
import useReviewHook from "../../hooks/useReviewHook";
import useStoreHook from "../../hooks/useStoreHook";
import useWishHook from "../../hooks/useWishHook";


import ReviewCard from "../../components/reviewcard/ReviewCard";
import RankingGraph from "./RankingGraph";

const MoreStore = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeId = queryParams.get("storeId");
  const navigate = useNavigate();
  const { getReviewsByStoreId } = useReviewHook();
  const { getWishStateByStoreId, putChangeWish } = useWishHook(); // 찜하기 상태 관련 훅 사용

  const { stores } = useStoreHook();
  const [storeReviews, setStoreReviews] = useState([]);
  const maxReviewCount = 3;
  const [store, setStore] = useState(null);
  const [wishState, setWishState] = useState(false); // 찜하기 상태
  const [season, setSeason] = useState("2023-Winter")

  useEffect(() => {
    if (stores.length > 0) {
      const foundStore = stores.find((s) => s.storeId === storeId);
      setStore(foundStore);
    }

    const wish = getWishStateByStoreId(storeId, "userId"); 
    setWishState(wish);
  }, [wishState]);

  useEffect(() => {
    if (storeId) {
      const reviews = getReviewsByStoreId(storeId, season, 1, maxReviewCount);
      setStoreReviews(reviews);
    }
  }, []);

  const handleMoreReviews = () => {
    navigate(`/morereview?storeId=${storeId}`);
  };

  const handleWish = () => {
    putChangeWish(storeId, "userId");
    setWishState(!wishState);
  };


  return (
    <div className={styles.container}>
      {store && (
        <>
          <section className={styles.storeHeader}>
            <img
              alt="Store Picture"
              className={styles.storeImage}
              src={store.imageUrl}
            />
            <div className={styles.element}></div>
            <div className={styles.StoreNameContainer}>
            <h1 className={styles.storeName}>{store.storeName}</h1>
            <div
              className={`${styles.wishIcon} ${wishState ? styles.checked : ""}`}
              onClick={handleWish}
            >
              {wishState ? '\u2714' : '\u2764'}
            </div>
          </div>

            <div className={styles.AddressContainer}>
              <img
                src={process.env.PUBLIC_URL + "/pin.png"}
                width="23px"
                alt="pin"
              />
              <p className={styles.storeAddress}>{store.address}</p>
            </div>
          </section>

          <section className={styles.rankingSection}>
            <div className={styles.element}></div>
            <div className={styles.reviewHeader}>
              {" "}
              <h2 className={styles.sectionTitle}>랭킹 히스토리</h2>
              <RankingGraph />
            </div>
          </section>

          <section className={styles.reviewSection}>
            <div className={styles.element}></div>
            <div className={styles.reviewHeader}>
              {" "}
              <h2 className={styles.sectionTitle}>가게 리뷰</h2>
              {storeReviews.length > 0 && (
                <button
                  onClick={handleMoreReviews}
                  className={styles.addReviewButton}
                >
                  +
                </button>
              )}
            </div>
            {storeReviews.length > 0 ? (
              storeReviews.map((review, index) => (
                // <div key={review.id} className={styles.reviewItem}>
                //   <span className={styles.reviewIndex}>{index + 1}</span>
                //   <div className={styles.reviewContent}>
                //     <h3 className={styles.reviewAuthor}>{review.userId}</h3>
                //     <p>{review.text}</p>
                //     <p className={styles.reviewTime}>{review.time}</p>
                //   </div>
                // </div>
                <div>
                  <ReviewCard
                    imageSrc={review.imageUrl}
                    userId={review.userId}
                    rating={review.rating}
                    reviewText={review.text}
                  />
                </div>
              ))
            ) : (
              <div className={styles.emptyMessage}>No reviews added yet.</div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default MoreStore;
