import Tag from "../common/Tag";
import Heading from "../common/Heading";

const HowItWorks = () => {
  const steps = [
    {
      num: "01",
      title: "Paste a YouTube URL",
      desc: "Drop any YouTube video link into Edutube. The video loads in the embedded player instantly.",
    },
    {
      num: "02",
      title: "Watch & Annotate",
      desc: "As you watch, pause at key moments and add notes. Each note is anchored to that exact timestamp.",
    },
    {
      num: "03",
      title: "Review & Revise",
      desc: "Browse all your notes, edit them, delete outdated ones, and click any timestamp to jump right back.",
    },
    {
      num: "04",
      title: "Master the Topic",
      desc: "Build a rich knowledge base for every video. Study smarter, retain more, and learn faster.",
    },
  ];

  return (
    <section id="how-it-works" className="py-8 sm:py-28 relative grid-bg">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(2,174,2,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <Tag title="Simple workflow" />
          <Heading text1="Four steps to" text2="mastery" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {steps.map((s, i) => (
            <div
              key={i}
              className="step-card bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] relative rounded-xl p-6 sm:p-8 cursor-default transition-all duration-300 hover:bg-white/3"
            >
              <div className="step-num select-none mb-3">{s.num}</div>
              <h3 className="font-display font-semibold text-base sm:text-lg  tracking-wide mb-2 text-white">
                {s.title}
              </h3>
              <p className="text-white/45 text-xs sm:text-sm leading-relaxed font-light">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
