import React from "react";

const LineSvg2 = ({ className }) => {
  return (
    <svg
      id="visual"
      viewBox="410 0 80 600"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      version="1.1"
      className={className}
    >
      <path
        d="M417 600L428.5 585.7C440 571.3 463 542.7 471.3 514.2C479.7 485.7 473.3 457.3 461.2 428.8C449 400.3 431 371.7 426.5 343C422 314.3 431 285.7 440.2 257C449.3 228.3 458.7 199.7 455.5 171.2C452.3 142.7 436.7 114.3 435.7 85.8C434.7 57.3 448.3 28.7 455.2 14.3L462 0"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="miter"
        stroke="#444754"
        strokeWidth="3"
        strokeDasharray="10,10"
      ></path>
    </svg>
  );
};

export default LineSvg2;
