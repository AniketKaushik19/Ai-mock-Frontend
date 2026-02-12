'use client'

import OfflinePage from "@/app/_component/NoNetPage";
import { useEffect, useState } from "react";

export default function NoNetProvider({ children }) {
  const [isOnline, setIsOnline] = useState(true);

  const checkInternet = async () => {
    if (!navigator.onLine) {
      setIsOnline(false);
      return;
    }

    try {
      // Try lightweight request to your own site
      await fetch("/", { method: "HEAD", cache: "no-store" });
      setIsOnline(true);
    } catch (error) {
      setIsOnline(false);
    }
  };

  useEffect(() => {
    checkInternet();

    const interval = setInterval(checkInternet, 5000); // check every 5 sec

    window.addEventListener("online", checkInternet);
    window.addEventListener("offline", () => setIsOnline(false));

    return () => {
      clearInterval(interval);
      window.removeEventListener("online", checkInternet);
      window.removeEventListener("offline", () => setIsOnline(false));
    };
  }, []);

  if (!isOnline) return <OfflinePage />;

  return <>{children}</>;
}
