import React, { useState } from "react";
import OpenEyeIcon from "../../assets/icons/OpenEyeIcon";
import ClosedEyeIcon from "../../assets/icons/ClosedEyeIcon";
const PasswordInput = ({ name, placeholder, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative flex items-center bg-gray-700 w-full px-5 pt-4 pb-2 rounded-lg focus-within:border-customColor-blue border-2 border-[#323644]">
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        onChange={onChange}
        placeholder=" "
        autoComplete="off"
        className="peer flex-1 bg-transparent text-white outline-none w-full placeholder-transparent text-base"
      />
      <span className="absolute left-5 -translate-y-1/2 top-[10px] text-xs text-gray-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-[10px] peer-focus:text-customColor-blue peer-focus:text-xs">
        {placeholder}
      </span>
      <button
        type="button"
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="-translate-y-1/4 text-gray-400 focus:outline-none"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <OpenEyeIcon /> : <ClosedEyeIcon />}
      </button>
    </div>
  );
};

export default PasswordInput;
