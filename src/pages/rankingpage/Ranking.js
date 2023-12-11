import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import styles from "./Ranking.module.css";
import useStoreHook from "../../hooks/useStoreHook";
import RankingCard from "./RankingCard";
import FameCard from "./FameCard";
import Dday from "./Dday";
import NoDataView from './NoDataView';

import img from "./image.jpg";
const STORES_PER_PAGE = 4;
const HALL_OF_FAME_STORES_PER_PAGE = 4;
const storedata = {
  rank: "1",
  name: "리그오브레스토랑",
  rating: 4.1,
  adress: "경기 수원시 영통구 월드컵로 206",
  imageSrc: img,
};

const Ranking = () => {
  const targetDate = "2023-12-25"; 
  // 시즌 끝나는 시간을 서버에서 불러와서 targetDate에 저장하면 됩니다.

  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };
  const navigate = useNavigate();
  // const { getStoreListByCondition } = useStoreHook();

  const [stores, setStores] = useState([
    {
      storeId: 0,
      name: "",
      address: "",
      city: "",
      img: "",
      rating: "",
    },
  ]);



  const [hallOfFames, setHallofFames] = useState([
    {
      city: "",
      img: "",
      ranking: 0,
      season: "",
      storeId: 0,
      storeName: ""
    }
  ]);

  // State for filtering
  const [city, setCity] = useState("서울");
  // const [category, setCategory] = useState("");
  const [season, setSeason] = useState("");
  const [seasons, setSeasons] = useState([]);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentStores, setCurrentStores] = useState([]);

  const [HallOfFame_currentPage, setHallOfFame_CurrentPage] = useState(1);
  const [HallOfFame_totalPages, setHallOfFame_TotalPages] = useState(0);
  const [HallOfFame_currentStores, setHallOfFame_CurrentStores] = useState([]);

  // State for the selected view option (real-time ranking or hall of fame)
  const [selectedView, setSelectedView] = useState("realTime");

  useEffect(() => {
    // stores에 대한 데이터 가져오기
    fetch(
      `http://15.165.26.32:8080/stores/rank/${city}`,
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
          setStores(json);
          setTotalPages(Math.ceil(json.length / STORES_PER_PAGE)); // Update totalPages
          console.log(json);
        } else {
          console.error("상점 데이터가 올바르지 않습니다.");
        }
      })
      .catch((error) => {
        console.error("상점 데이터 가져오기 오류:", error);
      });
  }, [city]);

  useEffect(() => {
    // season stores에 대한 데이터 가져오기
    console.log("season: ", season, "city: ", city)
    fetch(`/seasonRank/${season}/${city}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("API response:", json); // Add this line to see the API response
        if (Array.isArray(json)) {  // Check if the response is an array
          setHallofFames(json);
          setHallOfFame_TotalPages(
            Math.ceil(json.length / HALL_OF_FAME_STORES_PER_PAGE)
          ); // Update totalPages
          console.log(json);
        } else {
          console.error("명예의 전당 데이터가 올바르지 않습니다.");
        }
      })
      .catch((error) => {
        console.error("명예의 전당 데이터 가져오기 오류:", error);
      });
  }, [city, season]);

  useEffect(() => {
    setTotalPages(Math.ceil(stores.length / STORES_PER_PAGE));
    const startIndex = (currentPage - 1) * STORES_PER_PAGE;
    const selectedStores = stores.slice(
      startIndex,
      startIndex + STORES_PER_PAGE
    );
    setCurrentStores(selectedStores);
  }, [currentPage, stores]);

  useEffect(() => {
    setTotalPages(Math.ceil(hallOfFames.length / HALL_OF_FAME_STORES_PER_PAGE));
    const HallOfFame_startIndex =
      (HallOfFame_currentPage - 1) * HALL_OF_FAME_STORES_PER_PAGE;
    const HallOfFame_selectedStores = hallOfFames.slice(
      HallOfFame_startIndex,
      HallOfFame_startIndex + HALL_OF_FAME_STORES_PER_PAGE
    );
    setHallOfFame_CurrentStores(HallOfFame_selectedStores);
  }, [HallOfFame_currentPage, hallOfFames]);

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
          setSeasons(json)
          console.log(json);
          setSeason(json[0]);
        } else {
          console.error("시즌 데이터가 올바르지 않습니다.");
        }
      })
      .catch((error) => {
        console.error("시즌 데이터 가져오기 오류:", error);
      });
  }, [city]);

  // Handlers for filtering
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  // const handleCategoryChange = (event) => {
  //   setCategory(event.target.value);
  // };

  const handleSeasonChange = (event) => {
    setSeason(event.target.value);
  };

  // Handlers for pagination
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleHallOffFame_PageClick = (page) => {
    setHallOfFame_CurrentPage(page)
  };

  

  // Handler for changing the selected view
  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  const handleStoreClick = (storeId) => {
    navigate(`/morestore?storeId=${storeId}`);
  };

  return (
    <div className={styles.rankingContainer}>
      <div className={styles.viewOptionsContainer}>
        <span
          className={
            selectedView === "realTime"
              ? styles.selectedView
              : styles.unselectedView
          }
          onClick={() => handleViewChange("realTime")}
        >
          실시간 랭킹
        </span>
        <span
          className={
            selectedView === "hallOfFame"
              ? styles.selectedView
              : styles.unselectedView
          }
          onClick={() => handleViewChange("hallOfFame")}
        >
          명예의 전당
        </span>
      </div>

      {/* Filter options */}
      {selectedView === "realTime" && (
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="city-label"></InputLabel>
            <Select
              labelId="city-label"
              id="city-select"
              value={city}
              onChange={handleCityChange}
              label="City"
            >
              <MenuItem value={"서울"}>서울</MenuItem>
              <MenuItem value={"인천"}>인천</MenuItem>
              <MenuItem value={"가평"}>가평</MenuItem>
              <MenuItem value={"고양"}>고양</MenuItem>
              <MenuItem value={"과천"}>과천</MenuItem>
              <MenuItem value={"광명"}>광명</MenuItem>
              <MenuItem value={"광주"}>광주</MenuItem>
              <MenuItem value={"구리"}>구리</MenuItem>
              <MenuItem value={"군포"}>군포</MenuItem>
              <MenuItem value={"김포"}>김포</MenuItem>
              <MenuItem value={"남양주"}>남양주</MenuItem>
              <MenuItem value={"동두천"}>동두천</MenuItem>
              <MenuItem value={"부천"}>부천</MenuItem>
              <MenuItem value={"성남"}>성남</MenuItem>
              <MenuItem value={"수원"}>수원</MenuItem>
              <MenuItem value={"시흥"}>시흥</MenuItem>
              <MenuItem value={"안산"}>안산</MenuItem>
              <MenuItem value={"안성"}>안성</MenuItem>
              <MenuItem value={"안양"}>안양</MenuItem>
              <MenuItem value={"양주"}>양주</MenuItem>
              <MenuItem value={"양평"}>양평</MenuItem>
              <MenuItem value={"여주"}>여주</MenuItem>
              <MenuItem value={"연천"}>연천</MenuItem>
              <MenuItem value={"오산"}>오산</MenuItem>
              <MenuItem value={"용인"}>용인</MenuItem>
              <MenuItem value={"의왕"}>의왕</MenuItem>
              <MenuItem value={"의정부"}>의정부</MenuItem>
              <MenuItem value={"이천"}>이천</MenuItem>
              <MenuItem value={"파주"}>파주</MenuItem>
              <MenuItem value={"평택"}>평택</MenuItem>
              <MenuItem value={"포천"}>포천</MenuItem>
              <MenuItem value={"하남"}>하남</MenuItem>
              <MenuItem value={"화성"}>화성</MenuItem>
            </Select>
          </FormControl>
          <Dday targetDate={targetDate} />
          <div>
            <table className={styles.tableContainer}>
              <tbody>
                {currentStores.map((store, index) => (
                  <tr
                    key={store.storeId}
                    onClick={() => handleStoreClick(store.storeId)}
                  >
                    <td>
                      <RankingCard
                        rank={index + 1 + (currentPage - 1) * STORES_PER_PAGE}
                        imageSrc={store.img}
                        name={store.name}
                        rating={store.rating}
                        address={store.address}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div></div>

            <div className={styles.pagination}>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={
                      currentPage === page
                        ? styles.activePage
                        : styles.pageNumber
                    }
                    onClick={() => handlePageClick(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
      {selectedView === "hallOfFame" && (
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="city-label"></InputLabel>
            <Select
              labelId="city-label"
              id="city-select"
              value={city}
              onChange={handleCityChange}
              label="City"
            >
              <MenuItem value={"서울"}>서울</MenuItem>
              <MenuItem value={"인천"}>인천</MenuItem>
              <MenuItem value={"가평"}>가평</MenuItem>
              <MenuItem value={"고양"}>고양</MenuItem>
              <MenuItem value={"과천"}>과천</MenuItem>
              <MenuItem value={"광명"}>광명</MenuItem>
              <MenuItem value={"광주"}>광주</MenuItem>
              <MenuItem value={"구리"}>구리</MenuItem>
              <MenuItem value={"군포"}>군포</MenuItem>
              <MenuItem value={"김포"}>김포</MenuItem>
              <MenuItem value={"남양주"}>남양주</MenuItem>
              <MenuItem value={"동두천"}>동두천</MenuItem>
              <MenuItem value={"부천"}>부천</MenuItem>
              <MenuItem value={"성남"}>성남</MenuItem>
              <MenuItem value={"수원"}>수원</MenuItem>
              <MenuItem value={"시흥"}>시흥</MenuItem>
              <MenuItem value={"안산"}>안산</MenuItem>
              <MenuItem value={"안성"}>안성</MenuItem>
              <MenuItem value={"안양"}>안양</MenuItem>
              <MenuItem value={"양주"}>양주</MenuItem>
              <MenuItem value={"양평"}>양평</MenuItem>
              <MenuItem value={"여주"}>여주</MenuItem>
              <MenuItem value={"연천"}>연천</MenuItem>
              <MenuItem value={"오산"}>오산</MenuItem>
              <MenuItem value={"용인"}>용인</MenuItem>
              <MenuItem value={"의왕"}>의왕</MenuItem>
              <MenuItem value={"의정부"}>의정부</MenuItem>
              <MenuItem value={"이천"}>이천</MenuItem>
              <MenuItem value={"파주"}>파주</MenuItem>
              <MenuItem value={"평택"}>평택</MenuItem>
              <MenuItem value={"포천"}>포천</MenuItem>
              <MenuItem value={"하남"}>하남</MenuItem>
              <MenuItem value={"화성"}>화성</MenuItem>
            </Select>
          </FormControl>

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
          <div>
            <table className={styles.tableContainer}>
              <tbody>


              {HallOfFame_currentStores.length > 0 ? (
                HallOfFame_currentStores.map((hallOfFames, index) => (
                  <tr
                    key={hallOfFames.storesId}
                    className={styles.storeItem}
                    onClick={() => handleStoreClick(hallOfFames.storeId)}
                  >
                    <td>
                      <FameCard
                        rank={hallOfFames.ranking}
                        imageSrc={hallOfFames.img}
                        name={hallOfFames.storeName}
                      />
                    </td>
                  </tr>
                ))
              ):(
                <tr>
                  <td>
                    <NoDataView />
                  </td>
                </tr>
              )}
              </tbody>
            </table>

            <div className={styles.pagination}>
              {Array.from({ length: HallOfFame_totalPages }, (_, index) => index + 1).map(
                (page) => (
                  <button
                    key={page}
                    className={
                      HallOfFame_currentPage === page
                        ? styles.activePage
                        : styles.pageNumber
                    }
                    onClick={() => handleHallOffFame_PageClick(page)}
                  >
                    {page}
                  </button>
                )
              )}
            </div>


          </div>
        </div>
      )}
    </div>
  );
};

export default Ranking;
