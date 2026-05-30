import {
  useEffect,
  useRef,
  useCallback,
  useState,
  type MutableRefObject,
} from "react";
import type { YTPlayer, YTPlayerEvent } from "@/types";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Volume1,
  Maximize,
  Minimize,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── YT API Loader ────────────────────────────────────────────────────────────

let apiLoading = false;
const readyCallbacks: Array<() => void> = [];

function loadYTApi(onReady: () => void) {
  if (window.YT?.Player) { onReady(); return; }
  readyCallbacks.push(onReady);
  if (!apiLoading) {
    apiLoading = true;
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
    window.onYouTubeIframeAPIReady = () => {
      readyCallbacks.forEach((cb) => cb());
      readyCallbacks.length = 0;
    };
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtTime(sec: number): string {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Seek Bar ─────────────────────────────────────────────────────────────────

interface SeekBarProps {
  current: number;
  duration: number;
  buffered: number;
  onSeek: (pct: number) => void;
}

function SeekBar({ current, duration, buffered, onSeek }: SeekBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const [hoverPct, setHoverPct] = useState<number | null>(null);

  const pctFromEvent = (e: MouseEvent | React.MouseEvent) => {
    const rect = trackRef.current!.getBoundingClientRect();
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
    onSeek(pctFromEvent(e));
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => onSeek(pctFromEvent(e));
    const onUp = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragging, onSeek]);

  const playedPct = duration > 0 ? (current / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <div
      ref={trackRef}
      className="relative w-full h-1 group/seek cursor-pointer"
      onMouseDown={handleMouseDown}
      onMouseMove={(e) => {
        const rect = trackRef.current!.getBoundingClientRect();
        setHoverPct(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)));
      }}
      onMouseLeave={() => setHoverPct(null)}
    >
      {/* Track */}
      <div className="absolute inset-0 rounded-full bg-white/20 group-hover/seek:h-1.5 transition-all duration-150 -translate-y-0 group-hover/seek:-translate-y-px" />

      {/* Buffered */}
      <div
        className="absolute top-0 left-0 h-full rounded-full bg-white/35 transition-all duration-150 group-hover/seek:h-1.5 group-hover/seek:-translate-y-px"
        style={{ width: `${bufferedPct}%` }}
      />

      {/* Played */}
      <div
        className="absolute top-0 left-0 h-full rounded-full bg-primary-400 transition-all duration-75 group-hover/seek:h-1.5 group-hover/seek:-translate-y-px"
        style={{ width: `${playedPct}%` }}
      />

      {/* Hover preview time */}
      {hoverPct !== null && (
        <div
          className="absolute -top-8 -translate-x-1/2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded pointer-events-none"
          style={{ left: `${hoverPct * 100}%` }}
        >
          {fmtTime(hoverPct * duration)}
        </div>
      )}

      {/* Thumb */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-md opacity-0 group-hover/seek:opacity-100 transition-opacity pointer-events-none"
        style={{ left: `${playedPct}%` }}
      />
    </div>
  );
}

// ─── Volume Control ───────────────────────────────────────────────────────────

interface VolumeControlProps {
  volume: number;      // 0–100
  muted: boolean;
  onVolumeChange: (v: number) => void;
  onMuteToggle: () => void;
}

function VolumeControl({ volume, muted, onVolumeChange, onMuteToggle }: VolumeControlProps) {
  const [expanded, setExpanded] = useState(false);

  const VolumeIcon = muted || volume === 0 ? VolumeX : volume < 50 ? Volume1 : Volume2;

  return (
    <div
      className="flex items-center gap-1 group/vol"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <button
        onClick={onMuteToggle}
        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
      >
        <VolumeIcon className="w-4 h-4 text-white" />
      </button>

      {/* Sliding volume bar */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-200 flex items-center",
          expanded ? "w-20 opacity-100" : "w-0 opacity-0"
        )}
      >
        <input
          type="range"
          min={0}
          max={100}
          value={muted ? 0 : volume}
          onChange={(e) => onVolumeChange(Number(e.target.value))}
          className="w-full h-1 appearance-none bg-white/20 rounded-full cursor-pointer accent-primary-400"
        />
      </div>

      {/* Volume % label */}
      {expanded && (
        <span className="text-[10px] text-white/60 font-mono w-7 shrink-0">
          {muted ? "0" : volume}%
        </span>
      )}
    </div>
  );
}

// ─── Props ────────────────────────────────────────────────────────────────────

interface YouTubePlayerProps {
  videoId: string;
  playerRef: MutableRefObject<YTPlayer | null>;
  suppressRef: MutableRefObject<boolean>;
  onStateChange?: (playing: boolean, currentTime: number) => void;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function YouTubePlayer({
  videoId,
  playerRef,
  suppressRef,
  onStateChange,
}: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const controlsHideRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Keep onStateChange in a ref so changing it never re-creates the player
  const onStateChangeRef = useRef(onStateChange);
  useEffect(() => { onStateChangeRef.current = onStateChange; }, [onStateChange]);

  // Track whether player has been initialized
  const playerInitialized = useRef(false);

  // ── UI state ────────────────────────────────────────────────────────────────
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [ended, setEnded] = useState(false);

  // ── Tick: poll currentTime every 500ms ──────────────────────────────────────
  const startTick = useCallback(() => {
    if (tickRef.current) return;
    tickRef.current = setInterval(() => {
      const p = playerRef.current;
      if (!p) return;
      try {
        setCurrentTime(p.getCurrentTime());
        setDuration(p.getDuration());
      } catch { /* player not ready */ }
    }, 500);
  }, [playerRef]);

  const stopTick = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  // ── Auto-hide controls ───────────────────────────────────────────────────────
  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsHideRef.current) clearTimeout(controlsHideRef.current);
    controlsHideRef.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 2800);
  }, [playing]);

  // ── Create YT player — runs ONCE when API is ready ──────────────────────────
  const createPlayer = useCallback(() => {
    if (!containerRef.current || !videoId) return;
    if (playerInitialized.current) {
      // API fired again (e.g. hot reload) but player already exists
      return;
    }

    playerInitialized.current = true;

    playerRef.current = new window.YT.Player(containerRef.current, {
      videoId,
      height: "100%",
      width: "100%",
      playerVars: {
        controls: 0,
        disablekb: 1,
        rel: 0,
        modestbranding: 1,
        iv_load_policy: 3,
        playsinline: 1,
        cc_load_policy: 0,
        fs: 0,
        showinfo: 0,
      },
      events: {
        onReady: () => {
          const p = playerRef.current!;
          // Read volume from state via ref to avoid stale closure
          p.setVolume(80);
          setDuration(p.getDuration());
        },
        onStateChange: (e: YTPlayerEvent) => {
          const state = e.data;
          const YTS = window.YT.PlayerState;

          if (state === YTS.PLAYING) {
            setPlaying(true);
            setEnded(false);
            startTick();
            if (!suppressRef.current) {
              onStateChangeRef.current?.(true, playerRef.current?.getCurrentTime() ?? 0);
            }
          }
          if (state === YTS.PAUSED) {
            setPlaying(false);
            stopTick();
            setCurrentTime(playerRef.current?.getCurrentTime() ?? 0);
            if (!suppressRef.current) {
              onStateChangeRef.current?.(false, playerRef.current?.getCurrentTime() ?? 0);
            }
          }
          if (state === YTS.BUFFERING) {
            startTick();
          }
          if (state === YTS.ENDED) {
            setPlaying(false);
            setEnded(true);
            stopTick();
          }
        },
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // ← intentionally empty: player is created once, never re-created

  // ── Init: load YT API once on mount ─────────────────────────────────────────
  useEffect(() => {
    loadYTApi(createPlayer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── React to videoId changes after player is ready ───────────────────────────
  useEffect(() => {
    if (!playerRef.current || !playerInitialized.current) return;
    playerRef.current.loadVideoById(videoId);
    setEnded(false);
    setCurrentTime(0);
    setPlaying(false);
  }, [videoId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cleanup
  useEffect(() => {
    return () => {
      stopTick();
      if (controlsHideRef.current) clearTimeout(controlsHideRef.current);
    };
  }, [stopTick]);

  // Fullscreen change listener
  useEffect(() => {
    const handler = () => setFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  // ── Controls ─────────────────────────────────────────────────────────────────

  const togglePlay = () => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.pauseVideo();
    else p.playVideo();
  };

  const handleSeek = useCallback((pct: number) => {
    const p = playerRef.current;
    if (!p || !duration) return;
    const t = pct * duration;
    suppressRef.current = true;
    p.seekTo(t, true);
    setCurrentTime(t);
    onStateChange?.(playing, t);
    setTimeout(() => { suppressRef.current = false; }, 400);
  }, [playerRef, duration, suppressRef, playing, onStateChange]);

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    playerRef.current?.setVolume(v);
    if (v > 0 && muted) {
      setMuted(false);
      playerRef.current?.unMute();
    }
  };

  const handleMuteToggle = () => {
    const p = playerRef.current;
    if (!p) return;
    if (muted) { p.unMute(); setMuted(false); }
    else { p.mute(); setMuted(true); }
  };

  const handleFullscreen = () => {
    if (!wrapperRef.current) return;
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const handleRestart = () => {
    const p = playerRef.current;
    if (!p) return;
    p.seekTo(0, true);
    p.playVideo();
    setEnded(false);
  };

  // ── Keyboard shortcuts ───────────────────────────────────────────────────────
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Only when focused inside the player
      if (!wrapperRef.current?.contains(document.activeElement) &&
          document.activeElement?.tagName !== "BODY") return;

      if (e.code === "Space") { e.preventDefault(); togglePlay(); }
      if (e.code === "ArrowRight") { e.preventDefault(); handleSeek(Math.min(1, (currentTime + 10) / duration)); }
      if (e.code === "ArrowLeft") { e.preventDefault(); handleSeek(Math.max(0, (currentTime - 10) / duration)); }
      if (e.code === "KeyM") handleMuteToggle();
      if (e.code === "KeyF") handleFullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, currentTime, duration, muted]);

  const playedPct = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={wrapperRef}
      className={cn(
        "relative w-full h-full bg-black rounded-2xl overflow-hidden group/player select-none",
        fullscreen && "rounded-none"
      )}
      onMouseMove={resetControlsTimer}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => playing && setShowControls(false)}
      onClick={togglePlay}
      tabIndex={0}
      style={{ cursor: showControls ? "default" : "none" }}
    >
      {/* ── YT iframe (no UI) ── */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* ── Blocking overlay: covers the iframe when paused/ended so YouTube's
             own pause screen, recommendations, and logo never show through ── */}
      {(!playing || ended) && (
        <div className="absolute inset-0 z-10 pointer-events-none bg-black/5" />
      )}

      {/* ── Ended overlay ── */}
      {ended && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-20">
          <button
            onClick={(e) => { e.stopPropagation(); handleRestart(); }}
            className="flex flex-col items-center gap-3 group/restart"
          >
            <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center shadow-green-lg group-hover/restart:scale-110 transition-transform">
              <RotateCcw className="w-7 h-7 text-white" />
            </div>
            <span className="text-white text-sm font-display font-semibold">Watch again</span>
          </button>
        </div>
      )}

      {/* ── Paused centre play button — visible any time video is paused ── */}
      {!playing && !ended && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-primary-500/90 flex items-center justify-center shadow-green-lg">
            <Play className="w-9 h-9 text-white fill-white ml-1" />
          </div>
        </div>
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "absolute bottom-0 left-0 right-0 z-30 transition-all duration-300",
          showControls || !playing
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        )}
      >
        {/* Gradient fade */}
        <div className="h-24 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

        {/* Control bar */}
        <div className="bg-black/60 backdrop-blur-sm px-4 pb-3 pt-1 flex flex-col gap-2">

          {/* ── Seek bar ── */}
          <SeekBar
            current={currentTime}
            duration={duration}
            buffered={buffered}
            onSeek={handleSeek}
          />

          {/* ── Buttons row ── */}
          <div className="flex items-center gap-1">

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
              title={playing ? "Pause (Space)" : "Play (Space)"}
            >
              {playing ? (
                <Pause className="w-5 h-5 text-white fill-white" />
              ) : (
                <Play className="w-5 h-5 text-white fill-white" />
              )}
            </button>

            {/* Volume */}
            <VolumeControl
              volume={volume}
              muted={muted}
              onVolumeChange={handleVolumeChange}
              onMuteToggle={handleMuteToggle}
            />

            {/* Time */}
            <div className="flex items-center gap-1 ml-1">
              <span className="text-white text-xs font-mono tabular-nums">
                {fmtTime(currentTime)}
              </span>
              <span className="text-white/40 text-xs">/</span>
              <span className="text-white/60 text-xs font-mono tabular-nums">
                {fmtTime(duration)}
              </span>
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Keyboard hint */}
            <div className="hidden lg:flex items-center gap-2 mr-2">
              {[
                { key: "Space", label: "Play" },
                { key: "← →", label: "±10s" },
                { key: "M", label: "Mute" },
                { key: "F", label: "Full" },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center gap-1">
                  <kbd className="bg-white/10 text-white/50 text-[9px] font-mono px-1.5 py-0.5 rounded">
                    {key}
                  </kbd>
                  <span className="text-white/30 text-[9px]">{label}</span>
                </div>
              ))}
            </div>

            {/* Fullscreen */}
            <button
              onClick={handleFullscreen}
              className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-white/10 transition-colors"
              title="Fullscreen (F)"
            >
              {fullscreen ? (
                <Minimize className="w-4 h-4 text-white" />
              ) : (
                <Maximize className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}