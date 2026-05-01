import { Router } from "express";
import { asyncHandler } from "../middleware/errorHandler.js";
import { authController } from "../controllers/auth.controller.js";
import passport from "passport";
import "../config/passport.js"
const router = Router();

router.post("/send-otp", asyncHandler(authController.sendOtp));
router.post("/verify-otp", asyncHandler(authController.verifyOtp ));
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

export default router;
