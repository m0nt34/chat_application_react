import React, { useState } from "react";
import WinkFaceIcon from "../../assets/icons/WinkFaceIcon";
import { emojs } from "../../data/emojisData";
const Emojis = ({ setCurMessage, curMessage }) => {
  const [show, setShow] = useState(false);

  const setEmoji = (emj) => {
    setCurMessage(curMessage + emj);
  };
  return (
    <div className="flex relative">
      {show && (
        <div className="emj-box">
          {emojs.map((moj, i) => {
            return (
              <button
                type="button"
                key={i}
                className="text-xl"
                onClick={() => {
                  setEmoji(moj);
                }}
              >
                {moj}
              </button>
            );
          })}
        </div>
      )}
      <button type="button" onClick={() => setShow(!show)}>
        <WinkFaceIcon />
      </button>
    </div>
  );
};

export default Emojis;
