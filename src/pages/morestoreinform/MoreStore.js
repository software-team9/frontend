import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./MoreStore.module.css";
// import useReviewHook from "../../hooks/useReviewHook";
// import useStoreHook from "../../hooks/useStoreHook";
// import useWishHook from "../../hooks/useWishHook";

import ReviewCard from "../../components/reviewcard/More_ReviewCard";
import RankingGraph from "./RankingGraph";
import BadgeList from "../../components/badge/BadgeList";
import {getStoreSeasonRank} from "../../hooks/useStoreHook"

const MoreStore = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeId = queryParams.get("storeId");
  const navigate = useNavigate();
  // const { getReviewsByStoreId } = useReviewHook();
  // const { getWishStateByStoreId, putChangeWish } = useWishHook();

  // const { stores } = useStoreHook();
  const maxReviewCount = 3;
  const [store, setStore] = useState({
    storeId: 0,
    name: "",
    address: "",
    city: "",
    img: "",
    rating: 0.0,
    score: 0.0,
  });
  const [histories, setHistories] = useState([ // 랭킹 히스토리 데이터
    {
      storeName: "",
      storeId: 0,
      city: "",
      season: "",
      ranking: 0,
      img: "",
    },
  ]);
  const [storeReviews, setStoreReviews] = useState([
    {
      content: "",
      ratingPoint: 0.0,
      img: "",
      season: "",
      reviewId: 0,
    },
  ]);

  const [wishState, setWishState] = useState(false); // 찜하기 상태
  const [season, setSeason] = useState("");
  const [seasons, setSeasons] = useState([]); 
  const [stores, setStores] = useState();



  useEffect(() => {
    console.log(storeId);
    fetch(`http://15.165.26.32:8080/store/${storeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json && typeof json === "object") {
          // setStore(json);
          setStore(json);
          console.log(json);
        } else {
          console.error("수신된 상점 데이터가 유효하지 않습니다:", json);
        }
      })
      .catch((error) => {
        console.error("상점 데이터를 가져오는 중 오류 발생:", error);
      });
  }, [storeId]);

  useEffect(() => {
    console.log(storeId);
    fetch(`http://15.165.26.32:8080/seasonRank/store/${storeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          // setStore(json);
          setHistories(json);
          console.log(json);
        } else {
          console.error("시즌 데이터가 유효하지 않습니다:", json);
        }
      })
      .catch((error) => {
        console.error("시즌 데이터를 가져오는 중 오류 발생:", error);
      });
  }, [storeId]);

  useEffect(() => {
    fetch(`http://15.165.26.32:8080/wish/state/${storeId})`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json && typeof json === "object") {
          setWishState(json);
          console.log(json);
        } else {
          console.error("위시 데이터가 올바르지 않습니다.");
        }
      })
      .catch((error) => {
        console.error("위시 데이터 가져오기 오류:", error);
      });
  }, [storeId]);

  //   if (stores.length > 0) {
  //     const foundStore = stores.find((s) => s.storeId === storeId);
  //     setStore(foundStore);
  //   }

  //   const wish = getWishStateByStoreId(storeId, "userId");
  //   setWishState(wish);
  // }, [wishState]);

  useEffect(() => {
    fetch(
      `http://15.165.26.32:8080/reviews/store/${storeId}?season=${season}&page=0&size=3`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          setStoreReviews(json);
          console.log(json);
        } else {
          console.error("리뷰 데이터가 올바르지 않습니다.");
        }
      })
      .catch((error) => {
        console.error("리뷰 데이터 가져오기 오류:", error);
      });
  }, [storeId, season]);
  // if (storeId) {
  //   const reviews = getReviewsByStoreId(storeId, season, 1, maxReviewCount);
  //   setStoreReviews(reviews);
  // }

  const handleMoreReviews = () => {
    navigate(`/morereview?storeId=${storeId}`);
  };

  const handleWish = () => {
    fetch(`http://15.165.26.32:8080/wish/change/${storeId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => json())
      .catch((error) => {
        console.error("상점 데이터 가져오기 오류:", error);
      });
  };

  const parseRankingData = (data) => {
    return data.map((item) => {
      return {
        season: item.season,
        ranking: item.ranking,
      };
    });
  };

  return (
    <div className={styles.container}>
      {store && (
        <>
          <section className={styles.storeHeader}>
            <img
              alt="Store Picture"
              className={styles.storeImage}
              src={store.img}
            />
            <div className={styles.element}></div>
            <div className={styles.StoreNameContainer}>
              <h1 className={styles.storeName}>{store.name}</h1>
              <div
                className={`${styles.wishIcon} ${
                  wishState ? styles.checked : ""
                }`}
                onClick={handleWish}
              >
                {wishState ? "\u2714" : "\u2764"}
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
            </div>
            <div className={styles.rankingBedge}>
              <BadgeList data={histories} />
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
              storeReviews.map((storeReviews) => (
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
                    reviewId={storeReviews.reviewId}
                    imageSrc={storeReviews.img}
                    rating={storeReviews.ratingPoint}
                    reviewText={storeReviews.content}
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
