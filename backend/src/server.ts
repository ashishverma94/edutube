import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { config } from "./config/index.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requestLogger, printBanner } from "./middleware/logger.js";
import authRoutes from "./routes/auth.route.js";
import passport from "passport";
import { downloadAudioFromVideoId } from "./services/ai.service.js";
import aiRouter from "./routes/ai.route.js";


// ─── App setup ────────────────────────────────────────────────────────────────

const app = express();
const server = http.createServer(app);

// ─── Middleware ───────────────────────────────────────────────────────────────

// app.use(cors({ origin: config.cors.origin }));
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(requestLogger);
app.use(passport.initialize());

// ─── Routes ───────────────────────────────────────────────────────────────────

app.get("/health", (_req, res) => res.json({ ok: true, env: config.nodeEnv }));
app.use("/api/auth", authRoutes);
app.use("/api/ai",aiRouter)


// ─── Error handler (must be last) ────────────────────────────────────────────

app.use(errorHandler);

// ─── Start ────────────────────────────────────────────────────────────────────

server.listen(config.port, () => {
  printBanner(config.port, config.nodeEnv);
});