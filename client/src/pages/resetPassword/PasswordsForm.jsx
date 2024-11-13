import React, { useState } from "react";
import EmailIcon from "../../assets/icons/formIcons/EmailIcon";
import PasswordInput from "../../components/UI/PasswordInput";
import { passwordsValidation } from "../../utils/formValidations";
import { resetPassword } from "../../services/AuthServices";
import { showErrorMessage, showSuccessMessage } from "../../utils/validation";
import { useNavigate } from "react-router-dom";
const PasswordsForm = ({ userID }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordsValidation(formData)) {
      const res = await resetPassword(userID, formData.password);
      if (res.error) {
        showErrorMessage(res.message);
      } else {
        showSuccessMessage("Password was changed successfuly");
        navigate("/sign-in");
      }
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
