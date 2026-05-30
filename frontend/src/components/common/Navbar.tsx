import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/common/Logo.png";
import { Button } from "@/components/ui/button";

const Navbar = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const links = ["Features", "How It Works", "Testimonials", "FAQ"];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 nav-blur transition-all duration-300 `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          <a href="#" className="flex items-center gap-2 group">
            <img src={Logo} alt="logo" className="h-8 md:h-10" />
            <span
              className="font-display font-800 text-base md:text-lg tracking-tight text-white  gap-0.5"
              style={{ fontWeight: 800 }}
            >
              Edu<span className="text-primary-400">tube</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase().replace(/ /g, "-")}`}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200 font-medium"
              >
                {l}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">{children}</div>

          {/* MOBILE ONLY  */}
          <button
            className="md:hidden text-white/70 hover:text-white transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* MOBILE ONLY  */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{
          background: "rgba(8,8,8,0.97)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="px-4 py-4 flex flex-col gap-1">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase().replace(/ /g, "-")}`}
              className="py-2.5 px-3 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-all"
              onClick={() => setOpen(false)}
            >
              {l}
            </a>
          ))}
          <div className="flex gap-2 mt-3 pt-3 border-t border-white/5">
            <Button className="flex-1 text-sm text-white/70 hover:text-white hover:bg-white/5">
              Sign In
            </Button>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
