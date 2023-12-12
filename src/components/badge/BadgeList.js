import React from "react";
import styles from "./BadgeList.module.css";

const seasonColors = {
  Spring: "E1EB96",
  Summer: "9ED8A1",
  Fall: "CDA4CB",
  Winter: "99DBDA",
};

const BadgeList = ({ data }) => {
  // Transform 'season' values in data
  const transformedData = data.map((item) => ({
    ...item,
    season: item.season.replace("-", "_"),
  }));

  // Function to determine color based on ranking
  const determineColor = (rank) => {
    if (rank <= 3) return "FFD700";
    if (rank <= 10) return "B22222";
    if (rank <= 20) return "CD5C5C";
    if (rank <= 30) return "E9967A";
    if (rank <= 40) return "FFA07A";
    if (rank <= 50) return "FF4500";
    if (rank <= 60) return "F46B6B";
    if (rank <= 70) return "E68585";
    if (rank <= 80) return "BA9595";
    if (rank <= 90) return "AEA1A1";
  };

  // Function to generate badge URL
  const generateBadgeUrl = (season, rank) => {
    const seasonPart = season.split("_")[1]; // "2023_Winter"에서 "Winter" 추출
    const labelColor = seasonColors[seasonPart] || "defaultColor"; // 계절에 맞는 색상 가져오기

    const color = determineColor(rank);
    let url = `https://img.shields.io/badge/${season}ㅤ-ㅤ${rank}등ㅤ-${color}?style=for-the-badgee&labelColor=${labelColor}`;

    if (rank >= 1 && rank <= 3) {
      url += "&logo=coveralls";
    }

    return url;
  };

  return (
    <div className={styles.badgeList}>
      {transformedData
        .filter((item) => item.ranking !== 0)
        .map((item, index) => (
          <div key={index}>
            <img
              src={generateBadgeUrl(item.season, item.ranking)}
              alt={`${item.season} Ranking`}
            />
          </div>
        ))}
    </div>
  );
};

export default BadgeList;
