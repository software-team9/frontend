// MyPage.js
import React from "react";
import styles from "./MyPage.module.css";
// import ProfileImage from "./ProfileImage"; // 프로필 이미지 컴포넌트를 사용한다고 가정
import { Link } from "react-router-dom";
import BottomNav from "../../components/bottomnav/BottomNav";
import TopNav from "../../components/topnav/TopNav";

const MyPage = ({userData}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TopNav />
      </div>
      <div className={styles.profileSection}>
        <div className={styles.userInfo}>
          <h2>사용자 이름</h2>
          <p>010-1234-5678</p>
          <p>{userData}</p> {/* test */}
        </div>
        <div className={styles.profileImage}>
          <img 
            src="/img/UserImageExample.png" 
            className={styles.image} 
            alt="프로필 이미지" 
          />
        </div>
      </div>
      <div className={styles.separator}></div>
      <Link to="/mypage/reviewlist" className={styles.menuItem}>
        <div className={styles.rectangle16}></div>
        내 리뷰 리스트
      </Link>
      <Link to="/mypage/editprofile" className={`${styles.menuItem} ${styles.editProfile}`}>
        <div className={styles.rectangle16}></div>
        회원정보 수정
      </Link>
      <Link to="/mypage/wishlist" className={`${styles.menuItem} ${styles.wishList}`}>
        <div className={styles.rectangle16}></div>
        내 위시 리스트
      </Link>
      <Link to="/mypage/inquiry" className={`${styles.menuItem} ${styles.inquiry}`}>
        <div className={styles.rectangle16}></div>
        1:1 문의하기
      </Link>
      <Link to="/quit" className={`${styles.menuItem} ${styles.withdrawal}`}>
        <div className={styles.rectangle16}></div>
        회원탈퇴
      </Link>

      <BottomNav />
    </div>
  );
};

export default MyPage;
