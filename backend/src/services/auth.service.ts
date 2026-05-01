import bcrypt from "bcrypt";
import crypto from "crypto";
import { prisma } from "../config/prisma.js";
import { sendOtpEmail } from "../utils/functions.js";
import { createAuthResponse } from "../utils/authUtils.js";

export class AuthService {
  async sendEmailOtp(email: string) {
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({
        data: { email },
      });
    }

    const otp = crypto.randomInt(100000, 1000000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    // DELETE UNUSED OTPS
    await prisma.otpCode.deleteMany({
      where: {
        userId: user.id,
        used: false,
      },
    });

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.otpCode.create({
      data: {
        userId: user.id,
        codeHash: hashedOtp,
        expiresAt: expiresAt,
      },
    });

    await sendOtpEmail(email, otp, "Ashish Verma");

    return true;
  }

  async verifyEmailOtp(email: string, otp: number) {
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error("User not found!");
    }

    const hashedOtp = await prisma.otpCode.findFirst({
      where: {
        userId: user.id,
        used: false,
        expiresAt: {
          gt: new Date(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!hashedOtp) {
      throw new Error("Invalid or expired code.");
    }

    const isValidOtp = await bcrypt.compare(otp.toString(), hashedOtp.codeHash);

    if (!isValidOtp) {
      throw new Error("OTP is invalid.");
    }

    await prisma.otpCode.update({
      where: {
        id: hashedOtp.id,
      },
      data: {
        used: true,
      },
    });

    const authResponse = createAuthResponse(user);
    return authResponse;
  }
}

export const authService = new AuthService();
