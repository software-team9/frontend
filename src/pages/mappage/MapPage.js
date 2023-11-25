import React from "react";
import GoogleMapsAPI from "../../components/googlemaps/GoogleMapsAPI";
import KakaoMapsAPI from "../../components/kakaomaps/KakaoMapsAPI"; // Adjust the path based on your file structure

import styles from "./MapPage.module.css"; // Import your styles

const MapPage = () => {
  return (
    <div className={styles.mapContainer}>
      <KakaoMapsAPI />
    </div>
  );
};

export default MapPage;
