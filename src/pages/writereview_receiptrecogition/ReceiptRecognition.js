import React, { useState } from 'react';
import TopNav from '../../components/topnav/TopNav';
import styles from "./ReceiptRecognition.module.css";
import { useNavigate } from 'react-router-dom';

import HeadName from "../../components/head/Head";

const ReceiptRecognition = ({setReceiptCheckTrue}) => {
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
    // fetch('http://localhost:8080/reviews/receipt/', {
    //   method: "POST",
    //   headers : {
    //     "Content-Type" : "application/json"
    //   },
    //   body: JSON.stringify({
    //     image
    //   }),
    // })
    // .then(response => {
    //   if(response.message === 'SUCCESS') {
    //     setReceiptCheckTrue();
    //     navigate('writereview');
    //   }
    //   else {
    //     alert("영수증 사진에 문제가 있습니다.");
    //   }
    // })

    setReceiptCheckTrue();
    // sessionStorage.setItem('ReceiptCheck', true);

    // window.sessionStorage.setItem('ReviewImage', image);
    navigate('/writereview');
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
      <div className={styles.headers}>
        <TopNav />
      </div>
      <HeadName title="영수증 인식" />
      <div className={styles.separator}></div> 
      <p className={styles.Text}>
        영수증 전체가 잘 보일 수 있게 찍어주세요. <br/>
        전화번호, 사업자 번호, 주소가 <br/>
        잘 보여야 돼요!
      </p>
      {image && (
        <div style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '5px', marginTop: '10px' }}>
          <img src={image} alt="Uploaded" style={{ maxWidth: '100%' }} />
        </div>
      )}
      <br/>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <label htmlFor="upload-button" style={uploadButtonStyle}>
          이미지 선택
        </label>
        <form>
        <button 
          style={secondaryButtonStyle} 
          onClick={() => checkReceiptImage()}>
          확인
        </button>
        </form>
      </div>
      <div>
        {sessionStorage.getItem('ReceiptCheck')}
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
