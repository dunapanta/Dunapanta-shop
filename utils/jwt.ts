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

export const verifyToken = (token: string): Promise<string> => {
  if (!process.env.JWT_SECRET_KEY) {
    throw new Error("JWT SECRET is not defined");
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET_KEY || "", (err, payload) => {
        if (err) return reject("JWT no es válido");

        const { _id } = payload as { _id: string };

        resolve(_id);
      });
    } catch (e) {
      reject("JWT no es válido");
    }
  });
};
