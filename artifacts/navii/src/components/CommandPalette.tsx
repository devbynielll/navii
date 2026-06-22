import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Youtube, AlignLeft, Scissors, Github } from "lucide-react";
import { useNavii } from "./NaviiContext";

const SUGGESTIONS = [
  { icon: Sparkles, text: "Open Spotify and play Blinding Lights", hint: "Music" },
  { icon: Youtube, text: "Search YouTube for React tutorials", hint: "Search" },
  { icon: AlignLeft, text: "Summarize this page", hint: "AI" },
  { icon: Scissors, text: "Find the Effects panel in CapCut", hint: "App" },
  { icon: Github, text: "Open GitHub and search my repos", hint: "Dev" },
];

export default function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, triggerCommand } = useNavii();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isCommandPaletteOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.code === "Space") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev: boolean) => !prev);
      }
      if (e.key === "Escape") {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsCommandPaletteOpen]);

  const handleSubmit = (text: string) => {
    if (!text.trim()) return;
    triggerCommand(text);
    setIsCommandPaletteOpen(false);
  };

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(8,8,12,0.55)", backdropFilter: "blur(4px)" }}
            onClick={() => setIsCommandPaletteOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.5 }}
            className="fixed z-50 left-1/2 top-[22%] -translate-x-1/2 w-full max-w-xl"
            style={{ perspective: 1000 }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow: "0 0 0 1px rgba(59,130,246,0.25), 0 0 60px rgba(59,130,246,0.12)",
              }}
            />

            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(12,12,18,0.92)",
                backdropFilter: "blur(24px) saturate(180%)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06) inset",
              }}
            >
              {/* Input row */}
              <div className="flex items-center px-4 py-3.5 gap-3 border-b border-white/[0.06]">
                {/* Navii glyph */}
                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" style={{ flexShrink: 0, filter: "drop-shadow(0 0 4px rgba(59,130,246,0.8))" }}>
                  <defs>
                    <linearGradient id="palGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#7FC3FF" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  <polygon points="0,0 12,7 7,10 3,18" fill="url(#palGrad)" />
                </svg>

                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask Navii to do anything…"
                  className="flex-1 bg-transparent border-none outline-none text-[15px] font-medium text-white/90 placeholder:text-white/25"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit(e.currentTarget.value);
                  }}
                />

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <kbd className="px-1.5 py-0.5 rounded-md text-[11px] font-medium text-white/30 border border-white/10 bg-white/5">
                    ⌥ Space
                  </kbd>
                </div>
              </div>

              {/* Suggestions */}
              <div className="py-1.5">
                <div className="px-4 pt-2 pb-1.5 text-[10px] font-semibold text-white/25 uppercase tracking-widest">
                  Suggestions
                </div>
                {SUGGESTIONS.map((item, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleSubmit(item.text)}
                    className="flex items-center w-full px-3 py-2.5 mx-1 rounded-xl group transition-all"
                    style={{ width: "calc(100% - 8px)" }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(59,130,246,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "transparent";
                    }}
                  >
                    <div className="w-7 h-7 rounded-lg bg-white/[0.06] flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                      <item.icon className="w-3.5 h-3.5 text-white/40 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <span className="flex-1 text-sm text-white/60 group-hover:text-white/90 text-left transition-colors">
                      {item.text}
                    </span>
                    <span className="text-[10px] text-white/20 group-hover:text-blue-400/60 transition-colors ml-2 flex-shrink-0">
                      {item.hint}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Footer hint */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.05]">
                <span className="text-[11px] text-white/20">↵ to run</span>
                <span className="text-[11px] text-white/20">esc to close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
