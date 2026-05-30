import { Request, Response } from "express";
import { downloadAudioFromVideoId } from "../services/ai.service";

export const testDownloadAudio = async (req: Request, res: Response) => {
  try {
    const { videoId } = req.body;

    if (!videoId) {
      return res.status(400).json({ error: "videoId is required" });
    }

    console.log("🎬 Received videoId:", videoId);

    // ── Call service ──
    const audioPath = await downloadAudioFromVideoId(videoId);

    console.log("📁 Audio saved at:", audioPath);

    // ── Response (temporary for debugging) ──
    return res.json({
      message: "Audio downloaded successfully",
      audioPath,
    });

  } catch (error) {
    console.error("❌ Controller error:", error);
    return res.status(500).json({
      error: "Failed to download audio",
    });
  }
};

// await downloadAudioFromVideoId("Bdxoe4Y2IdA");
