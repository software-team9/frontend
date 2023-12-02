import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import styles from "./Rankinglist.module.css";
import useStoreHook from "../../hooks/useStoreHook";
import RankingContainer from "./RankingContainer";

const STORES_PER_PAGE = 10;

const Ranking = () => {
  const navigate = useNavigate();
  const { getStoreListByCondition } = useStoreHook();

  // State for filtering
  const [city, setCity] = useState("서울");
  const [category, setCategory] = useState("");
  const [season, setSeason] = useState("");

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentStores, setCurrentStores] = useState([]);

  // State for the selected view option (real-time ranking or hall of fame)
  const [selectedView, setSelectedView] = useState("realTime");

  useEffect(() => {
    // Fetch and update data based on conditions (city, category, etc.)
    const stores = getStoreListByCondition(city);
    setTotalPages(Math.ceil(stores.length / STORES_PER_PAGE));
    const startIndex = (currentPage - 1) * STORES_PER_PAGE;
    const selectedStores = stores.slice(
      startIndex,
      startIndex + STORES_PER_PAGE
    );
    setCurrentStores(selectedStores);
  }, [currentPage]);

  // Handlers for filtering
  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSeasonChange = (event) => {
    setCategory(event.target.value);
  };

  // Handlers for pagination
  const handlePageClick = (page) => {
    setCurrentPage(page);
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
      {/* View options container */}
      <div className={styles.viewOptionsContainer}>
        <span
          className={selectedView === "realTime" ? styles.selectedView : ""}
          onClick={() => handleViewChange("realTime")}
        >
          실시간 랭킹
        </span>
        <span
          className={selectedView === "hallOfFame" ? styles.selectedView : ""}
          onClick={() => handleViewChange("hallOfFame")}
        >
          명예의 전당
        </span>
      </div>

      {/* Filter options */}
      {selectedView === "realTime" && (
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="city-label">지역</InputLabel>
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
              {/* Add your city options */}
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="category-label">카테고리</InputLabel>
            <Select
              labelId="category-label"
              id="category-select"
              value={category}
              onChange={handleCategoryChange}
              label="Category"
            >
              {/* Add your category options */}
            </Select>
          </FormControl>
          <div>
            <table className={styles.tableContainer}>
              <tbody>
                {currentStores.map((store, index) => (
                  <tr
                    key={store.storeId}
                    className={styles.storeItem}
                    onClick={() => handleStoreClick(store.storeId)}
                  >
                    <td className={styles.rankBox}>
                      <p className={styles.rankNumber}>{index + 1}</p>
                    </td>
                    <td>
                      <img src={store.image} alt={"가게"} />
                    </td>
                    <td>
                      <p className={styles.storeName}>
                        {store.storeName} ✩ {store.avr_rating}
                      </p>
                      <p className={styles.storeAdress}>{store.address}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {selectedView === "hallOfFame" && (
        <div>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="city-label">지역</InputLabel>
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
              {/* Add your city options */}
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="season-label">시즌</InputLabel>
            <Select
              labelId="season-label"
              id="season-select"
              value={season}
              onChange={handleSeasonChange}
              label="Season"
            >
              {/* Add your category options */}
              <MenuItem value={""}></MenuItem>
            </Select>
          </FormControl>
          <div>
            {/* Ranked items list */}
            <table className={styles.tableContainer}>
              <tbody>
                {currentStores.map((store, index) => (
                  <tr
                    key={store.storeId}
                    className={styles.storeItem}
                    onClick={() => handleStoreClick(store.storeId)}
                  >
                    {/* Display rank, image, and detailed information in a table row */}

                    <td className={styles.rankBox}>
                      <p className={styles.rankNumber}>{index + 1}</p>
                    </td>
                    <td>
                      <img src={store.image} alt={"가게"} />
                    </td>
                    <td>
                      <p className={styles.storeName}>
                        {store.storeName} ✩ {store.avr_rating}
                      </p>
                      <p className={styles.storeName}>{store.address}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Ranking;
