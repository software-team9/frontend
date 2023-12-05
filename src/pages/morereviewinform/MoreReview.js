import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useReviewHook from "../../hooks/useReviewHook";
import styles from "./MoreReview.module.css";
import useStoreHook from "../../hooks/useStoreHook";
import ReviewCard from "../../components/reviewcard/More_ReviewCard";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import image1 from "./이미지4.jpg";
import image2 from "./이미지5.jpg";
import image3 from "./이미지6.jpg";
const REVIEWS_PER_PAGE = 10;

const MoreReview = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeId = queryParams.get("storeId");
  const { getReviewsByStoreId } = useReviewHook();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentReviews, setCurrentReviews] = useState([]);
  const [store, setStore] = useState(null);
  const [season, setSeason] = useState("2023-Winter")
  const [storeReviews, setStoreReviews] = useState([
    {
      content: "제육맛집",
      ratingPoint: 5,
      img: image1,
      season: "2023-Winter",
      reviewId: 307,
    },
    {
      content: "음식이 정말 맛있어요",
      ratingPoint: 5,
      img: image2,
      season: "2023-Winter",
      reviewId: 306,
    },
    {
      content: "다시 오고 싶어요",
      ratingPoint: 5,
      img: image3,
      season: "2023-Winter",
      reviewId: 302,
    },
    {
      content: "다시 또 오고싶은 가게에요!",
      ratingPoint: 5,
      img: "src/main/resources/static/images/16b368a4-1787-416f-ab21-475b066dd26f.png",
      season: "2023-Winter",
      reviewId: 309,
    },
  ]);
  const [seasons, setSeasons] = useState([]);

//   useEffect(() => {
//     fetch(`http://15.165.26.32:8080/reviews/store/${storeId}?season=${season}&page=${currentPage-1}`, {
//       method: 'GET',
//       headers: {
//         "Content-Type": "application/json"
//       },
//     })
//     .then((response) => response.json())
//     .then((json) => {
//       if (json) {
//         setStoreReviews(json)
//         console.log(json);
//       } else {
//         console.error("리뷰 데이터가 올바르지 않습니다.");
//       }
//     })
//     .catch((error) => {
//       console.error("리뷰 데이터 가져오기 오류:", error);
//     });
// }, [storeId, season]);

useEffect(() => {
  // seasons 데이터 가져오기
  fetch('http://15.165.26.32:8080/seasonRank/seasonName', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    },
  })
    .then((response) => response.json())
    .then((json) => {
      if (json && json.length > 0 ) {
        // seasons 데이터 업데이트
        setSeasons(json.reverse());
        console.log(json);
        setSeason(json[0])
      } else {
        console.error("시즌 데이터가 올바르지 않습니다.");
      }
    })
    .catch((error) => {
      console.error("시즌 데이터 가져오기 오류:", error);
    });
}, []);

useEffect(() => {
  setTotalPages(Math.ceil(storeReviews.length / REVIEWS_PER_PAGE));
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const selectedReviews = storeReviews.slice(
    startIndex,
    startIndex + REVIEWS_PER_PAGE
  );
  setCurrentReviews(selectedReviews);
}, [currentPage, storeReviews]);

const handleSeasonChange = (event) => {
  setSeason(event.target.value);
};

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="season-label"></InputLabel>
            <Select
              labelId="season-label"
              id="season-select"
              value={season}
              onChange={handleSeasonChange}
              label="Season"
            >
            {seasons.map((seasonValue) => (
              <MenuItem key={seasonValue} value={seasonValue}>
                {seasonValue}
              </MenuItem>
            ))}
            </Select>
          </FormControl>
      <section className={styles.reviewSection}></section>
      {currentReviews.map((storeReviews) => (
        <div>
          <ReviewCard
            reviewId = {storeReviews.reviewId}
            imageSrc={storeReviews.img}
            rating={storeReviews.ratingPoint}
            reviewText={storeReviews.content}
          />
        </div>
      ))}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              className={
                currentPage === page ? styles.activePage : styles.pageNumber
              }
              onClick={() => handlePageClick(page)}
            >
              {page}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default MoreReview;
