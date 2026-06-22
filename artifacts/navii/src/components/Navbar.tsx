import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-40 bg-white/70 backdrop-blur-md border-b border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded-sm" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
          <span className="font-semibold text-lg tracking-tight">Navii</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <a href="#product" className="hover:text-blue-600 transition-colors">Product</a>
          <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
          <a href="#safety" className="hover:text-blue-600 transition-colors">Safety</a>
          <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="default" className="rounded-full px-6">Download</Button>
        </div>
      </div>
    </motion.nav>
  );
}
