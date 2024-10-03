import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectToDatabase } from "@/helper/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await connectToDatabase();
        try {
          const user = await User.findOne({
            email: credentials.email,
          }).populate({
            path: "role",
            populate: {
              path: "allowedModules",
              model: "Module",
            },
          });
          if (!user) {
            console.log("User not found");
            throw new Error("No user found with the provided email.");
          }
          const isPasswordValid = await bcrypt.compare(
            credentials.password.trim(),
            user.password.trim()
          );
          if (!isPasswordValid) {
            throw new Error("Invalid credentials.");
          }
          return user;
        } catch (err) {
          throw new Error("An error occurred during authorization.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      return session;
    },
  },
  debug: true,
};

export default NextAuth(authOptions);
