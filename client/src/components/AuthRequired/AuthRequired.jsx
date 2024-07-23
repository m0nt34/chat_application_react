import React, { useEffect } from "react";
import {
  Outlet,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import useAuthStore from "../../store/authStore";

export default function AuthRequired() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    } else {
      navigate("/student");
    }
  }, []);

  if (!location.pathname.includes("/") && !isLoggedIn) {
    return (
      <Navigate
        to="/"
        state={{
          message: "You must log in first!",
          prevLoc: location.pathname,
        }}
        replace
      />
    );
  }

  return <Outlet />;
}
