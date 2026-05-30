import type { VideoMeta } from "@/types/watch";
import { ChevronDown, ChevronUp, StickyNote } from "lucide-react";
import { useState } from "react";

interface VideoPanelProps {
  video: VideoMeta;
  notesCount: number;
}

const VideoPanel = ({ video, notesCount }: VideoPanelProps) => {
  const [descExpanded, setDescExpanded] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div
        className="relative w-full rounded-xl overflow-hidden"
        style={{ aspectRatio: "16/9", background: "#000" }}
      >
        <iframe
          key={video.id}
          src={`https://www.youtube.com/embed/${video.id}?enablejsapi=1&modestbranding=1&rel=0&color=white`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          style={{ border: "none" }}
        />
      </div>

      <div
        className="rounded-xl p-4"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-2 flex-wrap">
          <div className="flex-1 min-w-0">
            <h2
              className="font-display text-sm sm:text-base font-600 text-white leading-snug line-clamp-2"
              style={{ fontWeight: 600 }}
            >
              {video.title}
            </h2>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-primary-500)" }}
            >
              {video.channel}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span
              className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg"
              style={{
                background: "rgba(2,174,2,0.08)",
                border: "1px solid rgba(2,174,2,0.15)",
                color: "var(--color-primary-400)",
              }}
            >
              <StickyNote size={10} />
              {notesCount} notes
            </span>
            <span className="text-white/25 text-xs">{video.publishedAt}</span>
          </div>
        </div>

        <div>
          <p
            className="text-white/40 text-xs leading-relaxed"
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: descExpanded ? 999 : 2,
              overflow: "hidden",
            }}
          >
            {video.description}
          </p>
          <button
            onClick={() => setDescExpanded((p) => !p)}
            className="flex items-center gap-1 mt-1.5 text-xs transition-colors hover:text-white/60"
            style={{ color: "var(--color-primary-600)" }}
          >
            {descExpanded ? (
              <>
                <ChevronUp size={11} /> Show less
              </>
            ) : (
              <>
                <ChevronDown size={11} /> Show more
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPanel