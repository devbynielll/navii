import React, { useEffect, useRef } from "react";
import { useNavii } from "./NaviiContext";

export default function GlowCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const currentPos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const requestRef = useRef<number>();

  const { taskState } = useNavii();

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", onMouseMove);

    const updatePosition = () => {
      // Lerp for smooth delayed follow effect
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.15;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.15;

      if (cursorRef.current) {
        // Offset slightly to the right and down so it doesn't overlap the real cursor completely
        cursorRef.current.style.transform = `translate(${currentPos.current.x + 12}px, ${currentPos.current.y + 12}px)`;
      }

      requestRef.current = requestAnimationFrame(updatePosition);
    };

    requestRef.current = requestAnimationFrame(updatePosition);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const isActing = taskState === "Acting" || taskState === "Thinking" || taskState === "Listening";

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-6 h-6 pointer-events-none z-[100] transition-transform duration-75 ${
        isActing ? "scale-125" : "scale-100"
      }`}
      style={{
        clipPath: "polygon(0 0, 100% 35%, 60% 55%, 35% 100%)",
        backgroundColor: "#3B82F6",
        filter: isActing 
          ? "drop-shadow(0 0 12px #3B82F6) drop-shadow(0 0 24px rgba(59,130,246,0.8))"
          : "drop-shadow(0 0 8px #3B82F6) drop-shadow(0 0 16px rgba(59,130,246,0.5))",
        willChange: "transform"
      }}
    />
  );
}
