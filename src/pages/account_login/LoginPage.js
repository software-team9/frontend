import React, { useState } from "react";
import Button from "../../components/button/Button";
import BottomNav from "../../components/bottomnav/BottomNav";
import styles from "./Login.module.css";
import { useNavigate, Link } from 'react-router-dom';

const Login = ({loginHandler, setUserInfo}) => {
  const [id, setId] = useState(''); // State for phone number
  const [pw, setPw] = useState(''); // State for password
  const navigate = useNavigate();

  const testUID = "123456789" // testUID

  const handleIdChange = (e) => {
    setId(e.target.value);
    console.log(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPw(e.target.value);
    console.log(e.target.value);
  };

  const handleLogin = (loginHandler, setUserInfo) => {
    // fetch('URL', {
    //   method : "POST",
    //   headers : {
    //     "Content-Type" : "application/json; charset=utf-8"
    //   },
    //   body: JSON.stringify({
    //     phoneNumber : id,
    //     password : pw
    //   }),
    // }) 
    // .then(response => {
    //   if (response.message === 'SUCCESS') {
    //     window.sessionStorage.setItem('token', response.access_token);
    //     loginHandler();
    //     setUserInfo(response);
    //     navigate('/');
    //   } else {
    //     alert('아이디 또는 비밀번호가 일치하지 않습니다.');
    //   }
    // });

    
    window.sessionStorage.setItem('token', testUID);
    loginHandler();
    setUserInfo(testUID);
    navigate('/');
  };

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
        <input 
          name="tel" 
          placeholder="휴대폰번호" 
          onChange={handleIdChange}
          value={id}
          required />
        <input 
          name="password" 
          placeholder="비밀번호" 
          onChange={handlePasswordChange}
          value={pw}
          required />
        <Button 
          text="로그인" 
          size="long" 
          type="button" 
          className = "loginButton"
          onClick={() => handleLogin(loginHandler, setUserInfo)}
          />
        <Link to = "/signup">
          <Button text="휴대폰번호로 회원가입" size="long" />
        </Link>
      </form>
      <BottomNav />
    </div>
  );
};

export default Login;
