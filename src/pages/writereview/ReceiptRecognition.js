import React, { useState, useEffect } from "react";
import styles from "./ReceiptRecognition.module.css";
import { useNavigate } from "react-router-dom";
import Button from "../../components/button/Button";
import HeadName from "../../components/head/Head";
import axios from 'axios';

const ReceiptRecognition = ({logoutHandler}) => {
  const [showImage, setShowImage] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("영수증 인식중입니다...");
  const navigate = useNavigate();
  const isButtonDisabled = !image;
  const buttonStyle = isButtonDisabled
    ? styles.disabledButtonStyle
    : styles.uploadButtonStyle;

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prevText) => {
        const dotsCount = ((prevText.split(".").length - 1) % 6) + 1; 
        return `영수증 인식중입니다${".".repeat(dotsCount)}`;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setShowImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setShowImage(null);
    }
  };

  const checkReceiptImage = () => {
    // const formData = new FormData();
    // formData.append('image', image);
    // fetch('http://15.165.26.32:8080/reviews/receipt', {
    //   method: "POST",
    //   // headers : {
    //   //   "Content-Type" : "application/json"
    //   // },
    //   body: formData,
    // })
    // .then(response => response.json())
    // .then(json => {
    //   if (json && json.length > 0 ) {
    //     sessionStorage.setItem('ReceiptStoreName', json.storeName);
    //     sessionStorage.setItem('ReceiptAddress', json.address);
    //     sessionStorage.setItem('ReviewImage', image);
    //     navigate('/writereview/receiptcheck');
    //   } else {
    //     console.error("지원하지 않는 지역입니다.")
    //   }
    // })
    // .catch((error) =>  {
    //   console.error("영수증 인식에 실패하였습니다:", error);
    // });

    if (!image) return; // 이미지가 없으면 아무것도 하지 않음

    setIsLoading(true); // 로딩 시작

    const formData = new FormData();
    formData.append("image", image);

    console.log(formData);
    fetch("/reviews/receipt", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("API 요청 실패");
        }
        return response.json();
      })
      .then((json) => {
        sessionStorage.setItem("ReceiptStoreName", json.storeName);
        sessionStorage.setItem("ReceiptAddress", json.address);
        sessionStorage.setItem("ReviewImage", image);
        navigate("/writereview/receiptcheck");
        console.log(json);
      })
      .catch((error) => {
        console.error("API 요청에 실패하였습니다:", error.message);
      })
      .finally(() => setIsLoading(false));

    // navigate('/writereview/receiptcheck');

    // test
    // sessionStorage.setItem('ReviewImage', image);
    // navigate('/writereview/writereview');
  };

  useEffect(()=> {
    axios.get('/members/auth', {
      'Content-Type': 'application/json', withCredentials:true,
    })
    .then(response => {
      if(!(response.status === 200)) {
      sessionStorage.setItem('IsLogin', false);
      navigate('/')
      logoutHandler()
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
  }, [])

  return (
    <div className={styles.container}>
      <HeadName title="영수증 인식" />
      <div className={styles.separator}></div>
      <p className={styles.Text}>
        리뷰 등록을 위해 영수증 인증이 필요합니다.
        <br />
        가게명, 주소가 잘 보이게 영수증을 찍어주세요!
        <br />
      </p>
      <div>
        {showImage && (
          <div
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            <img src={showImage} alt="Uploaded" style={{ maxWidth: "100%" }} />
          </div>
        )}
      </div>
      <br />
      <div className={styles.div1}>
        <label htmlFor="upload-button" className={styles.uploadButtonStyle}>
          {image ? "재선택" : "사진 선택/촬영"}
        </label>
        <input
          type="file"
          id="upload-button"
          style={{ display: "none" }}
          onChange={handleImageChange}
          onClick={(e) => (e.target.value = null)} // 파일 입력 필드 초기화
          required
        />
      </div>
      <div>
        <label
          className={
            image ? styles.uploadButtonStyle : styles.disabledButtonStyle
          }
          onClick={image ? checkReceiptImage : null}
        >
          확인
        </label>
      </div>

      {isLoading && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>{loadingText}</p>
            {/* 여기에 로딩 애니메이션 추가 가능 */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiptRecognition;
