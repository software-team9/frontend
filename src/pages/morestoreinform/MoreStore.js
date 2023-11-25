import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./MoreStore.module.css";
import useReviewHook from "../../hooks/useReviewHook";
import useStoreHook from "../../hooks/useStoreHook";

const MoreStore = () => {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { getReviewsByStoreId } = useReviewHook();
  const { stores, getStoreById } = useStoreHook();
  const [store, setStore] = useState(null);
  const [storeReviews, setStoreReviews] = useState([]);
  const [maxReviewCount, setMaxReviewCount] = useState(5);

  console.log(storeId);

  useEffect(() => {
    const storeInfo = getStoreById(String(storeId));
    if (storeInfo) {
      setStore(storeInfo[0]);
    }
  }, [stores]);

  useEffect(() => {
    // 해당 storeId에 맞는 리뷰 데이터를 가져옵니다.
    const reviews = getReviewsByStoreId(storeId).slice(0, maxReviewCount);
    setStoreReviews(reviews);
  }, [storeId, maxReviewCount, getReviewsByStoreId]);

  const handleMoreReviews = () => {
    navigate(`/morereview?storeId=${storeId}`);
  };

  return (
    <div className={styles.container}>
      {store && (
        <>
          {/* 가게 사진 */}
          <div
            className={styles.storeImageSection}
            style={{ backgroundImage: `url(${store.imageUrl})` }}
          >
            {/* 이미지를 inline 스타일로 설정합니다. */}
          </div>

          {/* 가게 이름 */}
          <div className={styles.storeNameSection}>
            <h1 className={styles.storeName}>{store.storeName}</h1>
            <div className={styles.redLine}></div>
          </div>

          {/* 가게 상세정보 */}
          <div className={styles.storeDetailSection}>
            <div className={styles.detailItem}>
              <strong>Average Rating:</strong> {store.avr_rating}
            </div>
            <div className={styles.detailItem}>
              <strong>Highest Ranking:</strong> {store.highest_ranking}
            </div>
            <div className={styles.detailItem}>
              <strong>Address:</strong> {store.address}
            </div>
            <div className={styles.detailItem}>
              <strong>Opening Time:</strong> {store.opening_time}
            </div>
            <div className={styles.detailItem}>
              <strong>Closing Time:</strong> {store.closing_time}
            </div>
            <div className={styles.detailItem}>
              <strong>Business Number:</strong> {store["Business Number"]}
            </div>
            <div className={styles.detailItem}>
              <strong>Category:</strong> {store.category}
            </div>
          </div>
        </>
      )}

      {/* 리뷰 섹션 */}
      <div className={styles.reviewSection}>
        <h2 className={styles.sectionTitle}>
          Reviews
          <button
            onClick={handleMoreReviews}
            className={styles.addReviewButton}
          >
            +
          </button>
        </h2>
        <div className={styles.redLine}></div>

        {/* 가게 리뷰 목록 */}
        {storeReviews.map((review) => (
          <div key={review.id} className={styles.reviewItem}>
            <p className={styles.reviewText}>{review.text}</p>
            {/* 여기에 리뷰 내용을 추가로 표시할 수 있습니다. */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoreStore;
