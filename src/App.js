import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/account_login/LoginPage";
import Quit from "./pages/account_quit/Quit";
import SignUp from "./pages/account_signup/SignUp";
import MapPage from "./pages/mappage/MapPage";
import MoreReview from "./pages/morereviewinform/MoreReview";
import MoreStore from "./pages/morestoreinform/MoreStore";
import MyPage from "./pages/mypage/MyPage";
import Inquiry from "./pages/mypage_inquiry/Inquiry";
import MyInquiryList from "./pages/mypage_myinquirylist/MyInquiryList";
import MyReviewList from "./pages/mypage_myreviewlist/MyReviewList";
import MyWishList from "./pages/mypage_mywishlist/MyWishList";
import Ranking from "./pages/rankingpage/Ranking";
import ReportReview from "./pages/reportreview/ReportReview";
import SettingPage from "./pages/settingpage/SettingPage";
import ReceiptRecognition from "./pages/writereview_receiptrecogition/ReceiptRecognition";
import WriteReview from "./pages/writereview_writereview/WriteReview";

import Button from "./components/button/Button";
import BottomNav from "./components/bottomnav/BottomNav";

function App() {
  const handleClick = () => {
    console.log("버튼 클릭!");
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/quit" element={<Quit />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/morereview" element={<MoreReview />} />
          <Route path="/morestore" element={<MoreStore />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/inquiry" element={<Inquiry />} />
          <Route path="/mypage/inquirylist" element={<MyInquiryList />} />
          <Route path="/mypage/reviewlist" element={<MyReviewList />} />
          <Route path="/mypage/wishlist" element={<MyWishList />} />
          <Route path="/" element={<Ranking />} />
          <Route path="/reportreview" element={<ReportReview />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route
            path="/writereview/receiptrecognition"
            element={<ReceiptRecognition />}
          />
          <Route path="/writereview/writereview" element={<WriteReview />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
