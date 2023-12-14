import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./MoreStore.module.css";
import ReviewCard from "../../components/reviewcard/More_ReviewCard";
import BadgeList from "../../components/badge/BadgeList";
import axios from "axios";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import SnackMsg from './SnackMsg';

const MoreStore = ({ logoutHandler }) => {
  const [currentStoreReviews, setCurrentStoreReviews] = useState([]);
  const [like, setLike] = React.useState({});
  const [snackState, setSnackState] = React.useState({ open: false, msg: "" });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeId = queryParams.get("storeId");
  const navigate = useNavigate();

  const [store, setStore] = useState({
    storeId: 0,
    name: "",
    address: "",
    city: "",
    img: "",
    rating: 0.0,
    score: 0.0,
  });
  const [histories, setHistories] = useState([
    // 랭킹 히스토리 데이터
    {
      storeName: "",
      storeId: 0,
      city: "",
      season: "",
      ranking: 0,
      img: "",
    },
  ]);
  const [storeReviews, setStoreReviews] = useState([]);

  const [setWishState] = useState(false); // 찜하기 상태
  const [season, setSeason] = useState();


  useEffect(() => {

    fetch("/seasonRank/now", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        console.log("Raw Response:", text);
        setSeason(text);
        // console.log("season: ", season)
      })
      .catch((error) => {
        console.error("HTTP 요청 중 오류 발생:", error);
      });

    }, []);


  useEffect(() => {
    axios
      .get("/members/auth", {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((response) => {
        if (!(response.status === 200)) {
          sessionStorage.setItem("IsLogin", false);
          navigate("/");
          logoutHandler();
        }
      })
      .catch((error) => {
        if (error.response) {
          // 서버가 응답을 반환한 경우
          console.error("Fetch error", error.response.data);
          console.log(
            `에러 코드: ${error.response.data.errorCode}, 메시지: ${error.response.data.message}`
          );
        } else if (error.request) {
          // 서버가 응답하지 않은 경우
          console.error("No response was received", error.request);
        } else {
          // 그 외의 에러 발생 시
          console.error("Error", error.message);
        }
      });
  }, []);

  useEffect(() => {

    fetch(`http://15.165.26.32:8080/store/${storeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json) {
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

    axios
      .get(`/seasonRank/store/${storeId}`, {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((response) => {
        setHistories(response.data);
        // 서버 응답 처리
        console.log("SeasonRank: ", response.data);
      })
      .catch((error) => {
        if (error.response) {
          // 서버가 응답을 반환한 경우
          console.error("Fetch error", error.response.data);
          console.log(
            `에러 코드: ${error.response.data.errorCode}, 메시지: ${error.response.data.message}`
          );
        } else if (error.request) {
          // 서버가 응답하지 않은 경우
          console.error("No response was received", error.request);
        } else {
          // 그 외의 에러 발생 시
          console.error("Error", error.message);
        }
      });
  }, [storeId]);

  useEffect(() => {
    fetch(`/wish/state/${storeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((data) => {
      if (data === true) {
        setLike((prevLikes) => ({ ...prevLikes, [storeId]: true }));
      } else if (data === false) {
        setLike((prevLikes) => ({ ...prevLikes, [storeId]: false }));
      }

    })
  }, [storeId]);

  useEffect(() => {
    fetch(`/reviews/store/${storeId}?${season ? `season=${season}&` : ''}page=0&size=3`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json && Array.isArray(json)) {
          // 현재 상태와 새로운 데이터를 합칩니다.
          setStoreReviews((prevReviews) => [...prevReviews, ...json]);
          setCurrentStoreReviews(json); // 새로운 데이터를 저장합니다.
          console.log("StoreReviews: ", json);
        } else {
          console.error("리뷰 데이터가 올바르지 않습니다.");
        }
      })
      .catch((error) => {
        console.error("리뷰 데이터 가져오기 오류:", error);
      });
  }, [storeId, season]);




  const handleMoreReviews = () => {
    navigate(`/morereview?storeId=${storeId}`);
  };

  const handleWish = () => {
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
  };

  const parseRankingData = (data) => {
    return data.map((item) => {
      return {
        season: item.season,
        ranking: item.ranking,
      };
    });
  };

  const toggleFavorite = (storeId) => () => {
    const isFavorite = like[storeId];
    if (!isFavorite) {
      fetch(`/wish/change/${storeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setLike((prevLikes) => ({ ...prevLikes, [storeId]: true }));
          setSnackState((prevState) => ({
            ...prevState,
            open: true,
            msg: `${store.name} sets liked`,
          }));
        })
        .catch((error) => {
          // 오류 처리
          console.error("오류 발생:", error);
        });

      setLike((prevLikes) => ({ ...prevLikes, [storeId]: true }));
      setSnackState((prevState) => ({
        ...prevState,
        open: true,
        msg: `${store.name} sets liked`,
      }));
    } else {
      fetch(`/wish/change/${storeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((d) => {
          setLike((prevLikes) => ({ ...prevLikes, [storeId]: false }));
          setSnackState((prevState) => ({
            ...prevState,
            open: true,
            msg: `${store.name} sets unliked`,
          }));
        })
        .catch((error) => {
          // 오류 처리
          console.error("오류 발생:", error);
        });
      setLike((prevLikes) => ({ ...prevLikes, [storeId]: false }));
      setSnackState((prevState) => ({
        ...prevState,
        open: true,
        msg: `${store.name} sets unliked`,
      }));
    }
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackState({ open: false, msg: "" });
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
              <CardActions>
                <IconButton onClick={toggleFavorite(storeId)}>
                  {like[storeId] ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
              </CardActions>
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
                <div>
                  <ReviewCard
                    reviewId={storeReviews.reviewId}
                    imageSrc={`http://15.165.26.32:8080/images/${storeReviews.img}`}
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
