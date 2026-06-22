import { motion } from "framer-motion";

const PILLARS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622C17.176 19.29 21 14.591 21 9a12.02 12.02 0 00-.382-3.016z" />
      </svg>
    ),
    color: "#22C55E",
    colorBg: "rgba(34,197,94,0.08)",
    colorBorder: "rgba(34,197,94,0.18)",
    title: "You approve everything sensitive",
    body: "Before Navii deletes a file, sends a message, or makes any irreversible change — it pauses. It asks. You decide. Every time.",
    visual: (
      <div
        className="mt-4 rounded-xl px-4 py-3"
        style={{ background: "rgba(34,197,94,0.04)", border: "1px solid rgba(34,197,94,0.12)" }}
      >
        <p className="text-[11px] text-slate-600 mb-3 leading-relaxed">
          Navii wants to delete <span className="font-semibold text-slate-700">draft-v3.sketch</span>. Confirm?
        </p>
        <div className="flex gap-2">
          <div
            className="flex-1 h-7 rounded-lg flex items-center justify-center text-[10px] font-semibold text-white"
            style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)", boxShadow: "0 2px 6px rgba(34,197,94,0.25)" }}
          >
            Approve
          </div>
          <div
            className="flex-1 h-7 rounded-lg flex items-center justify-center text-[10px] font-medium text-slate-500"
            style={{ border: "1px solid rgba(15,23,42,0.10)" }}
          >
            Deny
          </div>
        </div>
      </div>
    ),
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
    color: "#3B82F6",
    colorBg: "rgba(59,130,246,0.08)",
    colorBorder: "rgba(59,130,246,0.18)",
    title: "Every action is transparent",
    body: "Nothing happens silently. Every click, search, and navigation is logged in plain language, in real-time, with full timestamps.",
    visual: (
      <div
        className="mt-4 rounded-xl px-3 py-3"
        style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.10)" }}
      >
        {[
          { time: "09:41:02", label: "Opened Safari", done: true },
          { time: "09:41:03", label: "Searched Spotify", done: true },
          { time: "09:41:05", label: "Clicking play…", done: false },
        ].map((e, i) => (
          <div key={i} className="flex items-center gap-2 mb-1.5 last:mb-0">
            <div
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: e.done ? "#22C55E" : "#3B82F6", boxShadow: e.done ? "none" : "0 0 4px rgba(59,130,246,0.6)" }}
            />
            <span className="text-[10px] font-mono text-slate-400 flex-shrink-0">{e.time}</span>
            <span className={`text-[10px] ${e.done ? "text-slate-400" : "text-blue-600 font-medium"}`}>{e.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
    color: "#8B5CF6",
    colorBg: "rgba(139,92,246,0.08)",
    colorBorder: "rgba(139,92,246,0.18)",
    title: "Stop anytime, instantly",
    body: "One keystroke halts everything. Navii stops, steps back, and reports exactly what it had done. You are never locked in.",
    visual: (
      <div
        className="mt-4 rounded-xl px-4 py-3 flex items-center gap-3"
        style={{ background: "rgba(139,92,246,0.04)", border: "1px solid rgba(139,92,246,0.12)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(239,68,68,0.10)", border: "1px solid rgba(239,68,68,0.18)" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <rect x="2" y="2" width="6" height="6" rx="1" fill="#EF4444" />
          </svg>
        </div>
        <div>
          <p className="text-[11px] font-semibold text-slate-700">Task halted</p>
          <p className="text-[10px] text-slate-400 mt-0.5">3 of 6 steps completed. Nothing irreversible done.</p>
        </div>
      </div>
    ),
  },
];

const POINTS = [
  "No background processes without permission",
  "Clear activity logs you can export",
  "No hidden clicks or keystrokes",
  "Prototype runs fully on-device",
  "Automation roadmap is public",
  "Cancel any task with one keypress",
];

export default function SafetySection() {
  return (
    <section id="safety" className="py-28 px-6 relative overflow-hidden bg-white">
      <div
        className="absolute top-0 left-0 w-full h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(15,23,42,0.06), transparent)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(59,130,246,0.03) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-semibold tracking-[0.14em] text-blue-500 uppercase mb-3"
          >
            Trust
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4"
          >
            You stay in control.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-[16px] text-slate-500 max-w-md mx-auto leading-relaxed"
          >
            An AI that acts on your behalf requires absolute trust. We built every layer of Navii with that in mind.
          </motion.p>
        </div>

        {/* Three pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, #fafafa 0%, #fff 100%)",
                border: "1px solid rgba(15,23,42,0.07)",
                boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
              }}
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-5"
                style={{ background: pillar.colorBg, border: `1px solid ${pillar.colorBorder}`, color: pillar.color }}
              >
                {pillar.icon}
              </div>
              <h3 className="text-[15px] font-semibold text-gray-900 mb-2 tracking-tight leading-snug">
                {pillar.title}
              </h3>
              <p className="text-[13px] text-slate-500 leading-relaxed">
                {pillar.body}
              </p>
              {pillar.visual}
            </motion.div>
          ))}
        </div>

        {/* Secondary trust points */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl p-8"
          style={{
            background: "linear-gradient(135deg, #f8fafc 0%, #fff 100%)",
            border: "1px solid rgba(15,23,42,0.06)",
          }}
        >
          <p className="text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase mb-6">
            Also
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4">
            {POINTS.map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="flex items-start gap-2.5"
              >
                <div
                  className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(34,197,94,0.10)", border: "1px solid rgba(34,197,94,0.18)" }}
                >
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path d="M1.5 4l1.8 1.8 3.2-3.6" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <span className="text-[13px] text-slate-600 leading-snug">{point}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
