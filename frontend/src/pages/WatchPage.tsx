import { useState } from "react";
import { fmtTime } from "@/lib/utils";
import type { Note } from "@/types/watch";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/common/Navbar";
import NotesList from "@/components/watch/NotesList";
import NoteEditor from "@/components/watch/NoteEditor";
import VideoPanel from "@/components/watch/VideoPanel";
import { Plus, Pencil, StickyNote, X } from "lucide-react";
import NewVideoModal from "@/components/watch/NewVideoModel";

interface VideoMeta {
  id: string;
  title: string;
  channel: string;
  description: string;
  publishedAt: string;
}

const SEED_VIDEO: VideoMeta = {
  id: "kCc8FmEb1nY",
  title: "Let's build GPT: from scratch, in code, spelled out",
  channel: "Andrej Karpathy",
  description:
    "We build a Generatively Pretrained Transformer (GPT), following the paper \"Attention is All You Need\" and OpenAI's GPT-2 / GPT-3. We talk about connections to ChatGPT, which has taken the world by storm. We watch GitHub Copilot, itself a GPT, help us write a GPT (meta!). I recommend people watch the earlier makemore series first, if they haven't already, because we assume some level of familiarity with language modeling. Topics covered: bigram language model, attention mechanism, transformer, residual connections, layer norm, dropout, and more.",
  publishedAt: "Mar 22, 2023",
};

const SEED_NOTES: Note[] = [
  {
    id: "n1",
    timestamp: 134,
    timestampLabel: "02:14",
    html: '<span style="font-weight:700">Bigram language model</span> — simplest approach, predicts next character based only on the previous one.',
    createdAt: "2025-06-10T10:12:00",
    updatedAt: "2025-06-10T10:12:00",
  },
  {
    id: "n2",
    timestamp: 525,
    timestampLabel: "08:45",
    html: '<span style="color:#3df53d">Self-attention</span> is the core mechanism — each token attends to all previous tokens to compute a weighted average.',
    createdAt: "2025-06-10T10:30:00",
    updatedAt: "2025-06-10T10:35:00",
  },
  {
    id: "n3",
    timestamp: 930,
    timestampLabel: "15:30",
    html: '<span style="text-decoration:underline">Residual connections</span> — add the input to the output of each sub-layer. Helps with <span style="font-style:italic">gradient flow</span> in deep networks.',
    createdAt: "2025-06-10T11:00:00",
    updatedAt: "2025-06-10T11:00:00",
  },
];

const uid = () => Math.random().toString(36).slice(2, 10);
const now = () => new Date().toISOString();

export default function WatchPage() {
  const [video, setVideo] = useState<VideoMeta>(SEED_VIDEO);
  const [notes, setNotes] = useState<Note[]>(SEED_NOTES);
  const [showModal, setShowModal] = useState(false);
  const [currentTime] = useState(0);
  const [showEditor, setShowEditor] = useState(false);

  const handleAddNote = (html: string) => {
    const newNote: Note = {
      id: uid(),
      timestamp: currentTime,
      timestampLabel: fmtTime(currentTime),
      html,
      createdAt: now(),
      updatedAt: now(),
    };
    setNotes((prev) => [newNote, ...prev]);
  };

  const handleEditNote = (id: string, html: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, html, updatedAt: now() } : n)),
    );
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSeek = (sec: number) => {
    const iframe = document.querySelector<HTMLIFrameElement>("iframe");
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: "seekTo", args: [sec, true] }),
        "*",
      );
    }
  };

  const handleLoadVideo = (id: string) => {
    setVideo({
      id,
      title: "Loading video…",
      channel: "YouTube",
      description: "Video details will appear once loaded.",
      publishedAt: "",
    });
    setNotes([]);
    // In real app: fetch video metadata from YouTube Data API here
  };

  return (
    <div className="w-full pt-12 md:pt-16 bg-[#080808] flex flex-col">
      <Navbar>
        <Button
          onClick={() => setShowModal(true)}
          size="sm"
          className="shrink-0 h-11! gap-1.5 text-sm! font-semibold text-black bg-primary-500"
        >
          <Plus size={13} />
          <span className="hidden sm:inline">New Video</span>
          <span className="sm:hidden">New</span>
        </Button>
      </Navbar>

      <div className="min-h-screen max-w-7xl mx-auto text-surface-100">
        {showModal && (
          <NewVideoModal
            onClose={() => setShowModal(false)}
            onLoad={handleLoadVideo}
          />
        )}

        <div className="mx-auto px-4 sm:px-6 py-6 flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0 flex flex-col gap-5">
            <VideoPanel video={video} notesCount={notes.length} />

            {/* Mobile-only action buttons — shown below video on small screens */}
            <div className="flex items-center gap-2 lg:hidden">
              <Button
                onClick={() => setShowModal(true)}
                size="sm"
                className="flex-1 h-9 gap-1.5 text-xs font-semibold border-white/10 bg-white/3 text-white/70 hover:text-white hover:bg-white/8"
              >
                <Plus size={13} />
                New Video
              </Button>
              <Button
                onClick={() => setShowEditor(true)}
                size="sm"
                className="flex-1 h-9 gap-1.5 text-xs font-semibold text-black bg-primary-500"
              >
                <Pencil size={13} />
                Create Note
              </Button>
            </div>
          </div>
          <div
            className={` flex-col h-full gap-3 lg:w-95 xl:w-105 ${showEditor ? "flex" : "hidden md:flex"}`}
          >
            <NoteEditor
              onSave={(html) => {
                handleAddNote(html);
                setShowEditor(false);
              }}
              onCancel={() => setShowEditor(false)}
              currentTime={currentTime}
              saveLabel="Save Note"
            />
          </div>
        </div>

        <div className="py-6 px-4 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <StickyNote size={14} className="text-primary-500" />
              <h3 className="font-display text-sm font-semibold text-white/80">
                Notes
              </h3>
              {notes.length > 0 && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-[rgba(2,174,2,0.1)] text-primary-400 border border-[rgba(2,174,2,0.2)]">
                  {notes.length}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-white/25 text-xs hidden sm:block">
                Sorted by timestamp
              </span>
            </div>
          </div>

          <div className="h-px bg-[rgba(255,255,255,0.05)]" />
          <div className=" columns-1 md:columns-2 space-y-4">
            <NotesList
              notes={notes}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
              onSeek={handleSeek}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
