const createAccessTokenCookie = async (res, accessToken) => {
  await res.cookie("accessToken", accessToken, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
};

const createRefreshTokenCookie = async (res, refreshToken) => {
  await res.cookie("refreshToken", refreshToken, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  });
};

export { createAccessTokenCookie, createRefreshTokenCookie };
