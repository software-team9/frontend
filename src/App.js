import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Review from "./pages/reivewpage/ReviewPage";
import MapPage from "./pages/mappage/MapPage";
import Home from "./pages/home/Home";
import MyPage from "./pages/mypage/MyPage";
import SettingPage from "./pages/settingpage/SettingPage";
import LoginPage from "./pages/login/LoginPage";
import SignUp from "./pages/signup/SignUp";

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
          <Route path="/review" element={<Review />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/setting" element={<SettingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}

export default App;
