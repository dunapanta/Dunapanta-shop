import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

import { dbUsers } from "database";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    // My Authentication
    Credentials({
      name: "Custom Login",
      credentials: {
        email: { label: "Correo:", type: "email", placeholder: "Correo" },
        password: {
          label: "Contraseña:",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials) {
        console.log(credentials);
        //Validate credentials on my database
        return await dbUsers.checkUserEmailPassword(
          credentials!.email,
          credentials!.password
        );

        //return { name: "daniel", correo: "dan@mail.com", role: "admin" };
      },
    }),
    //Github
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  //Custom Pages
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/register",
  },

  //callbacks
  callbacks: {
    async jwt({ token, account, user }) {
      //console.log({ token, account, user });

      if (account) {
        token.accessToken = account.access_token;

        switch (account.type) {
          case "credentials":
            token.user = user;
            break;
          case "oauth":
            //Crear usuario o verificar si existe en la base de datos
            token.user = await dbUsers.oauthToDbUser(
              user?.email || "",
              user?.name || ""
            );
        }
      }
      return token;
    },

    async session({ session, token, user }) {
      //console.log({ session, token, user });

      session.accessToken = token.accessToken;
      session.user = token.user as any;

      return session;
    },
  },
};
export default NextAuth(authOptions);
