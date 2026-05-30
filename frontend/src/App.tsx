import { Toaster } from "sonner";
import Home from "./pages/HomePage";
import Layout from "./pages/Layout";
import AuthPage from "./pages/AuthPage";
import Library from "./pages/LibraryPage";
import WatchPage from "./pages/WatchPage";
import { Routes, Route } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import NetworkBanner from "./components/NetworkBanner";

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
      <div className="flex flex-col w-full">
        <div className=" w-full z-10000">
          <NetworkBanner />
        </div>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/library" element={<Library />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/watch" element={<WatchPage />} />
        </Routes>
      </div>
    </>
  );
}
