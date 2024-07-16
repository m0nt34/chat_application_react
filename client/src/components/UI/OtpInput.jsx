import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length, onOtpSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);
  const handleChange = (i, e) => {
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[i] = value.substring(value.length - 1).toUpperCase();
    setOtp(newOtp);

    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) {
      onOtpSubmit(combinedOtp);
    }
  };
  const handleClick = () => {};
  const handleKeyDown = () => {};
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
