import type { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service.js";
import { validateEmail } from "../utils/functions.js";

export const authController = {
  async sendOtp(req: Request, res: Response) {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ ok: false, message: "Email is required!" });
    }

    if (!validateEmail(email)) {
      res.status(400).json({ ok: false, message: "Invalid email address." });
    }

    try {
      await authService.sendEmailOtp(email);
      res.status(200).json({ ok: true, message: "OTP send successfully!" });
    } catch (error) {
      console.error("Error sending OTP:", error);
      res.status(500).json({
        ok: false,
        message: "Failed to send OTP. Please try again later.",
      });
    }
  },

  async verifyOtp(req: Request, res: Response) {
    const { email, otp } = req.body;

    if (!email) {
      res.status(400).json({ ok: false, message: "Email is required!" });
    }

    if (!validateEmail(email)) {
      res.status(400).json({ ok: false, message: "Invalid email address." });
    }

    if (!otp) {
      res.status(400).json({ ok: true, message: "OTP code is required!" });
    }

    try {
      const resData = await authService.verifyEmailOtp(email, otp);
      res.cookie("refreshToken", resData.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        ok: true,
        data: {
          accessToken: resData.accessToken,
          user: resData.user,
        },
        message: "OTP verified successfully!",
      });
    } catch (error: any) {
      console.error("Error in verifying OTP:", error);
      res.status(500).json({
        ok: false,
        message:
          error.message || "Failed to verify OTP. Please try again later.",
      });
    }
  },
};
