import React, { useState, useEffect } from "react";
import styles from "./WriteReview.module.css";
import useReviewHook from "../../hooks/useReviewHook";
import { useLocation } from "react-router-dom";
import TopNav from "../../components/topnav/TopNav";
import Button from "../../components/button/Button";
import { useNavigate } from 'react-router-dom';

import HeadName from "../../components/head/Head";

const WriteReview = ({setReceiptCheck}) => {
  const { reviews, addReview, getReviewsByUserId } = useReviewHook();
  const [userReviews, setUserReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);
  const [rating, setRating] = useState(0)
  const [storeName, setStoreName] = useState();
  const [address, setAddress] = useState();
  const [reviewContent, setReviewContent] = useState("");
  const navigate = useNavigate();
  const [reviewImage, setReviewImage] = useState("");

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


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const reviewIdFromUrl = queryParams.get("reviewId");

  // useEffect(() => {
  //   setUserReviews(getReviewsByUserId(String(userID))); // Converting userID to string
  // }, [reviews]);



  const handleWriteReview = () => {
    const userId = 168;
    // const userId = sessionStorage.getItem('token');
    // fetch('http://15.165.26.32:8080/reviews/', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     memberId: userId,
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
    //   console.log(response.message);
    //   navigate('/');
    // })

    setReceiptCheck(false);
    // sessionStorage.setItem('ReceiptCheck', false);
    // updateReceiptCheck(false)
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <TopNav /> 
      <HeadName title="리뷰작성" /> /writereview

      /writereview 

      state  영수증 인식을 불러오고
      /
      ReceiptRecognition.js
      <div className={styles.separator}></div> 
      <h2>가게 정보</h2>
      <div>
      <input
          type="storeName"
          placeholder="가게이름"
          value={storeName}
          onChange={handleStoreNameChange}
          required
          className={styles.Input}
        />
        </div>
        <div>
        <input
          type="address"
          placeholder="가게주소"
          value={address}
          onChange={handleAddressChange}
          required
          className={styles.Input}
        />
        </div>
        <h2>리뷰 내용</h2>
        <div>
        <label htmlFor="ReviewContent"></label>
          <textarea 
            className={styles.textarea}
            id="ReviewContent"
            placeholder="리뷰 내용을 입력하세요"
            value={reviewContent}
            onChange={handleReviewContentChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="rating"
            value={rating}
            onChange={handleRatingChange}
            min="0"
            max="5"
          />
        </div>
        <div>
          {reviewImage && (
            <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
              <img src={""} alt="Uploaded" style={{ maxWidth: '100%' }} />
            </div>
          )}
        </div>
        <br/>


    


<form>
        <Button 
          size="long" 
          text="리뷰 작성하기" 
          onClick={() => handleWriteReview()}
          >

          </Button>
          </form>
      </div>



  );
};

export default WriteReview;
