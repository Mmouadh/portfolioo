import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export default function AnalyticsBeacon() {
  const location = useLocation();

  useEffect(() => {
    const payload = { path: location.pathname || "/" };
    fetch(`${BACKEND_URL}/api/analytics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => {});
  }, [location.pathname]);

  return null;
}
