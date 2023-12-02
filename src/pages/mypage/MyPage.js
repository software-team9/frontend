import React from "react";
import styles from "./MyPage.module.css";
import { Link } from "react-router-dom";
import image from "./123.png"; 

const MyPage = () => {
  const userName = "User Name"; 
  const userPhone = "010-9999-9999"; 

  return (
    <div className={styles.container}>
      <section className={styles.profileSection}>
        <img
          alt="User Profile"
          className={styles.profileImage}
          src={image} 
        />
        <h1 className={styles.userName}>{userName}</h1>
        <p className={styles.userPhone}>{userPhone}</p>
      </section>

      <section className={styles.linksSection}>
        <Link to="/mypage/editprofile" className={styles.menuItem}>
          회원정보 수정
        </Link>
        <Link to="/mypage/reviewlist" className={styles.menuItem}>
          내 리뷰 리스트
        </Link>
        <Link to="/mypage/wishlist" className={styles.menuItem}>
          내 위시 리스트
        </Link>
        <Link to="/mypage/inquirylist" className={styles.menuItem}>
          내 문의 리스트
        </Link>
        <Link to="/mypage/inquiry" className={styles.menuItem}>
          1:1 문의하기
        </Link>
      </section>

      <section className={styles.linksSectionAlt}>
        <Link to="/quit" className={styles.menuItemAlt}>
          회원탈퇴
        </Link>
        <Link to="/logout" className={styles.menuItemAlt}>
          로그아웃
        </Link>
      </section>
    </div>
  );
};

export default MyPage;
