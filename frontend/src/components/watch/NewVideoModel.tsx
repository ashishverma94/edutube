import { useState } from "react";
import { Button } from "../ui/button";
import { Link2, X } from "lucide-react";
import TextInput from "@/components/ui/input";

interface NewVideoModalProps {
  onClose: () => void;
  onLoad: (id: string) => void;
}

const extractYouTubeId = (input: string): string | null => {
  input = input.trim();
  if (/^[\w-]{11}$/.test(input)) return input;
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = input.match(p);
    if (m) return m[1];
  }
  return null;
};

const NewVideoModal = ({ onClose, onLoad }: NewVideoModalProps) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const id = extractYouTubeId(input);
    if (!id) {
      setError(
        "Couldn't find a valid YouTube video ID. Try pasting the full URL.",
      );
      return;
    }
    onLoad(id);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6"
        style={{
          background: "#0e0e0e",
          border: "1px solid rgba(2,174,2,0.25)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(2,174,2,0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(2,174,2,0.12)" }}
            >
              <Link2 size={15} style={{ color: "var(--color-primary-400)" }} />
            </div>
            <div>
              <h3
                className="font-display text-sm font-600 text-white"
                style={{ fontWeight: 600 }}
              >
                Load New Video
              </h3>
              <p className="text-white/35 text-xs">
                Paste a YouTube URL or video ID
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/8 transition-all"
          >
            <X size={14} />
          </button>
        </div>

        {/* Input */}
        <div className="flex flex-col gap-3">
          <TextInput
            inputValue={input}
            onChange={(e) => {
              setInput(e.target.value);
              setError("");
            }}
            onEnterPress={handleKeyDown}
            placeholder="https://youtube.com/watch?v=… or dQw4w9WgXcQ"
            className=" text-sm rounded-xl  border-white/40 bg-white/4 text-white placeholder:text-white/25 focus:border-primary-500"
          />
          {error && (
            <p className="text-red-400/80 text-xs flex items-center gap-1.5">
              <X size={10} /> {error}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <p className="text-white/20 text-xs">Examples:</p>
            {[
              "https://youtube.com/watch?v=kCc8FmEb1nY",
              "youtu.be/aircAruvnKk",
              "HtSuA80QTyo",
            ].map((ex) => (
              <button
                key={ex}
                onClick={() => setInput(ex)}
                className="text-left text-xs px-3 py-1.5 rounded-lg transition-all truncate"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "monospace",
                }}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-5">
          <Button
            onClick={onClose}
            className="flex-1 h-9! w-1/2 text-xs md:text-sm! text-white hover:text-white hover:bg-primary-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!input.trim()}
            className="flex-1 h-9 w-1/2 text-xs md:text-sm! font-semibold text-black disabled:opacity-60"
            style={{ background: "var(--color-primary-500)" }}
          >
            Load Video
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewVideoModal
