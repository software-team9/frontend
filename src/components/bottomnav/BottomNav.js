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
      <button onClick={() => navigateTo("/writereview")}>
        <img src="src/components/bottomnav/icon/rate_review.svg" alt="Review" />
      </button>
      <button onClick={() => navigateTo("/map")}>
        <img src="/public/map.svg" alt="Map" />
      </button>
      <button onClick={() => navigateTo("/")}>
        <img src="/public/home.svg" alt="Home" />
      </button>
      <button onClick={() => navigateTo("/mypage")}>
        <img src="/public/people.svg" alt="Mypage" />
      </button>
      <button onClick={() => navigateTo("/setting")}>
        <img src="/public/setting.svg" alt="Setting" />
      </button>
    </div>
  );
};

export default BottomNav;
