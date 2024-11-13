const createCookie = async (res, name, token, time) => {
  await res.cookie(name, token, {
    maxAge: time,
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
};

export { createCookie };
