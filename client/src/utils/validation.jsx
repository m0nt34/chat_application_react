import { toast } from "react-toastify";

const nameRegex = /^[a-zA-Z]{2,50}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isNotEmpty = (value) => value && value.trim() !== '';

export const isValidName = (name) => nameRegex.test(name);

export const isValidEmail = (email) => emailRegex.test(email) && email.length <= 100;

export const isValidPassword = (password) => password.length >= 6 && password.length <= 50;

export const showErrorMessage = (message) => {
  toast.error(message);
};
export const showSuccessMessage = (message) => {
  toast.success(message);
};

export const filterValidation = (prt, searchWord)=>{
  return String(prt.name+" "+prt.lastName).startsWith(searchWord.trim())||
  String(prt.name+" "+prt.lastName).includes(searchWord.trim())||
  prt.email.startsWith(searchWord.trim()) ||
  prt.email.includes(searchWord.trim())
}