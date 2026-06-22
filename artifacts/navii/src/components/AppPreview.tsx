import { motion } from "framer-motion";

const logEntries = [
  { time: "09:41:02", label: "Opened Safari", status: "done" },
  { time: "09:41:03", label: "Navigated to spotify.com", status: "done" },
  { time: "09:41:04", label: "Searched Blinding Lights", status: "done" },
  { time: "09:41:05", label: "Clicking play…", status: "active" },
];

export default function AppPreview() {
  return (
    <section className="py-28 px-6 overflow-hidden" style={{ background: "linear-gradient(180deg, #fff 0%, #f8fafc 100%)" }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-4"
          >
            Desktop App
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4"
          >
            Everything in one view.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-lg text-slate-500 max-w-md mx-auto"
          >
            Full control and visibility over your AI companion, in a beautifully focused window.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-2xl overflow-hidden"
          style={{
            background: "#0D0D12",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 40px 80px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.2)",
            aspectRatio: "16/9",
          }}
        >
          {/* Inner ambient glow */}
          <div
            className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 80% 80% at 50% -10%, rgba(59,130,246,0.10) 0%, transparent 70%)",
            }}
          />

          {/* Top bar */}
          <div
            className="flex items-center justify-between px-4 h-11 relative"
            style={{
              background: "rgba(255,255,255,0.03)",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" style={{ boxShadow: "0 0 4px rgba(255,95,87,0.4)" }} />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" style={{ boxShadow: "0 0 4px rgba(255,189,46,0.3)" }} />
              <div className="w-3 h-3 rounded-full bg-[#27C840]" style={{ boxShadow: "0 0 4px rgba(39,200,64,0.3)" }} />
            </div>

            {/* Logo + title */}
            <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
              <svg width="12" height="15" viewBox="0 0 12 15" fill="none" style={{ filter: "drop-shadow(0 0 4px rgba(59,130,246,0.9))" }}>
                <defs>
                  <linearGradient id="appBarGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7FC3FF" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 10,6 6,9 2,15" fill="url(#appBarGrad)" />
              </svg>
              <span className="text-[13px] font-semibold text-white/70 tracking-tight">Navii</span>
            </div>

            {/* Status pill */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold text-blue-300"
              style={{
                background: "rgba(59,130,246,0.12)",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-blue-400"
                style={{ boxShadow: "0 0 4px rgba(96,165,250,0.8)" }}
              />
              Acting
            </div>
          </div>

          {/* Body */}
          <div className="flex overflow-hidden" style={{ height: "calc(100% - 44px - 48px)" }}>
            {/* Main panel */}
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative gap-6">
              {/* Command card */}
              <div
                className="w-full max-w-md rounded-xl p-4 relative"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  className="text-[13px] text-white/40 mb-2 border-b pb-2 flex items-center gap-2"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-500/50 border-t-blue-400 animate-spin" />
                  <span>Open Spotify and play Blinding Lights</span>
                </div>
                <div className="text-xs text-blue-400/80">Searching for track in library…</div>
              </div>

              {/* Animated glow cursor inside preview */}
              <motion.div
                animate={{
                  x: [-90, 40, 10, -90],
                  y: [-30, 20, 60, -30],
                }}
                transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                className="absolute pointer-events-none"
                style={{ zIndex: 20 }}
              >
                <svg width="13" height="17" viewBox="0 0 13 17" fill="none" style={{ filter: "drop-shadow(0 0 5px rgba(59,130,246,1)) drop-shadow(0 0 10px rgba(59,130,246,0.6))" }}>
                  <defs>
                    <linearGradient id="previewCursorGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#93C5FD" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  <polygon points="0,0 11,6 7,9 3,17" fill="url(#previewCursorGrad)" />
                </svg>
              </motion.div>
            </div>

            {/* Activity log sidebar */}
            <div
              className="w-56 flex-shrink-0 flex flex-col p-4 gap-3"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderLeft: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-1">
                Activity Log
              </div>

              {logEntries.map((entry, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="flex items-start gap-2.5"
                >
                  {entry.status === "done" ? (
                    <div className="w-3.5 h-3.5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    </div>
                  ) : (
                    <motion.div
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ repeat: Infinity, duration: 1.2 }}
                      className="w-3.5 h-3.5 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400" style={{ boxShadow: "0 0 4px rgba(96,165,250,0.8)" }} />
                    </motion.div>
                  )}
                  <div>
                    <div className={`text-[12px] leading-snug ${entry.status === "active" ? "text-blue-300" : "text-white/50"}`}>
                      {entry.label}
                    </div>
                    <div className="text-[10px] text-white/20 font-mono mt-0.5">{entry.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-12 flex items-center px-4 gap-4"
            style={{
              background: "rgba(255,255,255,0.025)",
              borderTop: "1px solid rgba(255,255,255,0.05)",
            }}
          >
            {/* Progress bar */}
            <div className="flex-1 max-w-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-white/25">Progress</span>
                <span className="text-[10px] text-white/25">65%</span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: "30%" }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="h-full rounded-full"
                  style={{ background: "linear-gradient(90deg, #3B82F6, #60A5FA)" }}
                />
              </div>
            </div>

            <div className="flex gap-2 ml-auto">
              <button
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-red-400 transition-colors hover:bg-red-500/10"
                style={{ border: "1px solid rgba(239,68,68,0.2)" }}
              >
                Stop
              </button>
              <button
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white transition-colors"
                style={{
                  background: "linear-gradient(135deg, #4F97FF 0%, #2563EB 100%)",
                  boxShadow: "0 2px 8px rgba(37,99,235,0.35)",
                }}
              >
                Approve
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
