import { useState } from "react";
import { cn } from "@/lib/utils";
import { useNetworkStatus } from "@/hooks/useNetworkStatus";
import { X, RefreshCw } from "lucide-react";

const NetworkBanner = () => {
  const { isOnline } = useNetworkStatus();
  const [visible, setVisible] = useState(true);
  const [retrying, setRetrying] = useState(false);

  if (isOnline || !visible) return null;

  const handleRetry = () => {
    setRetrying(true);

    // simple retry simulation
    setTimeout(() => {
      window.location.reload(); // real retry
    }, 800);
  };

  return (
    <div
      className={cn(
        "w-full flex items-center justify-between gap-3 px-4 py-2 text-xs font-semibold",
        "bg-red-500 text-white shadow-md",
        "animate-slide-down",
      )}
    >
      <div></div>
      <div className="flex items-center gap-2">
        <span>You're offline. Some features may not work.</span>
        <button
          onClick={handleRetry}
          className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/20 hover:bg-white/30 transition"
        >
          <RefreshCw
            className={cn("w-3.5 h-3.5", retrying && "animate-spin")}
          />
          Retry
        </button>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="p-1 rounded-md hover:bg-white/20 transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NetworkBanner;
