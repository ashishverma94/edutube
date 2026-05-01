import { useState, useEffect } from "react";
import { Users, FileText, Zap } from "lucide-react";
import Slide1 from "@/assets/Auth/slide-1.png";
import Slide2 from "@/assets/Auth/slide-2.png";
import Slide3 from "@/assets/Auth/slide-3.png";
import { motion, AnimatePresence } from "framer-motion";

export const SLIDES = [
  {
    tag: "Real-time Sync",
    icon: Zap,
    color: "#02ae02",
    headline: "Watch together,\nperfectly in sync",
    sub: 'Play, pause, seek — every action synced instantly for everyone in the room. No lag, no "wait go back".',
    img: Slide1,
  },
  {
    tag: "Collaborative Notes",
    icon: FileText,
    color: "#ccff00",
    headline: "Take timestamped\nnotes together",
    sub: "Jot notes at any video moment. Share with your room or keep private. React, discuss, seek to any timestamp.",
    img: Slide2,
  },
  {
    tag: "Live Rooms",
    icon: Users,
    color: "#3df53d",
    headline: "Create rooms.\nWatch together.",
    sub: "Create a room in seconds. Share a code. Vote on what plays next. Anyone, anywhere, anytime.",
    img: Slide3,
  },
];

const DesktopCarousel = () => {
  const [slide, setSlide] = useState(0);
  const [slideDir, setSlideDir] = useState<1 | -1>(1);

  // Auto-advance carousel
  useEffect(() => {
    const t = setInterval(() => {
      setSlideDir(1);
      setSlide((s) => (s + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const S = SLIDES[slide];
  const SlideIcon = S.icon;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="hidden md:flex md:w-[50%] lg:w-[52%] xl:w-[54%] relative overflow-hidden flex-col"
      style={{
        background:
          "linear-gradient(160deg,#080f08 0%,#0d1a0d 50%,#0a150a 100%)",
      }}
    >
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(2,174,2,0.09) 1px, transparent 1px),
                              linear-gradient(90deg,rgba(2,174,2,0.09) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow that follows active slide color */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 size-125 rounded-full blur-[120px] pointer-events-none transition-all duration-1000"
        style={{ background: S.color, opacity: 0.07 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full justify-center items-center w-full p-10 xl:p-14">
        {/* Top logo */}

        {/* Slide body — centered */}
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, x: slideDir * -80 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex-1 w-full flex flex-col justify-center items-center min-h-0 py-8"
          >
            {/* Tag */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2 mb-5"
            >
              {" "}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-500"
                style={{
                  background: `${S.color}18`,
                  border: `1px solid ${S.color}35`,
                }}
              >
                <SlideIcon
                  className="w-3.5 h-3.5 transition-colors duration-500"
                  style={{ color: S.color }}
                />
              </div>
              <span
                className="text-xs font-display font-black uppercase tracking-[0.18em] transition-colors duration-500"
                style={{ color: S.color }}
              >
                {S.tag}
              </span>
            </motion.div>
            {/* Headline */}
            <motion.h2
              variants={itemVariants}
              className="font-display font-black text-white text-center leading-[1.1] mb-4"
              style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)" }}
            >
              {S.headline.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </motion.h2>
            {/* Sub */}
            <motion.p
              variants={itemVariants}
              className="text-white/45 text-center text-sm leading-relaxed mb-10 max-w-xs"
            >
              {" "}
              {S.sub}
            </motion.p>
            {/* <img alt="img" src={S.img} className=" w-112.5" /> */}
            <motion.img
              src={S.img}
              alt="img"
              className="w-112.5"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Bottom nav */}
        <div className="flex items-center justify-between shrink-0">
          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {SLIDES.map((sl, i) => (
              <button
                key={i}
                onClick={() => {
                  setSlideDir(i > slide ? 1 : -1);
                  setSlide(i);
                }}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === slide ? "28px" : "8px",
                  height: "8px",
                  background: i === slide ? S.color : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopCarousel;
