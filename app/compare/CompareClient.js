"use client";

import React from "react";
import Link from "next/link";
import { useCompare } from "@/context/CompareContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  X, 
  GitCompare, 
  ShieldCheck, 
  FileText, 
  CheckCircle2, 
  DollarSign,
  Layers,
  Info
} from "lucide-react";

const CompareClient = () => {
  const { selectedProducts, removeFromCompare, clearCompare } = useCompare();

  // Comparison labels
  const comparisonFields = [
    { key: "supplier", label: "المورد", icon: <ShieldCheck className="w-4 h-4" /> },
    { key: "price", label: "السعر", icon: <DollarSign className="w-4 h-4" /> },
    { key: "description", label: "الوصف", icon: <FileText className="w-4 h-4" /> },
    { key: "warranty", label: "الضمان", icon: <ShieldCheck className="w-4 h-4" /> },
    { key: "unit", label: "الوحدة", icon: <Layers className="w-4 h-4" /> },
    { key: "length", label: "الطول", spec: "الطول" },
    { key: "diameter", label: "القطر", spec: "القطر" },
    { key: "standard", label: "المعيار", spec: "المعيار" },
    { key: "grade", label: "درجة الصلب", spec: "درجة الصلب" },
  ];

  const getSpecValue = (product, label) => {
    const spec = product.specs?.find(s => s.label === label);
    return spec ? spec.value : "—";
  };

  if (selectedProducts.length === 0) {
    return (
      <main className="min-h-screen bg-[#F6F7F9]">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="max-w-md mx-auto space-y-8">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-xl border border-primary/10">
              <GitCompare className="w-10 h-10 text-primary/20" />
            </div>
            <div className="space-y-4">
              <h1 className="text-3xl font-black text-foreground">لم يتم اختيار منتجات</h1>
              <p className="text-foreground/40 font-bold">يرجى العودة لصفحة المنتجات واختيار منتجين على الأقل للمقارنة بينهما.</p>
            </div>
            <Link href="/#products">
              <button className="bg-primary text-white px-10 h-14 rounded-2xl font-black text-sm hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95">
                تصفح المنتجات
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6F7F9] flex flex-col font-black">
      <Header />
      
      <div className="flex-1 w-full pb-20">
        <div className="bg-[#1e293b] py-16 lg:py-24 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10 text-right">
             <div className="flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="space-y-4">
                 <h1 className="text-4xl lg:text-5xl font-black leading-tight">مقارنة المنتجات</h1>
                 <p className="text-white/60 font-medium text-lg max-w-xl">{selectedProducts.length} منتجات تم اختيارها للمقارنة</p>
               </div>
               <div className="flex items-center gap-4">
                 <button onClick={clearCompare} className="bg-white/10 hover:bg-white/20 border border-white/10 px-6 py-3 rounded-xl font-black text-sm transition-all">مسح القائمة</button>
                 <Link href="/#products">
                   <button className="bg-primary text-white px-8 py-3 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-lg active:scale-95">إضافة منتجات</button>
                 </Link>
               </div>
             </div>
          </div>
        </div>

        <style jsx global>{`
          :root {
            --label-w: 120px;
          }
          @media (min-width: 768px) {
            :root {
              --label-w: 200px;
            }
          }
        `}</style>

        <div className="mx-auto md:px-4 lg:px-8 max-w-7xl -mt-10 relative z-20">
          <div className="bg-white md:rounded-[24px] border-y md:border border-foreground/5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
            
            <div className="overflow-x-auto custom-scrollbar">
              <div className="min-w-max" style={{ width: `calc(var(--label-w) + ${selectedProducts.length * 280}px)` }}>
                
                {/* Header Row */}
                <div className="grid border-b border-foreground/5 bg-white relative" style={{ gridTemplateColumns: `var(--label-w) repeat(${selectedProducts.length}, 280px)` }}>
                  <div className="p-4 md:p-8 bg-muted/30 border-l border-foreground/5 flex items-center justify-center sticky right-0 z-40 bg-white shadow-[10px_0_15px_-5px_rgba(0,0,0,0.05)]">
                     <span className="text-[10px] md:text-xs font-black text-foreground/30 uppercase tracking-[0.2em] [writing-mode:vertical-rl] rotate-180">تفاصيل المنتج</span>
                  </div>
                  <div className="grid gap-6 p-4 md:p-8" style={{ gridTemplateColumns: `repeat(${selectedProducts.length}, 280px)` }}>
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="relative group">
                        <button onClick={() => removeFromCompare(product.id)} className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-lg border border-foreground/5 flex items-center justify-center text-foreground/40 hover:text-red-500 transition-all z-10"><X className="w-4 h-4" /></button>
                        <div className="aspect-4/3 bg-muted/30 rounded-2xl overflow-hidden border border-foreground/5 mb-4 group-hover:border-primary/30 transition-all">
                          <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                        </div>
                        <h3 className="text-base md:text-lg font-black text-foreground text-right">{product.title}</h3>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-foreground/5">
                  {comparisonFields.map((field, idx) => (
                    <div key={idx} className="grid relative" style={{ gridTemplateColumns: `var(--label-w) repeat(${selectedProducts.length}, 280px)` }}>
                      <div className="p-3 md:p-6 bg-muted/10 border-l border-foreground/5 flex items-center gap-2 md:gap-3 text-right sticky right-0 z-40 bg-white shadow-[10px_0_15px_-5px_rgba(0,0,0,0.05)]">
                        <span className="text-primary/40 shrink-0">{field.icon || <Info className="w-4 h-4" />}</span>
                        <span className="text-xs md:text-sm font-black text-foreground/60">{field.label}</span>
                      </div>
                      <div className="grid gap-6 p-4 md:p-6 items-center" style={{ gridTemplateColumns: `repeat(${selectedProducts.length}, 280px)` }}>
                        {selectedProducts.map((product) => (
                          <div key={product.id} className="text-right">
                            {field.key === "supplier" ? (
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 justify-end">
                                  <span className="text-xs md:text-sm font-black text-foreground">{product.supplier.name}</span>
                                  {product.supplier.verified && <CheckCircle2 className="w-3 h-3 text-emerald-500" />}
                                </div>
                                <p className="text-[9px] md:text-[10px] font-bold text-foreground/30">📍 {product.supplier.location}</p>
                              </div>
                            ) : field.key === "price" ? (
                               <div className="space-y-1">
                                 <div className="flex flex-row-reverse items-center gap-1 justify-end">
                                   <span className="text-sm md:text-base font-black text-primary">ريال</span>
                                   <span className="text-xl md:text-2xl font-black text-primary">{product.price}</span>
                                 </div>
                               </div>
                            ) : field.spec ? (
                              <span className="text-xs md:text-sm font-bold text-foreground/50">{getSpecValue(product, field.spec)}</span>
                            ) : (
                              <p className="text-xs md:text-sm font-bold text-foreground/50 leading-relaxed line-clamp-3">{product[field.key] || "—"}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Row */}
                <div className="grid relative" style={{ gridTemplateColumns: `var(--label-w) repeat(${selectedProducts.length}, 280px)` }}>
                  <div className="p-4 md:p-6 bg-muted/30 border-l border-foreground/5 sticky right-0 z-40 bg-white shadow-[10px_0_15px_-5px_rgba(0,0,0,0.05)]"></div>
                  <div className="grid gap-6 p-4 md:p-8" style={{ gridTemplateColumns: `repeat(${selectedProducts.length}, 280px)` }}>
                    {selectedProducts.map((product) => (
                      <Link key={product.id} href={`/products/${product.id}`}>
                        <button className="w-full bg-primary text-white h-10 md:h-12 rounded-lg md:rounded-xl font-black text-xs md:text-sm hover:shadow-lg transition-all active:scale-95">عرض المنتج</button>
                      </Link>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default CompareClient;
