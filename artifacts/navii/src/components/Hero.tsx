import { motion } from "framer-motion";
import { useNavii } from "./NaviiContext";

export default function Hero() {
  const { setIsCommandPaletteOpen } = useNavii();

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-14 pb-20 px-6 overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -5%, rgba(59,130,246,0.09) 0%, transparent 60%), radial-gradient(ellipse 50% 30% at 75% 85%, rgba(79,70,229,0.04) 0%, transparent 60%)",
        }}
      />
      {/* Grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200/70 bg-blue-50/90 text-blue-600 text-[11px] font-semibold tracking-wide mb-8"
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block"
            style={{ boxShadow: "0 0 5px rgba(59,130,246,0.9)" }}
          />
          AI Desktop Companion · Public Beta
        </motion.div>

        {/* Headline — calibrated for elegance at all sizes */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="font-extrabold text-gray-900 mb-5 leading-[0.95] tracking-[-0.04em]"
          style={{ fontSize: "clamp(2.8rem, 7vw, 5rem)" }}
        >
          Your AI companion
          <br />
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: "linear-gradient(130deg, #3B82F6 10%, #2563EB 50%, #6366F1 90%)",
            }}
          >
            that moves with you.
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
          className="text-base md:text-lg text-slate-500 mb-9 max-w-md mx-auto font-normal leading-relaxed"
        >
          Press{" "}
          <span className="font-mono text-[12px] font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/80">
            ⌥ Space
          </span>{" "}
          to summon Navii. Type what you need. Watch it happen.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-7"
        >
          <button
            className="rounded-full px-7 h-11 text-[14px] font-semibold text-white transition-all active:scale-[0.97]"
            style={{
              background: "linear-gradient(135deg, #4F97FF 0%, #2563EB 100%)",
              boxShadow: "0 0 0 1px rgba(37,99,235,0.35), 0 6px 20px rgba(37,99,235,0.30), 0 2px 4px rgba(37,99,235,0.15)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 1px rgba(37,99,235,0.45), 0 10px 28px rgba(37,99,235,0.40), 0 2px 4px rgba(37,99,235,0.15)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 1px rgba(37,99,235,0.35), 0 6px 20px rgba(37,99,235,0.30), 0 2px 4px rgba(37,99,235,0.15)";
            }}
          >
            Download for Mac
          </button>
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="rounded-full px-7 h-11 text-[14px] font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-[0.97]"
            style={{ boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 3px 10px rgba(15,23,42,0.04)" }}
          >
            Try Option + Space
          </button>
        </motion.div>

        {/* Trust */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.36 }}
          className="text-[13px] text-slate-400 flex items-center justify-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Private by design. You approve important actions.
        </motion.p>
      </div>

      {/* Hero card */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative mt-16 z-10 w-full max-w-xl mx-auto"
      >
        {/* Glow behind card */}
        <div
          className="absolute inset-x-12 -top-3 h-16 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.16) 0%, transparent 70%)",
            filter: "blur(16px)",
          }}
        />

        {/* Card */}
        <div
          className="relative rounded-xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(20px) saturate(160%)",
            border: "1px solid rgba(15,23,42,0.07)",
            boxShadow: "0 2px 4px rgba(15,23,42,0.04), 0 10px 28px rgba(15,23,42,0.07), 0 28px 56px rgba(15,23,42,0.04)",
          }}
        >
          {/* Window chrome */}
          <div
            className="flex items-center gap-1.5 px-4 py-2.5"
            style={{ borderBottom: "1px solid rgba(15,23,42,0.05)" }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            <span className="ml-2 text-[11px] text-slate-400 font-medium tracking-wide">navii</span>
          </div>

          {/* Command */}
          <div className="px-4 py-4 flex items-center gap-3">
            <motion.div
              animate={{ y: [0, -5, 0], x: [0, 2, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
              className="flex-shrink-0"
            >
              <svg width="10" height="13" viewBox="0 0 10 13" fill="none" style={{ filter: "drop-shadow(0 0 4px rgba(59,130,246,0.85)) drop-shadow(0 0 8px rgba(59,130,246,0.4))" }}>
                <defs>
                  <linearGradient id="heroCardGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 9,5 5.5,7 2,13" fill="url(#heroCardGrad)" />
              </svg>
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-mono text-slate-400 mb-0.5">navii ~</p>
              <p className="text-slate-800 font-medium text-sm truncate">
                Open Spotify and play Blinding Lights
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "steps(1)" }}
                  className="ml-0.5 inline-block w-0.5 h-3.5 bg-blue-500 align-middle"
                />
              </p>
            </div>
            <div className="flex items-center gap-1 flex-shrink-0">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" style={{ boxShadow: "0 0 5px rgba(59,130,246,0.8)" }} />
              <span className="text-[11px] font-medium text-blue-500">Acting</span>
            </div>
          </div>

          {/* Steps */}
          <div className="px-4 pb-4 flex flex-col gap-1.5">
            {[
              { label: "Listening...", done: true },
              { label: "Understanding command...", done: true },
              { label: "Opening Spotify...", done: false },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                {s.done ? (
                  <svg className="w-3 h-3 flex-shrink-0" viewBox="0 0 12 12" fill="none">
                    <circle cx="6" cy="6" r="6" fill="rgba(34,197,94,0.12)" />
                    <path d="M3.5 6l1.8 1.8 3.2-3.6" stroke="#22C55E" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <div className="w-3 h-3 rounded-full border-2 border-blue-400 border-t-transparent animate-spin flex-shrink-0" />
                )}
                <span className={`text-[12px] ${s.done ? "text-slate-400 line-through" : "text-slate-700 font-medium"}`}>
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
