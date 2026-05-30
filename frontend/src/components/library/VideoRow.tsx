import { useState } from "react";
import type { SavedVideo } from "@/types/library";
import { Clock, Play, StickyNote, Trash2 } from "lucide-react";

const VideoRow = ({
  video,
  onOpen,
  onDelete,
}: {
  video: SavedVideo;
  onOpen: (v: SavedVideo) => void;
  onDelete: (id: string) => void;
}) => {
  const [imgErr, setImgErr] = useState(false);

  return (
    <div
      className="group flex items-center gap-3 sm:gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background =
          "rgba(2,174,2,0.04)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(2,174,2,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background =
          "rgba(255,255,255,0.02)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(255,255,255,0.05)";
      }}
      onClick={() => onOpen(video)}
    >
      <div className="relative shrink-0 w-28 sm:w-36 aspect-video rounded-lg overflow-hidden bg-black">
        {!imgErr ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "rgba(2,174,2,0.06)" }}
          >
            <Play size={18} style={{ color: "var(--color-primary-600)" }} />
          </div>
        )}

        <span
          className="absolute bottom-1 right-1 text-white text-[9px] font-mono px-1 py-0.5 rounded"
          style={{ background: "rgba(0,0,0,0.75)" }}
        >
          {video.duration}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p
          className="text-xs mb-0.5 truncate"
          style={{ color: "var(--color-primary-500)" }}
        >
          {video.channel}
        </p>
        <h3 className="text-white text-xs sm:text-sm font-medium leading-snug line-clamp-1 sm:line-clamp-2 font-display">
          {video.title}
        </h3>
        <div className="flex items-center gap-3 mt-1.5 flex-wrap">
          <span className="flex items-center gap-1 text-white/35 text-xs">
            <Clock size={9} />
            {video.lastWatched}
          </span>
          <span
            className="text-xs px-1.5 py-0.5 rounded-full hidden sm:inline-block"
            style={{
              background: "rgba(2,174,2,0.08)",
              border: "1px solid rgba(2,174,2,0.15)",
              color: "var(--color-primary-600)",
            }}
          >
            {video.category}
          </span>
        </div>
      </div>

      <span className="flex items-center gap-1 text-white/35 text-xs">
        <StickyNote size={9} />
        {video.notesCount} notes
      </span>

      {/* Delete */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(video.id);
        }}
        className="opacity-0 group-hover:opacity-100 shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
      >
        <Trash2 size={13} />
      </button>
    </div>
  );
};

export default VideoRow;
