import React, { useState } from "react";
import Input from "../UI/Input";
import UserIDIcon from "../../assets/icons/UserIDIcon";
import EmailIcon from "../../assets/icons/EmailIcon";
const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };
  return (
    <form className="mt-5">
      <div className="flex flex-col w-5/6 py-2 gap-5">
        <div className="flex w-full gap-5">
          <Input
            name="FirstName"
            placeholder="First name"
            Icon={UserIDIcon}
            onChange={handleChange}
          />
          <Input
            name="LastName"
            placeholder="Last name"
            Icon={UserIDIcon}
            onChange={handleChange}
          />
        </div>
        <Input
          name="Email"
          placeholder="Email"
          Icon={EmailIcon}
          onChange={handleChange}
        />
        <Input
          name="LastName"
          placeholder="Last name"
          Icon={UserIDIcon}
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

export default Form;
