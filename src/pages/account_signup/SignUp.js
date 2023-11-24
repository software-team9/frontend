import React, { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import BottomNav from "../../components/bottomnav/BottomNav";
import styles from "./SignUp.module.css";
import TopNav from "../../components/topnav/TopNav";

const SignUp = () => {
  const [gender, setGender] = useState(null);
  const [terms, setTerms] = useState({
    service: false,
    privacy: false,
    marketing: false,
    all: false,
  });

  // 개별 약관의 변경을 처리하고, 모든 약관이 선택되었는지 확인합니다.
  const handleTermChange = (event) => {
    const { name, checked } = event.target;
    setTerms({ ...terms, [name]: checked });
  };

  // 모든 약관에 대한 동의를 처리합니다.
  const handleAllTermsChange = (checked) => {
    setTerms({
      service: checked,
      privacy: checked,
      marketing: checked,
      all: checked,
    });
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
        <TopNav />
        <span className={styles.backButton}>〈</span>
        <h1>회원가입</h1>
      </div>
      <form className={styles.signUpForm}>
        {/* 핸드폰 번호 입력란과 '보기' 버튼 */}
        <div className={styles.phoneInputContainer}>
          <input
            type="tel"
            placeholder="휴대폰번호"
            className={styles.phoneInput}
            required
          />
          <div className={styles.viewButtonContainer}>
            <Button text="인증" size="mid" />
          </div>
        </div>

        {/* 비밀번호 입력란 */}
        <input
          type="password"
          placeholder="비밀번호"
          required
          className={styles.passwordInput}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          required
          className={styles.passwordInput}
        />

        {/* 날짜 입력란 */}
        <input type="date" required className={styles.dateInput} />

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
        <Button text="가입하기" size="long" />
      </form>
      <BottomNav />
    </div>
  );
};

export default SignUp;
