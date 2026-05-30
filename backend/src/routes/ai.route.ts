// routes/video.route.ts
import express from "express";
import { testDownloadAudio } from "../controllers/ai.controller.js";

const aiRouter = express.Router();

aiRouter.post("/summary", testDownloadAudio);

export default aiRouter;