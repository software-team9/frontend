import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyWishList.module.css";
import HeadName from "../../components/head/Head";
import WishListCard from "./WishlistCard";
import axios from "axios";

const MyWishList = ({ logoutHandler }) => {
  const navigate = useNavigate();
  const [mywishlist, setMyWishlist] = useState([]);


  useEffect(() => {
    axios
      .get("/wishes", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        console.log(response.data);
        setMyWishlist(response.data);
      })
      .catch((error) => {
        console.error("에러:", error);
        console.log("요청 구성:", error.config);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/members/auth", {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((response) => {
        if (!(response.status === 200)) {
          sessionStorage.setItem("IsLogin", false);
          navigate("/");
          logoutHandler();
        }
      })
      .catch((error) => {
        if (error.response) {
          // 서버가 응답을 반환한 경우
          console.error("Fetch error", error.response.data);
          alert(
            `에러 코드: ${error.response.data.errorCode}, 메시지: ${error.response.data.message}`
          );
        } else if (error.request) {
          // 서버가 응답하지 않은 경우
          console.error("No response was received", error.request);
        } else {
          // 그 외의 에러 발생 시
          console.error("Error", error.message);
        }
      });
  }, []);

  const handleStoreClick = (storeId) => {
    navigate(`/morestore?storeId=${storeId}`);
  };

  return (
    <div className={styles.rankingContainer}>
      <HeadName title="내 위시리스트" />
      {mywishlist.length ? (
        mywishlist.map((wish) => (
          <div
            key={wish.storeId}
            onClick={() => handleStoreClick(wish.storeId)}
            className={styles.cardWrapper}
          >
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
        <p className={styles.emptyMessage}>
          위시리스트에 추가된 가게가 없어요 ㅠㅠ
        </p>
      )}
    </div>
  );
};

export default MyWishList;
