import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function sendSms(mobile, message) {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: mobile,
    });
    return { success: true, response };
  } catch (error) {
    console.error("Error sending SMS:", error);
    return { success: false, error };
  }
}
