// src/core/navigation/NavigationBinder.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setNavigate } from "@/core/navigation";

const NavigationBinder = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return null;
};

export default NavigationBinder;
