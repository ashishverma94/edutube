import AuthPage from "./pages/AuthPage";
import { Routes, Route } from "react-router-dom";
import NetworkBanner from "./components/NetworkBanner";

export default function App() {
  return (
    <div className="flex flex-col">
      <div className=" w-full z-10000">
        <NetworkBanner />
      </div>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </div>
  );
}
