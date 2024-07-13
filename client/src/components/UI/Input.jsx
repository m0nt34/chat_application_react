import React from "react";

const Input = ({ name, placeholder, Icon, onChange }) => {
  return (
    <div className="relative flex items-center bg-gray-700 w-full px-5 py-3 rounded-lg">
      <input
        type="text"
        name={name}
        onChange={onChange}
        placeholder=" "
        autoComplete="off"
        className="peer flex-1 bg-transparent text-white outline-none w-full placeholder-transparent"
      />
      <span className="absolute left-5  -translate-y-1/2 text-gray-400 pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-[10px]">
        {placeholder}
      </span>
      {Icon && <Icon />}
    </div>
  );
};

export default Input;
