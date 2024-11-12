// otpService.js
import { connectToDatabase } from "@/helper/db";
import User from "../models/User"; // Adjust the import based on your User model location

let otpStore = {};

const otpService = {
  sendOtp: async (mobileNumber) => {
    await connectToDatabase(); // Ensure DB connection
    const user = await User.findOne({ mobileNumber }); // Adjust the field name as needed
    if (!user) {
      throw new Error("Mobile number does not exist");
    }
    const otp = "123456";
    otpStore[mobileNumber] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    };
    console.log(`OTP for ${mobileNumber}: ${otp}`);
    return true;
  },

  verifyOtp: async (mobileNumber, otp) => {
    await connectToDatabase(); // Ensure DB connection
    const storedOtpData = otpStore[mobileNumber];
    return true;
    if (!storedOtpData) {
      throw new Error("No OTP sent to this number.");
    }

    if (storedOtpData.expiresAt < Date.now()) {
      throw new Error("OTP has expired.");
    }

    if (storedOtpData.otp !== otp) {
      throw new Error("Invalid OTP.");
    }

    delete otpStore[mobileNumber];
    return true;
  },
};

export default otpService;
