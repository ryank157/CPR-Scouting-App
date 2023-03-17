import { useState, useEffect } from "react";

const useIsOnline = () => {
  const [isOnlineStatus, setIsOnlineStatus] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkOnlineStatus = async () => {
      const online = await isOnline();
      setIsOnlineStatus(online);
    };

    checkOnlineStatus();

    // Check the online status every 10 seconds
    const interval = setInterval(checkOnlineStatus, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return isOnlineStatus;
};

export default useIsOnline;

async function isOnline() {
  try {
    const response = await fetch("https://www.google.com", {
      mode: "no-cors",
      cache: "no-cache",
    });

    return true;
  } catch (error) {
    return false;
  }
}
