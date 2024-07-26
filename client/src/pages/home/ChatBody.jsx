import React, { useState } from "react";
import Input from "../../components/UI/Input";
import WinkFaceIcon from "../../assets/icons/WinkFaceIcon";
const ChatBody = () => {
  const [data, setFormData] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...data,
      [name]: value,
    });
  };
  return (
    <div className="flex flex-col h-full">
      <div className="h-full"></div>
      <form className="flex gap-8 p-5">
        <div className="flex w-full gap-5">
          <Input
            name="message"
            type="text"
            placeholder="Message..."
            Icon={null}
            onChange={handleChange}
          />
          <button type="button">
            <WinkFaceIcon />
          </button>
        </div>
        <button
          type="submit"
          className="bg-customColor-blue text-white text-xl px-5 rounded-lg hover:opacity-85 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatBody;
