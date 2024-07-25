import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../store/authStore";
import { useLoading } from "../../store/loadingStore";
import { checkIfAuthenticated } from "../../services/authServices";
export default function AuthRequired() {
  const navigate = useNavigate();
  const { auth, authToT, authToF } = useAuth();


  const checkIfAuthFunc = async () => {
    const res = await checkIfAuthenticated();
    if (res.error) {
      authToF();
    }else{
      authToT()
    }

  };
  useEffect(() => {
    checkIfAuthFunc();
  }, []);
  useEffect(() => {
    if (auth) {
      navigate("/");
    } else {
      navigate("/sign-in");
    }
  }, [auth]);

  return <Outlet />;
}
