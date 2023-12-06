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
import axios from 'axios';
import {Favorite, FavoriteBorder, SystemSecurityUpdate} from '@mui/icons-material';
import {Card, CardContent, CardActions, Typography, IconButton} from '@mui/material';
import SnackMsg from './SnackMsg';

const MoreStore = () => {
  const [like, setLike] = React.useState({});
  const [snackState, setSnackState] = React.useState({open : false, msg :''})
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

    axios.get(`/seasonRank/store/${storeId}`, {
      'Content-Type': 'application/json', withCredentials:true,
    })
    .then(response => {
      setHistories(response.data);
      // 서버 응답 처리
      console.log("SeasonRank: ", response.data);
    })
    .catch((error) => {
      if (error.response) {
        // 서버가 응답을 반환한 경우
        console.error("Fetch error", error.response.data);
        alert(`에러 코드: ${error.response.data.errorCode}, 메시지: ${error.response.data.message}`);
      } else if (error.request) {
        // 서버가 응답하지 않은 경우
        console.error("No response was received", error.request);
      } else {
        // 그 외의 에러 발생 시
        console.error("Error", error.message);
      }
  
  })



  



    // fetch(`/seasonRank/store/${storeId}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then((response) => {
    //     console.log("Response: ", response.data)
        
    //   })
    //   .then((json) => {
    //     if (json) {
    //       // setStore(json);
    //       setHistories(json); 
    //       console.log(json);
    //     } else {
    //       console.error("시즌 데이터가 유효하지 않습니다:", json);
    //     }
    //   })
    //   .catch((error) => {
    //     if (error.response) {
    //       // 서버가 응답을 반환한 경우
    //       console.error("Fetch error", error.response.data);
    //       alert(`에러 코드: ${error.response.data.errorCode}, 메시지: ${error.response.data.message}`);
    //     } else if (error.request) {
    //       // 서버가 응답하지 않은 경우
    //       console.error("No response was received", error.request);
    //     } else {
    //       // 그 외의 에러 발생 시
    //       console.error("Error", error.message);
    //     }
    
    // })




  }, [storeId]);





    useEffect(() => {
      // seasons 데이터 가져오기
      fetch("http://15.165.26.32:8080/seasonRank/seasonName", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json && json.length > 0) {
            // seasons 데이터 업데이트
            // setSeasons(json.reverse());
    
            console.log(json);
            setSeason(json[0]);
          } else {
            console.error("시즌 데이터가 올바르지 않습니다.");
          }
        })
        .catch((error) => {
          console.error("시즌 데이터 가져오기 오류:", error);
        });
    }, []);





  useEffect(() => {




    fetch(`/wish/state/${storeId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // Now you can set the wishState based on the parsed data
        setWishState(data);
        console.log("wishstate: ", data);
      })
      .catch((error) => {
        if (error.response) {
          // 서버가 응답을 반환한 경우
          console.error("Fetch error", error.response.data);
          alert(`에러 코드: ${error.response.data.errorCode}, 메시지: ${error.response.data.message}`);
        } else if (error.request) {
          // 서버가 응답하지 않은 경우
          console.error("No response was received", error.request);
        } else {
          // 그 외의 에러 발생 시
          console.error("Error", error.message);
        }
      })



  }, [storeId, like]);

  //   if (stores.length > 0) {
  //     const foundStore = stores.find((s) => s.storeId === storeId);
  //     setStore(foundStore);
  //   }

  //   const wish = getWishStateByStoreId(storeId, "userId");
  //   setWishState(wish);
  // }, [wishState]);

  useEffect(() => {
    console.log("season: ", season)
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

  const toggleFavorite = () => () => {
    const isFavorite = like;
    if (!isFavorite) {
        fetch(`/wish/change/${storeId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then( response => response.json())
        .then((data) => {
            // 처리할 내용 추가
            // console.log(data);
            // setLikes({ ...likes, [collectionId]: true });
            // setSnackState({ ...snackState, open: true, msg: `${collectionName} is clicked` });
            setLike(prevLikes => ( true ));
            setSnackState(prevState => ({
            ...prevState,
            open: true,
            msg: `${store.name} sets liked`
            })); 
        }).catch(error => {
            // 오류 처리
            console.error('오류 발생:', error);
        })

        setLike(prevLikes => ( true ));
            setSnackState(prevState => ({
            ...prevState,
            open: true,
            msg: `${store.name} sets liked`
            })); 
    } else {
        fetch(`/wish/change/${storeId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then( r => r.json()).then((d) => {
            // 처리할 내용 추가
            // console.log('Music unliked:', d);
            // setLikes({ ...likes, [collectionId]: false });
            // setSnackState({ ...snackState, open: true, msg: `${collectionName} is unclicked` });
            setLike(prevLikes => ( false ));
            setSnackState(prevState => ({
              ...prevState,
              open: true,
              msg: `${store.name} sets unliked`
            }));
        }).catch(error => {
            // 오류 처리
            console.error('오류 발생:', error);
        })
        setLike(prevLikes => ( false ));
            setSnackState(prevState => ({
              ...prevState,
              open: true,
              msg: `${store.name} sets unliked`
            }));
    }
}

const handleSnackbarClose = (event, reason) => {
  if (reason === 'clickaway') {
      return ;
  }

  setSnackState({open : false, msg : ''});
}

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
              <IconButton onClick={toggleFavorite()}>
                            {like ? <Favorite /> : <FavoriteBorder />}
              </IconButton>
              </CardActions>
              {/* <div
                className={`${styles.wishIcon} ${
                  wishState ? styles.checked : ""
                }`}
                onClick={handleWish}
              >
                {wishState ? "\u2714" : "\u2764"}
              </div> */}
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
                  {/* <SnackMsg open = {snackState.open} message = {snackState.msg}
                onClose = {handleSnackbarClose}/> */}
    </div>
  );
};

export default MoreStore;
