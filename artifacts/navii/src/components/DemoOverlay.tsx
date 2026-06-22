import { motion, AnimatePresence } from "framer-motion";
import { useNavii } from "./NaviiContext";

export default function DemoOverlay() {
  const { taskState } = useNavii();
  const isActive = taskState !== "Idle";

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="fixed inset-0 pointer-events-none"
          style={{
            zIndex: 44,
            background: "rgba(248,250,252,0.50)",
            backdropFilter: "blur(5px) saturate(55%)",
          }}
        />
      )}
    </AnimatePresence>
  );
}
