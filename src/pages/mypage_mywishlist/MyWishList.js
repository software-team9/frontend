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
  const [mywishlist, setMyWishlist] = useState([]);

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
