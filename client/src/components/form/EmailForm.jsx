import React, { useState } from "react";
import EmailIcon from "../../assets/icons/formIcons/EmailIcon";
import Input from "../UI/Input";
const EmailForm = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(formData);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-8">
      <Input
        name="P"
        type="text"
        placeholder="Email"
        Icon={EmailIcon}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="bg-customColor-blue text-white w-full rounded-full py-3 hover:opacity-90 active:opacity-80 transition"
      >
        Send Link
      </button>
    </form>
  );
};

export default EmailForm;
