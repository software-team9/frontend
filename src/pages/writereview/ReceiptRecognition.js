import React, { useState } from 'react';
import styles from "./ReceiptRecognition.module.css";
import { useNavigate } from 'react-router-dom';
import Button from "../../components/button/Button";  
import HeadName from "../../components/head/Head";

const ReceiptRecognition = () => {
  const [showImage, setShowImage] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file)
      const reader = new FileReader();

      reader.onloadend = () => {
        setShowImage(reader.result);
      };

      reader.readAsDataURL(file);
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
        // sessionStorage.setItem('ReceiptStoreName', json.storeName);
        // sessionStorage.setItem('ReceiptAddress', json.address);
        // sessionStorage.setItem('ReviewImage', image);
        // navigate('/writereview/receiptcheck');
    //   } else {
    //     console.error("지원하지 않는 지역입니다.")
    //   }
    // })
    // .catch((error) =>  {
    //   console.error("영수증 인식에 실패하였습니다:", error);
    // });



   
      // const formData = new FormData();
      // formData.append("image", image);
  
      // fetch("http://15.165.26.32:8080/reviews/receipt", {
      //   method: "POST",
      //   body: formData,
      // })
      //   .then((response) => {
      //     if (!response.ok) {
      //       throw new Error("API 요청 실패");
      //     }
      //     return response.json();
      //   })
      //   .then((json) => {
      //     sessionStorage.setItem('ReceiptStoreName', json.storeName);
      //     sessionStorage.setItem('ReceiptAddress', json.address);
      //     sessionStorage.setItem('ReviewImage', image);
      //     navigate('/writereview/receiptcheck');
      //     console.log(json);
      //   })
      //   .catch((error) => {
      //     console.error("API 요청에 실패하였습니다:", error.message);
      //   });
    


      navigate('/writereview/receiptcheck');

    // test
    // sessionStorage.setItem('ReviewImage', image);
    // navigate('/writereview/writereview');
  }





  return (
    <div className={styles.container}>
      <HeadName title="영수증 인식" />
      <div className={styles.separator}></div> 
      <p className={styles.Text}>
      리뷰 등록을 위해 영수증 인증이 필요합니다.
 <br/>
 가게명, 주소가 잘 보이게 영수증을 찍어주세요!<br/>        
      </p>
      <div>
      {showImage && (
        <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', marginTop: '10px'}}>
          <img src={showImage} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
  
      </div>
      <br/>
<div className={styles.div1}>
        <label htmlFor="upload-button" className={styles.uploadButtonStyle}>
        사진 선택/촬영
        </label>
      </div>
      <div>
      <label 
        className={styles.uploadButtonStyle}
        onClick={checkReceiptImage}>
        확인
        </label>

        
      </div>

      <input
        type="file"
        id="upload-button"
        style={{ display: 'none' }}
        onChange={handleImageChange}
        required
      />

    </div>
  );
};

export default ReceiptRecognition;
