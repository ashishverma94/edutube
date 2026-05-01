import "dotenv/config";

function requireEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required environment variable: ${key}`);
  return val;
}

function optionalEnv(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

export const config = {
  port: parseInt(optionalEnv("PORT", "3001"), 10),
  nodeEnv: optionalEnv("NODE_ENV", "development"),
  isDev: optionalEnv("NODE_ENV", "development") === "development",

  database: {
    url: requireEnv("DATABASE_URL"),
  },

  cors: {
    origin: optionalEnv("FRONTEND_URL", "http://localhost:5173"),
  },

  youtube: {
    apiKey: process.env["YOUTUBE_API_KEY"] ?? null,
    apiBaseUrl: "https://www.googleapis.com/youtube/v3",
  },
} as const;