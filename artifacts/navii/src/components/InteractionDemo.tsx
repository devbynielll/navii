import React from "react";
import { motion } from "framer-motion";
import { useNavii } from "./NaviiContext";

const STEPS: Array<{
  n: string;
  title: string;
  body: string;
  visual: React.ReactNode;
}> = [
  {
    n: "01",
    title: "Press ⌥ Space",
    body: "Summon Navii from anywhere. No mouse, no menus, no switching windows.",
    visual: (
      <div className="flex items-center gap-1.5 mt-5">
        <kbd className="px-2 py-1.5 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 shadow-sm select-none">
          ⌥
        </kbd>
        <div className="w-3 h-px bg-slate-200" />
        <kbd className="px-2.5 py-1.5 rounded-lg text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 shadow-sm select-none">
          Space
        </kbd>
      </div>
    ),
  },
  {
    n: "02",
    title: "Type a command",
    body: "Plain English. No rigid syntax, no shortcuts to learn.",
    visual: (
      <div
        className="mt-5 flex items-center gap-1.5 px-2.5 py-2 rounded-lg"
        style={{ background: "rgba(11,11,17,0.90)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        <svg width="7" height="9" viewBox="0 0 10 13" fill="none" style={{ filter: "drop-shadow(0 0 3px rgba(59,130,246,0.9))", flexShrink: 0 }}>
          <defs>
            <linearGradient id="idG1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#60A5FA" /><stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <polygon points="0,0 9,5 5.5,7 2,13" fill="url(#idG1)" />
        </svg>
        <span className="text-[10px] text-white/40 truncate">Open Spotify…</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 0.9, ease: "steps(1)" }}
          className="w-0.5 h-3 bg-blue-400 flex-shrink-0"
        />
      </div>
    ),
  },
  {
    n: "03",
    title: "Navii thinks",
    body: "It understands your intent, plans the steps, and confirms anything sensitive.",
    visual: (
      <div className="mt-5 flex items-center gap-2">
        {[0, 0.18, 0.36].map((delay, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -5, 0] }}
            transition={{ repeat: Infinity, duration: 0.9, delay, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#3B82F6", boxShadow: "0 0 5px rgba(59,130,246,0.7)" }}
          />
        ))}
      </div>
    ),
  },
  {
    n: "04",
    title: "Navii acts",
    body: "Your glowing companion navigates your desktop, executing the task step by step.",
    visual: (
      <div
        className="mt-5 relative h-12 rounded-lg overflow-hidden"
        style={{ background: "rgba(59,130,246,0.04)", border: "1px solid rgba(59,130,246,0.08)" }}
      >
        <motion.div
          animate={{ x: [-22, 20, 6, -22], y: [-6, 14, 24, -6] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute"
          style={{ left: "50%", top: "50%" }}
        >
          <div
            style={{
              width: 8, height: 11,
              clipPath: "polygon(0 0, 100% 44%, 64% 60%, 28% 100%)",
              background: "linear-gradient(135deg, #93C5FD 0%, #2563EB 100%)",
              filter: "drop-shadow(0 0 4px rgba(59,130,246,0.9))",
            }}
          />
        </motion.div>
      </div>
    ),
  },
  {
    n: "05",
    title: "Task complete",
    body: "Done and logged. Navii returns to your cursor, waiting for the next command.",
    visual: (
      <motion.div
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ repeat: Infinity, duration: 2.6, ease: "easeInOut" }}
        className="mt-5 w-9 h-9 rounded-full flex items-center justify-center"
        style={{
          background: "rgba(34,197,94,0.10)",
          border: "1px solid rgba(34,197,94,0.22)",
          boxShadow: "0 0 14px rgba(34,197,94,0.08)",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2.5 7L5.5 10L11.5 4" stroke="#22C55E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    ),
  },
];

export default function InteractionDemo() {
  const { openCommandPalette } = useNavii();

  return (
    <section
      id="demo"
      className="py-28 px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #f8fafc 0%, #fff 50%, #f8fafc 100%)" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(59,130,246,0.04) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-0 left-0 w-full h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(15,23,42,0.06), transparent)" }}
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] font-semibold tracking-[0.14em] text-blue-500 uppercase mb-3"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4"
          >
            From thought to action.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-[16px] text-slate-500 max-w-sm mx-auto leading-relaxed"
          >
            Navii doesn't give you instructions — it does the work.
          </motion.p>
        </div>

        {/* Connected pipeline */}
        <div className="relative">
          {/* Animated connector line (desktop) */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="absolute top-[22px] hidden lg:block origin-left"
            style={{
              left: "calc(10% + 22px)",
              right: "calc(10% + 22px)",
              height: 1,
              background: "linear-gradient(90deg, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.15) 100%)",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-4">
            {STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col"
              >
                {/* Circle node on line */}
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 mb-5 relative"
                  style={{
                    background: i === 4 ? "rgba(34,197,94,0.08)" : "rgba(59,130,246,0.07)",
                    border: `1px solid ${i === 4 ? "rgba(34,197,94,0.20)" : "rgba(59,130,246,0.18)"}`,
                  }}
                >
                  <span
                    className="text-[10px] font-bold"
                    style={{ color: i === 4 ? "#22C55E" : "#3B82F6" }}
                  >
                    {step.n}
                  </span>
                </div>

                <h3 className="text-[14px] font-semibold text-gray-900 mb-1.5 tracking-tight leading-snug">
                  {step.title}
                </h3>
                <p className="text-[12px] text-slate-500 leading-relaxed flex-1">{step.body}</p>
                {step.visual}
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={(e) => {
              const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
              openCommandPalette(rect.left + rect.width / 2, rect.bottom + 12);
            }}
            className="rounded-full px-8 h-11 text-[13px] font-semibold text-white transition-all active:scale-[0.97]"
            style={{
              background: "#0D0D12",
              boxShadow: "0 2px 8px rgba(0,0,0,0.13), 0 1px 2px rgba(0,0,0,0.08)",
              letterSpacing: "0.01em",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1a1a24"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0D0D12"; }}
          >
            Try it now — press ⌥ Space
          </button>
        </motion.div>
      </div>
    </section>
  );
}
