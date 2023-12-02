import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./MoreStore.module.css";
import useReviewHook from "../../hooks/useReviewHook";
import useStoreHook from "../../hooks/useStoreHook";

import storeImage from "./image.jpg"

const MoreStore = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeId = queryParams.get('storeId');
  const navigate = useNavigate();
  const { getReviewsByStoreId } = useReviewHook();
  const { stores } = useStoreHook(); 
  const [storeReviews, setStoreReviews] = useState([]);
  const maxReviewCount = 3;
  const [store, setStore] = useState(null);


  useEffect(() => {
    if (stores.length > 0) {
      const foundStore = stores.find(s => s.storeId === storeId);
      setStore(foundStore);
    }
  }, [stores, storeId]);

  useEffect(() => {
    if (storeId) {
      const reviews = getReviewsByStoreId(storeId).slice(0, maxReviewCount);
      setStoreReviews(reviews);
    }
  }, []);

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
          </div>
          {/* 가게 사진 */}
          <div
            className={styles.storeImageSection}
            style={{ backgroundImage: `url(${storeImage})` }}
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
              <strong>Address:</strong> {store.address}
            </div>

            <div className={styles.detailItem}>
              <strong>Business Number:</strong> {store["Business Number"]}
            </div>
          </div>
        </>
      )}

      {/* 리뷰 섹션 */}
      <div className={styles.reviewSection}>
        <h2 className={styles.sectionTitle}>
          Reviews
          {/* 리뷰가 있을 때만 "+" 버튼을 보여줍니다. */}
          {storeReviews.length > 0 && (
            <button
              onClick={handleMoreReviews}
              className={styles.addReviewButton}
            >
              +
            </button>
          )}
        </h2>
        <div className={styles.redLine}></div>

        {/* 가게 리뷰 목록 또는 메시지 */}
        {storeReviews.length > 0 ? (
          storeReviews.map((review) => (
            <div key={review.id} className={styles.reviewItem}>
              <p className={styles.reviewUser}>{review.userId}</p>
              <div className={styles.reviewRating}>
                {'★'.repeat(Math.round(review.rating))} {/* 평점을 별로 표시 */}
              </div>
              <p className={styles.reviewText}>{review.text}</p>
              <p className={styles.reviewTime}>{review.time}</p>
            </div>
          ))
        ) : (
          <div className={styles.emptyMessage}>
            가게에 추가된 리뷰가 없어요 ㅠㅠ
          </div>
        )}
      </div>
    </div>
  );
};

export default MoreStore;
