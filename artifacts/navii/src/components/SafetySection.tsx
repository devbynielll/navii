import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const points = [
  "Sensitive actions need approval",
  "Clear activity logs",
  "No hidden clicks",
  "Prototype runs locally",
  "Automation roadmap is transparent",
  "You can stop anytime"
];

export default function SafetySection() {
  return (
    <section id="safety" className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
          You stay in control.
        </h2>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto mb-12">
          An AI that acts on your behalf requires absolute trust. We built Navii with strict boundaries so it can only help, never harm.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8 text-left max-w-3xl mx-auto">
          {points.map((point, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="mt-0.5 rounded-full bg-green-100 p-1 text-green-600 flex-shrink-0">
                <Check className="w-3 h-3 stroke-[3]" />
              </div>
              <span className="text-gray-700 font-medium">{point}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
