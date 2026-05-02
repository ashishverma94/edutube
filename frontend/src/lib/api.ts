const API_BASE = import.meta.env.VITE_BACKEND_URL ;

export const authApi = {
  sendOtp: async (email: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }); 
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message ?? "Failed to send OTP");
    }
  },

  verifyOtp: async (email: string, otp: string): Promise<void> => {
    const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message ?? "Invalid OTP");
    }
  },
};