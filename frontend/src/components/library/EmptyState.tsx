import { BookOpen } from "lucide-react";

const EmptyState = ({ query }: { query: string }) => (
  <div className="flex flex-col items-center justify-center py-24 text-center">
    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 bg-[rgba(2,174,2,0.08)] border border-[rgba(2,174,2,0.15)]">
      <BookOpen size={26} style={{ color: "var(--color-primary-600)" }} />
    </div>
    <p className="text-white/60 text-sm font-medium mb-1">
      {query ? `No videos match "${query}"` : "Your library is empty"}
    </p>
    <p className="text-white/25 text-xs max-w-xs">
      {query
        ? "Try a different search term or clear the filter."
        : "Paste a YouTube URL to save your first video and start taking notes."}
    </p>
  </div>
);

export default EmptyState;
