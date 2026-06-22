import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is Navii free?",
    a: "Navii is currently free during our beta period. We will introduce premium tiers for advanced automation features in the future, but early adopters will receive special perks."
  },
  {
    q: "Is this already controlling my computer?",
    a: "No. The demo on this page is a visual simulation to show you how Navii feels. The actual desktop app requests accessibility permissions only when you explicitly allow it."
  },
  {
    q: "Can Navii control desktop apps like CapCut?",
    a: "Yes! Because Navii acts as a real cursor and uses computer vision to understand what's on screen, it can interact with native desktop apps, not just web browsers."
  },
  {
    q: "Does it move my real cursor?",
    a: "Navii uses a secondary 'ghost' cursor to perform actions so it doesn't fight you for control of your main mouse. It only takes over when absolutely necessary for native OS clicks."
  },
  {
    q: "What happens when I press Option + Space?",
    a: "A floating command palette appears instantly wherever you are working. You type your intent, press Enter, and Navii starts working alongside you."
  },
  {
    q: "Can I stop Navii anytime?",
    a: "Yes. Simply press the Escape key or click the red 'Stop' button in the activity widget to instantly halt any Navii action."
  },
  {
    q: "Will there be a Windows version?",
    a: "We are actively developing a Windows version. You can join the waitlist in the download section below to be notified when it's ready."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-24 px-6 bg-gray-50 border-t border-gray-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-10 text-center">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="border-gray-200">
              <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-blue-600">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-gray-500 leading-relaxed text-base">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
