import React from "react";

const CheckMarkIcon = ({className}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 48 48"
      className={className}
    >
      <path
        fill="currentColor"
        d="M40.6 12.1L17 35.7l-9.6-9.6L4.6 29L17 41.3l26.4-26.4z"
      />
    </svg>
  );
};

export default CheckMarkIcon;
