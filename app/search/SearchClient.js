"use client";

import SidebarFilters from "@/components/SidebarFilters";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Filter, X, ShoppingBag, ArrowLeft } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const SearchClient = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (query.trim().length > 0) {
      const q = query.toLowerCase();
      const filtered = productsData.filter(product => 
        product.title.toLowerCase().includes(q) || 
        product.category.toLowerCase().includes(q)
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-black rtl">
      <Header />

      {/* Results Header Section - Compact & Professional */}
      <section className="relative pt-10 pb-16 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-right">
              <div className="flex items-center gap-2 mb-3 px-1">
                 <Search className="w-4 h-4 text-primary" />
                 <span className="text-[10px] font-black text-primary uppercase tracking-widest leading-none">نتائج البحث عن:</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-[#1e293b] leading-tight">
                 {query ? `"${query}"` : "كل المواد"}
              </h1>
            </div>

            <Link href="/" className="flex items-center gap-2 px-6 py-3 bg-[#F1F5F9] rounded-xl text-xs font-black text-foreground/40 hover:text-primary transition-all group">
               <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
               <span>العودة للرئيسية</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="pb-32 -mt-6 relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Filters - Shared Component */}
            <div className="hidden lg:block w-[300px] shrink-0">
               <SidebarFilters onApply={() => {}} />
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden flex justify-end mb-6">
                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className="flex items-center gap-2 bg-white px-6 py-3 rounded-xl shadow-sm border border-foreground/5 font-black text-xs text-foreground/60"
                >
                    <Filter className="w-4 h-4 text-primary" />
                    <span>تصفية النتائج</span>
                </button>
            </div>

            {/* Results Display */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-10 px-2 lg:px-4 border-b border-foreground/5 pb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="text-[10px] uppercase font-black text-foreground/30 tracking-widest leading-none">إجمالي النتائج</span>
                </div>
                <span className="text-sm font-black text-[#1e293b]">{filteredProducts.length} منتج متوفر</span>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-24 bg-white rounded-[32px] border border-dashed border-foreground/10 flex flex-col items-center justify-center space-y-4">
                  <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-foreground/20" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-black text-[#1e293b]">عذراً، لم نجد نتائج</h3>
                    <p className="text-sm text-foreground/30 font-bold max-w-xs mx-auto">جرب البحث بكلمات أخرى أو تصفح الأقسام الرئيسية للمواد.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Drawer (Filters) */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-100 transition-opacity duration-300 lg:hidden ${
          isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsFilterOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 h-full w-[300px] bg-white shadow-2xl transition-transform duration-500 transform ${
            isFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex flex-col h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-8 shrink-0">
              <span className="text-xl font-black text-primary">المصفيّات</span>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="p-2 rounded-lg bg-muted text-foreground/40"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <SidebarFilters onApply={() => setIsFilterOpen(false)} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SearchClient;
