// Inquiry.js
import React, { useState } from "react";
import Button from "../../components/button/Button";
import BottomNav from "../../components/bottomnav/BottomNav";
import styles from "./PasswordCheck.module.css";
import TopNav from "../../components/topnav/TopNav";
import { useNavigate } from 'react-router-dom';

const EditProfile = ({userData, setpasswordCheckFalse}) => {
  const [name, setName] = useState(null);
  const [pw, setPw] = useState(null);
  const [pw_r, setPw_r] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState(null);
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPw(e.target.value);
  const handlePassword_RChange = (e) => setPw_r(e.target.value);
  const handleBirthdayChange = (e) => setBirthday(e.target.value);
  const handleGenderSelect = (gender) => setGender(gender);

  const handleConfirm = (e) => {
    if (name && pw && pw_r && birthday && gender ) {
        if (pw === pw_r) {
          // fetch('URL', {
          //   method: 'POST',
          //   body: JSON.stringify({
          //     UserId : userData
          //     name,
          //     password: pw,
          //     birthday,
          //     gender
          //   }),
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          // })
          // .then(response => {
          //   if(response.message === 'OK') {
          //     console.log("대충 수정 성공")
          //     navigate('/mypage');
          //   } else {
          //     alert ('벡엔드 쪽 오류 발생');
          //   }
          // })
          setpasswordCheckFalse();
          console.log("대충 로그인 성공") // 테스트
          navigate('/mypage');
        } 
        else {
          alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
        }  
    }
    else {
      alert('모든 필수 항목을 채워주세요.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <TopNav />
        <h1>회원 정보 수정</h1>
      </div>
        <div className={styles.signUpForm}>
        <input
          type="name"
          placeholder="이름"
          value={name}
          onChange={handleNameChange}
          required
          className={styles.nameInput}
        />
        {/* 비밀번호 입력란 */}
        <input
          type="password"
          placeholder="비밀번호"
          value={pw}
          onChange={handlePasswordChange}
          required
          className={styles.passwordInput}
        />
        <input
          type="password_re"
          placeholder="비밀번호 확인"
          value={pw_r}
          onChange={handlePassword_RChange}
          required
          className={styles.passwordInput}
        />

        {/* 날짜 입력란 */}
        <input 
          type="date" 
          required 
          className={styles.dateInput}
          value={birthday}
          onChange={handleBirthdayChange} />

        {/* 성별 선택 버튼 */}
        <div className={styles.genderSelect}>
          <button
            className={
              gender === "male" ? styles.genderSelected : styles.genderButton
            }
            onClick={() => handleGenderSelect("male")}
          >
            남
          </button>
          <button
            className={
              gender === "female" ? styles.genderSelected : styles.genderButton
            }
            onClick={() => handleGenderSelect("female")}
          >
            여
          </button>
        </div>
        
        {/* 확인 */}
        <Button 
          text="확인" 
          size="long" 
          onClick={() => handleConfirm(userData, setpasswordCheckFalse)}
        />
      </div>
      <BottomNav />
    </div>
  );
};

export default EditProfile;
