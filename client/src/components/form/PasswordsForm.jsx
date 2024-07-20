import React, { useState } from "react";
import EmailIcon from "../../assets/icons/formIcons/EmailIcon";
import PasswordInput from "../UI/PasswordInput";
import { passwordsValidation } from "../../utils/formValidations";
const PasswordsForm = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwordsValidation(formData)) {
      console.log(formData);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col mt-8">
      <div className="flex flex-col gap-5 w-5/6">
        <PasswordInput
          name="password"
          placeholder="Password"
          Icon={EmailIcon}
          onChange={handleChange}
        />
        <PasswordInput
          name="CPassword"
          placeholder="Confirm Password"
          Icon={EmailIcon}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-customColor-blue text-white w-full rounded-full py-3 hover:opacity-90 active:opacity-80 transition mt-4"
        >
          Reset Password
        </button>
      </div>
    </form>
  );
};

export default PasswordsForm;
