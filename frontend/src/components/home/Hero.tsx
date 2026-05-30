import { Button } from "@/components/ui/button";
import { Play, StickyNote, Youtube, ArrowRight } from "lucide-react";
import Tag from "../common/Tag";

const Hero = () => {
  return (
    <section className="relative min-h-screen pb-5 flex items-center justify-center overflow-hidden grid-bg noise">
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(2,174,2,0.12) 0%, rgba(2,174,2,0.04) 40%, transparent 70%)",
        }}
      />
      <div className="absolute hidden md:block top-6 left-8 w-16 h-16 border-l-2 border-t-2 opacity-20 border-primary-500" />
      <div className="absolute hidden md:block bottom-84 right-8 w-16 h-16 border-r-2 border-b-2 opacity-20 border-primary-500" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center -mt-40 md:mt-22">
        <Tag title="Study smarter with AI-powered notes" />
        <h1
          className="hero-title font-mono font-800 leading-[1.05] mb-4 md:mb-6 animate-slide-up text-glow"
          style={{ fontSize: "clamp(2.2rem, 6vw, 4.5rem)", fontWeight: 800 }}
        >
          Learn from YouTube.
          <br />
          <span className="text-primary-400">Take notes</span> that stick.
        </h1>

        <p className="text-white/50 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed animate-slide-up delay-200">
          Edutube lets you watch any YouTube video and create timestamped notes
          — right on the same screen. Pause, annotate, review. Turn passive
          watching into active learning.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-slide-up delay-300">
          <Button
            size="lg"
            className="w-full sm:w-auto px-7 py-3 text-sm sm:text-base bg-primary-500 font-semibold text-black glow-green transition-all duration-200 hover:scale-105 group"
          >
            Start Learning Free
            <ArrowRight
              size={16}
              className="ml-2 group-hover:translate-x-1 transition-transform"
            />
          </Button>
          {false && (
            <Button
              size="lg"
              className="w-full sm:w-auto px-7 py-3 text-sm sm:text-base font-medium border-white/10 bg-white/3 text-white/80 hover:bg-white/8 hover:text-white"
            >
              <Play
                size={14}
                className="mr-2"
                style={{ color: "var(--color-primary-400)" }}
              />
              Watch Demo
            </Button>
          )}
        </div>

        <div className="flex items-center justify-center gap-6 sm:gap-10 mt-14 animate-fade-in delay-500">
          {[
            { val: "20+", label: "Students" },
            { val: "100+", label: "Notes Created" },
            { val: "4.1★", label: "Rating" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <p
                className="font-display font-700 text-lg sm:text-2xl"
                style={{ fontWeight: 700, color: "var(--color-primary-400)" }}
              >
                {val}
              </p>
              <p className="text-white/40 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        <div className="relative hidden md:block mt-16 mx-auto max-w-3xl border-4 border-primary-800 rounded-xl overflow-hidden animate-fade-in delay-400 scan-container">
          <div className="bg-[#0d0d0d] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-3 h-6 rounded-md bg-white/5 flex items-center px-3">
                <span className="text-white/25 text-xs truncate">
                  edutube.app/watch?v=dQw4w9WgXcQ
                </span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-0 h-48 sm:h-56">
              <div className="relative flex-1 bg-black flex items-center justify-center border-r border-white/5">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center glow-green animate-float"
                    style={{ background: "var(--color-primary-500)" }}
                  >
                    <Play size={18} className="text-black ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                  <Youtube size={12} className="text-red-500" />
                  <span className="text-white/30 text-xs">
                    MIT 6.006 Lecture 1
                  </span>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="text-white/30 text-xs">24:13 / 1:12:05</span>
                </div>
              </div>
              <div className="w-full sm:w-52 bg-[#0a0a0a] p-3 flex flex-col gap-2">
                <div className="flex items-center gap-1.5 mb-1">
                  <StickyNote
                    size={10}
                    style={{ color: "var(--color-primary-400)" }}
                  />
                  <span className="text-xs text-white/40 font-medium">
                    My Notes
                  </span>
                </div>
                {[
                  { time: "02:14", note: "Binary search tree intro" },
                  { time: "08:45", note: "O(log n) complexity" },
                  { time: "15:30", note: "Insertion example" },
                ].map(({ time, note }) => (
                  <div
                    key={time}
                    className="rounded-md p-2 flex gap-2 items-start"
                    style={{
                      background: "rgba(2,174,2,0.06)",
                      border: "1px solid rgba(2,174,2,0.12)",
                    }}
                  >
                    <span
                      className="text-xs font-mono shrink-0 mt-0.5"
                      style={{ color: "var(--color-primary-500)" }}
                    >
                      {time}
                    </span>
                    <span className="text-white/60 text-xs leading-snug">
                      {note}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
