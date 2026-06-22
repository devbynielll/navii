import { useEffect, useRef } from "react";
import { useNavii } from "./NaviiContext";

export default function GlowCursor() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
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
      const factor = isActing ? 0.28 : 0.18;
      currentPos.current.x = lerp(currentPos.current.x, targetPos.current.x, factor);
      currentPos.current.y = lerp(currentPos.current.y, targetPos.current.y, factor);

      const x = currentPos.current.x + 10;
      const y = currentPos.current.y + 8;
      const transform = `translate(${x}px, ${y}px)`;

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = transform;
      }
      if (auraRef.current) {
        auraRef.current.style.transform = `translate(${x - 14}px, ${y - 14}px)`;
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
      {/* Soft aura behind cursor */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 pointer-events-none z-[99] rounded-full"
        style={{
          width: 44,
          height: 44,
          background: isActing
            ? "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)",
          transition: "background 0.4s ease",
          willChange: "transform",
        }}
      />

      {/* Main cursor */}
      <div
        ref={wrapperRef}
        className="fixed top-0 left-0 pointer-events-none z-[100]"
        style={{ willChange: "transform" }}
      >
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter: isActing
              ? "drop-shadow(0 0 6px rgba(59,130,246,1)) drop-shadow(0 0 12px rgba(59,130,246,0.7)) drop-shadow(0 0 20px rgba(90,167,255,0.5))"
              : "drop-shadow(0 0 4px rgba(59,130,246,0.9)) drop-shadow(0 0 8px rgba(59,130,246,0.5))",
            transition: "filter 0.4s ease",
            animation: "navii-pulse 3s ease-in-out infinite",
          }}
        >
          <defs>
            <linearGradient id="cursorGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7FC3FF" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <polygon
            points="0,0 14,8 8,11 4,20"
            fill="url(#cursorGrad)"
          />
        </svg>
      </div>

      <style>{`
        @keyframes navii-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
      `}</style>
    </>
  );
}
