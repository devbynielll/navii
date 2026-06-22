import React from "react";
import { motion } from "framer-motion";
import { MousePointer2, Command, MessageSquareText, Activity, ShieldCheck, History } from "lucide-react";

const features = [
  {
    title: "Delayed AI Cursor",
    description: "Navii follows with intention, not instantly. It feels like a calm co-pilot rather than a frantic script.",
    icon: MousePointer2
  },
  {
    title: "Option + Space Command",
    description: "Summon Navii instantly from anywhere, over any application. Always ready when you need it.",
    icon: Command
  },
  {
    title: "Natural Language Tasks",
    description: "Just describe what you want. No rigid syntax or complex shortcuts to remember.",
    icon: MessageSquareText
  },
  {
    title: "Live Thinking Steps",
    description: "See exactly what Navii is doing. Every click, search, and action is narrated in real-time.",
    icon: Activity
  },
  {
    title: "Approval Before Risky Actions",
    description: "You stay in control. Navii pauses and asks for permission before deleting files or sending emails.",
    icon: ShieldCheck
  },
  {
    title: "Task History",
    description: "Every action is logged and reviewable. Audit exactly what Navii did while you were away.",
    icon: History
  }
];

export default function FeatureCards() {
  return (
    <section id="features" className="py-24 px-6 bg-gray-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            Designed for trust.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl">
            We built Navii to feel like a true companion—one that respects your space and keeps you informed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <feat.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feat.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
