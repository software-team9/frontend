import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from 'axios';

const LogoutComponent = ({logoutHandler}) => {
    const navigate = useNavigate();
   
    React.useEffect(() => {

          // 로그아웃 처리
   
          
          // fetch 요청

          axios.post('/logout', {
            'Content-Type': 'application/json', withCredentials:true 
          })
       .then(response => {
        if(response.status === 200) {
          console.log('Fetch request successful');
          logoutHandler();
          sessionStorage.setItem('IsLogin', false)
          navigate('/');
        }
       })
       .catch(error => {
         console.error('오류 발생:', error);
       });




 
  
    }, []);
  
    return (
      <div>
        {/* 로그아웃 페이지의 내용을 원하는 대로 작성 */}
        <p>You have been logged out.</p>
      </div>
    );
  };
  
  export default LogoutComponent;