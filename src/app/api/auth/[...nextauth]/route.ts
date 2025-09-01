import NextAuth from "next-auth";
import { authOption } from "./authOption";

declare module "next-auth" {
  interface Session {
    user: {
      id: Number;
      firstName: string;
      lastName: string;
      email: string;
    };
    expires: string;
  }

  interface User {
    id: Number;
    firstName: string;
    lastName: string;
    email: string;
  }
}

const handler = NextAuth(authOption);

export { handler as GET, handler as POST };
