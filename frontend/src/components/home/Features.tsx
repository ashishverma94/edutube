import {
  Clock,
  Search,
  Layers,
  Youtube,
  BookOpen,
  StickyNote,
} from "lucide-react";
import Tag from "../common/Tag";
import Heading from "../common/Heading";

const Features = () => {
  const features = [
    {
      icon: <Youtube size={20} />,
      title: "YouTube in Frame",
      desc: "Watch any YouTube video directly inside Edutube — no tab switching, no distractions. Full controls, full focus.",
      tag: "Integrated Player",
    },
    {
      icon: <Clock size={20} />,
      title: "Timestamp Notes",
      desc: "Click to add a note at the exact moment it matters. Jump back to any second with a single tap.",
      tag: "Precision Learning",
    },
    {
      icon: <BookOpen size={20} />,
      title: "Video Descriptions",
      desc: "YouTube Data API pulls in the full video description, chapters, and metadata — everything in one place.",
      tag: "API Powered",
    },
    {
      icon: <StickyNote size={20} />,
      title: "Full CRUD Notes",
      desc: "Create, read, update, and delete your notes freely. Organize by video, timestamp, or keyword.",
      tag: "Full Control",
    },
    {
      icon: <Search size={20} />,
      title: "Search & Filter",
      desc: "Find any note instantly across all your videos. Filter by topic, time range, or keyword.",
      tag: "Fast Retrieval",
    },
    {
      icon: <Layers size={20} />,
      title: "Session Memory",
      desc: "Pick up exactly where you left off. Edutube remembers your position, notes, and progress.",
      tag: "Smart Resume",
    },
  ];

  return (
    <section id="features" className="py-8 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 md:mb-14">
          <Tag title="Everything you need" />
          <Heading text1="Built for focused" text2="deep learning" />
          <p className="text-white/40 text-sm sm:text-base max-w-xl mx-auto font-light">
            Every feature is designed to eliminate friction between watching and
            understanding.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((f, i) => (
            <div
              key={i}
              className="gradient-border rounded-xl p-5 sm:p-6 card-lift cursor-default border border-primary-900"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-primary-400 bg-[rgba(2,174,2,0.12)]">
                  {f.icon}
                </div>
                <span className="tag-pill rounded-full px-2 py-0.5 text-xs">
                  {f.tag}
                </span>
              </div>
              <h3 className="font-display font-semibold text-base sm:text-lg mb-2 text-white">
                {f.title}
              </h3>
              <p className="text-white/45 text-xs sm:text-sm leading-relaxed font-light">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
