import { motion } from "framer-motion";

const logEntries = [
  { time: "09:41:02", label: "Opened Safari", status: "done" },
  { time: "09:41:03", label: "Navigated to spotify.com", status: "done" },
  { time: "09:41:04", label: "Searched Blinding Lights", status: "done" },
  { time: "09:41:05", label: "Clicking play…", status: "active" },
];

export default function AppPreview() {
  return (
    <section className="py-24 px-6 overflow-hidden relative" style={{ background: "linear-gradient(180deg, #fff 0%, #f8fafc 100%)" }}>
      <div
        className="absolute top-0 left-0 w-full h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(15,23,42,0.06), transparent)" }}
      />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold tracking-widest text-blue-500 uppercase mb-3"
          >
            Desktop App
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-3"
          >
            Everything in one view.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-base text-slate-500 max-w-sm mx-auto"
          >
            Full control and visibility over your AI companion in a focused window.
          </motion.p>
        </div>

        {/* Blue ambient glow behind window */}
        <div className="relative">
          <div
            className="absolute -inset-4 rounded-3xl pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)",
              filter: "blur(24px)",
            }}
          />

          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full rounded-xl overflow-hidden"
            style={{
              aspectRatio: "16/9",
              background: "linear-gradient(160deg, #0e0e16 0%, #0a0a11 100%)",
              border: "1px solid rgba(255,255,255,0.07)",
              boxShadow:
                "0 0 0 1px rgba(0,0,0,0.25), 0 32px 64px rgba(0,0,0,0.28), 0 8px 24px rgba(0,0,0,0.16)",
            }}
          >
            {/* Top ambient */}
            <div
              className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 70% 100% at 50% -10%, rgba(59,130,246,0.09) 0%, transparent 70%)",
              }}
            />

            {/* Title bar */}
            <div
              className="relative flex items-center justify-between px-4 h-10"
              style={{
                background: "rgba(255,255,255,0.025)",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57", boxShadow: "0 0 4px rgba(255,95,87,0.5)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FFBD2E", boxShadow: "0 0 4px rgba(255,189,46,0.4)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#27C840", boxShadow: "0 0 4px rgba(39,200,64,0.4)" }} />
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                <svg width="10" height="13" viewBox="0 0 10 13" fill="none" style={{ filter: "drop-shadow(0 0 3px rgba(59,130,246,0.8))" }}>
                  <defs>
                    <linearGradient id="appLogoGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  <polygon points="0,0 9,5 5.5,7 2,13" fill="url(#appLogoGrad)" />
                </svg>
                <span className="text-[12px] font-semibold text-white/60 tracking-tight">Navii</span>
              </div>

              {/* Status pill */}
              <div
                className="flex items-center gap-1.5 px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(59,130,246,0.10)",
                  border: "1px solid rgba(59,130,246,0.18)",
                }}
              >
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.4 }}
                  className="w-1 h-1 rounded-full bg-blue-400"
                  style={{ boxShadow: "0 0 4px rgba(96,165,250,0.9)" }}
                />
                <span className="text-[10px] font-semibold text-blue-300 tracking-wide">Acting</span>
              </div>
            </div>

            {/* Body */}
            <div className="flex overflow-hidden" style={{ height: "calc(100% - 40px - 44px)" }}>
              {/* Main */}
              <div className="flex-1 flex items-center justify-center p-6 relative">
                {/* Command card */}
                <div
                  className="w-full max-w-sm rounded-lg p-4"
                  style={{
                    background: "rgba(255,255,255,0.035)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.18) inset 0 1px 0 rgba(255,255,255,0.04)",
                  }}
                >
                  <div
                    className="text-[12px] text-white/35 mb-2 pb-2 flex items-center gap-2"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div className="w-3 h-3 rounded-full border-2 border-blue-500/40 border-t-blue-400 animate-spin flex-shrink-0" />
                    <span className="truncate">Open Spotify and play Blinding Lights</span>
                  </div>
                  <span className="text-[11px] text-blue-400/80">Searching for track in library…</span>
                </div>

                {/* Animated cursor */}
                <motion.div
                  animate={{ x: [-80, 36, 8, -80], y: [-24, 18, 52, -24] }}
                  transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
                  className="absolute pointer-events-none"
                >
                  <svg width="10" height="13" viewBox="0 0 10 13" fill="none" style={{ filter: "drop-shadow(0 0 4px rgba(59,130,246,1)) drop-shadow(0 0 8px rgba(59,130,246,0.6))" }}>
                    <defs>
                      <linearGradient id="previewGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#93C5FD" />
                        <stop offset="100%" stopColor="#2563EB" />
                      </linearGradient>
                    </defs>
                    <polygon points="0,0 9,5 5.5,7 2,13" fill="url(#previewGrad)" />
                  </svg>
                </motion.div>
              </div>

              {/* Activity log */}
              <div
                className="w-48 flex-shrink-0 flex flex-col p-4 gap-3"
                style={{
                  background: "rgba(255,255,255,0.015)",
                  borderLeft: "1px solid rgba(255,255,255,0.045)",
                }}
              >
                <div className="text-[9px] font-semibold text-white/22 uppercase tracking-[0.12em] mb-0.5">
                  Activity Log
                </div>

                {logEntries.map((entry, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-start gap-2"
                  >
                    {entry.status === "done" ? (
                      <div className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center" style={{ background: "rgba(34,197,94,0.12)" }}>
                        <div className="w-1 h-1 rounded-full bg-green-400" />
                      </div>
                    ) : (
                      <motion.div
                        animate={{ opacity: [1, 0.25, 1] }}
                        transition={{ repeat: Infinity, duration: 1.3 }}
                        className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center"
                        style={{ background: "rgba(59,130,246,0.12)" }}
                      >
                        <div className="w-1 h-1 rounded-full bg-blue-400" style={{ boxShadow: "0 0 4px rgba(96,165,250,0.9)" }} />
                      </motion.div>
                    )}
                    <div>
                      <div className={`text-[11px] leading-snug ${entry.status === "active" ? "text-blue-300" : "text-white/45"}`}>
                        {entry.label}
                      </div>
                      <div className="text-[9px] text-white/18 font-mono mt-0.5">{entry.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div
              className="absolute bottom-0 left-0 right-0 h-11 flex items-center px-4 gap-4"
              style={{
                background: "rgba(255,255,255,0.02)",
                borderTop: "1px solid rgba(255,255,255,0.045)",
              }}
            >
              <div className="flex-1 max-w-[220px]">
                <div className="flex justify-between mb-1">
                  <span className="text-[9px] text-white/22">Progress</span>
                  <span className="text-[9px] text-white/22">65%</span>
                </div>
                <div className="h-0.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
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
                  className="px-3 py-1 rounded-md text-[11px] font-semibold text-red-400 transition-colors hover:bg-red-500/08"
                  style={{ border: "1px solid rgba(239,68,68,0.18)" }}
                >
                  Stop
                </button>
                <button
                  className="px-3 py-1 rounded-md text-[11px] font-semibold text-white"
                  style={{
                    background: "linear-gradient(135deg, #4F97FF 0%, #2563EB 100%)",
                    boxShadow: "0 2px 6px rgba(37,99,235,0.3)",
                  }}
                >
                  Approve
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
