import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is Navii free?",
    a: "Navii is free during our beta period. We'll introduce premium tiers for advanced automation in the future, but early adopters will receive special perks.",
  },
  {
    q: "Is this already controlling my computer?",
    a: "No. The demo on this page is a visual simulation. The desktop app requests accessibility permissions only when you explicitly grant them.",
  },
  {
    q: "Can Navii control desktop apps like CapCut?",
    a: "Yes. Because Navii uses a real cursor and computer vision to understand what's on screen, it can interact with native desktop apps, not just browsers.",
  },
  {
    q: "Does it move my real cursor?",
    a: "Navii uses a secondary ghost cursor to perform actions so it doesn't interfere with your main mouse. It only moves your cursor when absolutely required.",
  },
  {
    q: "What happens when I press Option + Space?",
    a: "A floating command palette appears instantly wherever you're working. Type your intent, press Enter, and Navii starts working alongside you.",
  },
  {
    q: "Can I stop Navii anytime?",
    a: "Yes. Press Escape or click the Stop button in the activity widget to instantly halt any Navii action.",
  },
  {
    q: "Will there be a Windows version?",
    a: "We're actively building a Windows version. Join the waitlist in the download section to be notified when it's ready.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 relative" style={{ background: "#f8fafc" }}>
      <div
        className="absolute top-0 left-0 w-full h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(15,23,42,0.06), transparent)" }}
      />

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[11px] font-semibold tracking-widest text-blue-500 uppercase mb-3"
          >
            FAQ
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900"
          >
            Questions answered.
          </motion.h2>
        </div>

        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{
                  background: isOpen ? "white" : "rgba(255,255,255,0.7)",
                  border: isOpen ? "1px solid rgba(59,130,246,0.18)" : "1px solid rgba(15,23,42,0.06)",
                  boxShadow: isOpen ? "0 4px 16px rgba(15,23,42,0.07)" : "0 1px 3px rgba(15,23,42,0.04)",
                }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left group outline-none"
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <span className={`text-[14px] font-semibold transition-colors ${isOpen ? "text-blue-600" : "text-gray-900 group-hover:text-slate-700"}`}>
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="flex-shrink-0 ml-4"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-colors ${isOpen ? "text-blue-500" : "text-slate-400"}`}
                    />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-[13px] text-slate-500 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
