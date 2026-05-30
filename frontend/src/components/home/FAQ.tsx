import { ChevronRight } from "lucide-react";
import { useState } from "react";
import Tag from "../common/Tag";
import Heading from "../common/Heading";

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    {
      q: "Is Edutube free to use?",
      a: "Yes, Edutube is completely free. Create an account and start taking notes on any YouTube video right away.",
    },
    {
      q: "Do I need a YouTube account?",
      a: "You don't need a YouTube account to watch videos. The YouTube Data API pulls video metadata automatically using just the URL.",
    },
    {
      q: "Can I edit or delete my notes later?",
      a: "Absolutely. Edutube supports full CRUD — create, read, update, and delete any note at any time.",
    },
    {
      q: "Does clicking a note timestamp resume the video?",
      a: "Yes. Click any timestamp in your notes and the embedded player jumps to that exact moment in the video.",
    },
    {
      q: "Are my notes saved automatically?",
      a: "Notes are saved as you type. You'll never lose progress even if you close the tab and come back later.",
    },
    {
      q: "Can I use Edutube on mobile?",
      a: "Yes, Edutube is fully responsive and works on all screen sizes — phones, tablets, and desktops.",
    },
  ];

  return (
    <section id="faq" className="py-8 sm:py-28 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <Tag title="Got questions?" />
          <Heading text1="Frequently" text2="asked" />
        </div>
        <div className="flex flex-col gap-2">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
              style={{
                background:
                  open === i ? "rgba(2,174,2,0.06)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${open === i ? "rgba(2,174,2,0.25)" : "rgba(255,255,255,0.05)"}`,
              }}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex items-center justify-between px-5 py-4 gap-4">
                <span className="text-sm sm:text-base font-medium text-white/90">
                  {f.q}
                </span>
                <ChevronRight
                  size={16}
                  className="shrink-0 transition-transform duration-200 text-primary-500"
                  style={{
                    transform: open === i ? "rotate(90deg)" : "rotate(0deg)",
                  }}
                />
              </div>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? "200px" : "0px" }}
              >
                <p className="px-5 pb-4 text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                  {f.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
