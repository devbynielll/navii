import React from "react";
import { motion } from "framer-motion";
import { Music, Globe, FileText, Search, Settings, Repeat } from "lucide-react";

const useCases = [
  { icon: Music, label: "Play music" },
  { icon: Globe, label: "Search websites" },
  { icon: FileText, label: "Summarize pages" },
  { icon: Search, label: "Research faster" },
  { icon: Settings, label: "Guide software workflows" },
  { icon: Repeat, label: "Automate repetitive tasks" }
];

export default function UseCases() {
  return (
    <section className="py-24 px-6 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900 mb-2">
            What can Navii do?
          </h2>
          <p className="text-gray-500">A few examples to get you started.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {useCases.map((uc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white rounded-xl p-6 flex flex-col items-center justify-center gap-3 text-center border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all"
            >
              <div className="text-blue-500 bg-blue-50 p-3 rounded-full">
                <uc.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-gray-700">{uc.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
