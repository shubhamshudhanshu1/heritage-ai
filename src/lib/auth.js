import bcrypt from "bcryptjs";
import User from "@/models/User";
import Role from "@/models/Role";
import Module from "@/models/Module";
import { connectToDatabase } from "@/helper/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import otpService from "@/services/otpService"; // Import the OTP service

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
        mobile: { label: "Mobile", type: "text", placeholder: "Mobile Number" },
        otp: { label: "OTP", type: "text", placeholder: "OTP" },
      },
      authorize: async (credentials) => {
        await connectToDatabase();
        try {
          if (credentials.email && credentials.password) {
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

            return user; // Return user object for email/password authentication
          } else if (credentials.mobile && credentials.otp) {
            // Handle mobile/OTP authentication
            const user = await User.findOne({
              mobileNumber: credentials.mobile,
            }).populate({
              path: "role",
              populate: {
                path: "allowedModules",
                model: "Module",
              },
            });
            if (!user) {
              console.log("User not found");
              throw new Error("No user found with the provided mobile number.");
            }

            const isOtpValid = await otpService.verifyOtp(
              credentials.mobile,
              credentials.otp
            );

            if (!isOtpValid) {
              throw new Error("Invalid OTP.");
            }

            return user; // Return user object for mobile/OTP authentication
          } else {
            throw new Error("Invalid credentials.");
          }
        } catch (err) {
          console.error("Authorization error:", err);
          throw new Error("An error occurred during authorization.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin", // Custom sign-in page
    error: "/auth/signin", // Redirect to the same page on error
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.mobileNumber = user.mobileNumber;
        token.companyName = user.companyName;
        token.itemsPrinted = user.itemsPrinted;
        token.materialsAvailable = user.materialsAvailable;
        token.pricing = user.pricing;
        token.serviceablePincodes = user.serviceablePincodes;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.mobileNumber = token.mobileNumber;
        session.user.companyName = token.companyName;
        session.user.itemsPrinted = token.itemsPrinted;
        session.user.materialsAvailable = token.materialsAvailable;
        session.user.pricing = token.pricing;
        session.user.serviceablePincodes = token.serviceablePincodes;
      }
      return session;
    },
  },
  debug: true,
};

export default NextAuth(authOptions);

export async function POST(request) {
  const {
    email,
    password,
    lastName,
    firstName,
    mobileNumber,
    role,
    companyName,
    itemsPrinted,
    materialsAvailable,
    pricing,
    serviceablePincodes,
  } = await request.json();

  try {
    await connectToDatabase();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      lastName,
      firstName,
      mobileNumber,
      role,
      companyName,
      itemsPrinted,
      materialsAvailable,
      pricing,
      serviceablePincodes,
    });

    return NextResponse.json(
      { data: newUser, message: "User created" },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: err, message: "Server error" },
      { status: 500 }
    );
  }
}
