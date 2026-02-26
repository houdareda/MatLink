"use client";

import React from "react";
import { useCompare } from "@/context/CompareContext";
import { Info, X, CheckCircle2, AlertCircle } from "lucide-react";

const Toast = () => {
  const { notification } = useCompare();

  if (!notification) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-100 w-full max-w-md px-4 pointer-events-none">
      <div className="bg-[#1e293b] text-white rounded-2xl p-4 flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 animate-in fade-in slide-in-from-top-10 duration-500 pointer-events-auto">
        <div className="bg-primary/20 p-2 rounded-xl">
          <Info className="w-5 h-5 text-primary" />
        </div>
        <p className="text-sm font-black flex-1 text-right">{notification}</p>
      </div>
    </div>
  );
};

export default Toast;
