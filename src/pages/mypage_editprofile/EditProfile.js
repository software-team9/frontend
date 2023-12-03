import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import styles from "./PasswordCheck.module.css";
import { useNavigate } from "react-router-dom";
import Head from "../../components/head/Head";
import axios from "axios";

const EditProfile = ({ userData, setpasswordCheckFalse }) => {
  const [name, setName] = useState(null);
  const [pw, setPw] = useState(null);
  const [pw_r, setPw_r] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPw(e.target.value);
  const handlePassword_RChange = (e) => setPw_r(e.target.value);
  const handleBirthdayChange = (e) => setBirthday(e.target.value);

  useEffect(() => {
  }, [gender]);

  const handleConfirm = (e) => {
    if (!name || !pw || !pw_r || !birthday) {
      alert("모든 필수 항목을 채워주세요.");
      return;
    }
    if (pw !== pw_r) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }
    setpasswordCheckFalse();
    axios
      .put(
        "/members/edit",
        {
          name: name,
          password: pw,
          gender: gender,
          birthday: birthday,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Access-Control-Allow-Origin": `http://localhost:3000`,
            // 'Access-Control-Allow-Credentials':"true",
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        } else {
          navigate("/mypage");
        }
      })
      .catch((error) => {
        // Handle errors here
        console.error("Fetch error:", error);
      });
  };

  const handleGenderSelect = (gender) => {
    console.log(gender);
    setGender(gender);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Head title="회원정보 수정" />
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
          type="password"
          placeholder="비밀번호 확인"
          value={pw_r}
          onChange={handlePassword_RChange}
          required
          className={styles.passwordInput}
        />
        <div className={styles.signUpForm}>
          {/* 날짜 입력란 */}
          <input
            type="date"
            required
            className={styles.dateInput}
            value={birthday}
            onChange={handleBirthdayChange}
          />

          <div className={styles.genderSelectSection}>
            <button
              className={`${styles.genderNotSelected} ${gender === 'male' ? styles.genderSelected : ''}`}
              onClick={() => {
                console.log(gender)
                handleGenderSelect("male");
              }}
            >
              남
            </button>
            <button
              className={`${styles.genderNotSelected} ${gender === 'female' ? styles.genderSelected : ''}`}
              onClick={() => {
                handleGenderSelect("female");
              }}
            >
              여
            </button>
          </div>
        </div>

        {/* 확인 */}
        <Button
          text="확인"
          size="long"
          onClick={() => handleConfirm(userData, setpasswordCheckFalse)}
        />
      </div>
    </div>
  );
};

export default EditProfile;
