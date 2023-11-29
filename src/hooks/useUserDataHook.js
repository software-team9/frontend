import { useState } from "react";
import wishListData from "./userData.json"; // JSON 파일을 이 경로로 가정

const useWishListHook = () => {
  const [wishLists, setWishLists] = useState(wishListData.users);
  const [reviewLists, setReviewLists] = useState(wishListData.users)


  // 특정 사용자의 위시리스트 반환
  const getWishListByUserId = (userId) => {
    const user = wishLists.find((user) => user.userId === userId);
    return user ? user.wishList : [];
  };


  // 위시리스트에 가게 추가
  const addStoreToWishList = (userId, storeId) => {
    setWishLists(wishLists.map((user) => {
      if (user.userId === userId) {
        return { ...user, wishList: [...user.wishList, storeId] };
      } else {
        return user;
      }
    }));
  };

  // 위시리스트에서 가게 삭제
  const removeStoreFromWishList = (userId, storeId) => {
    setWishLists(wishLists.map((user) => {
      if (user.userId === userId) {
        return { ...user, wishList: user.wishList.filter(id => id !== storeId) };
      } else {
        return user;
      }
    }));
  };

  // 특정 사용자의 리뷰 ID 리스트 반환
  const getReviewListByUserId = (userId) => {
    const review = reviewLists.find((user) => user.userId === userId);
    return review ? review.reviewList : [];
  };





  return {
    getWishListByUserId,
    addStoreToWishList,
    removeStoreFromWishList,
    getReviewListByUserId
  };
};

export default useWishListHook;
