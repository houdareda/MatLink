"use client";

import SidebarFilters from "./SidebarFilters";
import ProductCard from "./ProductCard";
import productsData from "@/data/products.json";
import { Search, Filter, X, GitCompare } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useCompare } from "@/context/CompareContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const FeaturedProducts = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { selectedProducts, showNotification } = useCompare();
  const router = useRouter();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const results = productsData.filter(product => 
        product.title.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleHeaderCompareClick = () => {
    if (selectedProducts.length === 0) {
      showNotification("يرجى اختيار منتجات للمقارنة");
    } else {
      router.push("/compare");
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="py-16 bg-[#F6F7F9] relative">
      {/* ... (keep existing blur and drawer) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      {/* Mobile Filter Drawer Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-100 transition-opacity duration-300 lg:hidden ${
          isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsFilterOpen(false)}
      >
        <div 
          className={`absolute top-0 right-0 h-full w-[320px] bg-white shadow-2xl transition-transform duration-500 transform ${
            isFilterOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex flex-col h-full overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-8 shrink-0">
              <span className="text-xl font-black text-primary">المصفيّات</span>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="p-2 rounded-lg bg-muted text-foreground/40 hover:text-primary transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <SidebarFilters onApply={() => setIsFilterOpen(false)} />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between border-b border-foreground/5 pb-8 mb-12 gap-6">
          <div className="text-right flex-1 order-1">
            <span className="text-[10px] lg:text-xs font-black text-primary uppercase tracking-[0.2em] block mb-3">سوقنا</span>
            <h2 className="text-xl md:text-2xl font-black text-foreground leading-tight">المواد المميزة</h2>
          </div>

          {/* Search Box in the Middle - Enhanced prominence */}
          <div className="flex-2 w-full max-w-xl order-2 relative group px-2" ref={searchBarRef}>
            <div className="relative group">
              <div className="relative flex items-center bg-white p-2 rounded-[22px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border-2 border-primary/25 group-focus-within:border-primary transition-all">
                <div className="flex-1 flex items-center pr-4">
                  <Search className="w-5 h-5 text-primary group-focus-within:scale-110 transition-transform" />
                  <input 
                    type="text" 
                    placeholder="ابحث عن مواد البناء (مثلاً: حديد، أسمنت، خشب)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    className="w-full bg-transparent border-none outline-none px-4 py-3 text-sm lg:text-base font-bold placeholder:text-foreground/20 text-foreground"
                  />
                </div>
                <button 
                  onClick={handleSearch}
                  className="bg-primary text-white px-8 py-3 rounded-[16px] font-black text-xs lg:text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                >
                  ابحـث
                </button>
              </div>
            </div>

            {/* Search Suggestions Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-foreground/5 overflow-hidden z-20 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="p-3 border-b border-foreground/5 flex justify-end">
                   <span className="text-[10px] font-bold text-foreground/40">{filteredResults.length} نتيجة</span>
                </div>
                <div className="max-h-[350px] overflow-y-auto custom-scrollbar divide-y divide-foreground/5">
                  {filteredResults.length > 0 ? (
                    filteredResults.slice(0, 8).map((product) => (
                      <Link 
                        href={`/products/${product.id}`} 
                        key={product.id}
                        className="flex items-center gap-3 p-3 hover:bg-primary/5 transition-colors group/item"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-foreground/5 group-hover/item:scale-105 transition-transform shrink-0 shadow-sm bg-muted/30">
                          <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 text-right">
                          <h4 className="text-sm font-black text-foreground mb-0.5">
                            <span className="text-primary">{product.title.split(' ')[0]}</span>
                            {' '}{product.title.split(' ').slice(1).join(' ')}
                          </h4>
                          <p className="text-[10px] font-bold text-primary">من {product.price} ر.س</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="py-12 text-center">
                       <p className="text-sm font-bold text-foreground/40 italic">لا توجد نتائج لـ "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 flex-1 justify-end order-3">
            <button 
              onClick={handleHeaderCompareClick}
              className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 px-6 py-2.5 rounded-[10px] text-primary font-black text-xs border border-primary/20 transition-all hover:scale-105 active:scale-95 group"
            >
              <GitCompare className="w-4 h-4 text-primary group-hover:scale-110 transition-transform duration-500" />
              <span>مقارنة</span>
            </button>
            <button 
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white hover:bg-muted px-6 py-2.5 rounded-[10px] text-foreground/60 font-black text-xs border border-foreground/5 transition-all hover:scale-105 active:scale-95 group shadow-sm"
            >
              <Filter className="w-4 h-4 group-hover:text-primary transition-colors" />
              <span>الفلاتر</span>
            </button>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content (Products Grid) */}
          <div className="flex-1 order-2">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {productsData.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Load More Placeholder */}
            <div className="mt-20 flex justify-center">
                <Link 
                  href="/products" 
                  className="px-12 h-12 rounded-[12px] border-2 border-foreground/5 font-black text-foreground/40 text-sm hover:border-primary/30 hover:text-primary transition-all flex items-center justify-center bg-white"
                >
                    عرض المزيد من المنتجات
                </Link>
            </div>
          </div>

          {/* Sidebar (Filters) - Visible only on PC */}
          <div className="hidden lg:block w-[300px] order-1 shrink-0">
            <SidebarFilters onApply={() => setIsFilterOpen(false)} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
