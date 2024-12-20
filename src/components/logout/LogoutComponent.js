import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from 'axios';

const LogoutComponent = ({logoutHandler}) => {
    const navigate = useNavigate();
   
    React.useEffect(() => {
      const logoutAndFetch = async () => {
        try {
          // 로그아웃 처리
   
          
          // fetch 요청

          fetch('/logout', {
            method: "POST",
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Access-Control-Allow-Origin": "http://localhost:3000",
              "Access-Control-Allow-Credentials": "true"
            },
            credentials: "include",
            mode: 'cors'
          })    
          .then((response) => {
            if(!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            } else if (response.ok) {
              sessionStorage.setItem('IsLogin', false);
              navigate('/')
              logoutHandler()
            }
          })



      //     axios.post('/logout', {
      //       'Content-Type': 'application/json', withCredentials:true 
      //     })
      //  .then(response => {
      //   if(response.status === 200) {
      //     console.log('Fetch request successful');
      //     logoutHandler();
      //     sessionStorage.setItem('IsLogin', false)
      //     navigate('/');
      //   }
      //  })
      //  .catch(error => {
      //    console.error('오류 발생:', error);
      //  });




  
          // 이후의 로직 수행
          
        } catch (error) {
          console.error('Error during fetch request:', error);
        }
      };
  
      // 호출
      logoutAndFetch();
    }, []);
  
    return (
      <div>
        {/* 로그아웃 페이지의 내용을 원하는 대로 작성 */}
        <p>You have been logged out.</p>
      </div>
    );
  };
  
  export default LogoutComponent;