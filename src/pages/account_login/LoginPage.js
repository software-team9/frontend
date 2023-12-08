import React, { useState } from "react";
import Button from "../../components/button/Button";
import styles from "./Login.module.css";
import { useNavigate, Link } from "react-router-dom";
import useUserDataHook from "../../hooks/useUserDataHook";

const Login = ({ loginHandler }) => {
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

  const handleSubmit = () => {
    // loginHandler();
    // handleLogin({loginHandler}, id, pw); // 로그인 처리
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({
        phoneNumber: id,
        password: pw,
      }),
      credentials: "include",
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          sessionStorage.setItem("IsLogin", true);
          navigate("/");
          loginHandler();
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
          alert("로그인에 실패하였습니다");
        } else {
          // 그 외의 에러 발생 시
          console.error("Error", error.message);
          alert("로그인에 실패하였습니다");
        }
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="로고" className={styles.logoImage} />{" "}
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
          onClick={() => handleSubmit()}
        />
        <Link to="/signup">
          <Button text="휴대폰번호로 회원가입" size="long" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
