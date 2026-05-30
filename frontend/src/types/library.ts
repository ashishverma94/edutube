export interface SavedVideo {
  id: string;
  youtubeId: string;
  title: string;
  channel: string;
  thumbnail: string;
  duration: string; // formatted e.g. "1:12:05"
  durationSec: number;
  notesCount: number;
  lastWatched: string; // relative e.g. "2 days ago"
  savedAt: string; // ISO date string
  progress: number; // 0–100
  category: string;
}