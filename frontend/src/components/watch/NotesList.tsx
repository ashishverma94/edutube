import { useState } from "react";
import NoteEditor from "./NoteEditor";
import { Pencil, Trash2, Clock, X, Check, AlignLeft } from "lucide-react";
import type { Note } from "@/types/watch";

interface NotesListProps {
  notes: Note[];
  onEdit: (id: string, html: string) => void;
  onDelete: (id: string) => void;
  onSeek: (sec: number) => void;
}

const NotesList = ({ notes, onEdit, onDelete, onSeek }: NotesListProps) => {
  const sorted = [...notes].sort((a, b) => a.timestamp - b.timestamp);

  if (sorted.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
          style={{
            background: "rgba(2,174,2,0.07)",
            border: "1px solid rgba(2,174,2,0.12)",
          }}
        >
          <AlignLeft size={20} style={{ color: "var(--color-primary-700)" }} />
        </div>
        <p className="text-white/40 text-sm">No notes yet</p>
        <p className="text-white/20 text-xs mt-1">
          Use the editor above to add your first note
        </p>
      </div>
    );
  }

  return (
    <>
      {sorted.map((n) => (
        <NoteCard
          key={n.id}
          note={n}
          onEdit={onEdit}
          onDelete={onDelete}
          onSeek={onSeek}
        />
      ))}
    </>
  );
};

export default NotesList;

interface NoteCardProps {
  note: Note;
  onEdit: (id: string, html: string) => void;
  onDelete: (id: string) => void;
  onSeek: (sec: number) => void;
}

const NoteCard = ({ note, onEdit, onDelete, onSeek }: NoteCardProps) => {
  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSaveEdit = (html: string) => {
    onEdit(note.id, html);
    setEditing(false);
  };

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200 group"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(2,174,2,0.18)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor =
          "rgba(255,255,255,0.06)";
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <button
          onClick={() => onSeek(note.timestamp)}
          className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-lg transition-all hover:scale-105"
          style={{
            background: "rgba(2,174,2,0.1)",
            border: "1px solid rgba(2,174,2,0.2)",
            color: "var(--color-primary-400)",
          }}
          title="Jump to this timestamp"
        >
          <Clock size={10} />
          {note.timestampLabel}
        </button>

        {/* Actions */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => setEditing((p) => !p)}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/8 transition-all"
            title="Edit note"
          >
            <Pencil size={12} />
          </button>
          {!showDeleteConfirm ? (
            <button
              onClick={() => setShowDeleteConfirm(true)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-all"
              title="Delete note"
            >
              <Trash2 size={12} />
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={() => onDelete(note.id)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-red-400 bg-red-500/15 hover:bg-red-500/25 transition-all"
                title="Confirm delete"
              >
                <Check size={12} />
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-7 h-7 rounded-lg flex items-center justify-center text-white/30 hover:text-white hover:bg-white/8 transition-all"
              >
                <X size={12} />
              </button>
            </div>
          )}
        </div>
      </div>

      {editing ? (
        <div className="p-3">
          <NoteEditor
            initialHtml={note.html}
            onSave={handleSaveEdit}
            onCancel={() => setEditing(false)}
            saveLabel="Update"
            currentTime={note.timestamp}
          />
        </div>
      ) : (
        <div
          className="px-4 py-3 text-sm text-white/70 leading-relaxed note-content"
          dangerouslySetInnerHTML={{ __html: note.html }}
        />
      )}
    </div>
  );
};
