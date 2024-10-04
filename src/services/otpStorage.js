import Redis from "ioredis"; // Example: Redis for storing OTPs

const redis = new Redis(); // Initialize Redis connection

// Store OTP with expiration time in Redis
export async function setOtp(mobile, otp, expiration) {
  await redis.set(
    mobile,
    JSON.stringify({ otp, expiration }),
    "EX",
    OTP_EXPIRATION_TIME / 1000
  );
}

// Get OTP and expiration from Redis
export async function getOtp(mobile) {
  const data = await redis.get(mobile);
  return data ? JSON.parse(data) : null;
}
