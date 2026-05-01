import { Resend } from "resend";
import { otpEmailTemplate } from "../template/OtpEmail.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOtpEmail(
  email: string,
  otp: string,
  name?: string,
): Promise<void> {
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "EduTube <onboarding@resend.dev>",
    to: email,
    subject: `${otp} is your EduTube verification code`,
    html: otpEmailTemplate(otp, name),
  });

  if (error) {
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
}

export function validateEmail(email: string) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
