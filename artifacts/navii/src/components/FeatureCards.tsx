import { motion } from "framer-motion";
import { MousePointer2, Command, MessageSquareText, Activity, ShieldCheck, History } from "lucide-react";

const features = [
  {
    title: "Delayed AI Cursor",
    description: "Navii follows with intention, not instantly. It feels like a calm co-pilot rather than a frantic script.",
    icon: MousePointer2,
    accentBg: "rgba(59,130,246,0.07)",
    accentBorder: "rgba(59,130,246,0.14)",
    iconColor: "#3B82F6",
    hoverGlow: "rgba(59,130,246,0.06)",
  },
  {
    title: "⌥ Space Command",
    description: "Summon Navii instantly from anywhere, over any application. Always ready when you need it.",
    icon: Command,
    accentBg: "rgba(139,92,246,0.07)",
    accentBorder: "rgba(139,92,246,0.14)",
    iconColor: "#8B5CF6",
    hoverGlow: "rgba(139,92,246,0.06)",
  },
  {
    title: "Natural Language Tasks",
    description: "Just describe what you want. No rigid syntax, no complex shortcuts to memorize.",
    icon: MessageSquareText,
    accentBg: "rgba(14,165,233,0.07)",
    accentBorder: "rgba(14,165,233,0.14)",
    iconColor: "#0EA5E9",
    hoverGlow: "rgba(14,165,233,0.06)",
  },
  {
    title: "Live Thinking Steps",
    description: "See exactly what Navii is doing. Every click, search, and action narrated in real-time.",
    icon: Activity,
    accentBg: "rgba(16,185,129,0.07)",
    accentBorder: "rgba(16,185,129,0.14)",
    iconColor: "#10B981",
    hoverGlow: "rgba(16,185,129,0.06)",
  },
  {
    title: "Approval Before Acting",
    description: "You stay in control. Navii pauses and asks permission before deleting files or sending emails.",
    icon: ShieldCheck,
    accentBg: "rgba(245,158,11,0.07)",
    accentBorder: "rgba(245,158,11,0.14)",
    iconColor: "#F59E0B",
    hoverGlow: "rgba(245,158,11,0.06)",
  },
  {
    title: "Task History",
    description: "Every action is logged and reviewable. Audit exactly what Navii did while you were away.",
    icon: History,
    accentBg: "rgba(244,63,94,0.07)",
    accentBorder: "rgba(244,63,94,0.14)",
    iconColor: "#F43F5E",
    hoverGlow: "rgba(244,63,94,0.06)",
  },
];

export default function FeatureCards() {
  return (
    <section
      id="features"
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #fff 100%)" }}
    >
      <div
        className="absolute top-0 left-0 w-full h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(15,23,42,0.06), transparent)" }}
      />

      <div className="max-w-5xl mx-auto">
        <div className="mb-14 max-w-md">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold tracking-widest text-blue-500 uppercase mb-3"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-3"
          >
            Designed for trust.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-base text-slate-500 leading-relaxed"
          >
            Built to feel like a true companion — one that respects your space and keeps you informed.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-xl p-5 bg-white cursor-default transition-all duration-200"
              style={{
                border: "1px solid rgba(15,23,42,0.07)",
                boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = `0 8px 24px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04), 0 0 0 1px rgba(15,23,42,0.07)`;
                el.style.background = `linear-gradient(135deg, white 60%, ${feat.hoverGlow})`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "0 1px 3px rgba(15,23,42,0.04)";
                el.style.background = "white";
              }}
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-4"
                style={{ background: feat.accentBg, border: `1px solid ${feat.accentBorder}` }}
              >
                <feat.icon className="w-3.5 h-3.5" style={{ color: feat.iconColor }} />
              </div>
              <h3 className="text-[14px] font-semibold text-gray-900 mb-1.5 tracking-tight">{feat.title}</h3>
              <p className="text-slate-500 text-[13px] leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
