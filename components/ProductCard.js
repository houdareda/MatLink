"use client";

import { Box, GitCompare } from "lucide-react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";

const ProductCard = ({ product }) => {
  const { toggleCompare, isCompared } = useCompare();
  const compared = isCompared(product.id);

  return (
    <div className="bg-white rounded-2xl border border-foreground/5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full overflow-hidden">
      {/* Product Image Link */}
      <Link href={`/products/${product.id}`} className="relative h-full">
        <div className="relative aspect-[4/3] bg-gray-200 flex items-center justify-center overflow-hidden">
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-white/95 backdrop-blur-sm px-3 py-1 rounded-[8px] text-[12px] font-black text-primary shadow-lg shadow-black/5 border border-foreground/5">
              {product.category}
            </span>
          </div>
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </div>
      </Link>

      <div className="p-5 text-right flex flex-col flex-1">
        <Link href={`/products/${product.id}`} className="block mb-4 group/text">
          <h3 className="text-[15px] md:text-[17px] font-black text-foreground group-hover:text-primary transition-colors leading-tight mb-2">
            {product.title}
          </h3>
          <p className="text-xs text-foreground/50 font-bold leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </Link>

        <div className="mt-auto space-y-4">
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[9px] text-foreground/30 font-black uppercase tracking-[0.15em]">يبدأ من</span>
            <div className="flex flex-row-reverse items-baseline gap-1">
              <span className="text-xs font-black text-primary/60">ريال</span>
              <span className="text-2xl font-black text-primary">
                {product.price}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex-2 h-11 bg-primary text-white rounded-[10px] font-black text-xs hover:bg-primary/90 transition-all active:scale-95 shadow-lg shadow-primary/20 border border-white/10">
              <Link href={`/products/${product.id}`} className="flex items-center justify-center w-full h-full">
                التفاصيل
              </Link>
            </button>
            <button 
              onClick={() => toggleCompare(product)}
              className={`flex-1 h-11 flex items-center justify-center gap-2 rounded-[12px] border font-black text-[10px] transition-all group/icon shadow-sm hover:shadow-md ${
                compared ? 'border-primary bg-primary/10 text-primary' : 'border-foreground/10 hover:border-primary/30 hover:bg-primary/5 text-foreground/40'
              }`}
              title="مقارنة"
            >
                <GitCompare className={`w-3.5 h-3.5 transition-transform duration-500 ${
                  compared ? 'text-primary scale-110' : 'group-hover/icon:text-primary group-hover/icon:scale-110'
                }`} />
                <span>مقارنة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
