import { cn } from "@/lib/utils";
import { useState } from "react";
import TextInput from "@/components/ui/input";
import type { SavedVideo } from "@/types/library";
import VideoRow from "@/components/library/VideoRow";
import VideoCard from "@/components/library/VideoCard";
import EmptyState from "@/components/library/EmptyState";
import { Search, LayoutGrid, List, ChevronDown, Filter } from "lucide-react";

const DUMMY_VIDEOS: SavedVideo[] = [
  {
    id: "1",
    youtubeId: "HtSuA80QTyo",
    title: "Introduction to Algorithms — Lecture 1: Algorithmic Thinking",
    channel: "MIT OpenCourseWare",
    thumbnail: "https://img.youtube.com/vi/HtSuA80QTyo/maxresdefault.jpg",
    duration: "1:22:34",
    durationSec: 4954,
    notesCount: 14,
    lastWatched: "2 hours ago",
    savedAt: "2025-06-10",
    progress: 68,
    category: "Computer Science",
  },
  {
    id: "2",
    youtubeId: "aircAruvnKk",
    title: "But what is a neural network? | Deep Learning, Chapter 1",
    channel: "3Blue1Brown",
    thumbnail: "https://img.youtube.com/vi/aircAruvnKk/maxresdefault.jpg",
    duration: "19:13",
    durationSec: 1153,
    notesCount: 9,
    lastWatched: "Yesterday",
    savedAt: "2025-06-09",
    progress: 100,
    category: "Machine Learning",
  },
  {
    id: "3",
    youtubeId: "kCc8FmEb1nY",
    title: "Let's build GPT: from scratch, in code, spelled out",
    channel: "Andrej Karpathy",
    thumbnail: "https://img.youtube.com/vi/kCc8FmEb1nY/maxresdefault.jpg",
    duration: "1:56:20",
    durationSec: 6980,
    notesCount: 22,
    lastWatched: "3 days ago",
    savedAt: "2025-06-07",
    progress: 41,
    category: "Machine Learning",
  },
  {
    id: "4",
    youtubeId: "8jLOx1hD3_o",
    title: "Harvard CS50 — Full Computer Science University Course",
    channel: "freeCodeCamp.org",
    thumbnail: "https://img.youtube.com/vi/8jLOx1hD3_o/maxresdefault.jpg",
    duration: "25:46:45",
    durationSec: 92805,
    notesCount: 37,
    lastWatched: "5 days ago",
    savedAt: "2025-06-05",
    progress: 22,
    category: "Computer Science",
  },
  {
    id: "5",
    youtubeId: "rfscVS0vtbw",
    title: "Learn SQL In 60 Minutes",
    channel: "Web Dev Simplified",
    thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg",
    duration: "57:32",
    durationSec: 3452,
    notesCount: 6,
    lastWatched: "1 week ago",
    savedAt: "2025-06-02",
    progress: 100,
    category: "Databases",
  },
  {
    id: "6",
    youtubeId: "RBSGKlAvoiM",
    title: "Data Structures Easy to Advanced Course — Full Tutorial",
    channel: "freeCodeCamp.org",
    thumbnail: "https://img.youtube.com/vi/RBSGKlAvoiM/maxresdefault.jpg",
    duration: "8:02:17",
    durationSec: 28937,
    notesCount: 18,
    lastWatched: "2 weeks ago",
    savedAt: "2025-05-28",
    progress: 55,
    category: "Computer Science",
  },
];

const SORT_OPTIONS = ["Last Watched", "Most Notes", "Date Saved", "Progress"];

export default function VideoLibrary() {
  const [videos, setVideos] = useState<SavedVideo[]>(DUMMY_VIDEOS);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Last Watched");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showSort, setShowSort] = useState(false);

  const filtered = videos
    .filter((v) => {
      const matchQ =
        !query ||
        v.title.toLowerCase().includes(query.toLowerCase()) ||
        v.channel.toLowerCase().includes(query.toLowerCase());
      const matchC = activeCategory === "All" || v.category === activeCategory;
      return matchQ && matchC;
    })
    .sort((a, b) => {
      if (sortBy === "Most Notes") return b.notesCount - a.notesCount;
      if (sortBy === "Progress") return b.progress - a.progress;
      if (sortBy === "Date Saved")
        return new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime();
      return 0;
    });

  const handleDelete = (id: string) =>
    setVideos((prev) => prev.filter((v) => v.id !== id));

  const handleOpen = (v: SavedVideo) => {
    console.log("Open video:", v.id);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl mx-auto text-surface-100">
      <div className="flex flex-col gap-4 mb-6">
        <div>
          <h1
            className="font-display leading-tight text-xl sm:text-2xl lg:text-3xl"
            style={{ fontWeight: 700 }}
          >
            My Library
          </h1>
          <p className="text-white/35 text-xs sm:text-sm mt-0.5">
            Your saved videos and study notes
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
          <div className="relative flex-1 sm:max-w-xs lg:max-w-sm">
            <TextInput
              inputValue={query}
              onChange={(val) => setQuery(val)}
              placeholder="Search videos or channels…"
              Icon={<Search size={18} className="text-white/40" />}
              position="left"
              className="w-full [&_input]:bg-black [&_input]:border-2 [&_input]:border-primary-700 [&_input]:rounded-xl [&_input]:text-white [&_input]:h-12 [&_input]:text-sm"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white text-xs transition-colors z-10"
              >
                ✕
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:ml-auto">
            <div className="flex items-center rounded-lg p-0.5 gap-0.5 bg-[rgba(255,255,255,0.05)]">
              {(["grid", "list"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setViewMode(m)}
                  className={cn(
                    "w-7 h-7 rounded-md flex items-center justify-center transition-all",
                    viewMode === m
                      ? "text-black"
                      : "text-white/35 hover:text-white/60",
                  )}
                  style={
                    viewMode === m
                      ? { background: "var(--color-primary-500)" }
                      : {}
                  }
                >
                  {m === "grid" ? <LayoutGrid size={13} /> : <List size={13} />}
                </button>
              ))}
            </div>

            <div className="relative">
              <button
                onClick={() => setShowSort((p) => !p)}
                className="flex items-center bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.07)] gap-1.5 px-3 py-1.5 rounded-lg text-xs text-white/50 hover:text-white transition-all"
              >
                <Filter size={11} />
                <span className="hidden xs:inline">{sortBy}</span>
                <span className="xs:hidden">Sort</span>
                <ChevronDown
                  size={11}
                  className={cn(
                    "transition-transform",
                    showSort && "rotate-180",
                  )}
                />
              </button>
              {showSort && (
                <div
                  className="absolute right-0 top-full mt-1.5 w-40 rounded-xl py-1 z-50"
                  style={{
                    background: "#111",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.6)",
                  }}
                >
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setShowSort(false);
                      }}
                      className="w-full text-left px-3 py-2 text-xs transition-all"
                      style={{
                        color:
                          sortBy === opt
                            ? "var(--color-primary-400)"
                            : "rgba(255,255,255,0.5)",
                        background:
                          sortBy === opt ? "rgba(2,174,2,0.08)" : "transparent",
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState query={query} />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((v) => (
            <VideoCard
              key={v.id}
              video={v}
              onOpen={handleOpen}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filtered.map((v) => (
            <VideoRow
              key={v.id}
              video={v}
              onOpen={handleOpen}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
