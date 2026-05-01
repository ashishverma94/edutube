import {
  Mail,
  RefreshCw,
  ArrowRight,
  ChevronLeft,
  CheckCircle2,
} from "lucide-react";
import {
  InputOTP,
  InputOTPSlot,
  InputOTPGroup,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { authApi } from "@/lib/api";
import { lazy, Suspense } from "react";
import { useState, useEffect } from "react";
import Logo from "@/assets/common/Logo.png";
import TextInput from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import GoogleIcon from "@/assets/icons/Google.svg?react";

const MobileCarousel = lazy(() => import("@/components/auth/MobileCarousel"));
const DesktopCarousel = lazy(() => import("@/components/auth/DesktopCarousel"));

type Step = "email" | "otp" | "success";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("hariashish1@gmail.com");
  const [resendSecs, setResendSecs] = useState(0);
  const [otpValue, setOtpValue] = useState("");

  // LOADING STATES
  const [googleLoading, setGoogleLoading] = useState(false);

  const isValidEmail = EMAIL_REGEX.test(email.trim());
  const emailError =
    email && !isValidEmail ? "Enter a valid email address" : "";

  // Resend timer
  useEffect(() => {
    if (resendSecs <= 0) return;
    const t = setInterval(() => setResendSecs((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendSecs]);

  const sendOtpMutation = useMutation({
    mutationFn: authApi.sendOtp,
    onSuccess: () => {
      setStep("otp");
      setResendSecs(60);
      toast.success("OTP sent!", {
        description: `Verification code sent to ${email}`,
      });
    },
    onError: (error: Error) => {
      toast.error("Failed to send OTP", {
        description: error.message,
      });
    },
  });

  const verifyOtpMutation = useMutation({
    mutationFn: (otp: string) => authApi.verifyOtp(email, otp),
    onSuccess: () => {
      sessionStorage.setItem("wp_username", email.split("@")[0]);
      setStep("success");
    },
    onError: (error: Error) => {
      setOtpValue("");
      toast.error("Failed to verify OTP", {
        description: error.message,
      });
    },
  });

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      sessionStorage.setItem("wp_username", "GoogleUser");
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setGoogleLoading(false);
    }
  };

  useEffect(() => {
    if (step !== "success") return;
    const t = setTimeout(() => navigate("/"), 5600);
    return () => clearTimeout(t);
  }, [step, navigate]);

  return (
    <div className="h-screen overflow-hidden flex flex-col md:flex-row font-body">
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-2.5">
            <img src={Logo} alt="edutube-logo" className="h-10" />
            <span className="font-display font-black text-gray-900 text-lg">
              Edu<span className="text-primary-500">Tube</span>
            </span>
          </div>
          <span className="text-xs text-gray-400 font-body hidden sm:block">
            No account needed — just sign in
          </span>
        </div>

        {/* Form area — vertically centered */}
        <div className="flex-1 flex items-center justify-center px-8 py-10">
          <div className="w-full max-w-100">
            {/* ── Email step ── */}
            {step === "email" && (
              <div key="email" className="animate-fade-in">
                <div className="mb-8">
                  <h1 className="font-display font-black text-[2.25rem] max-md:text-center leading-tight text-gray-900 mb-3">
                    Sign in to{"  "}
                    <span className="text-primary-500">EduTube</span>
                  </h1>
                  <p className="text-gray-500 text-sm leading-relaxed max-md:text-center">
                    New here? We'll create your account automatically. No
                    passwords, ever.
                  </p>
                </div>

                {/* Google button */}
                <button
                  onClick={handleGoogle}
                  disabled={googleLoading}
                  className="w-full h-13 rounded-2xl border-2 border-surface-200 bg-white hover:border-surface-300 hover:bg-surface-50 active:scale-[0.99] transition-all flex items-center justify-center gap-3 font-display font-semibold text-gray-700 text-sm shadow-sm mb-5 disabled:opacity-60"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex-1 h-px bg-surface-200" />
                  <span className="text-xs text-gray-400 shrink-0">
                    or use email
                  </span>
                  <div className="flex-1 h-px bg-surface-200" />
                </div>

                {/* Email form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!isValidEmail) return;
                    sendOtpMutation.mutate(email);
                  }}
                  className="space-y-3 flex flex-col gap-8"
                >
                  <TextInput
                    label="EMAIL ADDRESS"
                    requiredAsterisk
                    Icon={<Mail className="size-4 text-gray-500" />}
                    position="left"
                    placeholder="you@example.com"
                    error={emailError}
                    inputValue={email}
                    onChange={setEmail}
                  />

                  <button
                    type="submit"
                    disabled={sendOtpMutation.isPending || !email}
                    className={cn(
                      "w-full h-13 rounded-2xl font-display font-bold text-sm text-white transition-all flex items-center justify-center gap-2",
                      "bg-primary-500 hover:bg-primary-600 active:scale-[0.99]",
                      "shadow-[0_4px_20px_rgba(2,174,2,0.35)] hover:shadow-[0_6px_28px_rgba(2,174,2,0.45)]",
                      "disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed",
                    )}
                  >
                    {sendOtpMutation.isPending ? (
                      <RefreshCw className="w-4 h-4 animate-spin" />
                    ) : (
                      <>
                        <span>Send verification code</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <p className="text-center text-xs text-gray-400 mt-6 leading-relaxed">
                  By continuing you agree to our{" "}
                  <a
                    href="#"
                    className="text-primary-600 hover:underline font-semibold"
                  >
                    Terms of Service
                  </a>
                  {" & "}
                  <a
                    href="#"
                    className="text-primary-600 hover:underline font-semibold"
                  >
                    Privacy Policy
                  </a>
                </p>
              </div>
            )}

            {/* ── OTP step ── */}
            {step === "otp" && (
              <div key="otp" className="animate-fade-in">
                <button
                  onClick={() => setStep("email")}
                  className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-700 font-display font-semibold mb-8 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" /> Back to email
                </button>

                <div className="w-20 h-20 rounded-3xl bg-primary-50 border-2 border-primary-200 flex items-center justify-center max-md:mx-auto mb-6 shadow-[0_8px_32px_rgba(2,174,2,0.2)]">
                  <Mail className="w-8 h-8 text-primary-500" />
                </div>

                <h1 className="font-display max-md:text-center font-black text-[2rem] leading-tight text-gray-900 mb-2">
                  Check your inbox
                </h1>
                <p className="text-sm text-gray-500 mb-1 max-md:text-center">
                  We sent a 6-digit code to
                </p>
                <p className="font-display font-bold text-gray-900 text-sm mb-8 max-md:text-center">
                  {email}
                </p>

                <InputOTP
                  maxLength={6}
                  disabled={verifyOtpMutation.isPending}
                  onComplete={verifyOtpMutation.mutate}
                  onChange={setOtpValue}
                  className="w-full"
                  value={otpValue}
                >
                  <InputOTPGroup className="w-full flex justify-between gap-2.5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        aria-invalid={verifyOtpMutation.isError}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>

                {verifyOtpMutation.isPending && (
                  <div className="flex items-center justify-center gap-2 mt-6 text-sm text-primary-600 font-display font-semibold">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Verifying code…
                  </div>
                )}

                <div className="text-center mt-6">
                  {resendSecs > 0 ? (
                    <p className="text-xs text-gray-400">
                      Resend in{" "}
                      <span className="font-mono font-bold text-gray-700">
                        {String(Math.floor(resendSecs / 60)).padStart(2, "0")}:
                        {String(resendSecs % 60).padStart(2, "0")}
                      </span>
                    </p>
                  ) : (
                    <button
                      onClick={() => setResendSecs(60)}
                      className="text-xs font-display font-semibold text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      Resend code
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* ── Success step ── */}
            {step === "success" && (
              <div key="success" className="animate-fade-in text-center">
                <div className="w-20 h-20 rounded-3xl bg-primary-50 border-2 border-primary-200 flex items-center justify-center mx-auto mb-6 shadow-[0_8px_32px_rgba(2,174,2,0.2)]">
                  <CheckCircle2 className="w-10 h-10 text-primary-500" />
                </div>
                <h1 className="font-display font-black text-3xl text-gray-900 mb-2">
                  You're in! 🎉
                </h1>
                <p className="text-gray-500 text-sm mb-6">
                  Taking you to EduTube
                </p>
                <div className="flex items-center justify-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary-500 animate-bounce-dot"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom strip */}
        <div className="px-8 py-5 border-t border-surface-100 flex items-center gap-3">
          <div className="flex -space-x-1.5">
            {["#02ae02", "#7aa300", "#3df53d", "#028a02"].map((c, i) => (
              <div
                key={i}
                className="w-6 h-6 rounded-full border-2 border-white"
                style={{ background: c }}
              />
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Join{" "}
            <span className="font-display font-bold text-gray-700">2,400+</span>{" "}
            people watching together
          </p>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="hidden lg:flex lg:w-[52%] xl:w-[54%] bg-surface-50" />
        }
      >
        <DesktopCarousel />
      </Suspense>

      <Suspense fallback={null}>
        <MobileCarousel />
      </Suspense>
    </div>
  );
}
