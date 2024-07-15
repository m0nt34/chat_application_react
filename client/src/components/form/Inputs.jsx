import React, { useState } from "react";
import UserIDIcon from "../../assets/icons/formIcons/UserIDIcon";
import EmailIcon from "../../assets/icons/formIcons/EmailIcon";
import PasswordInput from "../UI/PasswordInput";
import Input from "../UI/Input";
const Inputs = ({ formData, setFormData, LogInPage }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
    <>
      {LogInPage && (
        <div className="flex w-full gap-5">
          <Input
            name="FirstName"
            type="text"
            placeholder="First name"
            Icon={UserIDIcon}
            onChange={handleChange}
          />
          <Input
            name="LastName"
            type="text"
            placeholder="Last name"
            Icon={UserIDIcon}
            onChange={handleChange}
          />
        </div>
      )}
      <Input
        name="Email"
        type="text"
        placeholder="Email"
        Icon={EmailIcon}
        onChange={handleChange}
      />
      <PasswordInput
        name="Password"
        placeholder="Password"
        onChange={handleChange}
      />
    </>
  );
};

export default Inputs;
