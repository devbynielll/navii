import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Youtube, AlignLeft, Scissors, Github } from "lucide-react";
import { useNavii } from "./NaviiContext";

const SUGGESTIONS = [
  { icon: Sparkles, text: "Open Spotify and play Blinding Lights", hint: "Music" },
  { icon: Youtube,  text: "Search YouTube for React tutorials",    hint: "Search" },
  { icon: AlignLeft, text: "Summarize this page",                  hint: "AI" },
  { icon: Scissors, text: "Find the Effects panel in CapCut",      hint: "App" },
  { icon: Github,   text: "Open GitHub and search my repos",       hint: "Dev" },
];

export default function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, triggerCommand } = useNavii();
  const inputRef = useRef<HTMLInputElement>(null);
  const [highlightedIdx, setHighlightedIdx] = useState(0);

  // Auto-focus input
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setHighlightedIdx(0);
    }
  }, [isCommandPaletteOpen]);

  // Rotate highlighted suggestion every 2.4s while open
  useEffect(() => {
    if (!isCommandPaletteOpen) return;
    const id = setInterval(() => {
      setHighlightedIdx(i => (i + 1) % SUGGESTIONS.length);
    }, 2400);
    return () => clearInterval(id);
  }, [isCommandPaletteOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.code === "Space") {
        e.preventDefault();
        setIsCommandPaletteOpen((prev: boolean) => !prev);
      }
      if (e.key === "Escape") setIsCommandPaletteOpen(false);
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
          {/* Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(6,6,10,0.52)", backdropFilter: "blur(5px)" }}
            onClick={() => setIsCommandPaletteOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ type: "spring", stiffness: 480, damping: 36, mass: 0.5 }}
            className="fixed z-50 left-1/2 -translate-x-1/2 w-full max-w-[520px]"
            style={{ top: "22%" }}
          >
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: "0 0 0 1px rgba(59,130,246,0.22), 0 0 48px rgba(59,130,246,0.10)" }}
            />

            {/* Glass panel */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(11,11,17,0.94)",
                backdropFilter: "blur(28px) saturate(180%)",
                boxShadow: "0 28px 72px rgba(0,0,0,0.52), inset 0 0 0 1px rgba(255,255,255,0.055)",
              }}
            >
              {/* Input */}
              <div
                className="flex items-center px-4 py-3.5 gap-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}
              >
                <svg width="11" height="14" viewBox="0 0 11 14" fill="none" style={{ flexShrink: 0, filter: "drop-shadow(0 0 3px rgba(59,130,246,0.85))" }}>
                  <defs>
                    <linearGradient id="palGrad2" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  <polygon points="0,0 10,5.5 6.5,7.5 2.5,14" fill="url(#palGrad2)" />
                </svg>

                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask Navii to do anything…"
                  className="flex-1 bg-transparent border-none outline-none text-[14px] font-medium text-white/88 placeholder:text-white/22"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit(e.currentTarget.value);
                    if (e.key === "ArrowDown") setHighlightedIdx(i => Math.min(i + 1, SUGGESTIONS.length - 1));
                    if (e.key === "ArrowUp")   setHighlightedIdx(i => Math.max(i - 1, 0));
                    if (e.key === "Tab") {
                      e.preventDefault();
                      if (inputRef.current) {
                        inputRef.current.value = SUGGESTIONS[highlightedIdx].text;
                      }
                    }
                  }}
                />

                <kbd className="px-1.5 py-0.5 rounded-md text-[10px] font-medium text-white/25 border border-white/08 bg-white/04 flex-shrink-0">
                  ⌥ Space
                </kbd>
              </div>

              {/* Suggestions */}
              <div className="pb-1.5 pt-1">
                <div className="px-4 py-1.5 text-[9px] font-semibold text-white/22 uppercase tracking-[0.12em]">
                  Suggestions
                </div>

                {SUGGESTIONS.map((item, i) => {
                  const isHighlighted = highlightedIdx === i;
                  return (
                    <motion.button
                      key={i}
                      layout
                      initial={{ opacity: 0, x: -3 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.035 }}
                      onClick={() => handleSubmit(item.text)}
                      className="flex items-center w-full px-3 py-2 mx-1 rounded-xl text-left relative overflow-hidden"
                      style={{
                        width: "calc(100% - 8px)",
                        background: isHighlighted ? "rgba(59,130,246,0.09)" : "transparent",
                        transition: "background 0.25s ease",
                      }}
                    >
                      {/* Subtle left accent when highlighted */}
                      {isHighlighted && (
                        <motion.div
                          layoutId="suggestion-accent"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full"
                          style={{ background: "#3B82F6", boxShadow: "0 0 6px rgba(59,130,246,0.7)" }}
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}

                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 transition-colors duration-200"
                        style={{
                          background: isHighlighted ? "rgba(59,130,246,0.18)" : "rgba(255,255,255,0.05)",
                        }}
                      >
                        <item.icon
                          className="w-3 h-3 transition-colors duration-200"
                          style={{ color: isHighlighted ? "#60A5FA" : "rgba(255,255,255,0.35)" }}
                        />
                      </div>

                      <span
                        className="flex-1 text-[13px] transition-colors duration-200"
                        style={{
                          color: isHighlighted ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.52)",
                          fontWeight: isHighlighted ? 500 : 400,
                        }}
                      >
                        {item.text}
                      </span>

                      <span
                        className="text-[10px] ml-2 flex-shrink-0 transition-colors duration-200"
                        style={{ color: isHighlighted ? "rgba(96,165,250,0.65)" : "rgba(255,255,255,0.18)" }}
                      >
                        {item.hint}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-between px-4 py-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.045)" }}
              >
                <div className="flex items-center gap-3 text-[10px] text-white/18">
                  <span>↵ run</span>
                  <span>⇥ fill</span>
                  <span>↑↓ navigate</span>
                </div>
                <span className="text-[10px] text-white/18">esc to close</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
