export const defaultSession = {
  isLoggedIn: false,
};

export const sessionOptions = {
  password: process.env.SECRET_KEY,
  cookieName: "next-auth-session",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
