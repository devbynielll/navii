import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavii } from "./NaviiContext";

export default function Hero() {
  const { setIsCommandPaletteOpen } = useNavii();

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-20 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_50%)]" />
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight"
        >
          Your AI companion <br className="hidden md:block"/> that moves with you.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-xl md:text-2xl text-gray-500 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Press <kbd className="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-gray-800 border border-gray-200">Option</kbd> + <kbd className="px-2 py-1 bg-gray-100 rounded text-sm font-mono text-gray-800 border border-gray-200">Space</kbd>, type what you need, and watch Navii guide your workflow with a glowing cursor that follows your intent.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
        >
          <Button size="lg" className="rounded-full px-8 h-14 text-base bg-blue-600 hover:bg-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
            Download for Mac
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 h-14 text-base border-gray-200 hover:bg-gray-50"
            onClick={() => setIsCommandPaletteOpen(true)}
          >
            Try Option + Space
          </Button>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm text-gray-400 flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinelinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          Private by design. You approve important actions.
        </motion.p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="relative mt-20 z-10 w-full max-w-3xl mx-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent blur-3xl rounded-[3rem] -z-10" />
        <div className="bg-white/60 backdrop-blur-xl border border-white rounded-2xl shadow-2xl p-4 md:p-6 overflow-hidden relative">
          <div className="flex items-center gap-2 mb-4 px-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="bg-gray-50/80 rounded-xl p-4 border border-gray-100 relative">
            <p className="text-gray-400 font-mono text-sm mb-2">navii ~ %</p>
            <p className="text-gray-800 font-medium text-lg">Open Spotify and play Blinding Lights<span className="animate-pulse">_</span></p>
            
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
                x: [0, 5, 0]
              }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute right-8 top-1/2 w-6 h-6 bg-blue-500 rounded-sm z-20"
              style={{ 
                clipPath: "polygon(0 0, 100% 40%, 60% 60%, 40% 100%)",
                filter: "drop-shadow(0 0 8px #3B82F6) drop-shadow(0 0 16px rgba(59,130,246,0.5))"
              }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
