import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useStoreHook from "../../hooks/useStoreHook";
import styles from "./MyWishList.module.css";

import HeadName from "../../components/head/Head";

const MyWishList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { getWishListByUserId } = useStoreHook();
  const [stores, setStores] = useState([  ]);

  useEffect(() => {
    const fetchWishList = async () => {
      const userId = 168;
      if (userId) { // userId가 유효한 값인지 확인
        try {
          const wishList = await getWishListByUserId(userId);
          console.log(wishList);
          setStores(wishList || []); // wishList가 없을 경우 빈 배열을 설정
        } catch (error) {
          console.error("There was a problem fetching the wish list:", error);
          setStores([]); // 에러 발생 시 빈 배열을 설정하여 오류 방지
        }
      } else {
        console.error("No user ID found in session storage.");
        setStores([]); // userId가 없을 경우 빈 배열을 설정
      }
    };

    fetchWishList();
  }, []);

  const handleStoreClick = (storeId) => {
    navigate(`/store/${storeId}`);
  };

  return (
    <div className={styles.rankingContainer}>
      <HeadName title="내 위시리스트" />

      {stores.length > 0 ? (
        <table className={styles.tableContainer}>
          <tbody>
            {stores.map((store, index) => (
              <tr
                key={store.id}
                className={styles.storeItem}
                onClick={() => handleStoreClick(store.id)}
              >
                <td>
                  <img className={styles.storeImage}
                    src={store.img}
                    alt={`이미지`}
                  />
                </td>
                <td>
                  <p className={styles.storeName}>{store.name}</p>
                  <p className={styles.storeCity}>{store.city}</p>
                  <p className={styles.storeAdress}>{store.adress}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className={styles.emptyMessage}>
          위시리스트에 추가된 가게가 없어요 ㅠㅠ
        </div>
      )}
    </div>
  );
};

export default MyWishList;
