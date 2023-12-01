import React, { useState, useEffect } from "react";
import GoogleMapsAPI from "../../components/googlemaps/GoogleMapsAPI";
import KakaoMapsAPI from "../../components/kakaomaps/KakaoMapsAPI"; // Adjust the path based on your file structure
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./MapPage.module.css"; // Import your styles
import { Map, MapMarker } from "react-kakao-maps-sdk"
import { useKakaoLoader as useKakaoLoaderOrigin } from "react-kakao-maps-sdk"
import storeData from "../../hooks/StoreList2.json";
import debounce from 'lodash/debounce';
const { kakao } = window;


const MapPage = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("서울");
  const [state, setState] = useState()
  const [searchResults, setSearchResults] = useState(null); // State to store search results
  const [positions, setPositions] = useState([]);


  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  // Create a mapping of city names to coordinates
  const cityCoordinates = {
    서울: { lat: 37.566700, lng: 126.978378},
    인천: { lat: 37.456205, lng: 126.705208},
    가평: { lat: 37.831298, lng: 127.509570},
    고양: { lat: 37.658247, lng: 126.832010},
    과천: { lat: 37.429232, lng: 126.987609},
    광명: { lat: 37.478552, lng: 126.864969},
    광주: { lat: 37.429459, lng: 127.255133},
    구리: { lat: 37.603433, lng: 127.141841},
    군포: { lat: 37.361600, lng: 126.935290},
    김포: { lat: 37.615397, lng: 126.715445},
    남양주: { lat: 37.635863, lng: 127.216559},
    동두천: { lat: 37.903562, lng: 127.061152},
    부천: { lat: 37.503545, lng: 126.765842},
    성남: { lat: 37.420067, lng: 127.126658},
    수원: { lat: 37.263499, lng: 127.028596},
    시흥: { lat: 37.380157, lng: 126.802858},
    안산: { lat: 37.321999, lng: 126.831199},
    안성: { lat: 37.007903, lng: 127.279848},
    안양: { lat: 37.394362, lng: 126.956851},
    양주: { lat: 37.785338, lng: 127.045784},
    양평: { lat: 37.491727, lng: 127.487425},
    여주: { lat: 37.298257, lng: 127.637170},
    연천: { lat: 38.096461, lng: 127.075053},
    오산: { lat: 37.149817, lng: 127.077015},
    용인: { lat: 37.240653, lng: 127.177286},
    의왕: { lat: 37.344851, lng: 126.968712},
    의정부: { lat: 37.738145, lng: 127.033766},
    이천: { lat: 37.272290, lng: 127.435038},
    파주: { lat: 37.759486, lng: 126.780316},
    평택: { lat: 36.992371, lng: 127.112700},
    포천: { lat: 37.894961, lng: 127.200348},
    하남: { lat: 37.539158, lng: 127.214601},
    화성: { lat: 37.199451, lng: 126.831691},
    // Add other cities and their coordinates
    // ...
  };

  const getXYByKeyword = async (address) => {
    try {
      const response = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${address}`, {
        method: 'GET',
        headers: {
          "Authorization": "KakaoAK 48f52f09b5313cba31a0459b42baaa2b",
        },
      });
  
      const data = await response.json();
  
      // Assuming the first document in the response contains the desired coordinates
      const firstDocument = data.documents[0];
      const x = firstDocument.x; // Replace 'x' with the actual key in your response
      const y = firstDocument.y; // Replace 'y' with the actual key in your response
  
      return { lat: y, lng: x };
    } catch (error) {
      console.error('Error fetching data:', error);
      return { lat: 0, lng: 0 }; // Replace with appropriate default values
    }
  };

  
  const fetchPositions = debounce(async () => {
    try {
      const transformedData = [];
  
      for (const store of storeData) {
        const latlng = await getXYByKeyword(store.address);
        transformedData.push({ id: store.id, title: store.name, latlng: latlng });
      }
  
      setPositions(transformedData);
    } catch (error) {
      console.error('위치 정보를 가져오는 중 오류 발생:', error);
    }
  }, 500); // 필요에 따라 디바운스 지속 시간 조절
  
  useEffect(() => {
    fetchPositions();
  }, [storeData]);


  const handleStoreClick = (storeId) => {
    navigate(`/morestore?storeId=${storeId}`);
  };
 




  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>지도</h1>
      <div className={styles.separator}></div>
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
      </div>
      <div className={styles.mapContainer}>
          <Map // 지도를 표시할 Container
          center={cityCoordinates[city]}
          style={{
            width: "100%",
            height: "450px",
          }}
          level={4} // 지도의 확대 레벨
          onCenterChanged={(map) => setState({
            level: map.getLevel(),
            center: {
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            }
          })}
        >

        {positions.map((position, index) => (
          <MapMarker
            onClick={() => handleStoreClick(position.id)}
            key={`${position.title}-${position.latlng}`}
            position={position.latlng} // 마커를 표시할 위치
            image={{
              src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png", // 마커이미지의 주소입니다
              size: {
                width: 24,
                height: 35
              }, // 마커이미지의 크기입니다
            }}
            title={position.title} // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          />
        ))}


        </Map>

        

      </div>

      {/* <div>
      <h1>Positions:</h1>
      <ul>
        {positions.map((position, index) => (
          <li key={index}>
            <strong>Title:</strong> {position.title},{' '}
            <strong>Lat/Lng:</strong> {position.latlng.lat}, {position.latlng.lng}
          </li>
        ))}
      </ul>
    </div> */}
    </div>
  );
};

export default MapPage;
