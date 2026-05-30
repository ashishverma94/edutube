export interface NoteEditorProps {
  initialHtml?: string;
  onSave: (html: string) => void;
  onCancel?: () => void;
  saveLabel?: string;
  currentTime?: number;
}

export interface VideoMeta {
  id: string;
  title: string;
  channel: string;
  description: string;
  publishedAt: string;
}

export interface Note {
  id: string;
  timestamp: number; // seconds
  timestampLabel: string; // "02:14"
  html: string; // rich html content
  createdAt: string;
  updatedAt: string;
}