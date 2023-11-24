import React from "react";
import Button from "../../components/button/Button";
import BottomNav from "../../components/bottomnav/BottomNav";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        {" "}
        {/* 로고 이미지를 넣을 위치 */}
        {/* 예시로 텍스트 로고를 넣었습니다. 실제 이미지로 교체해주세요. */}
        <h1 className={styles.logoText}>로고</h1>
      </div>
      <div className={styles.loginMessage}>로그인하세요</div>
      <form className={styles.loginForm}>
        <input type="tel" placeholder="휴대폰번호" required />
        <input type="password" placeholder="비밀번호" required />
        <Button text="로그인" size="long" />
        <Button text="휴대폰번호로 회원가입" size="long" />
      </form>
      <BottomNav />
    </div>
  );
};

export default Login;
