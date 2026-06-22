import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        background: "rgba(250,251,252,0.82)",
        backdropFilter: "blur(16px) saturate(180%)",
        borderBottom: "1px solid rgba(15,23,42,0.06)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none" style={{ filter: "drop-shadow(0 0 4px rgba(59,130,246,0.7))" }}>
            <defs>
              <linearGradient id="navLogoGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#2563EB" />
              </linearGradient>
            </defs>
            <polygon points="0,0 12,7 7,10 3,18" fill="url(#navLogoGrad)" />
          </svg>
          <span className="font-semibold text-[15px] tracking-tight text-gray-900">Navii</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6">
          {["Product", "Features", "Safety", "FAQ"].map((label) => (
            <a
              key={label}
              href={`#${label.toLowerCase()}`}
              className="text-[13px] font-medium text-slate-500 relative group transition-colors hover:text-slate-900"
            >
              {label}
              <span
                className="absolute -bottom-0.5 left-0 w-0 h-px bg-blue-500 group-hover:w-full transition-all duration-200"
              />
            </a>
          ))}
        </div>

        {/* CTA */}
        <button
          className="rounded-full px-5 h-8 text-[13px] font-semibold text-white transition-all active:scale-[0.97]"
          style={{
            background: "linear-gradient(135deg, #4F97FF 0%, #2563EB 100%)",
            boxShadow: "0 1px 4px rgba(37,99,235,0.3), 0 4px 12px rgba(37,99,235,0.2)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 1px 4px rgba(37,99,235,0.4), 0 6px 16px rgba(37,99,235,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 1px 4px rgba(37,99,235,0.3), 0 4px 12px rgba(37,99,235,0.2)";
          }}
        >
          Download
        </button>
      </div>
    </motion.nav>
  );
}
