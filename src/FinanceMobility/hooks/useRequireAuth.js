import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MOBILITY } from "../mobilityPaths";

export function useRequireAuth() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = localStorage.getItem("jwtToken");
    if (!t) {
      navigate(MOBILITY.LOGIN, { replace: true });
    }
  }, [navigate]);
}
