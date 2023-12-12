import React, { useState, useEffect } from "react";
import styles from "./MyPage.module.css";
import { Link, useNavigate } from "react-router-dom";
import image from "./123.png";
import axios from "axios";

const MyPage = ({ logoutHandler }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    password: "",
    gender: "",
    birthday: "",
  });

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

  const handleSubmit = () => {
    fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
      credentials: "include",
      mode: "cors",
    })
      .then((response) => {
        if (response.status === 200) {
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
  };

  useEffect(() => {
    axios
      .get("/members/member", {
        "Content-Type": "application/json",
        withCredentials: true,
      })
      .then((response) => {
        setUserData(response.data);
        // 서버 응답 처리
        console.log(userData.name);
        console.log(userData.phoneNumber);
        console.log(response.data);
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

  return (
    <div className={styles.container}>
      <section className={styles.profileSection}>
        <img alt="User Profile" className={styles.profileImage} src={image} />
        <h1 className={styles.userName}>{userData.name}</h1>

        <p className={styles.userPhone}>{userData.phoneNumber}</p>
      </section>
      <p>{sessionStorage.getItem("JESSIONID")}</p>
      <section className={styles.linksSection}>
        <Link to="/mypage/passwordcheck" className={styles.menuItem}>
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
        <p className={styles.menuItemAlt} onClick={() => handleSubmit()}>
          로그아웃
        </p>
        {/* <Button to="/logout" className={styles.menuItemAlt} onClick={handleSubmit}>
          로그아웃
        </Button> */}
      </section>
    </div>
  );
};

export default MyPage;
