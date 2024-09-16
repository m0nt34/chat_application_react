import React, { useState } from "react";
import WinkFaceIcon from "../../assets/icons/WinkFaceIcon";
import { emojs } from "../../data/emojisData";
import { useEmojis } from "../../store/emojisContainer";
const Emojis = ({ setCurMessage, curMessage }) => {
  const {isOpen,setEmojisToOp} = useEmojis()
  const setEmoji = (emj) => {
    setCurMessage(curMessage + emj);
  };
  return (
    <div className="flex relative">
      {isOpen && (
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
      <button type="button" onClick={setEmojisToOp}>
        <WinkFaceIcon />
      </button>
    </div>
  );
};

export default Emojis;
