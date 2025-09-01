import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const passwordVaild = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!passwordVaild) {
          throw new Error("Password Not correct");
        }

        return {
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
        };
      },
    }),
  ],

  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
  },

  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.email = user.email;
      }
      return token;
    },

    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email,
        },
      };
    },
  },
};
