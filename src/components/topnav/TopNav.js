import React from "react";
import { useNavigate } from "react-router-dom"; // React Router v6 이상의 useNavigate 훅
import styles from "./TopNav.module.css"; // CSS 모듈 임포트

const TopNav = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleBack = () => {
    navigate(-1); // 한 단계 뒤로 이동
  };

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className={styles.topNav}>
      <button onClick={handleBack} className={styles.backButton}>
        {/* 뒤로 가기 아이콘 이미지 경로
        <img src={backarrow} alt="<" 
          style={{ margin: "auto", maxWidth: "30%", maxHeight: "30%" }}
         /> */}
         {"<"}
      </button>
      <div className={styles.logoContainer} onClick={handleLogoClick}>
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="로고" className={styles.logoImage} />
      </div>
      {/* 로고 정중앙 위치 유지를 위한 더미 요소 */}
      <div className={styles.dummy}></div>
    </div>
  );
};

export default TopNav;
