import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../store/authStore";

import { checkIfAuthenticated } from "../../services/AuthServices.jsx";
export default function AuthRequired() {
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, authToT, authToF } = useAuth();

  const checkIfAuthFunc = async () => {
    const res = await checkIfAuthenticated();

    if (res.error) {
      authToF();
    } else {
      authToT();
    }
  };
  useEffect(() => {
    checkIfAuthFunc();
  }, []);
  useEffect(() => {
    if (auth) {
      navigate("/");
    } else {
      if (!location.pathname.includes("/reset-password")) {
        navigate("/sign-in");
      }
    }
  }, [auth]);

  return <Outlet />;
}
