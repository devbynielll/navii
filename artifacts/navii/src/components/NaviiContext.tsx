import React, { createContext, useContext, useState, ReactNode } from "react";

export type TaskState = "Idle" | "Listening" | "Thinking" | "Acting" | "Waiting for Approval" | "Done";

interface NaviiContextType {
  isCommandPaletteOpen: boolean;
  setIsCommandPaletteOpen: (open: boolean) => void;
  activeTask: string | null;
  setActiveTask: (task: string | null) => void;
  taskState: TaskState;
  setTaskState: (state: TaskState) => void;
  triggerCommand: (command: string) => void;
  paletteOrigin: { x: number; y: number } | null;
  autoRunPending: boolean;
  setAutoRunPending: (v: boolean) => void;
  openCommandPalette: (x: number, y: number, autoRun?: boolean) => void;
}

const NaviiContext = createContext<NaviiContextType | undefined>(undefined);

export function NaviiProvider({ children }: { children: ReactNode }) {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [taskState, setTaskState] = useState<TaskState>("Idle");
  const [paletteOrigin, setPaletteOrigin] = useState<{ x: number; y: number } | null>(null);
  const [autoRunPending, setAutoRunPending] = useState(false);

  const triggerCommand = (command: string) => {
    setIsCommandPaletteOpen(false);
    setActiveTask(command);
    setTaskState("Listening");
  };

  const openCommandPalette = (x: number, y: number, autoRun = false) => {
    setPaletteOrigin({ x, y });
    setAutoRunPending(autoRun);
    setIsCommandPaletteOpen(true);
  };

  return (
    <NaviiContext.Provider
      value={{
        isCommandPaletteOpen,
        setIsCommandPaletteOpen,
        activeTask,
        setActiveTask,
        taskState,
        setTaskState,
        triggerCommand,
        paletteOrigin,
        autoRunPending,
        setAutoRunPending,
        openCommandPalette,
      }}
    >
      {children}
    </NaviiContext.Provider>
  );
}

export function useNavii() {
  const context = useContext(NaviiContext);
  if (context === undefined) {
    throw new Error("useNavii must be used within a NaviiProvider");
  }
  return context;
}
