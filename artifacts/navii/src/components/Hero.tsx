import { motion } from "framer-motion";
import { useNavii } from "./NaviiContext";

export default function Hero() {
  const { setIsCommandPaletteOpen } = useNavii();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
      {/* Radial glow background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% -10%, rgba(59,130,246,0.10) 0%, transparent 65%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(59,130,246,0.04) 0%, transparent 60%)",
        }}
      />

      {/* Subtle noise grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Label pill */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-blue-200/60 bg-blue-50/80 text-blue-600 text-xs font-semibold tracking-wide mb-10"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"
            style={{ boxShadow: "0 0 6px rgba(59,130,246,0.8)" }}
          />
          AI Desktop Companion · Public Beta
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-7xl lg:text-8xl font-extrabold text-gray-900 mb-6 leading-[0.95] tracking-[-0.04em]"
        >
          Your AI companion
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 60%, #7C3AED 100%)",
            }}
          >
            that moves with you.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl text-slate-500 mb-10 max-w-xl mx-auto font-normal leading-relaxed"
        >
          Press{" "}
          <span className="font-mono text-sm font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded-md border border-slate-200">
            ⌥ Space
          </span>{" "}
          to summon Navii. Type what you need. Watch it happen.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
        >
          <button
            className="rounded-full px-8 h-12 text-[15px] font-semibold text-white transition-all active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #4F97FF 0%, #2563EB 100%)",
              boxShadow: "0 0 0 1px rgba(37,99,235,0.4), 0 8px 24px rgba(37,99,235,0.35), 0 2px 6px rgba(37,99,235,0.2)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 1px rgba(37,99,235,0.5), 0 12px 32px rgba(37,99,235,0.45), 0 2px 6px rgba(37,99,235,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 1px rgba(37,99,235,0.4), 0 8px 24px rgba(37,99,235,0.35), 0 2px 6px rgba(37,99,235,0.2)";
            }}
          >
            Download for Mac
          </button>
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="rounded-full px-8 h-12 text-[15px] font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-[0.97]"
            style={{ boxShadow: "0 1px 4px rgba(15,23,42,0.06), 0 4px 12px rgba(15,23,42,0.04)" }}
          >
            Try Option + Space
          </button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm text-slate-400 flex items-center justify-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Private by design. You approve important actions.
        </motion.p>
      </div>

      {/* Hero command card */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-20 z-10 w-full max-w-2xl mx-auto"
      >
        {/* Ambient glow behind card */}
        <div
          className="absolute inset-x-8 -top-4 h-24 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.18) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />

        {/* Card */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(20px) saturate(150%)",
            border: "1px solid rgba(15,23,42,0.07)",
            boxShadow:
              "0 2px 4px rgba(15,23,42,0.04), 0 12px 32px rgba(15,23,42,0.07), 0 32px 64px rgba(15,23,42,0.05)",
          }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-black/[0.05]">
            <div className="w-3 h-3 rounded-full bg-red-400/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div className="w-3 h-3 rounded-full bg-green-400/80" />
            <span className="ml-2 text-xs text-slate-400 font-medium">navii</span>
          </div>

          {/* Command row */}
          <div className="px-5 py-5 flex items-center gap-4">
            {/* Mini Navii cursor */}
            <motion.div
              animate={{ y: [0, -6, 0], x: [0, 3, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <svg width="14" height="18" viewBox="0 0 14 18" fill="none" style={{ filter: "drop-shadow(0 0 5px rgba(59,130,246,0.9)) drop-shadow(0 0 10px rgba(59,130,246,0.5))" }}>
                <defs>
                  <linearGradient id="heroGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#7FC3FF" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 12,7 7,10 3,18" fill="url(#heroGrad)" />
              </svg>
            </motion.div>

            <div className="flex-1">
              <p className="text-[11px] font-mono text-slate-400 mb-1">navii ~</p>
              <p className="text-slate-800 font-medium text-base">
                Open Spotify and play Blinding Lights
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "steps(1)" }}
                  className="ml-0.5 inline-block w-[2px] h-4 bg-blue-500 align-middle"
                />
              </p>
            </div>

            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-blue-500" style={{ boxShadow: "0 0 6px rgba(59,130,246,0.8)" }} />
              <span className="text-[11px] font-medium text-blue-500">Acting</span>
            </div>
          </div>

          {/* Step log preview */}
          <div className="px-5 pb-4 flex flex-col gap-1.5">
            {[
              { label: "Listening...", done: true },
              { label: "Understanding command...", done: true },
              { label: "Opening Spotify...", done: false, active: true },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                {s.done ? (
                  <svg className="w-3.5 h-3.5 text-green-500 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="8" fill="rgba(34,197,94,0.12)" />
                    <path d="M5 8l2 2 4-4" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-blue-400 border-t-transparent animate-spin flex-shrink-0" />
                )}
                <span className={`text-xs ${s.done ? "text-slate-400 line-through" : "text-slate-700 font-medium"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
