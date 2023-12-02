import React, { useState } from 'react';
import TopNav from '../../components/topnav/TopNav';
import styles from "./ReceiptRecognition.module.css";
import { useNavigate } from 'react-router-dom';

import HeadName from "../../components/head/Head";

const ReceiptRecognition = () => {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();


  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const checkReceiptImage = () => {
    // fetch('http://15.165.26.32:8080/reviews/receipt', {
    //   method: "POST",
    //   headers : {
    //     "Content-Type" : "application/json"
    //   },
    //   body: JSON.stringify({
    //     image
    //   }),
    // })
    // .then(response => {
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
    //   return response.json();
    // })
    // .then(data => {
    //   // Only access storeName when response is successful
    //   sessionStorage.setItem('ReceiptStoreName', data.storeName);
    //   sessionStorage.setItem('ReceiptAddress', data.address);
    // })
    // .catch(error => console.error('Error:', error));



    // test
    sessionStorage.setItem('ReviewImage', image);
    navigate('/writereview/writereview');
  }

  const uploadButtonStyle = {
    cursor: 'pointer',
    display: 'inline-block',
    padding: '10px 15px',
    backgroundColor: '#d32323',
    color: '#fff',
    borderRadius: '8px',
    marginBottom: '10px',
    fontWeight: 'bold'
  };

  const secondaryButtonStyle = {
    cursor: 'pointer',
    display: 'inline-block',
    padding: '10px 15px',
    backgroundColor: '#d32323',
    color: '#fff',
    borderRadius: '8px',
    marginBottom: '10px',
    fontWeight: 'bold',
    
    border: 'none',
    marginLeft: '10px'
  };

  return (
    <div className={styles.container}>
      <HeadName title="영수증 인식" />
      <div className={styles.separator}></div> 
      <p className={styles.Text}>
        영수증 전체가 잘 보일 수 있게 찍어주세요. <br/>
        가게명, 주소가 잘 보여야 돼요!<br/>        
      </p>
      <div>
      {image && (
        <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', marginTop: '10px'}}>
          <img src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
      </div>
      <br/>
      <div className={styles.Button}>
        <label htmlFor="upload-button" style={uploadButtonStyle}>
          이미지 선택
        </label>
        <div>
        <button 
          style={secondaryButtonStyle} 
          onClick={checkReceiptImage}>
          확인
        </button>
        </div>
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
