import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import { db } from "database";
import { User } from "models";
import { jwt } from "utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: {
        email: string;
        role: string;
        name: string;
      };
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return checkJWT(req, res);
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { token = "" } = req.cookies;

  let userId = "";

  try {
    userId = await jwt.verifyToken(token);
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }

  await db.connect();
  const user = await User.findById(userId).lean();
  await db.disconnect();

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const { _id, email, role, name } = user;

  return res.status(200).json({
    token: jwt.signToken(_id, email), //revalidar token
    user: {
      email,
      role,
      name,
    },
  });
};
