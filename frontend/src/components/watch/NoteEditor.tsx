import {
  Bold,
  Type,
  Clock,
  Italic,
  Palette,
  Heading2,
  Underline,
  Pencil,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import { cn, fmtTime } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import type { NoteEditorProps } from "@/types/watch";

const THEME_COLORS = [
  { label: "Green 300", hex: "#7dff7d" },
  { label: "Green 400", hex: "#3df53d" },
  { label: "Green 500", hex: "#02ae02" },
  { label: "Green 600", hex: "#028a02" },
  { label: "White", hex: "#f5f5f5" },
  { label: "Dim", hex: "#888888" },
];

const NoteEditor = ({
  initialHtml = "",
  onSave,
  onCancel,
  saveLabel = "Save Note",
  currentTime = 0,
}: NoteEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isEmpty, setIsEmpty] = useState(!initialHtml);

  useEffect(() => {
    if (editorRef.current && initialHtml) {
      editorRef.current.innerHTML = initialHtml;
      setIsEmpty(false);
    }
  }, []);

  const exec = (cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
    checkEmpty();
  };

  const checkEmpty = () => {
    const text = editorRef.current?.innerText?.trim() ?? "";
    setIsEmpty(text.length === 0);
  };

  const handleSave = () => {
    const html = editorRef.current?.innerHTML ?? "";
    const text = editorRef.current?.innerText?.trim() ?? "";
    if (!text) return;
    onSave(html);
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      setIsEmpty(true);
    }
  };

  const ToolBtn = ({
    onClick,
    title,
    children,
    active = false,
  }: {
    onClick: () => void;
    title: string;
    children: React.ReactNode;
    active?: boolean;
  }) => (
    <button
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={title}
      className={cn(
        "w-7 h-7 rounded-md flex items-center justify-center transition-all",
        active
          ? "text-black"
          : "text-white/50 hover:text-white hover:bg-white/8",
      )}
      style={active ? { background: "var(--color-primary-500)" } : {}}
    >
      {children}
    </button>
  );

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded flex items-center justify-center bg-[rgba(2,174,2,0.15)]">
            <Pencil size={11} className="text-primary-500" />
          </div>
          <h3 className="font-display text-sm font-semibold text-white/80">
            Add Note
          </h3>
        </div>
        {onCancel && (
          <div
            onClick={onCancel}
            className="p-2 block md:hidden rounded-md cursor-pointer  text-red-500 hover:text-white hover:bg-red-500 hover:border-red-700 border-red-500 border"
          >
            <X className="size-3" />
          </div>
        )}
      </div>
      <div
        className={`rounded-xl bg-[rgba(255,255,255,0.025)] border border-[rgba(2,174,2,0.2)] overflow-hidden `}
      >
        <div
          className="flex items-center gap-0.5 px-3 py-2 flex-wrap"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <ToolBtn onClick={() => exec("formatBlock", "<h3>")} title="Heading">
            <Heading2 size={13} />
          </ToolBtn>

          <ToolBtn
            onClick={() => exec("formatBlock", "<div>")}
            title="Normal text"
          >
            <Type size={13} />
          </ToolBtn>

          <div className="w-px h-4 mx-1 bg-[rgba(255,255,255,0.08)]" />

          <ToolBtn onClick={() => exec("bold")} title="Bold (Ctrl+B)">
            <Bold size={13} />
          </ToolBtn>

          <ToolBtn onClick={() => exec("italic")} title="Italic (Ctrl+I)">
            <Italic size={13} />
          </ToolBtn>

          <ToolBtn onClick={() => exec("underline")} title="Underline (Ctrl+U)">
            <Underline size={13} />
          </ToolBtn>

          <div className="w-px h-4 mx-1 bg-[rgba(255,255,255,0.08)]" />

          <div className="relative">
            <button
              onMouseDown={(e) => {
                e.preventDefault();
                setShowColorPicker((p) => !p);
              }}
              title="Text color"
              className="w-7 h-7 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/8 transition-all"
            >
              <Palette size={13} />
            </button>
            {showColorPicker && (
              <div
                className="absolute top-full left-0 mt-1.5 p-2 rounded-xl z-50 flex gap-1.5 flex-wrap w-44"
                style={{
                  background: "#111",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 12px 32px rgba(0,0,0,0.6)",
                }}
              >
                {THEME_COLORS.map((c) => (
                  <button
                    key={c.hex}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      exec("foreColor", c.hex);
                      setShowColorPicker(false);
                    }}
                    title={c.label}
                    className="w-6 h-6 rounded-md border-2 border-transparent hover:scale-110 transition-transform"
                    style={{
                      background: c.hex,
                      borderColor: "rgba(255,255,255,0.15)",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex-1" />

          <span className="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-lg bg-[rgba(2,174,2,0.08)] text-primary-500 border border-[rgba(2,174,2,0.15)]">
            <Clock size={10} />
            {fmtTime(currentTime)}
          </span>
        </div>

        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onInput={checkEmpty}
          className="min-h-50 px-4 py-3 text-sm text-white/80 outline-none leading-relaxed"
          style={{ fontFamily: "'DM Sans', sans-serif" }}
          data-placeholder="Type your note here…"
          onFocus={() => setShowColorPicker(false)}
        />

        <div
          className="flex items-center justify-between px-3 py-2.5"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <span className="text-white/20 text-[11px] md:text-xs">
            Tip: Select text then apply formatting
          </span>
          <div className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={isEmpty}
              className={`h-8! px-4! text-sm! font-semibold text-white disabled:opacity-90 disabled:cursor-not-allowed disabled:bg-[rgba(2,174,2,0.47)]`}
            >
              {saveLabel}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteEditor;
