"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface Task {
  title: string;
  progress: number;
}

export interface Column {
  title: string;
  tasks: Task[];
}

interface ColumnsContextType {
  columns: Column[];
  completeTask: (colIdx: number, taskIdx: number) => void;
  totalTasks: number;
  completedTasks: number;
  completionRatio: number;
}

const initialColumns: Column[] = [
  {
    title: "To do (4)",
    tasks: [
      { title: "Design new ui presentation", progress: 70 },
      { title: "Add more ui/ux mockups", progress: 40 },
      { title: "Design few mobile screens", progress: 30 },
      { title: "Create a tweet and promote", progress: 15 },
    ],
  },
  {
    title: "In progress (4)",
    tasks: [
      { title: "Design system update", progress: 30 },
      { title: "Create brand guideline", progress: 70 },
      { title: "Create wireframe for ios app", progress: 40 },
      { title: "Create ui kit for layout", progress: 30 },
    ],
  },
  {
    title: "Done (3)",
    tasks: [
      { title: "Add product to the market", progress: 100 },
      { title: "Launch product promotion", progress: 100 },
      { title: "Make twitter banner", progress: 100 },
    ],
  },
];

const ColumnsContext = createContext<ColumnsContextType | undefined>(undefined);

export function useColumns() {
  const ctx = useContext(ColumnsContext);
  if (!ctx) throw new Error("useColumns must be used within ColumnsProvider");
  return ctx;
}

export function ColumnsProvider({ children }: { children: ReactNode }) {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  function completeTask(colIdx: number, taskIdx: number) {
    setColumns((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      copy[colIdx].tasks[taskIdx].progress = 100;
      return copy;
    });
  }

  const totalTasks = columns.reduce((sum, col) => sum + col.tasks.length, 0);
  const completedTasks = columns.reduce(
    (sum, col) => sum + col.tasks.filter((t) => t.progress === 100).length,
    0
  );
  const completionRatio = totalTasks ? completedTasks / totalTasks : 0;

  return (
    <ColumnsContext.Provider
      value={{
        columns,
        completeTask,
        totalTasks,
        completedTasks,
        completionRatio,
      }}
    >
      {children}
    </ColumnsContext.Provider>
  );
}
