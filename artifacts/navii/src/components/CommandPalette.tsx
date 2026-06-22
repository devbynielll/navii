import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Youtube, AlignLeft, Scissors, Github } from "lucide-react";
import { useNavii } from "./NaviiContext";

const SUGGESTIONS = [
  { icon: Sparkles, text: "Open Spotify and play Blinding Lights" },
  { icon: Youtube, text: "Search YouTube for React tutorials" },
  { icon: AlignLeft, text: "Summarize this webpage" },
  { icon: Scissors, text: "Find the Effects panel in CapCut" },
  { icon: Github, text: "Open GitHub and search my repos" },
];

export default function CommandPalette() {
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, triggerCommand } = useNavii();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isCommandPaletteOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isCommandPaletteOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.altKey && e.code === "Space") || (e.metaKey && e.code === "KeyK")) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      }
      if (e.key === "Escape") {
        setIsCommandPaletteOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsCommandPaletteOpen]);

  return (
    <AnimatePresence>
      {isCommandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/20 backdrop-blur-sm"
            onClick={() => setIsCommandPaletteOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed z-50 left-1/2 top-[20%] -translate-x-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col"
          >
            <div className="flex items-center px-4 py-4 border-b border-gray-100">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask Navii..."
                className="flex-1 bg-transparent border-none outline-none text-xl font-medium text-gray-900 placeholder:text-gray-300"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.currentTarget.value) {
                    triggerCommand(e.currentTarget.value);
                  }
                }}
              />
              <div className="px-2 py-1 bg-gray-50 rounded text-xs font-mono text-gray-400 border border-gray-100">
                ↵
              </div>
            </div>
            <div className="p-2 max-h-[60vh] overflow-y-auto">
              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Suggestions
              </div>
              <div className="flex flex-col gap-1">
                {SUGGESTIONS.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => triggerCommand(item.text)}
                    className="flex items-center w-full px-3 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-colors text-left group"
                  >
                    <item.icon className="w-4 h-4 text-gray-400 group-hover:text-blue-500 mr-3" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
