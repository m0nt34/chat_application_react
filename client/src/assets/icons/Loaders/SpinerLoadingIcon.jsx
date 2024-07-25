import React from "react";

const SpinerLoadingIcon = () => {
  return (
    <svg
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className="h-96 w-96"
    >
      <svg
        width="100px"
        height="100px"
        viewBox="0 0 24 24"
        x="200"
        y="200"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="white">
          <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
            <animateTransform
              attributeName="transform"
              dur="0.75s"
              repeatCount="indefinite"
              type="rotate"
              values="0 12 12;360 12 12"
            />
          </path>
        </g>
      </svg>
    </svg>
  );
};

export default SpinerLoadingIcon;
