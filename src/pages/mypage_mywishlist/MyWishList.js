import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; 
import useWishListHook from "../../hooks/useUserDataHook";
import useStoreHook from "../../hooks/useStoreHook";
import styles from "./MyWishList.module.css";

const MyWishList = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get("userId");
  const navigate = useNavigate();

  const { getWishListByUserId } = useWishListHook();
  const { getStoreById } = useStoreHook();
  const [wishListStores, setWishListStores] = useState([]);

  useEffect(() => {
    const wishList = getWishListByUserId(userId);
    const stores = wishList.map(storeId => getStoreById(storeId));
    setWishListStores(stores);
  }, [userId, getWishListByUserId, getStoreById]);

  const handleStoreClick = (storeId) => {
    navigate(`/morestore?storeId=${storeId}`); 
  };

  return (
    <div className={styles.wishlistContainer}>
      {wishListStores.map((store, index) => (
        <div key={index} className={styles.storeItem} onClick={() => handleStoreClick(store.storeId)}>
          <h2>{store.storeName}</h2>
          <p>{store.description}</p>
          {/* 기타 필요한 정보 추가 */}
        </div>
      ))}
    </div>
  );
};

export default MyWishList;
