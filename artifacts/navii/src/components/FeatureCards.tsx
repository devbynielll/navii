import { motion } from "framer-motion";
import { MousePointer2, Command, MessageSquareText, Activity, ShieldCheck, History } from "lucide-react";

const features = [
  {
    title: "Delayed AI Cursor",
    description: "Navii follows with intention, not instantly. It feels like a calm co-pilot rather than a frantic script.",
    icon: MousePointer2,
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-500",
    glowColor: "rgba(59,130,246,0.15)",
  },
  {
    title: "⌥ Space Command",
    description: "Summon Navii instantly from anywhere, over any application. Always ready when you need it.",
    icon: Command,
    color: "from-violet-500/10 to-violet-600/5",
    iconColor: "text-violet-500",
    glowColor: "rgba(139,92,246,0.15)",
  },
  {
    title: "Natural Language Tasks",
    description: "Just describe what you want. No rigid syntax, no complex shortcuts to memorize.",
    icon: MessageSquareText,
    color: "from-sky-500/10 to-sky-600/5",
    iconColor: "text-sky-500",
    glowColor: "rgba(14,165,233,0.15)",
  },
  {
    title: "Live Thinking Steps",
    description: "See exactly what Navii is doing. Every click, search, and action narrated in real-time.",
    icon: Activity,
    color: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-500",
    glowColor: "rgba(16,185,129,0.15)",
  },
  {
    title: "Approval Before Acting",
    description: "You stay in control. Navii pauses and asks permission before deleting files or sending emails.",
    icon: ShieldCheck,
    color: "from-amber-500/10 to-amber-600/5",
    iconColor: "text-amber-500",
    glowColor: "rgba(245,158,11,0.15)",
  },
  {
    title: "Task History",
    description: "Every action is logged and reviewable. Audit exactly what Navii did while you were away.",
    icon: History,
    color: "from-rose-500/10 to-rose-600/5",
    iconColor: "text-rose-500",
    glowColor: "rgba(244,63,94,0.15)",
  },
];

export default function FeatureCards() {
  return (
    <section
      id="features"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #fff 100%)" }}
    >
      <div className="absolute top-0 left-0 w-full h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(15,23,42,0.07), transparent)" }} />

      <div className="max-w-6xl mx-auto">
        <div className="mb-16 max-w-xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-4"
          >
            Features
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4"
          >
            Designed for trust.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-lg text-slate-500"
          >
            Built to feel like a true companion — one that respects your space and keeps you informed.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl p-6 cursor-default"
              style={{
                border: "1px solid rgba(15,23,42,0.07)",
                boxShadow: "0 2px 8px rgba(15,23,42,0.04), 0 1px 2px rgba(15,23,42,0.03)",
                transition: "box-shadow 0.25s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px rgba(15,23,42,0.08), 0 2px 8px rgba(15,23,42,0.04), 0 0 0 1px rgba(15,23,42,0.06)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(15,23,42,0.04), 0 1px 2px rgba(15,23,42,0.03)";
              }}
            >
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-4`}
                style={{ boxShadow: `0 0 0 1px ${feat.glowColor}` }}
              >
                <feat.icon className={`w-4 h-4 ${feat.iconColor}`} />
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-2 tracking-tight">{feat.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
