import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { useNavii, TaskState } from "./NaviiContext";

type StepKind = "normal" | "success";
type StepState = "active" | "done" | "pending";

interface Step {
  id: number;
  text: string;
  state: StepState;
  kind?: StepKind;
}

// Status pill colors per task state
const PILL: Record<TaskState, { bg: string; border: string; dot: string; label: string }> = {
  Idle:                   { bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.20)", dot: "#60A5FA", label: "Idle" },
  Listening:              { bg: "rgba(59,130,246,0.10)", border: "rgba(59,130,246,0.20)", dot: "#60A5FA", label: "Listening" },
  Thinking:               { bg: "rgba(59,130,246,0.12)", border: "rgba(59,130,246,0.24)", dot: "#3B82F6", label: "Thinking" },
  Acting:                 { bg: "rgba(59,130,246,0.14)", border: "rgba(59,130,246,0.28)", dot: "#2563EB", label: "Acting" },
  "Waiting for Approval": { bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.24)", dot: "#FBBF24", label: "Approval" },
  Done:                   { bg: "rgba(34,197,94,0.10)",  border: "rgba(34,197,94,0.22)",  dot: "#22C55E", label: "Done" },
};

export default function TaskSimulation() {
  const { activeTask, setActiveTask, taskState, setTaskState } = useNavii();
  const [steps, setSteps] = useState<Step[]>([]);
  const cancelledRef  = useRef(false);
  const approvalRef   = useRef<(() => void) | null>(null);
  const stepsEndRef   = useRef<HTMLDivElement>(null);

  // Auto-scroll steps
  useEffect(() => {
    stepsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [steps.length]);

  useEffect(() => {
    if (!activeTask) return;

    cancelledRef.current = false;
    approvalRef.current  = null;

    const w = (ms: number) => new Promise<void>(r => setTimeout(r, ms));

    const addStep = (text: string, kind?: StepKind) =>
      setSteps(prev => [
        ...prev.map(s => ({ ...s, state: "done" as StepState })),
        { id: Date.now() + Math.random(), text, state: "active" as StepState, kind },
      ]);

    const waitForApproval = (autoMs: number) =>
      new Promise<void>(resolve => {
        const timer = setTimeout(() => {
          approvalRef.current = null;
          resolve();
        }, autoMs);
        approvalRef.current = () => {
          clearTimeout(timer);
          approvalRef.current = null;
          resolve();
        };
      });

    const run = async () => {
      // 1 — Listening
      setSteps([{ id: 1, text: "Listening…", state: "active" }]);
      setTaskState("Listening");
      await w(900); if (cancelledRef.current) return;

      // 2 — Thinking
      addStep("Understanding your command…");
      setTaskState("Thinking");
      await w(1050); if (cancelledRef.current) return;

      // 3 — Opening app
      addStep("Opening Spotify…");
      setTaskState("Acting");
      await w(1100); if (cancelledRef.current) return;

      // 4 — Searching
      addStep("Searching for Blinding Lights…");
      await w(1000); if (cancelledRef.current) return;

      // 5 — Found
      addStep("Found it. Requesting playback access…");
      await w(950); if (cancelledRef.current) return;

      // 6 — Waiting for Approval
      addStep("Media permission required");
      setTaskState("Waiting for Approval");
      await waitForApproval(2400); if (cancelledRef.current) return;

      // 7 — Acting after approval
      addStep("Clicking play…");
      setTaskState("Acting");
      await w(1000); if (cancelledRef.current) return;

      // 8 — Done
      setSteps(prev => [
        ...prev.map(s => ({ ...s, state: "done" as StepState })),
        { id: Date.now(), text: "Blinding Lights is playing ✓", state: "done", kind: "success" },
      ]);
      setTaskState("Done");
      await w(2400); if (cancelledRef.current) return;

      // Restore
      setActiveTask(null);
      setTaskState("Idle");
      setSteps([]);
    };

    run();
    return () => { cancelledRef.current = true; approvalRef.current = null; };
  }, [activeTask, setTaskState, setActiveTask]);

  const handleApprove = () => approvalRef.current?.();

  const handleStop = () => {
    cancelledRef.current = true;
    approvalRef.current  = null;
    setTaskState("Idle");
    setActiveTask(null);
    setSteps([]);
  };

  if (!activeTask) return null;

  const pill = PILL[taskState] ?? PILL.Listening;
  const isDone = taskState === "Done";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20, y: 10, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        exit={{ opacity: 0, x: 20, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 380, damping: 34 }}
        className="fixed bottom-6 right-6 w-[276px] overflow-hidden"
        style={{
          zIndex: 52,
          borderRadius: 18,
          background: "rgba(10,10,16,0.95)",
          backdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: isDone
            ? "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(34,197,94,0.18), 0 0 40px rgba(34,197,94,0.06)"
            : "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(59,130,246,0.12)",
          transition: "box-shadow 0.6s ease",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.055)" }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <svg width="9" height="12" viewBox="0 0 10 13" fill="none" style={{ flexShrink: 0, filter: "drop-shadow(0 0 3px rgba(59,130,246,0.9))" }}>
              <defs>
                <linearGradient id="tsGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#7FC3FF" /><stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
              <polygon points="0,0 9,5 5,8 2,13" fill="url(#tsGrad)" />
            </svg>

            <span className="text-[10px] font-semibold text-white/45 uppercase tracking-[0.12em]">
              Navii
            </span>

            {/* Status pill */}
            <motion.div
              layout
              className="flex items-center gap-1 px-1.5 py-0.5 rounded-full flex-shrink-0"
              style={{ background: pill.bg, border: `1px solid ${pill.border}`, transition: "background 0.4s ease, border-color 0.4s ease" }}
            >
              <motion.div
                animate={isDone ? { opacity: 1 } : { opacity: [1, 0.3, 1] }}
                transition={{ repeat: isDone ? 0 : Infinity, duration: 1.4 }}
                className="w-1 h-1 rounded-full"
                style={{ background: pill.dot, transition: "background 0.4s ease" }}
              />
              <span className="text-[9px] font-semibold" style={{ color: pill.dot, transition: "color 0.4s ease" }}>
                {pill.label}
              </span>
            </motion.div>
          </div>

          <button
            onClick={handleStop}
            className="text-white/22 hover:text-white/55 transition-colors ml-2 flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Command label */}
        <div className="px-4 pt-2.5 pb-1">
          <p className="text-[10px] text-white/28 font-mono truncate leading-relaxed">{activeTask}</p>
        </div>

        {/* Step list */}
        <div className="px-4 pb-3 flex flex-col gap-2 max-h-44 overflow-y-auto scrollbar-hide">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-start gap-2.5"
            >
              {/* Icon */}
              {step.state === "active" ? (
                <div className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 rounded-full border-[1.5px] border-blue-500/40 border-t-blue-400 animate-spin" />
              ) : step.kind === "success" ? (
                <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="7" fill="rgba(34,197,94,0.15)" />
                  <path d="M3.5 7L5.8 9.3L10.5 4.5" stroke="#22C55E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <div className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/18" />
                </div>
              )}

              {/* Text */}
              <span
                className="text-[12px] leading-snug"
                style={{
                  color: step.kind === "success"
                    ? "#4ADE80"
                    : step.state === "active"
                    ? "rgba(255,255,255,0.90)"
                    : "rgba(255,255,255,0.28)",
                  fontWeight: step.state === "active" || step.kind === "success" ? 500 : 400,
                  textDecoration: step.state === "done" && step.kind !== "success" ? "line-through" : "none",
                }}
              >
                {step.text}
              </span>
            </motion.div>
          ))}
          <div ref={stepsEndRef} />
        </div>

        {/* Approval card */}
        <AnimatePresence>
          {taskState === "Waiting for Approval" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div
                className="mx-3 mb-3 p-3.5 rounded-2xl"
                style={{
                  background: "rgba(251,191,36,0.06)",
                  border: "1px solid rgba(251,191,36,0.22)",
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span className="text-[11px] font-semibold text-amber-300/90">
                    Permission required
                  </span>
                </div>
                <p className="text-[11px] text-white/45 mb-3 leading-relaxed">
                  Navii wants to control Spotify media playback on your device.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={handleApprove}
                    className="flex-1 h-8 rounded-xl text-[11px] font-semibold text-white active:scale-[0.97] transition-transform"
                    style={{
                      background: "linear-gradient(135deg, #4F97FF 0%, #2563EB 100%)",
                      boxShadow: "0 2px 10px rgba(37,99,235,0.4)",
                    }}
                  >
                    Approve
                  </button>
                  <button
                    onClick={handleStop}
                    className="flex-1 h-8 rounded-xl text-[11px] font-semibold text-red-400/80 active:scale-[0.97] transition-transform"
                    style={{ border: "1px solid rgba(239,68,68,0.22)" }}
                  >
                    Deny
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success state footer */}
        <AnimatePresence>
          {isDone && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div
                className="mx-3 mb-3 px-3 py-2.5 rounded-xl flex items-center gap-2"
                style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.14)" }}
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(34,197,94,0.15)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.2 2.2L8 2.5" stroke="#22C55E" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.div>
                <span className="text-[11px] text-green-400/80 font-medium">Task complete. Navii returning.</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
