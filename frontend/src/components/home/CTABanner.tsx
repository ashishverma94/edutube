import Tag from "../common/Tag";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const CTABanner = () => (
  <section className="py-10 sm:py-20 px-4 sm:px-6">
    <div className="max-w-4xl mx-auto">
      <div
        className="relative rounded-2xl overflow-hidden p-8 sm:p-14 text-center glow-green"
        style={{
          background:
            "linear-gradient(135deg, rgba(2,174,2,0.15) 0%, rgba(2,102,2,0.08) 50%, rgba(1,51,1,0.12) 100%)",
          border: "1px solid rgba(2,174,2,0.25)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-48 h-48 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(2,174,2,0.15) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-32 h-32 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(61,245,61,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="relative">
          <Tag title="Start today — it's free" />
          <h2
            className="font-display font-700 leading-tight mb-4"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700 }}
          >
            Ready to study smarter?
          </h2>
          <p className="text-white/50 text-sm sm:text-base mb-8 max-w-lg mx-auto font-light">
            Join thousands of students who've made Edutube their go-to learning
            companion.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8 font-semibold text-black glow-green transition-all duration-200 hover:scale-105 group"
              style={{ background: "var(--color-primary-500)" }}
            >
              Create Free Account
              <ArrowRight
                size={16}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </Button>
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <CheckCircle2
                size={12}
                style={{ color: "var(--color-primary-600)" }}
              />
              No credit card required
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default CTABanner;
