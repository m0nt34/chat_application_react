import React, { useState } from "react";
import EmailIcon from "../../assets/icons/formIcons/EmailIcon";
import Input from "../UI/Input";
import { useNavigate } from "react-router-dom";
import { emailValidation } from "../../utils/formValidations";
import ThreeDotsLoadingIcon from "../../assets/icons/Loaders/ThreeDotsLoadingIcon";
import { sendPasswordResetLink } from "../../services/authServices";
import { showErrorMessage, showSuccessMessage } from "../../utils/validation";
const EmailForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
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
    if (emailValidation(formData)) {
      setLoading(true);
      const res = await sendPasswordResetLink(formData.email);
      if (res.error) {
        showErrorMessage(res.message);
      } else {
        showSuccessMessage("Link was sent successfully.");
        navigate("/sign-in");
      }
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-8">
      <Input
        name="email"
        type="text"
        placeholder="Email"
        Icon={EmailIcon}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="relative flex items-center justify-center px-4 py-3 h-[48px] bg-customColor-blue rounded-full w-full text-white transition hover:opacity-90 active:opacity-80"
      >
        {loading ? <ThreeDotsLoadingIcon /> : <>Send Link</>}
      </button>
    </form>
  );
};

export default EmailForm;
