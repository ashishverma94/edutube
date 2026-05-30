import Logo from "@/assets/common/Logo.png";
import { Github, Mail, Twitter } from "lucide-react";

const Footer = () => (
  <footer
    className="border-t py-10 sm:py-14"
    style={{ borderColor: "rgba(255,255,255,0.05)" }}
  >
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-4 md:mb-10">
        <div className="col-span-2 max-md:place-items-center sm:col-span-1">
          <div className="flex items-center gap-2 mb-3">
           <a href="#" className="flex items-center gap-2 group">
            <img src={Logo} alt="logo" className="h-8" />
            <span
              className="font-display font-800 text-base tracking-tight text-white  gap-0.5"
              style={{ fontWeight: 800 }}
            >
              Edu<span className="text-primary-400">tube</span>
            </span>
          </a>
           
          </div>
          <p className="text-white/35 text-xs max-md:text-center leading-relaxed max-w-xs font-light">
            Watch, annotate, and learn. Your all-in-one YouTube study companion.
          </p>
          <div className="flex gap-3 mt-4">
            {[
              <Github size={15} />,
              <Twitter size={15} />,
              <Mail size={15} />,
            ].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white/35 hover:text-white transition-colors"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {[
          {
            title: "Product",
            links: ["Features", "How It Works", "Roadmap", "Changelog"],
          },
          {
            title: "Learn",
            links: ["Documentation", "Video Guides", "Blog", "FAQ"],
          },
          {
            title: "Company",
            links: ["About", "Privacy Policy", "Terms of Use", "Contact"],
          },
        ].map((col) => (
          <div key={col.title} className=" max-md:col-span-2 max-md:place-items-center max-md:text-center">
            <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1 md:mb-3">
              {col.title}
            </p>
            <ul className="flex flex-col gap-2">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    className="text-white/35 text-xs hover:text-white/70 transition-colors font-light"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <p className="text-white/25 text-xs">
          © 2025 Edutube. All rights reserved.
        </p>
        <p className="text-white/20 text-xs">
          Made with <span style={{ color: "var(--color-primary-600)" }}>♥</span>{" "}
          for students everywhere
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
