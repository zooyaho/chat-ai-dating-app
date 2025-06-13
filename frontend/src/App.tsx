import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import UserInfo from "./pages/UserInfo";
import PartnerInfo from "./pages/PartnerInfo";
import Chat from "./pages/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-info" element={<UserInfo />} />
      <Route path="/partner-info" element={<PartnerInfo />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
