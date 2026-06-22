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

const PALETTE_W = 520;

// Module-level mouse tracker — updated even when palette is closed
let _mx = 640;
let _my = 300;

export default function CommandPalette() {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    triggerCommand,
    paletteOrigin,
    autoRunPending,
    setAutoRunPending,
    openCommandPalette,
  } = useNavii();

  const [highlightedIdx, setHighlightedIdx] = useState(0);
  const [inputValue, setInputValue]         = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Track mouse globally for keyboard shortcut positioning
  useEffect(() => {
    const onMove = (e: MouseEvent) => { _mx = e.clientX; _my = e.clientY; };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.code === "Space") {
        e.preventDefault();
        if (isCommandPaletteOpen) {
          setIsCommandPaletteOpen(false);
        } else {
          openCommandPalette(_mx, _my);
        }
      }
      if (e.key === "Escape" && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isCommandPaletteOpen, openCommandPalette, setIsCommandPaletteOpen]);

  // Reset + focus on open
  useEffect(() => {
    if (isCommandPaletteOpen) {
      setInputValue("");
      setHighlightedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 60);
    }
  }, [isCommandPaletteOpen]);

  // Rotating suggestion highlight (2.4s interval)
  useEffect(() => {
    if (!isCommandPaletteOpen) return;
    const id = setInterval(() => {
      setHighlightedIdx(i => (i + 1) % SUGGESTIONS.length);
    }, 2400);
    return () => clearInterval(id);
  }, [isCommandPaletteOpen]);

  // Auto-run demo sequence (triggered from Hero button)
  useEffect(() => {
    if (!isCommandPaletteOpen || !autoRunPending) return;
    setAutoRunPending(false);

    const TARGET = SUGGESTIONS[0].text;
    let alive = true;

    const t1 = setTimeout(() => {
      if (!alive) return;
      setInputValue(TARGET); // fill instantly
      const t2 = setTimeout(() => {
        if (!alive) return;
        handleSubmit(TARGET);
      }, 700);
      return () => clearTimeout(t2);
    }, 950);

    return () => { alive = false; clearTimeout(t1); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCommandPaletteOpen, autoRunPending]);

  const handleSubmit = (text: string) => {
    const cmd = text.trim();
    if (!cmd) return;
    triggerCommand(cmd);
    setIsCommandPaletteOpen(false);
  };

  // Compute palette position near cursor/button or fall back to center
  const posStyle: React.CSSProperties = paletteOrigin
    ? {
        top:  Math.max(70, Math.min(paletteOrigin.y + 20, window.innerHeight - 370)),
        left: Math.max(16, Math.min(paletteOrigin.x - PALETTE_W / 2, window.innerWidth - PALETTE_W - 16)),
      }
    : { top: "22%", left: "50%", transform: "translateX(-50%)" };

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
            className="fixed inset-0"
            style={{ zIndex: 50, background: "rgba(6,6,10,0.40)", backdropFilter: "blur(3px)" }}
            onClick={() => setIsCommandPaletteOpen(false)}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -8 }}
            transition={{ type: "spring", stiffness: 500, damping: 38, mass: 0.45 }}
            className="fixed"
            style={{ zIndex: 51, width: "100%", maxWidth: PALETTE_W, ...posStyle }}
          >
            {/* Outer glow */}
            <div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{ boxShadow: "0 0 0 1px rgba(59,130,246,0.22), 0 0 40px rgba(59,130,246,0.09)" }}
            />

            {/* Glass panel */}
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                background: "rgba(11,11,17,0.95)",
                backdropFilter: "blur(28px) saturate(180%)",
                boxShadow: "0 28px 72px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.055)",
              }}
            >
              {/* Input row */}
              <div
                className="flex items-center px-4 py-3.5 gap-3"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}
              >
                <svg width="11" height="14" viewBox="0 0 11 14" fill="none" style={{ flexShrink: 0, filter: "drop-shadow(0 0 3px rgba(59,130,246,0.85))" }}>
                  <defs>
                    <linearGradient id="palGradCP" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#2563EB" />
                    </linearGradient>
                  </defs>
                  <polygon points="0,0 10,5.5 6.5,7.5 2.5,14" fill="url(#palGradCP)" />
                </svg>

                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask Navii to do anything…"
                  className="flex-1 bg-transparent border-none outline-none text-[14px] font-medium text-white/88 placeholder:text-white/22"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      // If empty, execute highlighted suggestion
                      handleSubmit(inputValue || SUGGESTIONS[highlightedIdx].text);
                    }
                    if (e.key === "ArrowDown") {
                      e.preventDefault();
                      setHighlightedIdx(i => Math.min(i + 1, SUGGESTIONS.length - 1));
                    }
                    if (e.key === "ArrowUp") {
                      e.preventDefault();
                      setHighlightedIdx(i => Math.max(i - 1, 0));
                    }
                    if (e.key === "Tab") {
                      e.preventDefault();
                      setInputValue(SUGGESTIONS[highlightedIdx].text);
                    }
                  }}
                />

                <kbd className="px-1.5 py-0.5 rounded-md text-[10px] font-medium text-white/22 border border-white/08 bg-white/04 flex-shrink-0 select-none">
                  ⌥ Space
                </kbd>
              </div>

              {/* Suggestions */}
              <div className="pb-1.5 pt-1">
                <div className="px-4 py-1.5 text-[9px] font-semibold text-white/22 uppercase tracking-[0.12em]">
                  Suggestions
                </div>

                {SUGGESTIONS.map((item, i) => {
                  const isHigh = highlightedIdx === i;
                  return (
                    <motion.button
                      key={i}
                      layout
                      initial={{ opacity: 0, x: -3 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      onClick={() => handleSubmit(item.text)}
                      className="flex items-center w-full px-3 py-2 mx-1 rounded-xl text-left relative"
                      style={{
                        width: "calc(100% - 8px)",
                        background: isHigh ? "rgba(59,130,246,0.09)" : "transparent",
                        transition: "background 0.22s ease",
                      }}
                    >
                      {isHigh && (
                        <motion.div
                          layoutId="pal-accent"
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 rounded-full"
                          style={{ background: "#3B82F6", boxShadow: "0 0 5px rgba(59,130,246,0.6)" }}
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}

                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                        style={{
                          background: isHigh ? "rgba(59,130,246,0.18)" : "rgba(255,255,255,0.05)",
                          transition: "background 0.2s ease",
                        }}
                      >
                        <item.icon
                          className="w-3 h-3"
                          style={{ color: isHigh ? "#60A5FA" : "rgba(255,255,255,0.32)", transition: "color 0.2s ease" }}
                        />
                      </div>

                      <span
                        className="flex-1 text-[13px]"
                        style={{
                          color: isHigh ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.48)",
                          fontWeight: isHigh ? 500 : 400,
                          transition: "color 0.2s ease",
                        }}
                      >
                        {item.text}
                      </span>

                      <span
                        className="text-[10px] ml-2 flex-shrink-0"
                        style={{
                          color: isHigh ? "rgba(96,165,250,0.60)" : "rgba(255,255,255,0.16)",
                          transition: "color 0.2s ease",
                        }}
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
                style={{ borderTop: "1px solid rgba(255,255,255,0.042)" }}
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
