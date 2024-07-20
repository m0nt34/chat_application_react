import axios from "axios";
import { toast } from "react-toastify";

export const signUpService = async (data) => {
  console.log(data);
  const res = axios.post("http://localhost:3000/auth/signup", data);
};
