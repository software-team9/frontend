import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./MoreStore.module.css";
import useReviewHook from "../../hooks/useReviewHook";
import useStoreHook from "../../hooks/useStoreHook";

import storeImage from "./image.jpg";

const MoreStore = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeId = queryParams.get("storeId");
  const navigate = useNavigate();
  const { getReviewsByStoreId } = useReviewHook();
  const { stores } = useStoreHook();
  const [storeReviews, setStoreReviews] = useState([]);
  const maxReviewCount = 3;
  const [store, setStore] = useState(null);

  useEffect(() => {
    if (stores.length > 0) {
      const foundStore = stores.find((s) => s.storeId === storeId);
      setStore(foundStore);
    }
  }, [stores, storeId]);

  useEffect(() => {
    if (storeId) {
      const reviews = getReviewsByStoreId(storeId).slice(0, maxReviewCount);
      setStoreReviews(reviews);
    }
  }, [storeId, getReviewsByStoreId]);

  const handleMoreReviews = () => {
    navigate(`/morereview?storeId=${storeId}`);
  };

  return (
    <div className={styles.container}>
      {store && (
        <>
          <section className={styles.storeHeader}>
            <img
              alt="Store Picture"
              className={styles.storeImage}
              src={store.imageUrl || storeImage}
            />
            <h1 className={styles.storeName}>{store.storeName}</h1>
            <p className={styles.storeAddress}>{store.address}</p>
          </section>

          <section className={styles.reviewSection}>
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
                <div key={review.id} className={styles.reviewItem}>
                  <span className={styles.reviewIndex}>{index + 1}</span>
                  <div className={styles.reviewContent}>
                    <h3 className={styles.reviewAuthor}>{review.userId}</h3>
                    <p>{review.text}</p>
                    <p className={styles.reviewTime}>{review.time}</p>
                  </div>
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
