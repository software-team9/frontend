import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useWishHook from "../../hooks/useWishHook"; // 가정된 찜하기 상태 관련 훅
import styles from "./MyWishList.module.css";
import HeadName from "../../components/head/Head";
import WishListCard from "./WishlistCard";
import axios from 'axios';

const MyWishList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getWishList } = useWishHook(); // 가정된 찜하기 목록 조회 훅
  const [mywishlist, setMyWishlist] = useState([
    {
        "storeId": 173,
        "name": "솔솔우동 용인본점",
        "address": "서울특별시 종로구 종로 200-4",
        "city": "서울",
        "img": "https://t1.kakaocdn.net/mystore/5D031E772B5A4646AF67563546888FB9",
        "rating": 4.0,
        "score": 0.0
    },
    {
        "storeId": 225,
        "name": "짬뽕",
        "address": "서울특별시 종로구 종로 200-4",
        "city": "서울",
        "img": "https://t1.daumcdn.net/cfile/1563013B4F547AAC0D",
        "rating": 3.0,
        "score": 0.0
    },
    {
        "storeId": 227,
        "name": "탕수육",
        "address": "서울특별시 종로구 종로 200-4",
        "city": "서울",
        "img": "https://t1.daumcdn.net/place/768D2A4EB7C34396B5060C622DECFAD1",
        "rating": 5.0,
        "score": 0.0
    },
    {
        "storeId": 229,
        "name": "볶음밥",
        "address": "서울특별시 종로구 종로 200-4",
        "city": "서울",
        "img": "https://t1.kakaocdn.net/mystore/7910A6A9E4BD4B09AD29AEAA530E5D60",
        "rating": 0.0,
        "score": 0.0
    },
    {
        "storeId": 235,
        "name": "ㅜㄹㄸ이ㅜㄸㄹ띵",
        "address": "서울특별시 종로구 종로 200-4",
        "city": "서울",
        "img": null,
        "rating": 0.0,
        "score": 0.0
    }
]);

const [currentWish, setCurrentWish] = useState([]);

  
  useEffect(() => {

    axios.get('/wishes', {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      setMyWishlist(response.data);
    })
    .catch(error => {
      console.error('에러:', error);
      console.log('요청 구성:', error.config);
    });
    




  }, []);


  // useEffect(() => {
  //   const fetchWishList = async () => {
  //     const userId = 168;
  //     if (userId) { // userId가 유효한 값인지 확인
  //       try {
  //         const wishList = await getWishList(userId);
  //         console.log(wishList);
  //         setMyWishlist(wishList || []); // wishList가 없을 경우 빈 배열을 설정
  //       } catch (error) {
  //         console.error("There was a problem fetching the wish list:", error);
  //         setMyWishlist([]); // 에러 발생 시 빈 배열을 설정하여 오류 방지
  //       }
  //     } else {
  //       console.error("No user ID found in session storage.");
  //       setMyWishlist([]); // userId가 없을 경우 빈 배열을 설정
  //     }
  //   };

  //   fetchWishList();
  // }, []);

  const handleStoreClick = (storeId) => {
    navigate(`/morestore?storeId=${storeId}`);
  };

  return (
    <div className={styles.rankingContainer}>
    <HeadName title="내 위시리스트" />
    {mywishlist.length ? (
      mywishlist.map((wish) => (
        <div key={wish.storeId} onClick={() => handleStoreClick(wish.storeId)} className={styles.cardWrapper}>
          <WishListCard
            storeId={wish.storeId}
            imageSrc={wish.img}
            name={wish.name}
            rating={wish.rating}
            wishState={true}
          />
        </div>
      ))
    ) : (
      <p className={styles.emptyMessage}>위시리스트에 추가된 가게가 없어요 ㅠㅠ</p>
    )}
  </div>
  );
};

export default MyWishList;
