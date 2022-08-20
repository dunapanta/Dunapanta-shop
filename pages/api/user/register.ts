import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";

import { db } from "database";
import { User } from "models";
import { jwt, validations } from "utils";

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
    case "POST":
      return registerUser(req, res);
    default:
      return res.status(405).json({ message: "Method Not Allowed" });
  }
}

const registerUser = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    email = "",
    password = "",
    name = "",
  } = req.body as { email: string; password: string; name: string };

  await db.connect();
  const user = await User.findOne({ email });

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 6 caracteres" });
  }
  if (name.length < 3) {
    return res
      .status(400)
      .json({ message: "El nombre debe tener al menos 3 caracteres" });
  }

  if (!validations.isValidEmail(email)) {
    return res.status(400).json({ message: "El correo no es válido" });
  }

  if (user) {
    await db.disconnect();
    return res.status(404).json({ message: "Correo registrado" });
  }

  const newUser = new User({
    email: email.toLocaleLowerCase(),
    password: bcrypt.hashSync(password, 10),
    role: "client",
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error al registrar usuario" });
  }

  const { _id, role } = newUser;

  const token = jwt.signToken(_id, email);

  return res.status(200).json({
    token,
    user: {
      email,
      role,
      name,
    },
  });
};
