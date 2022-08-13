import jwt from "jsonwebtoken";

export const signToken = (_id: string, email: string) => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT SECRET is not defined");
  }

  return jwt.sign(
    {
      _id,
      email,
    },
    process.env.JWT_SECRET_KEY,
    //Options
    { expiresIn: "30d" }
  );
};
