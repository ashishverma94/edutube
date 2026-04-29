import { SLIDES } from "./DesktopCarousel";

const MobileCarousel = () => {
  return (
    <div className="lg:hidden" style={{ background: "#080f08" }}>
      <div className="flex items-center justify-center gap-6 px-6 py-5">
        {SLIDES.map((sl, i) => {
          const Icon = sl.icon;
          return (
            <div key={i} className="flex items-center gap-1.5">
              <Icon className="w-3.5 h-3.5" style={{ color: sl.color }} />
              <span className="text-[11px] font-display font-semibold text-white/50">
                {sl.tag}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MobileCarousel;
