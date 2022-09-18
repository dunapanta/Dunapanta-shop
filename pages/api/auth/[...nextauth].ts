import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
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
        //TODO: Validate credentials on my database

        return {name: "daniel", correo: "dan@mail.com", roel: "admin"};
      },
    }),
    //Github
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  //callbacks
    callbacks: {
        
    }
};
export default NextAuth(authOptions);
