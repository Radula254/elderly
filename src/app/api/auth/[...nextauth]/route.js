import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as mongoose from "mongoose";
import { User } from "@/app/models/table_users";
import bcrypt from "bcrypt";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      id: 'credentials',
      credentials: {
        username: { label: "Email", type: "email", placeholder: "johndoe@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        await mongoose.connect(process.env.NEXT_PUBLIC_MONGOURL);
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const passwordOk = user && bcrypt.compareSync(password, user.password);
        if (!passwordOk) {
          throw new Error("Invalid email or password");
        }

        return user;
      },
    }),
  ],
  pages: {
    error: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
