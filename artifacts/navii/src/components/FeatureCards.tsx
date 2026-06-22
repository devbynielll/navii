import { motion } from "framer-motion";
import { MousePointer2, Command, MessageSquareText, Activity, ShieldCheck, History } from "lucide-react";

// ── Mini live previews ────────────────────────────────────────────────────────

function CursorPreview() {
  return (
    <div
      className="relative h-14 rounded-lg overflow-hidden mt-4"
      style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.08)" }}
    >
      <motion.div
        animate={{ x: [-18, 22, 6, -18], y: [-5, 14, 22, -5] }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
        className="absolute"
        style={{ left: "50%", top: "50%", marginLeft: -4, marginTop: -4 }}
      >
        <div
          style={{
            width: 8, height: 11,
            clipPath: "polygon(0 0, 100% 44%, 64% 60%, 28% 100%)",
            background: "linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)",
            filter: "drop-shadow(0 0 4px rgba(59,130,246,0.8))",
          }}
        />
      </motion.div>
    </div>
  );
}

function PalettePreview() {
  return (
    <div
      className="mt-4 rounded-lg overflow-hidden"
      style={{ background: "rgba(11,11,17,0.92)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div
        className="flex items-center gap-1.5 px-2.5 py-1.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        <div
          style={{
            width: 5, height: 7,
            clipPath: "polygon(0 0, 100% 44%, 64% 60%, 28% 100%)",
            background: "#3B82F6",
            filter: "drop-shadow(0 0 3px rgba(59,130,246,0.9))",
            flexShrink: 0,
          }}
        />
        <span className="text-[9px] text-white/25">Ask Navii…</span>
      </div>
      <div className="px-1.5 py-1.5 flex flex-col gap-0.5">
        {["Open Spotify", "Search YouTube"].map((t, i) => (
          <div
            key={i}
            className="px-1.5 py-1 rounded-md text-[9px]"
            style={{
              background: i === 0 ? "rgba(139,92,246,0.14)" : "transparent",
              color: i === 0 ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.28)",
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

function TypingPreview() {
  return (
    <div className="mt-4 px-3 py-2.5 rounded-lg" style={{ background: "rgba(14,165,233,0.04)", border: "1px solid rgba(14,165,233,0.09)" }}>
      <span className="text-[11px] text-slate-600 leading-relaxed">
        Open Spotify and play{" "}
        <span className="text-sky-600 font-medium">Blinding Lights</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1, ease: "steps(1)" as any }}
          className="inline-block w-0.5 h-3 bg-sky-500 ml-0.5 align-middle"
        />
      </span>
    </div>
  );
}

function LogsPreview() {
  const items = [
    { label: "Opening Spotify", done: true },
    { label: "Searching track", active: true },
    { label: "Clicking play…", done: false },
  ];
  return (
    <div className="mt-4 flex flex-col gap-1.5">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -4 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.14 }}
          className="flex items-center gap-1.5"
        >
          {item.done ? (
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "rgba(34,197,94,0.15)" }}>
              <div className="w-1 h-1 rounded-full bg-green-400 m-0.5" />
            </div>
          ) : item.active ? (
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.1 }}
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: "rgba(16,185,129,0.15)" }}
            >
              <div className="w-1 h-1 rounded-full bg-emerald-400 m-0.5" />
            </motion.div>
          ) : (
            <div className="w-2 h-2 rounded-full flex-shrink-0 border border-slate-200" />
          )}
          <span className={`text-[11px] ${item.done ? "text-slate-400 line-through" : item.active ? "text-slate-700 font-medium" : "text-slate-400"}`}>
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function ApprovalPreview() {
  return (
    <div
      className="mt-4 rounded-lg px-3 py-2.5"
      style={{ background: "rgba(245,158,11,0.04)", border: "1px solid rgba(245,158,11,0.13)" }}
    >
      <p className="text-[10px] text-slate-600 mb-2 leading-relaxed">
        Delete <span className="font-semibold text-slate-700">project-v1.sketch</span>?
      </p>
      <div className="flex gap-1.5">
        <button
          className="flex-1 py-1 rounded-md text-[9px] font-semibold text-white"
          style={{ background: "rgba(245,158,11,0.75)" }}
        >
          Approve
        </button>
        <button
          className="flex-1 py-1 rounded-md text-[9px] font-medium text-slate-500"
          style={{ border: "1px solid rgba(15,23,42,0.10)" }}
        >
          Deny
        </button>
      </div>
    </div>
  );
}

function HistoryPreview() {
  const entries = [
    { time: "09:42", label: "Played Blinding Lights" },
    { time: "09:41", label: "Searched Spotify" },
    { time: "09:39", label: "Opened terminal" },
  ];
  return (
    <div className="mt-4 relative pl-4">
      <div className="absolute left-1 top-1 bottom-1 w-px" style={{ background: "rgba(244,63,94,0.15)" }} />
      {entries.map((e, i) => (
        <div key={i} className="flex items-start gap-2 mb-1.5 relative">
          <div
            className="absolute -left-[13px] top-1 w-1.5 h-1.5 rounded-full"
            style={{ background: "rgba(244,63,94,0.40)" }}
          />
          <span className="text-[9px] text-slate-400 font-mono flex-shrink-0 pt-px">{e.time}</span>
          <span className="text-[10px] text-slate-500 leading-snug">{e.label}</span>
        </div>
      ))}
    </div>
  );
}

// ── Feature data ──────────────────────────────────────────────────────────────

const features = [
  {
    title: "Companion Cursor",
    description: "Navii follows with intention — softly, elegantly. It feels like a calm co-pilot, not a frantic script.",
    icon: MousePointer2,
    accent: { bg: "rgba(59,130,246,0.07)", border: "rgba(59,130,246,0.14)", icon: "#3B82F6", hover: "rgba(59,130,246,0.05)" },
    preview: <CursorPreview />,
  },
  {
    title: "⌥ Space Command",
    description: "Summon Navii from anywhere on your Mac. Always ready, always instant.",
    icon: Command,
    accent: { bg: "rgba(139,92,246,0.07)", border: "rgba(139,92,246,0.14)", icon: "#8B5CF6", hover: "rgba(139,92,246,0.05)" },
    preview: <PalettePreview />,
  },
  {
    title: "Natural Language",
    description: "Just describe what you want. No rigid syntax, no complex shortcuts to memorize.",
    icon: MessageSquareText,
    accent: { bg: "rgba(14,165,233,0.07)", border: "rgba(14,165,233,0.14)", icon: "#0EA5E9", hover: "rgba(14,165,233,0.05)" },
    preview: <TypingPreview />,
  },
  {
    title: "Live Step Log",
    description: "See exactly what Navii is doing. Every click, search, and action narrated in real-time.",
    icon: Activity,
    accent: { bg: "rgba(16,185,129,0.07)", border: "rgba(16,185,129,0.14)", icon: "#10B981", hover: "rgba(16,185,129,0.05)" },
    preview: <LogsPreview />,
  },
  {
    title: "Approval Gates",
    description: "Navii pauses and asks before deleting files, sending emails, or anything irreversible.",
    icon: ShieldCheck,
    accent: { bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.14)", icon: "#F59E0B", hover: "rgba(245,158,11,0.05)" },
    preview: <ApprovalPreview />,
  },
  {
    title: "Task History",
    description: "Every action logged and reviewable. Audit exactly what Navii did while you were away.",
    icon: History,
    accent: { bg: "rgba(244,63,94,0.07)", border: "rgba(244,63,94,0.14)", icon: "#F43F5E", hover: "rgba(244,63,94,0.05)" },
    preview: <HistoryPreview />,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

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
            className="text-[10px] font-semibold tracking-[0.14em] text-blue-500 uppercase mb-3"
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
            className="text-[15px] text-slate-500 leading-relaxed"
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
              transition={{ duration: 0.5, delay: i * 0.055, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-xl p-5 bg-white cursor-default"
              style={{
                border: "1px solid rgba(15,23,42,0.07)",
                boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-2px)";
                el.style.boxShadow = `0 6px 20px rgba(15,23,42,0.08), 0 1px 4px rgba(15,23,42,0.04), 0 0 0 1px rgba(15,23,42,0.06)`;
                el.style.background = `linear-gradient(135deg, #fff 50%, ${feat.accent.hover})`;
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
                style={{ background: feat.accent.bg, border: `1px solid ${feat.accent.border}` }}
              >
                <feat.icon className="w-3.5 h-3.5" style={{ color: feat.accent.icon }} />
              </div>
              <h3 className="text-[13px] font-semibold text-gray-900 mb-1.5 tracking-tight">{feat.title}</h3>
              <p className="text-slate-500 text-[12px] leading-relaxed">{feat.description}</p>
              {feat.preview}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
