import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length, currentOtp }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const handleChange = (i, e) => {
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[i] = value.substring(value.length - 1).toUpperCase();
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");

    currentOtp.current = combinedOtp;

    if (value && i < length - 1 && inputRefs.current[i + 1]) {
      inputRefs.current[i + 1].focus();
    }
  };
  const handleClick = (i) => {
    inputRefs.current[i].setSelectionRange(1, 1);
  };
  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0 && inputRefs.current[i - 1]) {
      console.log(12);
      inputRefs.current[i - 1].focus();
    }
  };
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);
  return (
    <div className="flex w-full gap-4">
      {otp.map((val, i) => {
        return (
          <input
            key={i}
            type="text"
            ref={(input) => {
              inputRefs.current[i] = input;
            }}
            value={val}
            onChange={(e) => {
              handleChange(i, e);
            }}
            onClick={() => {
              handleClick(i);
            }}
            onKeyDown={(e) => {
              handleKeyDown(i, e);
            }}
            className="flex justify-center items-center text-center text-3xl text-white w-full aspect-square bg-transparent border rounded-lg"
          />
        );
      })}
    </div>
  );
};

export default OtpInput;
