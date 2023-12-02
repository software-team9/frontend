// MyPage.js
import React, { useState } from "react";
import styles from "./MyPage.module.css";
import { Link } from "react-router-dom";
import image from "./123.png";

const MyPage = ({ userData }) => {
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.userInfo}>
          <h2>사용자 이름</h2>
          <p>010-1234-5678</p>
          <p>{userData}</p> 
        </div>
        <div className={styles.profileImage}>
          {image && (
            <div className={styles.image}>
              <img src={image} alt="프로필 이미지" />
            </div>
          )}
        </div>
      </div>
      <div className={styles.separator}></div>
      <Link
        to="/mypage/editprofile"
        className={`${styles.menuItem}`}
      >
        <div className={styles.rectangle16}></div>
        회원정보 수정
      </Link>
      <Link to="/mypage/reviewlist" className={styles.menuItem}>
        <div className={styles.rectangle16}></div>내 리뷰 리스트
      </Link>
      <Link
        to="/mypage/wishlist"
        className={`${styles.menuItem}`}
      >
        <div className={styles.rectangle16}></div>내 위시 리스트
      </Link>
      <Link to="/mypage/inquirylist" className={styles.menuItem}>
        <div className={styles.rectangle16}></div>내 문의 리스트
      </Link>
      <Link
        to="/mypage/inquiry"
        className={`${styles.menuItem} `}
      >
        <div className={styles.rectangle16}></div>
        1:1 문의하기
      </Link>

      <Link to="/quit" className={`${styles.menuItem} ${styles.withdrawal}`}>
        <div className={styles.rectangle16}></div>
        회원탈퇴
      </Link>

      <Link to="/logout" className={`${styles.menuItem} ${styles.logout}`}>
        <div className={styles.rectangle16}></div>
        로그아웃
      </Link>
    </div>
  );
};

export default MyPage;
