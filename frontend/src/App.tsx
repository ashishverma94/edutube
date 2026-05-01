import { Toaster } from "sonner";
import AuthPage from "./pages/AuthPage";
import { Routes, Route } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import NetworkBanner from "./components/NetworkBanner";
import Test from "./pages/Test";
export default function App() {
  const isMobile = useIsMobile();
  return (
    <>
      <Toaster
        position={isMobile ? "bottom-center" : "top-right"}
        toastOptions={{
          classNames: {
            title: "font-display font-bold text-sm",
            description: "font-body text-xs mt-0.5",
          },
        }}
      />
      <div className="flex flex-col">
        <div className=" w-full z-10000">
          <NetworkBanner />
        </div>
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/" element={<Test />} />
        </Routes>
      </div>
    </>
  );
}
