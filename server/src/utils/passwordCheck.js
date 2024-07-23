import bcrypt from "bcrypt";
async function passwordCheck(UserPasswordConfirm, UserHashPassword) {
  const isPassMatch = await bcrypt.compare(
    UserHashPassword,
    UserPasswordConfirm
  );
  return isPassMatch;
}

export { passwordCheck };
