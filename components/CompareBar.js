"use client";

import React from "react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import { X, GitCompare, Trash2 } from "lucide-react";

const CompareBar = () => {
  const { selectedProducts, removeFromCompare, clearCompare } = useCompare();

  if (selectedProducts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-4xl">
      <div className="bg-white/80 backdrop-blur-xl border border-primary/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-bottom-10 duration-500">
        
        {/* Left: Product Thumbnails */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          <div className="flex items-center gap-2 border-l border-foreground/10 pl-4 ml-2 shrink-0">
            <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black">
              {selectedProducts.length}
            </span>
            <span className="text-xs font-black text-foreground/60 whitespace-nowrap">منتجات للمقارنة</span>
          </div>
          
          <div className="flex items-center gap-3">
            {selectedProducts.map((product) => (
              <div key={product.id} className="relative group shrink-0">
                <div className="w-12 h-12 rounded-xl border border-foreground/10 overflow-hidden bg-muted/30">
                  <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                </div>
                <button 
                  onClick={() => removeFromCompare(product.id)}
                  className="absolute -top-1.5 -right-1.5 bg-white text-foreground/40 hover:text-red-500 w-5 h-5 rounded-full border border-foreground/5 flex items-center justify-center shadow-md transition-all scale-0 group-hover:scale-100"
                >
                  <X className="w-3 h-3" />
                </button>
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-foreground text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap font-bold">
                  {product.title}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={clearCompare}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black text-foreground/40 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>مسح الكل</span>
          </button>
          
          <Link href="/compare">
            <button className="flex items-center gap-2 bg-primary text-white px-8 h-12 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95 group">
              <GitCompare className="w-4 h-4 group-hover:scale-110 transition-transform duration-500" />
              <span>قارن الآن</span>
            </button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default CompareBar;
