// ─── Socket Events ───────────────────────────────────────────────────────────

export type MessageType = "chat" | "system";

export interface ChatMessage {
  type: MessageType;
  username?: string;
  text: string;
  timestamp: number;
}

export interface VideoState {
  videoId: string | null;
  playing: boolean;
  currentTime: number;
  updatedAt: number;
}

export interface RoomState {
  users: string[];
  videoState: VideoState;
  messages: ChatMessage[];
}

// ─── Socket Emit Payloads ─────────────────────────────────────────────────────

export interface JoinRoomPayload {
  roomCode: string;
  username: string;
}

export interface SendMessagePayload {
  roomCode: string;
  username: string;
  text: string;
}

export interface VideoStateChangePayload {
  roomCode: string;
  playing: boolean;
  currentTime: number;
  videoId?: string;
}

export interface VideoSeekPayload {
  roomCode: string;
  currentTime: number;
}

export interface ChangeVideoPayload {
  roomCode: string;
  videoId: string;
}

// ─── API Models ───────────────────────────────────────────────────────────────

export interface Room {
  id: string;
  code: string;
  videoId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Note {
  id: string;
  roomId: string;
  videoId: string;
  username: string;
  content: string;
  timestamp: number;
  createdAt: string;
  updatedAt: string;
}

// ─── YouTube IFrame API types ─────────────────────────────────────────────────

export interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  getVolume: () => number;
  setVolume: (volume: number) => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  loadVideoById: (videoId: string) => void;
  destroy: () => void;
}

export interface YTPlayerEvent {
  target: YTPlayer;
  data: number;
}

export interface YTPlayerOptions {
  videoId: string;
  height?: string | number;
  width?: string | number;
  playerVars?: Record<string, unknown>;
  events?: {
    onReady?: (e: YTPlayerEvent) => void;
    onStateChange?: (e: YTPlayerEvent) => void;
  };
}

declare global {
  interface Window {
    YT: {
      Player: new (el: HTMLElement | string, opts: YTPlayerOptions) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        ENDED: number;
        UNSTARTED: number;
        CUED: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

export interface YouTubeVideoMeta {
  videoId: string;
  title: string;
  channel: string;
  channelId: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  viewCount: string;
  likeCount: string;
  duration: string; // ISO 8601 e.g. PT3M47S
  tags: string[];
}