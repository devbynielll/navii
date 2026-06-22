import React from "react";
import { motion } from "framer-motion";
import { Command, Keyboard, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavii } from "./NaviiContext";

const steps = [
  {
    title: "Press Option + Space",
    description: "Summon Navii instantly from anywhere on your Mac.",
    icon: Keyboard,
  },
  {
    title: "Type your command",
    description: "Describe what you need in natural language.",
    icon: Command,
  },
  {
    title: "Watch Navii act",
    description: "Your glowing co-pilot executes the task step-by-step.",
    icon: MousePointer2,
  }
];

export default function InteractionDemo() {
  const { setIsCommandPaletteOpen } = useNavii();

  return (
    <section id="demo" className="py-24 px-6 bg-white relative">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-4">
            From thought to action in seconds.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Navii doesn't just give you instructions, it does the work for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 relative group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                <step.icon className="w-6 h-6" />
              </div>
              <div className="absolute top-8 right-8 text-6xl font-bold text-gray-900/5 select-none pointer-events-none">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="rounded-full px-8 bg-gray-900 text-white hover:bg-gray-800 h-14"
            onClick={() => setIsCommandPaletteOpen(true)}
          >
            Try it now
          </Button>
        </div>
      </div>
    </section>
  );
}
