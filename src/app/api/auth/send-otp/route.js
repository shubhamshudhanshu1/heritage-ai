import otpService from '../../../../services/otpService';

export const POST = async req => {
  try {
    const { mobileNumber } = await req.json();
    await otpService.sendOtp(mobileNumber);
    return new Response(JSON.stringify({ message: 'OTP sent successfully' }), {
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 400
    });
  }
};
