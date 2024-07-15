import React, { useState } from "react";
import { Link } from "react-router-dom";
import Inputs from "./Inputs";
import Auth from "./Auth";
const Form = ({ LogInPage }) => {
  const [formData, setFormData] = useState({});

  const [useAuth, setUseAuth] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <form className="flex flex-col gap-10 " onSubmit={handleSubmit}>
      <div className="flex flex-col w-5/6 py-2 gap-5">
        {useAuth ? (
          <Auth />
        ) : (
          <>
            <Inputs
              formData={formData}
              setFormData={setFormData}
              LogInPage={LogInPage}
            />
            {!LogInPage && (
              <button type="button" className="flex items-center w-full px-5 py-3 rounded-lg border-2 border-[#262a36] text-white underline">
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
          onClick={() => setUseAuth(!useAuth)}
        >
          Change method
        </button>
        <button
          type="submit"
          className="px-4 py-3 bg-customColor-blue rounded-full w-full text-white transition hover:opacity-90 active:opacity-80"
        >
          Log In
        </button>
      </div>
    </form>
  );
};

export default Form;
