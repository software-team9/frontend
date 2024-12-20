import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MoreReview.module.css";
import ReviewCard from "../../components/reviewcard/More_ReviewCard";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";

const REVIEWS_PER_PAGE = 4;

const MoreReview = ({ logoutHandler }) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const storeId = queryParams.get("storeId");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentReviews, setCurrentReviews] = useState([]);
  const navigate = useNavigate();
  const [season, setSeason] = useState("2023-Winter");
  const [storeReviews, setStoreReviews] = useState([
    {
      content: "",
      ratingPoint: 0.0,
      img: "",
      season: "",
      reviewId: 0,
    },
  ]);
  const [seasons, setSeasons] = useState([]);
  const [season_Now, setSeason_Now] = useState();

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
        setSeason_Now(text);
        setSeason(text);
        // console.log("season: ", season)
      })
      .catch((error) => {
        console.error("HTTP 요청 중 오류 발생:", error);
      });
  }, []);


  useEffect(() => {
    fetch(
      `http://15.165.26.32:8080/reviews/store/${storeId}?season=${season}&page=${
        currentPage - 1
      }`,
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
          setSeasons(json);
          console.log(json);
        } else {
          console.error("시즌 데이터가 올바르지 않습니다.");
        }
      })
      .catch((error) => {
        console.error("시즌 데이터 가져오기 오류:", error);
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
          alert(
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
    console.log("Season: ", season);
  }, [season]);

  useEffect(() => {
    setSeason(season_Now);
  }, [season_Now]);

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
          <MenuItem key={season_Now} value={season_Now}>
            {season_Now}
          </MenuItem>

          {seasons
            .slice()
            .reverse()
            .map((seasonValue) => (
              <MenuItem key={seasonValue} value={seasonValue}>
                {seasonValue}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <section className={styles.reviewSection}></section>
      {currentReviews.length ? (

<div>
{currentReviews.map((storeReviews) => (
        <div>
          <ReviewCard
            reviewId={storeReviews.reviewId}
            imageSrc={`http://15.165.26.32:8080/images/${storeReviews.img}`}
            rating={storeReviews.ratingPoint}
            reviewText={storeReviews.content}
          />
        </div>
      ))}
  </div>
      ) : (
        <div>
                  <div className={styles.emptyMessage}>
          리뷰리스트에 등록된 리뷰가 없어요 ㅠㅠ
        </div>
  </div>
      )}

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
