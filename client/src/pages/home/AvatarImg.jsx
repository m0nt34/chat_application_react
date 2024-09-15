import React from "react";
import userImg from "../../assets/images/user.jpg";
import usersImg from "../../assets/images/chatDefault.jpg";
const AvatarImg = ({ prv = true, className = "" }) => {
  return (
    <img
      src={prv ? userImg : usersImg}
      alt=""
      className={`rounded-full ` + className}
    />
  );
};

export default AvatarImg;
