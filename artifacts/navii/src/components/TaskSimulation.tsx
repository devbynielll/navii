import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, X } from "lucide-react";
import { useNavii } from "./NaviiContext";

type StepState = "pending" | "active" | "done";

interface Step {
  id: number;
  text: string;
  state: StepState;
}

export default function TaskSimulation() {
  const { activeTask, setActiveTask, taskState, setTaskState } = useNavii();
  const [steps, setSteps] = useState<Step[]>([]);

  useEffect(() => {
    if (!activeTask) return;

    setSteps([{ id: 1, text: "Listening...", state: "active" }]);
    setTaskState("Listening");

    let stepCount = 1;
    const sequence = [
      { state: "Thinking", text: "Understanding command..." },
      { state: "Acting", text: "Opening application..." },
      { state: "Acting", text: "Searching..." },
      { state: "Waiting for Approval", text: "Sensitive action detected. Proceed?" },
    ];

    let cancelled = false;

    const runSequence = async () => {
      for (const item of sequence) {
        await new Promise((r) => setTimeout(r, 1200));
        if (cancelled) return;

        setSteps((prev) => [
          ...prev.map((p) => ({ ...p, state: "done" as StepState })),
          { id: ++stepCount, text: item.text, state: "active" as StepState },
        ]);
        setTaskState(item.state as any);

        if (item.state === "Waiting for Approval") return;
      }
    };

    runSequence();
    return () => { cancelled = true; };
  }, [activeTask, setTaskState]);

  const handleApprove = () => {
    setTaskState("Done");
    setSteps((prev) => [
      ...prev.map((p) => ({ ...p, state: "done" as StepState })),
      { id: Date.now(), text: "Done!", state: "done" as StepState },
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
        initial={{ opacity: 0, x: 24, y: 8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: 24 }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
        className="fixed bottom-6 right-6 z-50 w-72 overflow-hidden"
        style={{
          borderRadius: 16,
          background: "rgba(12,12,18,0.92)",
          backdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: "0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.15)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <svg width="10" height="13" viewBox="0 0 10 13" fill="none" style={{ filter: "drop-shadow(0 0 3px rgba(59,130,246,0.9))" }}>
              <defs>
                <linearGradient id="taskGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7FC3FF" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
              <polygon points="0,0 9,5 5,8 2,13" fill="url(#taskGrad)" />
            </svg>
            <span className="text-[11px] font-semibold text-white/50 uppercase tracking-widest">
              Navii
            </span>
            <div
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-full ml-1"
              style={{ background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.2)" }}
            >
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
                className="w-1 h-1 rounded-full bg-blue-400"
              />
              <span className="text-[10px] text-blue-300 font-medium">{taskState}</span>
            </div>
          </div>
          <button
            onClick={handleStop}
            className="text-white/25 hover:text-white/60 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Command label */}
        <div className="px-4 pt-3 pb-2">
          <p className="text-[11px] text-white/30 truncate">{activeTask}</p>
        </div>

        {/* Steps */}
        <div className="px-4 pb-3 flex flex-col gap-2.5 max-h-48 overflow-y-auto">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-2.5"
            >
              {step.state === "active" ? (
                <div className="w-4 h-4 flex-shrink-0 mt-0.5 rounded-full border-2 border-blue-500/50 border-t-blue-400 animate-spin" />
              ) : step.text === "Done!" ? (
                <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-400 flex-shrink-0" />
              ) : (
                <div className="w-4 h-4 flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                </div>
              )}
              <span
                className={`text-[13px] leading-snug ${
                  step.state === "active"
                    ? "text-white/90 font-medium"
                    : step.text === "Done!"
                    ? "text-green-400 font-semibold"
                    : "text-white/35 line-through"
                }`}
              >
                {step.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Approval panel */}
        <AnimatePresence>
          {taskState === "Waiting for Approval" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div
                className="mx-3 mb-3 p-3 rounded-xl"
                style={{
                  background: "rgba(251,191,36,0.08)",
                  border: "1px solid rgba(251,191,36,0.2)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="text-[12px] font-semibold text-amber-300">Action requires approval</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleApprove}
                    className="flex-1 h-8 rounded-lg text-xs font-semibold text-white transition-all"
                    style={{
                      background: "linear-gradient(135deg, #4F97FF 0%, #2563EB 100%)",
                      boxShadow: "0 2px 8px rgba(37,99,235,0.35)",
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleStop}
                    className="flex-1 h-8 rounded-lg text-xs font-semibold text-red-400 transition-all hover:bg-red-500/10"
                    style={{ border: "1px solid rgba(239,68,68,0.25)" }}
                  >
                    Stop
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
