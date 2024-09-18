import bcrypt from "bcryptjs";
import User from "@/models/User";
import Role from "@/models/Role";
import Module from "@/models/Module";

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
        let user;
        const { email, password, isRegistering } = credentials;
        if (isRegistering) {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            throw new Error("User already exists! Please signin to continue.");
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const userRole = await Role.findOne({ roleName: "USER" });
          const newUser = new User({
            email,
            password: hashedPassword,
            role: userRole._id,
          });
          await newUser.save();
          return newUser;
        } else {
          try {
            user = await User.findOne({
              email,
            }).populate({
              path: "role",
              populate: {
                path: "allowedModules", // Populate allowedModules within role
                model: "Module", // Model name for the referenced schema
              },
            });
          } catch (err) {
            console.log(err);
          }
          if (!user) {
            throw new Error("No user found with the provided email.");
          }
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Invalid credentials.");
          }
          return user;
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
