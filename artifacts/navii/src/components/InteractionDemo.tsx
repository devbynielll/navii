import { motion } from "framer-motion";
import { useNavii } from "./NaviiContext";

const steps = [
  {
    number: "01",
    title: "Press ⌥ Space",
    description: "Summon Navii from anywhere on your Mac. No mouse required.",
    visual: (
      <div className="flex items-center gap-2">
        <kbd className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-white border border-slate-200 text-slate-700 shadow-sm">⌥</kbd>
        <span className="text-slate-400 text-sm font-medium">+</span>
        <kbd className="px-3 py-1.5 rounded-lg text-sm font-semibold bg-white border border-slate-200 text-slate-700 shadow-sm">Space</kbd>
      </div>
    ),
  },
  {
    number: "02",
    title: "Type your command",
    description: "Use plain English. Navii understands context and intent.",
    visual: (
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm"
        style={{
          background: "rgba(12,12,18,0.88)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <svg width="10" height="13" viewBox="0 0 10 13" fill="none" style={{ filter: "drop-shadow(0 0 3px rgba(59,130,246,0.9))", flexShrink: 0 }}>
          <defs>
            <linearGradient id="demoGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7FC3FF" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <polygon points="0,0 9,5 5,8 2,13" fill="url(#demoGrad)" />
        </svg>
        <span className="text-white/60 text-xs">Open Spotify and play Blinding Lights</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ repeat: Infinity, duration: 1, ease: "steps(1)" }}
          className="w-0.5 h-3.5 bg-blue-400 inline-block"
        />
      </div>
    ),
  },
  {
    number: "03",
    title: "Watch Navii act",
    description: "Your glowing co-pilot executes the task step by step, asking before anything risky.",
    visual: (
      <div className="flex flex-col gap-1.5">
        {[
          { label: "Opening Spotify", done: true },
          { label: "Searching track", done: false, active: true },
        ].map((s, i) => (
          <div key={i} className="flex items-center gap-2">
            {s.done ? (
              <div className="w-3 h-3 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              </div>
            ) : (
              <div className="w-3 h-3 rounded-full border-2 border-blue-400 border-t-transparent animate-spin flex-shrink-0" />
            )}
            <span className={`text-xs ${s.done ? "text-slate-400 line-through" : "text-slate-700 font-medium"}`}>{s.label}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function InteractionDemo() {
  const { setIsCommandPaletteOpen } = useNavii();

  return (
    <section id="demo" className="py-28 px-6 bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(59,130,246,0.04) 0%, transparent 70%)" }}
      />

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold tracking-widest text-blue-500 uppercase mb-4"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4"
          >
            From thought to action.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="text-lg text-slate-500 max-w-md mx-auto"
          >
            Navii doesn't give you instructions — it does the work.
          </motion.p>
        </div>

        {/* Step cards with connecting line */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div className="absolute top-12 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px hidden md:block"
            style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.2), rgba(59,130,246,0.2), transparent)" }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-2xl p-6"
                style={{
                  background: "linear-gradient(135deg, #f8fafc 0%, #fff 100%)",
                  border: "1px solid rgba(15,23,42,0.07)",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.04)",
                }}
              >
                {/* Step number */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-blue-500 flex-shrink-0"
                    style={{ background: "rgba(59,130,246,0.08)", border: "1px solid rgba(59,130,246,0.15)" }}
                  >
                    {step.number}
                  </div>
                </div>

                <h3 className="text-[17px] font-semibold text-gray-900 mb-2 tracking-tight">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{step.description}</p>

                {/* Visual element */}
                <div className="mt-auto">{step.visual}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-14"
        >
          <button
            onClick={() => setIsCommandPaletteOpen(true)}
            className="rounded-full px-8 h-12 text-[15px] font-semibold text-white transition-all active:scale-[0.97]"
            style={{
              background: "#0D0D12",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.1)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1a1a24"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#0D0D12"; }}
          >
            Try it live
          </button>
        </motion.div>
      </div>
    </section>
  );
}
