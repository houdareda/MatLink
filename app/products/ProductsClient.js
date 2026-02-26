"use client";

import SidebarFilters from "@/components/SidebarFilters";
import ProductCard from "@/components/ProductCard";
import productsData from "@/data/products.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Filter, X, ShoppingBag } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const ProductsClient = () => {
  const router = useRouter();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = productsData.filter(product => 
      product.title.toLowerCase().includes(query) || 
      product.category.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  }, [searchQuery]);

  const handleSearch = () => {
    if (searchQuery.trim().length > 0) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-black rtl">
      <Header />

      {/* Hero Section - More Compact */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20 mb-6">
               <ShoppingBag className="w-4 h-4 text-primary" />
               <span className="text-[10px] font-black text-primary uppercase tracking-widest">تصفح مواد البناء</span>
            </div>

            <h1 className="text-3xl lg:text-5xl font-black text-[#1e293b] leading-tight mb-4">
               اكتشف <span className="text-primary italic">عالم الخامات</span> والمنتجات
            </h1>

            <p className="text-base text-foreground/40 font-bold mb-10 max-w-2xl mx-auto leading-relaxed">
               نقدم لك أفضل خامات البناء والمواد الإنشائية من موردين معتمدين، مع خيارات مقارنة متقدمة وأفضل الأسعار.
            </p>

            {/* Enhanced Search Bar */}
            <div className="relative max-w-3xl mx-auto group">
               <div className="absolute inset-0 bg-primary/20 blur-2xl opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
               <div className="relative flex items-center bg-white p-2 rounded-[22px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border-2 border-primary/25 group-focus-within:border-primary transition-all">
                  <div className="flex-1 flex items-center pr-4">
                     <Search className="w-5 h-5 text-primary group-focus-within:scale-110 transition-transform" />
                     <input 
                        type="text" 
                        placeholder="ابحث عن مواد البناء (مثلاً: حديد، أسمنت، خشب)..."
                        className="w-full bg-transparent border-none outline-none px-4 py-3 text-sm lg:text-base font-bold placeholder:text-foreground/20 text-foreground"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={onKeyDown}
                     />
                  </div>
                  <button 
                    onClick={handleSearch}
                    className="bg-primary text-white px-8 py-3 rounded-[16px] font-black text-xs lg:text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                  >
                    بحث
                  </button>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Listing Section */}
      <section className="pb-32 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar Filters */}
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
                    <span>تصفية المنتجات</span>
                </button>
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex justify-between items-center mb-10 px-2 lg:px-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                  <span className="text-[10px] uppercase font-black text-foreground/30 tracking-widest leading-none">نتائج البحث</span>
                </div>
                <span className="text-sm font-black text-[#1e293b]">{filteredProducts.length} منتج متاح</span>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="py-24 bg-white rounded-[32px] border border-dashed border-foreground/10 flex flex-col items-center justify-center space-y-4">
                  <div className="w-20 h-20 bg-muted/30 rounded-full flex items-center justify-center">
                    <Search className="w-10 h-10 text-foreground/20" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-black text-[#1e293b]">لا توجد نتائج</h3>
                    <p className="text-sm text-foreground/30 font-bold">لم نجد منتجات تطابق بحثك حالياً.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Drawer */}
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

export default ProductsClient;
