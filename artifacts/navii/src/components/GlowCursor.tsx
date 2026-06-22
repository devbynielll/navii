import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavii, TaskState } from "./NaviiContext";

// Viewport-fraction targets for each autonomous state
const WAYPOINTS: Partial<Record<TaskState, { xFrac: number; yFrac: number }>> = {
  Listening:              { xFrac: 0.20, yFrac: 0.44 },
  Thinking:               { xFrac: 0.50, yFrac: 0.47 },
  Acting:                 { xFrac: 0.74, yFrac: 0.37 },
  "Waiting for Approval": { xFrac: 0.50, yFrac: 0.54 },
};

// Glow/aura config per state
const STATE_STYLE: Record<TaskState, {
  aura: string;
  filter: string;
  auraSize: number;
  cursorColors: [string, string, string];
}> = {
  Idle: {
    aura: "radial-gradient(circle, rgba(59,130,246,0.11) 0%, transparent 75%)",
    filter: "drop-shadow(0 0 3px rgba(59,130,246,0.50)) drop-shadow(0 0 6px rgba(59,130,246,0.20))",
    auraSize: 28,
    cursorColors: ["#60A5FA", "#2563EB", "#4F46E5"],
  },
  Listening: {
    aura: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)",
    filter: "drop-shadow(0 0 4px rgba(59,130,246,0.70)) drop-shadow(0 0 9px rgba(59,130,246,0.32))",
    auraSize: 30,
    cursorColors: ["#7FC3FF", "#2563EB", "#4F46E5"],
  },
  Thinking: {
    aura: "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 68%)",
    filter: "drop-shadow(0 0 5px rgba(59,130,246,0.80)) drop-shadow(0 0 11px rgba(59,130,246,0.38))",
    auraSize: 32,
    cursorColors: ["#93C5FD", "#3B82F6", "#4F46E5"],
  },
  Acting: {
    aura: "radial-gradient(circle, rgba(59,130,246,0.26) 0%, transparent 65%)",
    filter: "drop-shadow(0 0 6px rgba(59,130,246,0.90)) drop-shadow(0 0 13px rgba(59,130,246,0.42))",
    auraSize: 34,
    cursorColors: ["#93C5FD", "#2563EB", "#6366F1"],
  },
  "Waiting for Approval": {
    aura: "radial-gradient(circle, rgba(251,191,36,0.20) 0%, transparent 70%)",
    filter: "drop-shadow(0 0 5px rgba(251,191,36,0.72)) drop-shadow(0 0 10px rgba(251,191,36,0.30))",
    auraSize: 30,
    cursorColors: ["#FDE68A", "#F59E0B", "#D97706"],
  },
  Done: {
    aura: "radial-gradient(circle, rgba(52,211,153,0.18) 0%, transparent 70%)",
    filter: "drop-shadow(0 0 5px rgba(52,211,153,0.78)) drop-shadow(0 0 10px rgba(52,211,153,0.35))",
    auraSize: 30,
    cursorColors: ["#6EE7B7", "#10B981", "#059669"],
  },
};

export default function GlowCursor() {
  const { taskState } = useNavii();

  // Refs for RAF loop — no stale closures
  const wrapperRef  = useRef<HTMLDivElement>(null);
  const auraRef     = useRef<HTMLDivElement>(null);
  const mouseRef    = useRef({ x: -200, y: -200 });
  const currentPos  = useRef({ x: -200, y: -200 });
  const rafRef      = useRef<number>();
  const modeRef     = useRef<"companion" | "autonomous">("companion");
  const autoTarget  = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  // Ripple state: snapshot position when cursor "clicks" at a waypoint
  const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  // Sync taskState into refs (no RAF restart needed)
  useEffect(() => {
    const isAuto = taskState !== "Idle" && taskState !== "Done";
    modeRef.current = isAuto ? "autonomous" : "companion";

    if (isAuto) {
      const wp = WAYPOINTS[taskState];
      if (wp) {
        autoTarget.current = {
          x: window.innerWidth  * wp.xFrac,
          y: window.innerHeight * wp.yFrac,
        };
      }

      // After cursor arrives (~900ms), fire a click ripple
      const t = setTimeout(() => {
        setRipple({ x: currentPos.current.x, y: currentPos.current.y, id: Date.now() });
      }, 900);
      return () => clearTimeout(t);
    }
  }, [taskState]);

  // Single RAF loop — started once, reads only from refs
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!hasMovedRef.current) {
        currentPos.current = { x: e.clientX + 18, y: e.clientY + 14 };
        hasMovedRef.current = true;
      }
    };
    window.addEventListener("mousemove", onMouseMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const isAuto = modeRef.current === "autonomous";
      const factor = isAuto ? 0.052 : 0.15;

      const target = isAuto
        ? autoTarget.current
        : { x: mouseRef.current.x + 18, y: mouseRef.current.y + 14 };

      currentPos.current.x = lerp(currentPos.current.x, target.x, factor);
      currentPos.current.y = lerp(currentPos.current.y, target.y, factor);

      const x = currentPos.current.x;
      const y = currentPos.current.y;

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (auraRef.current) {
        const s = STATE_STYLE[taskState]?.auraSize ?? 22;
        auraRef.current.style.transform = `translate(${x - s / 2}px, ${y - s / 2}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []); // intentionally empty — reads refs only

  const cfg = STATE_STYLE[taskState] ?? STATE_STYLE.Idle;
  const [c0, c1, c2] = cfg.cursorColors;
  const isAutonomous = taskState !== "Idle" && taskState !== "Done";

  return (
    <>
      {/* Soft aura */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 pointer-events-none z-[99] rounded-full"
        style={{
          width:  cfg.auraSize,
          height: cfg.auraSize,
          background: cfg.aura,
          transition: "background 0.7s ease, width 0.7s ease, height 0.7s ease",
          willChange: "transform",
        }}
      />

      {/* Click ripple */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            onAnimationComplete={() => setRipple(null)}
            className="fixed top-0 left-0 pointer-events-none z-[98] rounded-full"
            style={{
              width: 10,
              height: 10,
              marginLeft: -5,
              marginTop: -5,
              transform: `translate(${ripple.x}px, ${ripple.y}px)`,
              background: taskState === "Waiting for Approval"
                ? "rgba(251,191,36,0.30)"
                : "rgba(59,130,246,0.25)",
              border: `1px solid ${taskState === "Waiting for Approval" ? "rgba(251,191,36,0.5)" : "rgba(59,130,246,0.4)"}`,
            }}
          />
        )}
      </AnimatePresence>

      {/* Cursor glyph — 12×16px */}
      <div
        ref={wrapperRef}
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{ willChange: "transform" }}
      >
        <div
          style={{
            width: 12,
            height: 16,
            clipPath: "polygon(0 0, 100% 44%, 64% 60%, 28% 100%)",
            background: `linear-gradient(135deg, ${c0} 0%, ${c1} 55%, ${c2} 100%)`,
            filter: cfg.filter,
            opacity: 0.95,
            transition: "background 0.7s ease, filter 0.7s ease",
            animation: isAutonomous
              ? "navii-act 1.8s ease-in-out infinite"
              : "navii-breathe 3.8s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes navii-breathe {
          0%, 100% { transform: scale(1) rotate(0deg); }
          33% { transform: scale(1.06) rotate(0.4deg); }
          66% { transform: scale(0.97) rotate(-0.3deg); }
        }
        @keyframes navii-act {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.10); }
        }
      `}</style>
    </>
  );
}
