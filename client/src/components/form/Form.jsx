import React, { useState } from "react";

import Inputs from "./Inputs";
import Auth from "./Auth";
const Form = () => {
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
          <Inputs formData={formData} setFormData={setFormData} />
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
          Create account
        </button>
      </div>
    </form>
  );
};

export default Form;
