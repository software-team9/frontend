import React, { useEffect } from "react";

const KakaoMaps = () => {
  useEffect(() => {
    // Load the Kakao Maps SDK script
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?appkey=9c6a01dd4e73e20d0eb9ba0cb3a43dae";
    document.head.appendChild(script);

    script.onload = () => {
      // Initialize Kakao Maps
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new window.kakao.maps.Map(container, options);
    };

    return () => {
      // Clean up script when the component is unmounted
      document.head.removeChild(script);
    };
  }, []);

  return <div id="map" style={{ width: "500px", height: "400px" }}></div>;
};

export default KakaoMaps;
