import youtubedl from "youtube-dl-exec";
import ffmpegPath from "ffmpeg-static";
import * as fs from "fs";
import * as path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_OUTPUT_DIR = process.env.AUDIO_OUTPUT_DIR
  ? path.resolve(process.env.AUDIO_OUTPUT_DIR)
  : path.join(__dirname, "temp");

  
export interface AudioDownloadResult {
  audioPath: string;
  videoId: string;
  title: string;
  durationSeconds: number;
}

export async function downloadAudioFromVideoId(
  videoId: string
): Promise<AudioDownloadResult> {
  await fs.promises.mkdir(AUDIO_OUTPUT_DIR, { recursive: true });

  const outputPath = path.join(AUDIO_OUTPUT_DIR, `${videoId}.m4a`);

  const url = `https://www.youtube.com/watch?v=${videoId}`;

  // Fetch metadata first
  console.log(`🔍 Fetching metadata for: ${videoId}`);
  const meta = (await youtubedl(url, {
    dumpSingleJson: true,
    noWarnings: true,
    noPlaylist: true,
    ffmpegLocation: ffmpegPath as string,  // 👈 point to npm bundled ffmpeg
  })) as any;

  const title: string = meta.title ?? videoId;
  const durationSeconds: number = meta.duration ?? 0;
  console.log(`🎬 "${title}" — ${durationSeconds}s`);

  // Cache check after metadata
  if (fs.existsSync(outputPath)) {
    console.log(`⚡ Cache hit: ${outputPath}`);
    return { audioPath: outputPath, videoId, title, durationSeconds };
  }

  // Download audio
  console.log(`⬇️  Downloading audio...`);
  await youtubedl(url, {
    extractAudio: true,
    audioFormat: "m4a",
    audioQuality: 0,
    output: outputPath,
    noPlaylist: true,
    noWarnings: true,
    socketTimeout: 30,
    ffmpegLocation: ffmpegPath as string,  // 👈 same here
  });

  if (!fs.existsSync(outputPath)) {
    throw new Error(`File not found after download: ${outputPath}`);
  }

  const { size } = await fs.promises.stat(outputPath);
  console.log(`✅ Audio saved: ${outputPath} (${(size / 1024 / 1024).toFixed(2)} MB)`);

  return { audioPath: outputPath, videoId, title, durationSeconds };
}

export async function deleteAudioFile(audioPath: string): Promise<void> {
  await fs.promises.unlink(audioPath).catch(() => {});
  console.log(`🗑️  Deleted: ${audioPath}`);
}