// /app/api/auth/verify-otp/route.js

import otpService from "../../../../services/otpService";

export const POST = async (req) => {
  try {
    const { mobileNumber, otp } = await req.json();

    const isValid = await otpService.verifyOtp(mobileNumber, otp);

    if (isValid) {
      return new Response(
        JSON.stringify({ message: "OTP verified successfully" }),
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400,
    });
  }
};
