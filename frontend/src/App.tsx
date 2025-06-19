import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import UserInfo from "./pages/UserInfo";
import PartnerInfo from "./pages/PartnerInfo";
import Chat from "./pages/Chat";
import { useState } from "react";
import { initialPartnerInfo, initialUserInfo } from "./data/initialState";

function App() {
  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [partnerInfo, setPartnerInfo] = useState(initialPartnerInfo);

  const handlePartnerInfo = (partnerInfo: typeof initialPartnerInfo) => {
    setPartnerInfo(partnerInfo);
  };

  const handleUserInfo = (userInfo: typeof initialUserInfo) => {
    setUserInfo(userInfo);
  };

  return (
    <div className="relative w-full h-[100%] max-w-md mx-auto sm:border-x">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/user-info"
          element={<UserInfo handleUserInfo={handleUserInfo} />}
        />
        <Route
          path="/partner-info"
          element={
            <PartnerInfo
              userInfo={userInfo}
              handlePartnerInfo={handlePartnerInfo}
            />
          }
        />
        <Route
          path="/chat"
          element={<Chat userInfo={userInfo} partnerInfo={partnerInfo} />}
        />
      </Routes>
    </div>
  );
}

export default App;
