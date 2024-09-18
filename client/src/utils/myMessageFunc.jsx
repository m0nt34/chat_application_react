import { useUser } from "../store/userStore";

export const myMessage = (id) => {
  const {user} = useUser.getState()
  return user ? user._id === id : false;
};