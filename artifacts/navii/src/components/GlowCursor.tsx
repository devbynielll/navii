import { useEffect, useRef } from "react";
import { useNavii } from "./NaviiContext";

export default function GlowCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -200, y: -200 });
  const currentPos = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number>();
  const hasMovedRef = useRef(false);

  const { taskState } = useNavii();
  const isActing = taskState === "Acting" || taskState === "Thinking" || taskState === "Listening";

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!hasMovedRef.current) {
        currentPos.current = { x: e.clientX, y: e.clientY };
        hasMovedRef.current = true;
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const factor = isActing ? 0.40 : 0.25;
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, factor);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, factor);

      // Offset: 26px right, 22px below — intentionally separated from real cursor
      const x = currentPos.current.x + 26;
      const y = currentPos.current.y + 22;

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (auraRef.current) {
        auraRef.current.style.transform = `translate(${x - 12}px, ${y - 12}px)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isActing]);

  return (
    <>
      {/* Controlled soft aura */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 pointer-events-none z-[99] rounded-full"
        style={{
          width: 28,
          height: 28,
          background: isActing
            ? "radial-gradient(circle, rgba(59,130,246,0.22) 0%, transparent 75%)"
            : "radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 75%)",
          transition: "background 0.5s ease",
          willChange: "transform",
        }}
      />

      {/* Cursor glyph — 11×14px */}
      <div
        ref={wrapperRef}
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{ willChange: "transform" }}
      >
        <svg
          width="11"
          height="14"
          viewBox="0 0 11 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            opacity: 0.95,
            filter: isActing
              ? "drop-shadow(0 0 5px rgba(59,130,246,0.8)) drop-shadow(0 0 10px rgba(59,130,246,0.4))"
              : "drop-shadow(0 0 4px rgba(59,130,246,0.55)) drop-shadow(0 0 9px rgba(59,130,246,0.25))",
            transition: "filter 0.5s ease",
            animation: "navii-breathe 3.5s ease-in-out infinite",
          }}
        >
          <defs>
            <linearGradient id="naviiGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="55%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
            {/* Subtle inner highlight */}
            <linearGradient id="naviiShine" x1="0%" y1="0%" x2="60%" y2="60%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
          {/* Base shape */}
          <polygon points="0,0 10,5.5 6.5,7.5 2.5,14" fill="url(#naviiGrad)" />
          {/* Inner shine */}
          <polygon points="0,0 10,5.5 6.5,7.5 2.5,14" fill="url(#naviiShine)" opacity="0.6" />
        </svg>
      </div>

      <style>{`
        @keyframes navii-breathe {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.07); }
        }
      `}</style>
    </>
  );
}
