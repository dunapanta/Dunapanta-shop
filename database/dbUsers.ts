import { db } from "database";
import { User } from "models";
import bcrypt from "bcryptjs";

export const checkUserEmailPassword = async (
  email: string,
  password: string
) => {
  await db.connect();

  const user = await User.findOne({ email });

  await db.disconnect();

  if (!user) {
    return null;
  }

  // Validar contraseña
  if (!bcrypt.compareSync(password, user.password!)) {
    return null;
  }

  const { role, name, _id } = user;

  return {
    _id,
    email: email.toLocaleLowerCase(),
    role,
    name,
  };
};

//Crea o verifica el usuaion de OAuth
export const oauthToDbUser = async (oAuthEmail: string, oAuthName: string) => {
  await db.connect();

  const user = await User.findOne({ email: oAuthEmail });

  if (user) {
    await db.disconnect();
    const { role, name, email, _id } = user;
    return {
      _id,
      email,
      role,
      name,
    };
  }

  const newUser = new User({
    email: oAuthEmail,
    name: oAuthName,
    password: "@",
    role: "client",
  });
  await newUser.save();
  await db.disconnect();

  const { role, name, email, _id } = newUser;
  return {
    _id,
    email,
    role,
    name,
  };
};
