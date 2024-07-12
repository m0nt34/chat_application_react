import React from "react";

const LineSvg = ({className}) => {
  return (
<svg
  id="visual"
  viewBox="0 0 400 600" 
  xmlns="http://www.w3.org/2000/svg"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  version="1.1"
  className={className}
>
  <path
    d="M255 0L246.8 14.3C238.7 28.7 222.3 57.3 222.8 85.8C223.3 114.3 240.7 142.7 231 171.2C221.3 199.7 184.7 228.3 177 257C169.3 285.7 190.7 314.3 196.2 343C201.7 371.7 191.3 400.3 197.3 428.8C203.3 457.3 225.7 485.7 235.2 514.2C244.7 542.7 241.3 571.3 239.7 585.7L238 600"
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

export default LineSvg;
