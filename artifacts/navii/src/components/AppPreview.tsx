import React from "react";
import { motion } from "framer-motion";

export default function AppPreview() {
  return (
    <section className="py-24 px-6 bg-white overflow-hidden flex justify-center">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Everything in one place.
          </h2>
          <p className="text-lg text-gray-500">
            The Navii Desktop App gives you full control and visibility over your AI companion.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full rounded-2xl shadow-2xl border border-gray-800 bg-[#0A0A0A] overflow-hidden aspect-video flex flex-col"
        >
          {/* Top Bar */}
          <div className="h-12 border-b border-gray-800 flex items-center px-4 justify-between bg-[#111]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="w-4 h-4 bg-blue-500 rounded-sm" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
              <span className="text-gray-300 font-medium text-sm">Navii</span>
            </div>
            <div className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-medium border border-blue-500/20 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              Thinking
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 flex overflow-hidden">
            {/* Main Area */}
            <div className="flex-1 p-8 flex flex-col items-center justify-center relative">
              
              <div className="w-full max-w-lg bg-[#1A1A1A] rounded-xl border border-gray-800 p-4 shadow-xl">
                <div className="flex items-center gap-3 text-gray-400 border-b border-gray-800 pb-3 mb-3">
                  <span className="text-lg">Research competitor pricing</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <div className="w-4 h-4 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
                  Extracting tables from website...
                </div>
              </div>

              {/* Animated Cursor Inside Preview */}
              <motion.div 
                animate={{ 
                  x: [-100, 50, -20, -100],
                  y: [-50, 20, 80, -50]
                }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                className="absolute w-5 h-5 bg-blue-500 rounded-sm z-20 pointer-events-none"
                style={{ 
                  clipPath: "polygon(0 0, 100% 35%, 60% 55%, 35% 100%)",
                  filter: "drop-shadow(0 0 12px rgba(59,130,246,0.8))"
                }}
              />

            </div>

            {/* Sidebar Activity */}
            <div className="w-64 border-l border-gray-800 bg-[#111] p-4 flex flex-col gap-4">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Activity Log</h4>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                  <div className="text-sm text-gray-300">Opened Safari</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                  <div className="text-sm text-gray-300">Navigated to competitors.com</div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 animate-pulse" />
                  <div className="text-sm text-blue-400">Extracting data...</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="h-14 border-t border-gray-800 bg-[#111] flex items-center px-4 justify-between">
            <div className="flex-1 max-w-sm mr-4">
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: "30%" }}
                  animate={{ width: "65%" }}
                  transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                  className="h-full bg-blue-500 rounded-full"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-1.5 rounded text-sm font-medium text-red-400 border border-red-900/50 hover:bg-red-950/30">Stop</button>
              <button className="px-4 py-1.5 rounded text-sm font-medium text-white bg-blue-600 hover:bg-blue-500">Pause</button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
