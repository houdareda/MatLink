"use client";

import React, { useState, useMemo } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SupplierCard from "@/components/SupplierCard";
import suppliersData from "@/data/suppliers.json";
import { Search, SlidersHorizontal, Users } from "lucide-react";

const SuppliersClient = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredSuppliers = useMemo(() => {
    return suppliersData.filter(s => 
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-black rtl">
      <Header />

      {/* Premium Header Design (Replaced Blue Section) */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-white">
        {/* Abstract Background Accents */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20 mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
               <Users className="w-4 h-4 text-primary" />
               <span className="text-xs font-black text-primary uppercase tracking-widest">شبكة الموردين المعتمدين</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-black text-[#1e293b] leading-tight mb-6">
               تواصل مع <span className="text-primary italic">نخبة الموردين</span> <br />
               في قطاع الإنشاءات
            </h1>

            <p className="text-lg text-foreground/40 font-bold mb-12 max-w-2xl mx-auto leading-relaxed">
               تصفح الموردين الموثوقين المعتمدين في منصة مات لينك، وقارن بين خدماتهم ومنتجاتهم لضمان أفضل توريد لمشروعك.
            </p>

            {/* Premium Search Bar */}
            <div className="relative max-w-2xl mx-auto group animate-in fade-in slide-in-from-bottom-4 duration-1000">
               <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
               <div className="relative flex items-center bg-white p-2 rounded-[20px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.12)] border border-foreground/5 group-focus-within:border-primary/30 transition-all">
                  <div className="flex-1 flex items-center pr-4">
                     <Search className="w-5 h-5 text-foreground/20 group-focus-within:text-primary transition-colors" />
                     <input 
                        type="text" 
                        placeholder="ابحث عن مورد بالاسم أو المدينة..."
                        className="w-full bg-transparent border-none outline-none px-4 py-3 text-sm lg:text-base font-bold placeholder:text-foreground/20 text-foreground"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                     />
                  </div>
                  <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-[#F1F5F9] text-foreground/40 rounded-xl font-bold text-xs hover:bg-primary/10 hover:text-primary transition-all">
                     <SlidersHorizontal className="w-4 h-4" />
                     <span>تصفية</span>
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="pb-32 -mt-20 relative z-20">
        <div className="container mx-auto px-4 text-center">
          {/* Results Counter */}
          <div className="flex justify-between items-center mb-10 px-4">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span className="text-[10px] uppercase font-black text-foreground/30 tracking-widest leading-none">متاح الآن</span>
             </div>
             <span className="text-sm font-black text-[#1e293b]">{filteredSuppliers.length} مورد معتمد</span>
          </div>

          {/* Suppliers Grid */}
          {filteredSuppliers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
               {filteredSuppliers.map((supplier) => (
                  <div key={supplier.id} className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <SupplierCard supplier={supplier} />
                  </div>
               ))}
            </div>
          ) : (
            <div className="py-24 bg-white rounded-[32px] border border-dashed border-foreground/10 flex flex-col items-center justify-center space-y-4">
               <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center">
                  <Search className="w-10 h-10 text-foreground/20" />
               </div>
               <div className="text-center">
                  <h3 className="text-xl font-black text-[#1e293b]">لا توجد نتائج</h3>
                  <p className="text-sm text-foreground/30 font-bold">لم نجد موردين يطابقون بحثك حالياً.</p>
               </div>
               <button 
                  onClick={() => setSearchQuery("")}
                  className="text-primary font-black text-xs hover:underline mt-4"
               >
                  إعادة تعيين البحث
               </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SuppliersClient;
