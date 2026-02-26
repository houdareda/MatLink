"use client";

import { useState } from "react";
import { Search, ChevronDown, Check } from "lucide-react";

const SidebarFilters = ({ onApply }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [price, setPrice] = useState(3750);
  const [selectedCategory, setSelectedCategory] = useState("جميع الفئات");
  const [selectedSupplier, setSelectedSupplier] = useState("جميع الموردين");
  const [selectedSort, setSelectedSort] = useState("الأحدث");

  const categories = ["حديد وصلب", "خرسانة وأسمنت", "أدوات كهربائية", "سباكة ومواسير", "دهانات وعوازل", "أخشاب"];
  const suppliers = ["شركة الحديد السعودية", "مصنع الخليج للخرسانة", "مؤسسة النور للكهرباء"];
  const sorts = ["الأحدث", "الأقل سعراً", "الأعلى سعراً", "الأكثر طلباً"];

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleSelect = (setter, value) => {
    setter(value);
    setActiveDropdown(null);
  };

  return (
    <aside className="w-full bg-white rounded-[12px] border border-foreground/8 p-6 space-y-6 sticky top-24 shadow-xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)] translate-z-0">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-foreground/5 pb-4">
        <h3 className="text-lg font-black text-foreground">التصنيفات</h3>
        <button 
            onClick={() => {
                setSelectedCategory("جميع الفئات");
                setSelectedSupplier("جميع الموردين");
                setSelectedSort("الأحدث");
                setPrice(3750);
            }}
            className="text-xs font-bold text-primary hover:scale-105 transition-all"
        >
            إعادة ضبط
        </button>
      </div>

      {/* Category Dropdown */}
      <div className="space-y-2">
        <label className="text-[14px] font-black text-foreground/30 uppercase tracking-widest block">الفئة</label>
        <div className="relative">
          <div 
            onClick={() => toggleDropdown("category")}
            className={`w-full h-11 rounded-[10px] px-4 flex items-center justify-between font-bold text-xs transition-all cursor-pointer border ${
                activeDropdown === "category" ? "border-primary bg-white shadow-xl shadow-primary/5" : "bg-[#F1F5F9] border-transparent text-foreground/70 hover:border-primary/20"
            }`}
          >
            <span className={selectedCategory !== "جميع الفئات" ? "text-foreground" : ""}>{selectedCategory}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-foreground/20 transition-transform ${activeDropdown === "category" ? "rotate-180" : ""}`} />
          </div>

          {activeDropdown === "category" && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-foreground/10 rounded-[10px] shadow-2xl z-30 overflow-hidden animate-fade-in">
              <div 
                onClick={() => handleSelect(setSelectedCategory, "جميع الفئات")}
                className={`flex items-center justify-between p-3 font-black text-xs cursor-pointer transition-colors ${selectedCategory === "جميع الفئات" ? "bg-primary text-white" : "hover:bg-muted/80"}`}
              >
                <span>جميع الفئات</span>
                {selectedCategory === "جميع الفئات" && <Check className="w-3.5 h-3.5" />}
              </div>
              <div className="py-1 max-h-48 overflow-y-auto text-xs">
                {categories.map((cat) => (
                  <div 
                    key={cat} 
                    onClick={() => handleSelect(setSelectedCategory, cat)}
                    className={`px-4 py-2.5 text-right font-bold cursor-pointer transition-colors border-b border-foreground/5 last:border-0 ${selectedCategory === cat ? "text-primary bg-primary/5" : "text-foreground/70 hover:bg-muted/80"}`}
                  >
                    {cat}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Supplier Dropdown */}
      <div className="space-y-2">
        <label className="text-[14px] font-black text-foreground/30 uppercase tracking-widest block">المورد</label>
        <div className="relative">
          <div 
            onClick={() => toggleDropdown("supplier")}
            className={`w-full h-11 rounded-[10px] px-4 flex items-center justify-between font-bold text-xs transition-all cursor-pointer border ${
                activeDropdown === "supplier" ? "border-primary bg-white shadow-xl shadow-primary/5" : "bg-[#F1F5F9] border-transparent text-foreground/70 hover:border-primary/20"
            }`}
          >
            <span className={selectedSupplier !== "جميع الموردين" ? "text-foreground" : ""}>{selectedSupplier}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-foreground/20 transition-transform ${activeDropdown === "supplier" ? "rotate-180" : ""}`} />
          </div>

          {activeDropdown === "supplier" && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-foreground/10 rounded-[10px] shadow-2xl z-30 overflow-hidden animate-fade-in">
              <div 
                onClick={() => handleSelect(setSelectedSupplier, "جميع الموردين")}
                className={`flex items-center justify-between p-3 font-black text-xs cursor-pointer transition-colors ${selectedSupplier === "جميع الموردين" ? "bg-primary text-white" : "hover:bg-muted/80"}`}
              >
                <span>جميع الموردين</span>
                {selectedSupplier === "جميع الموردين" && <Check className="w-3.5 h-3.5" />}
              </div>
              <div className="py-1 max-h-48 overflow-y-auto text-xs">
                {suppliers.map((sup) => (
                  <div 
                    key={sup} 
                    onClick={() => handleSelect(setSelectedSupplier, sup)}
                    className={`px-4 py-2.5 text-right font-bold cursor-pointer transition-colors border-b border-foreground/5 last:border-0 ${selectedSupplier === sup ? "text-primary bg-primary/5" : "text-foreground/70 hover:bg-muted/80"}`}
                  >
                    {sup}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
            <label className="text-[14px] font-black text-foreground/30 uppercase tracking-widest">نطاق السعر</label>
            <span className="text-[14px] font-black text-primary bg-primary/10 px-3 py-1.5 rounded-[8px] border border-primary/20 shadow-sm">ريال {price.toLocaleString()}</span>
        </div>
        <div className="relative py-2 group cursor-pointer lg:px-1" dir="rtl">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-2 bg-[#f0f0f0] rounded-full overflow-hidden">
                <div 
                    className="absolute right-0 top-0 h-full bg-primary" 
                    style={{ width: `${(price / 10000) * 100}%` }}
                ></div>
            </div>
            <input 
                type="range" 
                min="0" 
                max="10000" 
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                className="relative z-10 w-full h-2 bg-transparent appearance-none cursor-pointer accent-primary"
                dir="rtl"
            />
        </div>
        <div className="flex items-center justify-between text-[9px] font-black text-foreground/30">
            <span>0 ريال</span>
            <span>+ ريال 10,000</span>
        </div>
      </div>

      {/* Sort Dropdown */}
      <div className="space-y-2">
        <label className="text-[14px] font-black text-foreground/30 uppercase tracking-widest block">ترتيب حسب</label>
        <div className="relative">
          <div 
            onClick={() => toggleDropdown("sort")}
            className={`w-full h-11 rounded-[10px] px-4 flex items-center justify-between font-bold text-xs transition-all cursor-pointer border ${
                activeDropdown === "sort" ? "border-primary bg-white shadow-xl shadow-primary/5" : "bg-[#F1F5F9] border-transparent text-foreground/70 hover:border-primary/20"
            }`}
          >
            <span>{selectedSort}</span>
            <ChevronDown className={`w-3.5 h-3.5 text-foreground/20 transition-transform ${activeDropdown === "sort" ? "rotate-180" : ""}`} />
          </div>

          {activeDropdown === "sort" && (
            <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-foreground/10 rounded-[10px] shadow-2xl z-30 overflow-hidden animate-fade-in">
              <div className="py-1 text-xs">
                {sorts.map((sort) => (
                  <div 
                    key={sort} 
                    onClick={() => handleSelect(setSelectedSort, sort)}
                    className={`px-4 py-3 text-right font-bold cursor-pointer transition-colors border-b border-foreground/5 last:border-0 ${selectedSort === sort ? "bg-primary text-white" : "hover:bg-muted/80 text-foreground/70"}`}
                  >
                    {sort}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Apply Button */}
      <button 
        onClick={() => onApply?.()}
        className="w-full h-12 bg-primary text-white rounded-[10px] font-black text-sm hover:shadow-lg active:scale-95 transition-all mt-4 shadow-md shadow-primary/20 border border-white/10"
      >
        تطبيق الفلاتر
      </button>
    </aside>
  );
};

export default SidebarFilters;
