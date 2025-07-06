import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingPage from "../pages/LoadingPage";

export default function RouteChangeLoader({ children }) {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 700); // 700ms loader for UX
    return () => clearTimeout(timer);
  }, [location]);

  if (loading) return <LoadingPage />;
  return children;
}
