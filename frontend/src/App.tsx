import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import UserInfo from "./pages/UserInfo";
import PartnerInfo from "./pages/PartnerInfo";
import Chat from "./pages/Chat";
import { useState } from "react";
import { initialPartnerInfo } from "./data/initialState";

function App() {
  const [partnerInfo, setPartnerInfo] = useState(initialPartnerInfo);

  const handlePartnerInfo = (partnerInfo: typeof initialPartnerInfo) => {
    setPartnerInfo(partnerInfo);
  };

  return (
    <div className="relative w-full h-[100%] max-w-md mx-auto sm:border-x">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route
          path="/partner-info"
          element={<PartnerInfo handlePartnerInfo={handlePartnerInfo} />}
        />
        <Route path="/chat" element={<Chat partnerInfo={partnerInfo} />} />
      </Routes>
    </div>
  );
}

export default App;
