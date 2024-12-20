import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from 'react';


import LoginPage from "./pages/account_login/LoginPage";
import Quit from "./pages/account_quit/Quit";
import SignUp from "./pages/account_signup/SignUp";
import MapPage from "./pages/mappage/MapPage";
import MoreReview from "./pages/morereviewinform/MoreReview";
import MoreStore from "./pages/morestoreinform/MoreStore";
import MyPage from "./pages/mypage/MyPage";
import EditProfile from "./pages/mypage_editprofile/EditProfile";
import PasswordCheck from "./pages/mypage_editprofile/PasswordCheck";
import Inquiry from "./pages/mypage_inquiry/Inquiry";
import MyInquiryList from "./pages/mypage_myinquirylist/MyInquiryList";
import MyReviewList from "./pages/mypage_myreviewlist/MyReviewList";
import MyWishList from "./pages/mypage_mywishlist/MyWishList";
import Ranking from "./pages/rankingpage/Ranking";
import ReportReview from "./pages/reportreview/ReportReview";
import SettingPage from "./pages/settingpage/SettingPage";
import ReceiptRecognition from "./pages/writereview/ReceiptRecognition";
import WriteReview from "./pages/writereview/WriteReview";
import ReceiptCheck from "./pages/writereview/ReceiptCheck";

import LogoutComponent from "./components/logout/LogoutComponent";
import BottomNav from "./components/bottomnav/BottomNav";
import TopNav from "./components/topnav/TopNav";
// import createProxyMiddleware from "http-proxy-middleware"

import axios from 'axios';

function App() {
  // App.use(
  //   '/api',
  //   createProxyMiddleware({
  //     target: "http://15.165.26.32:8080",
  //     changeOrigin:true
  //   })
  // )
  const [reviewImage, setReviewImage] = useState(null);
  

  const [isLogin, setIsLogin] = useState(sessionStorage.getItem('IsLogin'));
  // const [isLogin, setIsLogin] = useState(false); // 실제로 쓸땐 이거 사용
  const [isPasswordChecked, setIsPasswordChecked] = useState(false);

  // useEffect(() => {
  //   setIsLogin(sessionStorage.getItem('IsLogin'))
  // }, [isLogin])

  const loginHandler = () => {
    setIsLogin(true);
    console.log("isLogin is set true")
  };

  const logoutHandler = () => {
    setIsLogin(false);
    console.log("isLogin is set false")
  };


  const setpasswordCheckTrue = () => {
    setIsPasswordChecked(true);
  }
  const setpasswordCheckFalse = () => {
    setIsPasswordChecked(false);
  }
// // src/App.js
// useEffect(() => {
//   async function fetchdata() {
//     const API_URL = '/users';
//     const { data } = await axios.get(API_URL);
//     console.log(data);
//   }
//   fetchdata();

//   async function fetchDogs() {
//     const API_URL = '/api/breeds/image/random';
//     const { data } = await axios.get(API_URL);
//     console.log(data);
//   }
//   fetchDogs();

//   async function fetchTrends() {
//     const API_URL = '/trends/trendingsearches/daily/rss?geo=KR';
//     const { data } = await axios.get(API_URL);
//     console.log(data);
//   }
//   fetchTrends();
// }, []);


useEffect (() => {
  sessionStorage.getItem('ReceiptCheck')
}, []);

  return (
    <BrowserRouter>
      <div className="App">
        <TopNav />
        <Routes>
          <Route 
            path="/app/login" 
            element={<LoginPage 
                        loginHandler={loginHandler}
                      />
                    } 
          />
          <Route 
            path="/quit" 
            element={
              isLogin ? (
                <Quit
                  logoutHandler={logoutHandler}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />

          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<Ranking />} />
          <Route path="/map" element={<MapPage />} />
          <Route 
            path="/morereview" 
            element={
              isLogin ? (
                <MoreReview
                  logoutHandler={logoutHandler}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />
          <Route 
            path="/morestore" 
            element={
              isLogin ? (
                <MoreStore
                logoutHandler={logoutHandler}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            /> 
          <Route 
            path="/mypage" 
            element={
              isLogin ? (
                <MyPage
                  logoutHandler={logoutHandler}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            /> 
          <Route 
            path="/mypage/editprofile" 
            element={
              isLogin ? (
                
                  <EditProfile
                  logoutHandler={logoutHandler}
                  setpasswordCheckFalse = {setpasswordCheckFalse}
                  />
              
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />
            
          <Route
            path="/mypage/passwordcheck"
            element={
              isLogin ? (
                <PasswordCheck
                logoutHandler={logoutHandler}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            /> 
          <Route 
            path="/mypage/inquiry" 
            element={
              isLogin ? (
                <Inquiry
                logoutHandler={logoutHandler}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />
          <Route 
            path="/mypage/inquirylist" 
            element={
              isLogin ? (
                <MyInquiryList
                logoutHandler={logoutHandler}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />
          <Route 
            path="/mypage/reviewlist" 
            element={
              isLogin ? (
                <MyReviewList
                logoutHandler={logoutHandler}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />  
          <Route 
            path="/mypage/wishlist" 
            element={
              isLogin ? (
                <MyWishList
                logoutHandler={logoutHandler}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />
          <Route 
            path="/reportreview" 
            element={
              isLogin ? (
                <ReportReview
                logoutHandler={logoutHandler}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />
          <Route path="/setting" element={<SettingPage />} />
          


          <Route 
            path="/writereview/receiptRecognition" 
            element={
              isLogin ? (
                <ReceiptRecognition 
                logoutHandler={logoutHandler}/>
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />


          <Route 
            path="/writereview" 
            element={
              isLogin ? (
                  <WriteReview
                  logoutHandler={logoutHandler}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />
            <Route 
            path="/writereview/receiptcheck" 
            element={
              isLogin ? (
                  <ReceiptCheck
                  logoutHandler={logoutHandler}
                  />
              ) : (
                <LoginPage
                  loginHandler={loginHandler}
                  />
              )
            }
            />

          <Route
            path="/logout"
            element={<LogoutComponent logoutHandler={logoutHandler} />}
          />

            
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
