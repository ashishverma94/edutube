import { Star } from "lucide-react";
import Tag from "../common/Tag";
import Heading from "../common/Heading";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Arjun Mehta",
      role: "CS Student, IIT Delhi",
      text: "I used to pause and open Notion just to take notes. Edutube changed that — notes right next to the video is a game-changer.",
      stars: 5,
    },
    {
      name: "Priya Sharma",
      role: "Self-taught Developer",
      text: "The timestamp jumping is insane. I can go back to exactly where a concept was explained without scrubbing the timeline.",
      stars: 5,
    },
    {
      name: "Ravi Iyer",
      role: "UPSC Aspirant",
      text: "I have hundreds of notes across 50+ lectures now. The search and filter features make revision so much faster.",
      stars: 5,
    },
    {
      name: "Sneha Kapoor",
      role: "Data Science Learner",
      text: "Clean, dark, distraction-free. Edutube feels like it was made by someone who actually studies from YouTube daily.",
      stars: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-8 sm:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <Tag title="Loved by students" />
          <Heading text1="Real learners," text2="real results" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="gradient-border rounded-xl p-5 sm:p-6 card-lift border border-white/10"
            >
              <div className="flex gap-0.5 mb-4">
                {Array(t.stars)
                  .fill(0)
                  .map((_, j) => (
                    <Star
                      key={j}
                      size={12}
                      fill="currentColor"
                      style={{ color: "var(--color-primary-500)" }}
                    />
                  ))}
              </div>
              <p className="text-white/65 text-xs sm:text-sm leading-relaxed mb-5 font-light">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-display font-700 text-black"
                  style={{
                    background: "var(--color-primary-500)",
                    fontWeight: 700,
                  }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-white text-xs font-medium">{t.name}</p>
                  <p className="text-white/35 text-xs">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
