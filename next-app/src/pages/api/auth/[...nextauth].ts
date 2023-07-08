import NextAuth, { NextAuthOptions } from "next-auth";
import { default as CredentialsProvider } from "next-auth/providers/credentials";

interface Credentials {
  email: string;
  password: string;
}

export const CREDENTIAL_NAME = "Credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: CREDENTIAL_NAME,
      credentials: {
        email: { label: "Email", type: "email", placeholder: "test@mail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as any;
        const res = await fetch("http://localhost:8000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
            password,
          }),
        });

        const user = await res.json();

        console.log({ user });

        if (res.ok && user) {
          return user;
        } else return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
};

export default NextAuth(authOptions);
