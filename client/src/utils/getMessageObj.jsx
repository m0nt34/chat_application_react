import { useUser } from "../store/userStore";

export const getMessageObj = (curMessage, id) => {
  const { user } = useUser.getState();
  const messageObj = {
    sender: user._id,
    content: curMessage.trim(),
    room: id,
  };
  return messageObj;
};
