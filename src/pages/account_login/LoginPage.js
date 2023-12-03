import React, { useState } from "react";
import Button from "../../components/button/Button";
import styles from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";
import useUserDataHook from "../../hooks/useUserDataHook";

const Login = ({loginHandler}) => {
  const [id, setId] = useState(""); // State for phone number
  const [pw, setPw] = useState(""); // State for password
  const { handleLogin } = useUserDataHook();
  const navigate = useNavigate();

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPw(e.target.value);
  };

  const handleSubmit = (e) => {
    // loginHandler();
    handleLogin({loginHandler}, id, pw); // 로그인 처리
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <h1 className={styles.logoText}>로고</h1>
      </div>
      <div className={styles.loginMessage}>로그인하세요</div>
      <div className={styles.loginForm} onSubmit={handleSubmit}>
        <input
          name="tel"
          placeholder="휴대폰번호"
          onChange={handleIdChange}
          type="tel"
          pattern="^\d{10}$"
          value={id}
          required
        />
        <input
          name="password"
          placeholder="비밀번호"
          onChange={handlePasswordChange}
          type="password"
          value={pw}
          required
        />
        <Button
          text="로그인"
          size="long"
          type="submit"
          className="loginButton"
          onClick={() => handleSubmit(id, pw)}
        />
        <Link to="/signup">
          <Button text="휴대폰번호로 회원가입" size="long" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
