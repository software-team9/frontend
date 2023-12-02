import React, { useState, useEffect } from "react";
import styles from "./WriteReview.module.css";
import useReviewHook from "../../hooks/useReviewHook";
import { useLocation } from "react-router-dom";
import TopNav from "../../components/topnav/TopNav";
import Button from "../../components/button/Button";
import { useNavigate } from 'react-router-dom';

import HeadName from "../../components/head/Head";

const WriteReview = () => {
  const [rating, setRating] = useState(0)
  const [storeName, setStoreName] = useState(sessionStorage.getItem('ReceiptStoreName'));
  const [address, setAddress] = useState(sessionStorage.getItem('ReceiptAddress'));
  const [reviewContent, setReviewContent] = useState("");
  const navigate = useNavigate();
  const [reviewImage, setReviewImage] = useState(sessionStorage.getItem('ReviewImage'));

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







  const handleWriteReview = () => {
    // fetch('http://15.165.26.32:8080/reviews/', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     storeName: storeName,
    //     address: address,
    //     content: reviewContent,
    //     ratingPoint: rating,
    //     img: reviewImage
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   navigate('/')
    // })

    // test
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <HeadName title="리뷰작성" />
      <div className={styles.separator}></div> 
      <h2>가게 정보</h2>
      <div>
      <input
          type="storeName"
          placeholder="가게이름"
          value={storeName || ''}
          onChange={handleStoreNameChange}
          required
          className={styles.Input}
        />
        </div>
        <div>
        <input
          type="address"
          placeholder="가게주소"
          value={address || ''}
          onChange={handleAddressChange}
          required
          className={styles.Input}
        />
        </div>
        <h2>리뷰 내용</h2>
        <div>
        <textarea
          type="ReviewContent"
          placeholder="리뷰 내용을 입력하세요"
          value={reviewContent || ''}
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
            value={rating || ''}
            onChange={handleRatingChange}
            min="0"
            max="5"
            required
          />
        </div>
        <div>
          {reviewImage && (
            <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
              <img src={reviewImage} alt="Uploaded" style={{ maxWidth: '100%' }} />
            </div>
          )}
        </div>
        <br/>


    


<div>
        <Button 
          size="long" 
          text="리뷰 작성하기" 
          onClick={handleWriteReview}
          >

          </Button>
          </div>
      </div>



  );
};

export default WriteReview;