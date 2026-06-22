import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2, AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavii } from "./NaviiContext";

export default function TaskSimulation() {
  const { activeTask, setActiveTask, taskState, setTaskState } = useNavii();
  const [steps, setSteps] = useState<{ id: number; text: string; state: "pending" | "active" | "done" | "error" }[]>([]);

  useEffect(() => {
    if (activeTask) {
      setSteps([
        { id: 1, text: "Listening...", state: "active" }
      ]);
      setTaskState("Listening");
      
      let stepCount = 1;
      const sequence = [
        { state: "Thinking", text: "Understanding command..." },
        { state: "Acting", text: `Opening application...` },
        { state: "Acting", text: `Searching...` },
        { state: "Waiting for Approval", text: `Approval needed to execute.` },
      ];

      const runSequence = async () => {
        for (const item of sequence) {
          await new Promise(r => setTimeout(r, 1200));
          
          if (item.state === "Waiting for Approval") {
            setTaskState("Waiting for Approval");
            setSteps(prev => [
              ...prev.map(p => ({ ...p, state: "done" as const })),
              { id: ++stepCount, text: item.text, state: "active" as const }
            ]);
            return; // pause here
          }

          setTaskState(item.state as any);
          setSteps(prev => [
            ...prev.map(p => ({ ...p, state: "done" as const })),
            { id: ++stepCount, text: item.text, state: "active" as const }
          ]);
        }
      };

      runSequence();
    }
  }, [activeTask, setTaskState]);

  const handleApprove = () => {
    setTaskState("Done");
    setSteps(prev => [
      ...prev.map(p => ({ ...p, state: "done" as const })),
      { id: Date.now(), text: "Done!", state: "done" as const }
    ]);
    setTimeout(() => {
      setActiveTask(null);
      setTaskState("Idle");
      setSteps([]);
    }, 3000);
  };

  const handleStop = () => {
    setTaskState("Idle");
    setActiveTask(null);
    setSteps([]);
  };

  if (!activeTask) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, x: 20 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
      >
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Navii Activity</span>
          </div>
          <button onClick={handleStop} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <div className="p-4 flex flex-col gap-3 max-h-60 overflow-y-auto">
          {steps.map(step => (
            <motion.div 
              key={step.id} 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-start gap-3 text-sm ${
                step.state === "active" ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {step.state === "active" ? (
                <Loader2 className="w-4 h-4 mt-0.5 animate-spin text-blue-500 flex-shrink-0" />
              ) : (
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
              )}
              <span className="font-medium">{step.text}</span>
            </motion.div>
          ))}
          
          {taskState === "Waiting for Approval" && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-100"
            >
              <div className="flex items-center gap-2 text-blue-800 font-medium text-sm mb-3">
                <AlertTriangle className="w-4 h-4" />
                Proceed with action?
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={handleApprove} size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-xs">
                  Approve
                </Button>
                <Button onClick={handleStop} variant="outline" size="sm" className="w-full text-xs border-red-200 text-red-600 hover:bg-red-50">
                  Stop
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
