import { motion } from "framer-motion";

export default function DownloadSection() {
  return (
    <section id="download" className="py-28 px-6 bg-white relative overflow-hidden">
      {/* Radial glow behind the logo */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(59,130,246,0.09) 0%, transparent 70%)",
          filter: "blur(32px)",
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        {/* Navii glyph */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center mb-8"
        >
          <div className="relative">
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                boxShadow: "0 0 0 1px rgba(59,130,246,0.2), 0 0 32px rgba(59,130,246,0.15)",
              }}
            />
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center relative"
              style={{
                background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(99,102,241,0.10) 100%)",
                border: "1px solid rgba(59,130,246,0.18)",
              }}
            >
              <svg width="18" height="23" viewBox="0 0 18 23" fill="none" style={{ filter: "drop-shadow(0 0 6px rgba(59,130,246,0.8))" }}>
                <defs>
                  <linearGradient id="dlGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#60A5FA" />
                    <stop offset="55%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#4F46E5" />
                  </linearGradient>
                </defs>
                <polygon points="0,0 16,9 10,13 4,23" fill="url(#dlGrad)" />
              </svg>
            </div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-3"
        >
          Start with a command.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="text-base text-slate-500 mb-10"
        >
          Press <span className="font-mono text-[12px] font-semibold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200/80">⌥ Space</span> and let Navii do the rest.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-5"
        >
          <button
            className="rounded-full px-8 h-11 text-[14px] font-semibold text-white w-full sm:w-auto transition-all active:scale-[0.97]"
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
            className="rounded-full px-8 h-11 text-[14px] font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 w-full sm:w-auto transition-all active:scale-[0.97]"
            style={{ boxShadow: "0 1px 3px rgba(15,23,42,0.06), 0 3px 10px rgba(15,23,42,0.04)" }}
          >
            Join Windows waitlist
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="text-[12px] text-slate-400"
        >
          Requires macOS 13.0 or later · Free during beta
        </motion.p>
      </div>
    </section>
  );
}
