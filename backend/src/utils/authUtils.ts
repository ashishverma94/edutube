import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma.js";

export const generateAccessToken = (user: { id: string; email: string }) => {
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.ACCESS_SECRET!,
    { expiresIn: "15m" },
  );
};

export const generateRefreshToken = () => {
  return crypto.randomBytes(32).toString("hex");
};

export const storeRefreshToken = async (
  userId: string,
  refreshToken: string,
) => {
  const hashedToken = await bcrypt.hash(refreshToken, 10);

  await prisma.refreshToken.deleteMany({ where: { userId } });

  await prisma.refreshToken.create({
    data: {
      userId,
      tokenHash: hashedToken,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  return hashedToken;
};

export const createAuthResponse = async (user: any) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken();

  await storeRefreshToken(user.id, refreshToken);

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar, 
    },
  };
};
