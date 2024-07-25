import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Inputs from "./Inputs";
import Auth from "./Auth";
import {
  signupValidation,
  signinValidation,
} from "../../utils/formValidations";

import {
  checkIfuserExists,
  sendOtpEmail,
  signInService,
} from "../../services/authServices";
import { showErrorMessage } from "../../utils/validation";
import ThreeDotsLoadingIcon from "../../assets/icons/Loaders/ThreeDotsLoadingIcon";
import { useAuth } from "../../store/authStore";
const Form = ({ LogInPage, setOtpSection, formData, setFormData }) => {
  const [inputs, setInputs] = useState(false);
  const [loading, setLoading] = useState(false);
  const { authToT } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (LogInPage && signinValidation(formData)) {
      setLoading(true);
      const res = await signInService(formData);
      if (res.error) {
        showErrorMessage(res.message);
      } else {
        authToT();
      }
      setLoading(false);
    }
  };
  const setOtpSectionFunc = async () => {
    if (!LogInPage && signupValidation(formData)) {
      setLoading(true);
      const res = await checkIfuserExists(formData.email);
      if (!res.error) {
        await sendOtpEmail(formData.email);
        await setOtpSection();
      } else {
        showErrorMessage(res.message);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    setFormData({});
  }, []);

  return (
    <form className="flex flex-col gap-10 " onSubmit={handleSubmit}>
      <div className="flex flex-col w-5/6 py-2 gap-5">
        {inputs ? (
          <Auth />
        ) : (
          <>
            <Inputs
              formData={formData}
              setFormData={setFormData}
              LogInPage={LogInPage}
            />
            {LogInPage && (
              <button
                type="button"
                className="flex items-center w-full px-5 py-3 rounded-lg border-2 border-[#262a36] text-white underline"
              >
                <Link to="/forgot-password">Forgot your password?</Link>
              </button>
            )}
          </>
        )}
      </div>
      <div className="flex gap-5 w-5/6 ">
        <button
          type="button"
          className="px-4 py-3 bg-slate-400 rounded-full w-full text-white transition hover:opacity-90 active:opacity-80"
          onClick={() => setInputs(!inputs)}
          disabled={loading}
        >
          Change method
        </button>
        <button
          type={LogInPage ? "submit" : "button"}
          className="relative flex items-center justify-center px-4 py-3 bg-customColor-blue rounded-full w-full text-white transition hover:opacity-90 active:opacity-80"
          onClick={setOtpSectionFunc}
          disabled={loading}
        >
          {loading ? (
            <ThreeDotsLoadingIcon />
          ) : (
            <>{!LogInPage ? "Sign Up" : "Log In"}</>
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;
