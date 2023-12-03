import React from "react";
import styles from "./BottomNav.module.css";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();

  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.button_nav}>
      <button onClick={() => navigateTo("/")}>
        <img
          src={process.env.PUBLIC_URL + "/icon/home.svg"}
          width="23px"
          alt="home"
        />
      </button>
      <button onClick={() => navigateTo("/map")}>
      <img
          src={process.env.PUBLIC_URL + "/icon/map.svg"}
          width="23px"
          alt="map"
        />
        {/* <img src="/public/map.svg" alt="Map" /> */}
      </button>
      <button onClick={() => navigateTo("/writereview/receiptRecognition")}>
      <img
          src={process.env.PUBLIC_URL + "/icon/add.svg"}
          width="23px"
          alt="add"
        />
        {/* <img src="src/components/bottomnav/icon/rate_review.svg" alt="Review" /> */}
      </button>
      <button onClick={() => navigateTo("/mypage/wishlist")}>
      <img
          src={process.env.PUBLIC_URL + "/icon/favorit.svg"}
          width="23px"
          alt="wish"
        />
        {/* <img src="/public/setting.svg" alt="WishList" /> */}
      </button>
      <button onClick={() => navigateTo("/mypage")}>
      <img
          src={process.env.PUBLIC_URL + "/icon/people.svg"}
          width="23px"
          alt="mypage"
        />
      </button>
    </div>
  );
};

export default BottomNav;
