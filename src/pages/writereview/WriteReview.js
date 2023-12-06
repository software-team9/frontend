import React, { useState, useEffect } from "react";
import styles from "./WriteReview.module.css";
import useReviewHook from "../../hooks/useReviewHook";
import { useLocation } from "react-router-dom";
import TopNav from "../../components/topnav/TopNav";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";

import HeadName from "../../components/head/Head";
import Rating from "./Rating";
import axios from 'axios';

const WriteReview = () => {
  const [rating, setRating] = useState(0);
  const [storeName, setStoreName] = useState(
    sessionStorage.getItem("ReceiptStoreName")
  );
  const [address, setAddress] = useState(
    sessionStorage.getItem("ReceiptAddress")
  );
  const [reviewContent, setReviewContent] = useState("");
  const navigate = useNavigate();
  const [showImage, setShowImage] = useState(null);
  const [image, setImage] = useState(null);

  const handleStoreNameChange = (e) => {
    setStoreName(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleReviewContentChange = (e) => {
    setReviewContent(e.target.value);
  };

  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      const reader = new FileReader();

      reader.onloadend = () => {
        setShowImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleWriteReview = () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("storeName", storeName);
    formData.append("address", address);
    formData.append("content", reviewContent);
    formData.append("ratingPoint", rating);

    axios.post('/reviews', {
      body: formData
    }, {  
      headers: {
        "Content-Type": "multipart/form-data" 
      }
    })
    .then(response => {
      navigate('/')
    })
    .catch(error => {
      console.error('오류 발생:', error);
    });


    // fetch("http://15.165.26.32:8080/reviews/", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Network response was not ok");
    //     }
    //     return response.json();
    //   })
    //   .then((json) => {
    //     navigate("/");
    //     console.log(json);
    //   })
    //   .catch((error) => {
    //     console.error("API 요청에 실패하였습니다:", error.message);
    //   });

    // test
    // navigate('/')
  };

  return (
    <div className={styles.container}>
      <HeadName title="리뷰작성" />
      <div className={styles.separator}></div>
      <div className={styles.head1}>
        <h3>가게 정보</h3>
      </div>
      <div>
        <input
          type="storeName"
          placeholder="가게이름"
          value={storeName || ""}
          onChange={handleStoreNameChange}
          required
          className={styles.Input}
          readOnly
        />
      </div>
      <div>
        <input
          type="address"
          placeholder="가게주소"
          value={address || ""}
          onChange={handleAddressChange}
          required
          className={styles.Input}
          readOnly
        />
      </div>
      <div className={styles.head1}>
        <h3>리뷰 내용</h3>
      </div>
      <div>
        <textarea
          type="ReviewContent"
          placeholder="리뷰 내용을 입력하세요"
          value={reviewContent || ""}
          onChange={handleReviewContentChange}
          required
          className={styles.textarea}
        />
      </div>
      <div>
        <input
          type="number"
          name="rating"
          placeholder="별점"
          value={rating || ""}
          onChange={handleRatingChange}
          min="0"
          max="5"
          required
        />
      </div>
      {/* <div>
        <Rating onChange={(newRating) => setRating(newRating)} />
      </div> */}
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
          사진 선택/촬영
        </label>
      </div>

      <div className={styles.div1}>
        <label className={styles.uploadButtonStyle} onClick={handleWriteReview}>
          리뷰 작성하기
        </label>
      </div>

      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleImageChange}
        required
      />
    </div>
  );
};

export default WriteReview;
