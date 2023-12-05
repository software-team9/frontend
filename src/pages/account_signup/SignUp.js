import React, { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import BottomNav from "../../components/bottomnav/BottomNav";
import styles from "./SignUp.module.css";
import TopNav from "../../components/topnav/TopNav";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [pw, setPw] = useState('');
  const [pw_r, setPw_r] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [isDuplicate, setIsDuplicate] = useState(0); // 0 duplicate 체크 하지 않음, 1 중복임, 2 중복아님
  const [terms, setTerms] = useState({
    service: false,
    privacy: false,
    marketing: false,
    all: false,
  });
  const navigate = useNavigate();

  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleNameChange = (e) => setName(e.target.value);
  const handlePasswordChange = (e) => setPw(e.target.value);
  const handlePassword_RChange = (e) => setPw_r(e.target.value);
  const handleBirthdayChange = (e) => setBirthday(e.target.value);
  const handleGenderChange = (e) => {
    setGender(e);
  };

  // 개별 약관의 변경을 처리하고, 모든 약관이 선택되었는지 확인합니다.
  const handleTermChange = (event) => {
    const { name, checked } = event.target;
    setTerms({ ...terms, [name]: checked });
  };

  // 모든 약관에 대한 동의를 처리합니다.
  const handleAllTermsChange = (checked) => {
    console.log(name, phoneNumber, pw, gender, birthday)
    setTerms({
      service: checked,
      privacy: checked,
      marketing: checked,
      all: checked,
    });
  };

  const handleDuplicateCheckButtonClick = () => {
    // Call the checkDuplicateId function when the button is clicked
    axios.get(`/members/dupCheck/${phoneNumber}`, {
    }
    )
    .then((response) => {
      console.log(response)
      if(response.status === 200) {
        setIsDuplicate(2);
        alert("사용가능한 비밀번호입니다.")
      }
    })
    .catch((error) => {
      if (error.response) {
        // 서버가 응답을 반환한 경우
        console.error("Fetch error", error.response.data);
        alert(`에러 코드: ${error.response.data.errorCode}, 메시지: ${error.response.data.message}`);
      } else if (error.request) {
        // 서버가 응답하지 않은 경우
        console.error("No response was received", error.request);
      } else {
        // 그 외의 에러 발생 시
        console.error("Error", error.message);
      }

  })
};

  const handleSignUp = () => {
    console.log(name, phoneNumber, pw, gender, birthday)

        if (pw === pw_r) {
      
          axios.post('/join', {
            name : name,
            phoneNumber : phoneNumber,
            password: pw,
            gender: gender,
            birthday: birthday,
          }, {
            headers: {
              "Content-Type": "application/json",
            }, 
          })
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              console.log("Login Success");
              navigate("/login");
            }
          })
          .catch((error) => {
            console.error(error);
          });
    

     

          





        } else {
          alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
        }

  };

  // 개별 약관 체크박스의 상태가 변경될 때마다 전체 동의 체크박스 상태를 업데이트합니다.
  useEffect(() => {
    const allChecked = terms.service && terms.privacy && terms.marketing;
    setTerms((prevTerms) => ({ ...prevTerms, all: allChecked }));
  }, [terms.service, terms.privacy, terms.marketing]);

  const handleGenderSelect = (gender) => setGender(gender);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.backButton}>〈</span>
        <h1>회원가입</h1>
      </div>

      <div className={styles.duplicateCheckForm}>
        <div className={styles.phoneInputContainer}>
          <input
            type="tel"
            placeholder="휴대폰번호"
            className={styles.phoneInput}
            // value and onChange handlers here
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <button
            className={styles.duplicateCheckButton}
            onClick={handleDuplicateCheckButtonClick}
          >
            인증
          </button>
        </div>
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

        {/* 날짜 입력란 */}
        <input
          type="date"
          required
          className={styles.dateInput}
          value={birthday}
          onChange={handleBirthdayChange}
        />

        {/* 성별 선택 버튼 */}
        <div className={styles.genderSelect}>
          <button
            className={
              gender === "MALE" ? styles.genderSelected : styles.genderButton
            }
            onClick={() => handleGenderSelect("MALE")}
          >
            남
          </button>
          <button
            className={
              gender === "FEMALE" ? styles.genderSelected : styles.genderButton
            }
            onClick={() => handleGenderSelect("FEMALE")}
          >
            여
          </button>
        </div>

        {/* 약관 동의 체크박스 */}
        <div className={styles.termsContainer}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="all"
              checked={terms.all}
              onChange={(e) => handleAllTermsChange(e.target.checked)}
            />
            약관 전체 동의
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="service"
              checked={terms.service}
              onChange={handleTermChange}
            />
            [필수] 서비스 이용 약관
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="privacy"
              checked={terms.privacy}
              onChange={handleTermChange}
            />
            [필수] 개인정보 처리방침
          </label>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="marketing"
              checked={terms.marketing}
              onChange={handleTermChange}
            />
            [선택] 홍보성 메시지 수신
          </label>
        </div>
        {/* 가입하기 버튼 */}
        <Button text="가입하기" size="long" onClick={handleSignUp} />
      </div>
    </div>
  );
          }

export default SignUp;
