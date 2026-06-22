import React from "react";
import { Button } from "@/components/ui/button";

export default function DownloadSection() {
  return (
    <section id="download" className="py-32 px-6 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="w-16 h-16 bg-blue-500 rounded-xl mx-auto mb-8 flex items-center justify-center shadow-lg" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}>
          <div className="w-8 h-8 bg-white rounded-sm" style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
        </div>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
          Start with a command.
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Button size="lg" className="rounded-full px-8 h-14 text-base bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
            Download for Mac
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8 h-14 text-base border-gray-200 w-full sm:w-auto">
            Join Windows waitlist
          </Button>
        </div>
        <p className="text-sm text-gray-400">
          Requires macOS 13.0 or later. Free during beta.
        </p>
      </div>
    </section>
  );
}
