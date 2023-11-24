import React, { useState, useEffect } from "react";
import Button from "../../components/button/Button";
import BottomNav from "../../components/bottomnav/BottomNav";
import styles from "./SignUp.module.css";

const SignUp = () => {
  const [gender, setGender] = useState(null);
  const [termsChecked, setTermsChecked] = useState(false); // 약관 동의 상태
  const [terms, setTerms] = useState({
    service: false,
    privacy: false,
    marketing: false,
    all: false,
  });

  const handleTermChange = (event) => {
    const { name, checked } = event.target;
    setTerms({ ...terms, [name]: checked });
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (name === "all") {
      setTerms({
        service: checked,
        privacy: checked,
        marketing: checked,
        all: checked,
      });
    } else {
      setTerms({
        ...terms,
        [name]: checked,
        all: false,
      });
    }
  };

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  const handleTermsCheck = () => {
    setTermsChecked(!termsChecked);
  };

  // Check if all individual terms are checked
  const checkAllTerms = () => {
    if (terms.service && terms.privacy && terms.marketing) {
      setTerms({ ...terms, all: true });
    }
  };

  // Effect hook to synchronize the 'all' checkbox with the individual checkboxes
  useEffect(() => {
    const allChecked = terms.service && terms.privacy && terms.marketing;
    setTerms((prevTerms) => ({ ...prevTerms, all: allChecked }));
  }, [terms.service, terms.privacy, terms.marketing]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.backButton}>〈</span>
        <h1>회원가입</h1>
      </div>
      <form className={styles.signUpForm}>
        <div className={styles.phoneInputContainer}>
          <input
            type="tel"
            placeholder="휴대폰번호"
            className={styles.phoneInput}
            required
          />
          <Button text="보기" size="mid" />
        </div>
        <input type="password" placeholder="비밀번호" required />
        <input type="password" placeholder="비밀번호 확인" required />
        <input type="date" required />
        <div className={styles.genderSelect}>
          <button
            type="button"
            className={
              gender === "male" ? styles.genderSelected : styles.genderButton
            }
            onClick={() => handleGenderSelect("male")}
          >
            남
          </button>
          <button
            type="button"
            className={
              gender === "female" ? styles.genderSelected : styles.genderButton
            }
            onClick={() => handleGenderSelect("female")}
          >
            여
          </button>
        </div>
        <div className={styles.termsContainer}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="all"
              checked={terms.all}
              onChange={handleTermChange}
            />
            약관 전체 동의
          </label>
        </div>
        {/* Individual terms */}
        <div className={styles.individualTerms}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              name="service"
              checked={terms.service}
              onChange={handleTermChange}
            />
            [필수] 서비스 이용 약관
          </label>
          <label className={terms.privacy ? styles.checkboxChecked : ""}>
            <input
              type="checkbox"
              name="privacy"
              checked={terms.privacy}
              onChange={handleCheckboxChange}
              onClick={checkAllTerms}
            />
            [필수] 개인정보 처리방침
          </label>
          <label className={terms.marketing ? styles.checkboxChecked : ""}>
            <input
              type="checkbox"
              name="marketing"
              checked={terms.marketing}
              onChange={handleCheckboxChange}
              onClick={checkAllTerms}
            />
            [선택] 홍보성 메시지 수신
          </label>
        </div>
        <Button text="가입하기" size="long" />
      </form>
      <BottomNav />
    </div>
  );
};

export default SignUp;
