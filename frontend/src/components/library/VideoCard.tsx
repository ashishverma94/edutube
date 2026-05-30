import { useState } from "react";
import type { SavedVideo } from "@/types/library";
import { Clock, Play, StickyNote, Trash2 } from "lucide-react";

const VideoCard = ({
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
      className="group relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 0 0 0 rgba(2,174,2,0)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 12px 32px rgba(2,174,2,0.12)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(2,174,2,0.22)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 0 0 0 rgba(2,174,2,0)";
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(255,255,255,0.06)";
      }}
      onClick={() => onOpen(video)}
    >
      <div className="relative w-full aspect-video bg-black overflow-hidden">
        {!imgErr ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "rgba(2,174,2,0.06)" }}
          >
            <Play size={28} style={{ color: "var(--color-primary-600)" }} />
          </div>
        )}

        {/* Duration badge */}
        <span
          className="absolute bottom-2 right-2 text-white text-xs font-mono px-1.5 py-0.5 rounded"
          style={{
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(4px)",
          }}
        >
          {video.duration}
        </span>

        <div className="absolute bg-[rgba(0,0,0,0.4)] inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-primary-500">
            <Play size={18} className="text-black ml-0.5 fill-black" />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <p
          className="text-xs mb-1 truncate"
          style={{ color: "var(--color-primary-500)" }}
        >
          {video.channel}
        </p>
        <h3 className="text-white text-xs sm:text-sm font-medium leading-snug line-clamp-2 mb-3 font-display">
          {video.title}
        </h3>

        {/* Meta row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-white/35 text-xs">
              <StickyNote size={10} />
              {video.notesCount} notes
            </span>
            <span className="flex items-center gap-1 text-white/35 text-xs">
              <Clock size={10} />
              {video.lastWatched}
            </span>
          </div>

          {/* Delete */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(video.id);
            }}
            className="opacity-0 group-hover:opacity-100 w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
