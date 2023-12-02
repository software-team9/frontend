import React, { useState, useEffect } from "react";
import styles from "./MyPage.module.css";
import { Link } from "react-router-dom";
import image from "./123.png"; 

const MyPage = () => {
  const [userName, setUserName] = useState(""); // 추가
  const [userPhone, setUserPhone] = useState(""); // 추가

  useEffect(() => {
    const getMemberInfo = () => {
      fetch(`http://15.165.26.32:8080/login`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          } else {
            return response.json();
          }
        })
        .then((data) => {
          // data에서 가져온 name과 phoneNumber를 상태에 업데이트
          setUserName(data.name);
          setUserPhone(data.phoneNumber);
        })
        .catch((error) => {
          console.error('Fetch error:', error);
        });
    };

    getMemberInfo();
  }, []); // useEffect를 마운트될 때 한 번만 호출되도록 빈 의존성 배열 추가


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
