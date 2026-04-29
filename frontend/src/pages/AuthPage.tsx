import {
  Tv2,
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
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GoogleIcon from "@/assets/icons/google.svg?react";
import MobileCarousel from "@/components/auth/MobileCarousel";
import DesktopCarousel from "@/components/auth/DesktopCarousel";

type Step = "email" | "otp" | "success";

export default function AuthPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendSecs, setResendSecs] = useState(0);

  // Resend timer
  useEffect(() => {
    if (resendSecs <= 0) return;
    const t = setInterval(() => setResendSecs((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendSecs]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    }
    setEmailError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setStep("otp");
    setResendSecs(60);
  };

  const handleOtpComplete = async (otp: string) => {
    console.log("OTP:", otp); // use it for API later

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);

    sessionStorage.setItem("wp_username", email.split("@")[0]);
    setStep("success");
    setTimeout(() => navigate("/"), 1600);
  };

  const handleGoogle = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    sessionStorage.setItem("wp_username", "GoogleUser");
    navigate("/");
  };

  return (
    <div className="h-screen overflow-hidden flex flex-col lg:flex-row font-body">
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary-500 flex items-center justify-center shadow-[0_4px_12px_rgba(2,174,2,0.35)]">
              <Tv2 className="w-4 h-4 text-white" />
            </div>
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
                  <h1 className="font-display font-black text-[2.25rem] leading-tight text-gray-900 mb-3">
                    Sign in to
                    <br />
                    <span className="text-primary-500">WatchParty</span>
                  </h1>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    New here? We'll create your account automatically. No
                    passwords, ever.
                  </p>
                </div>

                {/* Google button */}
                <button
                  onClick={handleGoogle}
                  disabled={loading}
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
                <form onSubmit={handleEmailSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-display font-bold text-gray-500 uppercase tracking-wider mb-2">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError("");
                        }}
                        placeholder="you@example.com"
                        autoFocus
                        className={cn(
                          "w-full h-13 pl-11 pr-4 rounded-2xl border-2 outline-none transition-all text-sm bg-surface-50 text-gray-900 placeholder:text-gray-400",
                          emailError
                            ? "border-red-300 bg-red-50/50 focus:border-red-400 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.08)]"
                            : "border-surface-200 focus:border-primary-400 focus:bg-white focus:shadow-[0_0_0_4px_rgba(2,174,2,0.08)]",
                        )}
                      />
                    </div>
                    {emailError && (
                      <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-red-500 inline-block shrink-0" />
                        {emailError}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !email}
                    className={cn(
                      "w-full h-13 rounded-2xl font-display font-bold text-sm text-white transition-all flex items-center justify-center gap-2",
                      "bg-primary-500 hover:bg-primary-600 active:scale-[0.99]",
                      "shadow-[0_4px_20px_rgba(2,174,2,0.35)] hover:shadow-[0_6px_28px_rgba(2,174,2,0.45)]",
                      "disabled:opacity-50 disabled:shadow-none disabled:cursor-not-allowed",
                    )}
                  >
                    {loading ? (
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

                <div className="w-14 h-14 rounded-2xl bg-primary-50 border-2 border-primary-100 flex items-center justify-center mb-6 shadow-[0_4px_16px_rgba(2,174,2,0.12)]">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>

                <h1 className="font-display font-black text-[2rem] leading-tight text-gray-900 mb-2">
                  Check your inbox
                </h1>
                <p className="text-sm text-gray-500 mb-1">
                  We sent a 6-digit code to
                </p>
                <p className="font-display font-bold text-gray-900 text-sm mb-8">
                  {email}
                </p>

                <InputOTP
                  maxLength={6}
                  disabled={loading}
                  onComplete={(value) => handleOtpComplete(value)}
                  className="w-full"
                >
                  <InputOTPGroup className="w-full flex justify-between gap-2.5">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot
                        key={i}
                        index={i}
                        className="flex-1 h-14 rounded-xl border-2 text-center text-2xl font-mono font-black border-surface-300 bg-surface-100 text-gray-900 data-[active=true]:border-primary-500 data-[active=true]:bg-primary-100 data-[active=true]:shadow-[0_0_0_4px_rgba(2,174,2,0.08)]"
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
                {loading && (
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

      <DesktopCarousel />
      <MobileCarousel />
    </div>
  );
}
