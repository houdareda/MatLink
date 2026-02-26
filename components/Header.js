"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Search, X, Menu, UserCircle, MapPin, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import productsData from "@/data/products.json";

const Header = () => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isMobileCountryOpen, setIsMobileCountryOpen] = useState(false);
  
  const countries = [
    { name: "السعودية", code: "sa", flag: "https://flagcdn.com/w40/sa.png" },
    { name: "مصر", code: "eg", flag: "https://flagcdn.com/w40/eg.png" },
    { name: "الإمارات", code: "ae", flag: "https://flagcdn.com/w40/ae.png" },
    { name: "الكويت", code: "kw", flag: "https://flagcdn.com/w40/kw.png" },
    { name: "قطر", code: "qa", flag: "https://flagcdn.com/w40/qa.png" },
    { name: "عمان", code: "om", flag: "https://flagcdn.com/w40/om.png" },
    { name: "البحرين", code: "bh", flag: "https://flagcdn.com/w40/bh.png" },
    { name: "الأردن", code: "jo", flag: "https://flagcdn.com/w40/jo.png" },
    { name: "لبنان", code: "lb", flag: "https://flagcdn.com/w40/lb.png" },
    { name: "العراق", code: "iq", flag: "https://flagcdn.com/w40/iq.png" },
    { name: "المغرب", code: "ma", flag: "https://flagcdn.com/w40/ma.png" },
    { name: "تونس", code: "tn", flag: "https://flagcdn.com/w40/tn.png" },
    { name: "الجزائر", code: "dz", flag: "https://flagcdn.com/w40/dz.png" },
    { name: "ليبيا", code: "ly", flag: "https://flagcdn.com/w40/ly.png" },
    { name: "اليمن", code: "ye", flag: "https://flagcdn.com/w40/ye.png" },
    { name: "السودان", code: "sd", flag: "https://flagcdn.com/w40/sd.png" },
    { name: "فلسطين", code: "ps", flag: "https://flagcdn.com/w40/ps.png" },
    { name: "تركيا", code: "tr", flag: "https://flagcdn.com/w40/tr.png" },
    { name: "أمريكا", code: "us", flag: "https://flagcdn.com/w40/us.png" },
    { name: "بريطانيا", code: "gb", flag: "https://flagcdn.com/w40/gb.png" },
    { name: "الصين", code: "cn", flag: "https://flagcdn.com/w40/cn.png" },
    { name: "ألمانيا", code: "de", flag: "https://flagcdn.com/w40/de.png" },
    { name: "فرنسا", code: "fr", flag: "https://flagcdn.com/w40/fr.png" },
    { name: "إيطاليا", code: "it", flag: "https://flagcdn.com/w40/it.png" },
    { name: "إسبانيا", code: "es", flag: "https://flagcdn.com/w40/es.png" },
  ];

  const languages = [
    { name: "العربية", code: "ar", flag: "https://flagcdn.com/w40/sa.png" },
    { name: "English", code: "en", flag: "https://flagcdn.com/w40/us.png" },
  ];
  
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const searchRef = useRef(null);
  const menuRef = useRef(null);
  const countryRef = useRef(null);
  const langRef = useRef(null);

  // Close search/menu/country/lang on scroll or escape key or click outside
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
        setIsCountryOpen(false);
        setIsLanguageOpen(false);
      }
    };

    const handleScroll = () => {
      if (isSearchOpen) setIsSearchOpen(false);
    };

    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchOpen(false);
      }
      if (menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.menu-toggle')) {
        setIsMenuOpen(false);
        setIsMobileCountryOpen(false);
      }
      if (countryRef.current && !countryRef.current.contains(e.target)) {
        setIsCountryOpen(false);
      }
      if (langRef.current && !langRef.current.contains(e.target)) {
        setIsLanguageOpen(false);
      }
    };

    const handleOpenSearch = () => setIsSearchOpen(true);

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("open-search", handleOpenSearch);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("open-search", handleOpenSearch);
    };
  }, [isSearchOpen, isMenuOpen, isCountryOpen, isLanguageOpen]);

  // Handle live search filtering
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

  const navLinks = [
    { label: "الرئيسية", href: "/" },
    { label: "عن المنصة", href: "/about" },
    { label: "المنتجات", href: "/products" },
    { label: "الموردون", href: "/suppliers" },
  ];

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm transition-all duration-300">
      {/* Top Accent Border */}
      <div className="h-[3px] w-full bg-accent/20"></div>
      
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between relative z-50 bg-white">
        {/* Right Side: Logo */}
        <Link href="/" className="flex items-center gap-2 lg:gap-3 group shrink-0">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary rounded-lg lg:rounded-xl rotate-45 flex items-center justify-center transform group-hover:rotate-90 transition-transform shadow-lg shadow-primary/20">
            <div className="w-3 h-3 lg:w-4 lg:h-4 border-2 border-white -rotate-45"></div>
          </div>
          <div className="flex flex-col items-start translate-y-0.5" dir="rtl">
            <span className="text-lg lg:text-xl font-black text-foreground leading-none tracking-tight">Mat Link</span>
            <span className="text-[7px] lg:text-[9px] text-foreground/40 font-bold leading-none uppercase mt-1">منصة المشتريات الإنشائية</span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <ul className="hidden xl:flex items-center gap-x-6 2xl:gap-x-12">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link 
                href={item.href} 
                className={`text-sm font-bold transition-colors hover:text-primary whitespace-nowrap ${
                  pathname === item.href ? "text-primary" : "text-foreground/80"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Left Side: Auth, Language, Country & Menu */}
        <div className="flex items-center gap-2 lg:gap-4 shrink-0">
          <div className="flex items-center gap-1 md:gap-2 lg:gap-3">
            {/* Search Toggle */}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-full transition-all ${isSearchOpen ? 'bg-primary/10 text-primary' : 'text-foreground/70 hover:bg-muted'}`}
            >
                {isSearchOpen ? <X className="w-5 h-5 lg:w-6 lg:h-6" /> : <Search className="w-5 h-5 lg:w-6 lg:h-6" />}
            </button>
            
            {/* Country Selector (Desktop) */}
            <div className="relative hidden sm:block" ref={countryRef}>
              <button 
                onClick={() => setIsCountryOpen(!isCountryOpen)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border-2 transition-all font-bold text-xs ${
                  isCountryOpen ? 'border-primary/40 bg-primary/5' : 'border-transparent hover:bg-muted'
                }`}
              >
                <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-8 h-5 object-cover rounded-[2px] shadow-sm" />
                <ChevronDown className={`w-3.5 h-3.5 text-foreground/30 transition-transform ${isCountryOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>
              
              {/* Country Dropdown */}
              <div className={`absolute top-full right-0 mt-3 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-foreground/5 py-3 w-48 transition-all z-60 origin-top-right overflow-y-auto max-h-[400px] custom-scrollbar ${
                isCountryOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}>
                {countries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      setSelectedCountry(country);
                      setIsCountryOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-5 py-2.5 hover:bg-primary/5 transition-colors text-right text-xs font-bold group ${
                      selectedCountry.code === country.code ? 'text-primary bg-primary/5' : 'text-foreground/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={country.flag} alt={country.name} className="w-6 h-4 object-cover rounded-[2px]" />
                      <span>{country.name}</span>
                    </div>
                    {selectedCountry.code === country.code && <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selector (Desktop) */}
            <div className="relative hidden sm:block" ref={langRef}>
              <button 
                onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 transition-all font-bold text-xs ${
                  isLanguageOpen ? 'border-primary/40 bg-primary/5' : 'border-transparent hover:bg-muted'
                }`}
              >
                <Globe className={`w-4 h-4 text-foreground/40 ${isLanguageOpen ? 'text-primary' : ''}`} />
                <span className="hidden md:inline text-foreground/70 font-bold uppercase tracking-widest">{selectedLang.code}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-foreground/30 transition-transform ${isLanguageOpen ? 'rotate-180 text-primary' : ''}`} />
              </button>
              
              {/* Language Dropdown */}
              <div className={`absolute top-full right-0 mt-3 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-foreground/5 py-3 w-44 transition-all z-60 origin-top-right ${
                isLanguageOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLang(lang);
                      setIsLanguageOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-5 py-3 hover:bg-primary/5 transition-colors text-right text-xs font-bold ${
                      selectedLang.code === lang.code ? 'text-primary bg-primary/5' : 'text-foreground/70'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={lang.flag} alt={lang.name} className="w-6 h-4 object-cover rounded-[2px]" />
                      <span>{lang.name}</span>
                    </div>
                    {selectedLang.code === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Login (Desktop Only) */}
            <Link 
              href="/login" 
              className="hidden xl:flex text-foreground/70 transition-colors px-3 py-2 rounded-full hover:bg-muted group items-center"
            >
              <span className="font-bold group-hover:text-primary text-sm whitespace-nowrap">تسجيل الدخول</span>
            </Link>
          </div>
          
          <div className="h-6 w-px bg-foreground/10 mx-1 hidden xl:block"></div>
          
          {/* Register Button */}
          <Link 
            href="/register" 
            className="bg-primary text-white px-4 lg:px-6 py-2 lg:py-2.5 rounded-[8px] lg:rounded-[10px] font-bold text-[11px] lg:text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            إنشاء حساب
          </Link>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="menu-toggle p-2 rounded-lg bg-muted/50 text-foreground xl:hidden hover:bg-primary/10 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-100 transition-opacity duration-300 xl:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          ref={menuRef}
          className={`absolute top-0 right-0 h-full w-[300px] bg-white shadow-2xl transition-transform duration-500 transform ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex flex-col h-full overflow-y-auto">
            <div className="flex items-center justify-between mb-8 shrink-0">
              <span className="text-xl font-black text-primary">القائمة</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 rounded-full bg-muted text-foreground/50 hover:text-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <ul className="space-y-6 flex-1">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href} 
                    className={`flex items-center justify-between text-lg font-bold transition-colors py-2 border-b border-muted group ${
                      pathname === item.href ? "text-primary" : "text-foreground"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <div className={`w-1.5 h-1.5 rounded-full bg-primary transition-opacity ${
                      pathname === item.href ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}></div>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Prominent Login Section for Mobile - Moved to Bottom */}
            <div className="mt-8 mb-6 p-4 bg-muted/30 rounded-2xl border border-foreground/5 shrink-0">
              <Link 
                href="/login"
                className="flex items-center gap-4 text-foreground hover:text-primary transition-colors group"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <UserCircle className="w-7 h-7 text-primary" />
                </div>
                <div className="flex flex-col text-right">
                  <span className="font-black text-base">تسجيل الدخول</span>
                  <span className="text-[10px] text-foreground/40 font-bold">مرحباً بك في مات لينك</span>
                </div>
              </Link>
            </div>

            {/* Mobile Selection (Country & Language) */}
            <div className="mt-auto space-y-4 pt-6 border-t border-muted">
              {/* Country Selection Mobile (Accordion Style) */}
              <div className="space-y-2">
                <button 
                  onClick={() => setIsMobileCountryOpen(!isMobileCountryOpen)}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-foreground/5 transition-all group hover:border-primary/20"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-foreground/40 group-hover:text-primary transition-colors" />
                    <div className="flex items-center gap-2">
                       <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-5 h-3.5 object-cover rounded-[2px]" />
                       <span className="text-sm font-bold text-foreground/70">{selectedCountry.name}</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-foreground/30 transition-transform duration-300 ${isMobileCountryOpen ? 'rotate-180 text-primary' : ''}`} />
                </button>

                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  isMobileCountryOpen ? 'max-h-[400px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                }`}>
                  <div className="bg-muted/30 rounded-xl border border-foreground/5 p-2 overflow-y-auto max-h-[350px] custom-scrollbar">
                    <div className="grid grid-cols-1 gap-1">
                      {countries.map((country) => (
                        <button
                          key={country.code}
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsMobileCountryOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors text-right text-xs font-bold ${
                            selectedCountry.code === country.code ? 'text-primary bg-primary/5' : 'text-foreground/70 hover:bg-muted'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <img src={country.flag} alt={country.name} className="w-6 h-4 object-cover rounded-[2px]" />
                            <span>{country.name}</span>
                          </div>
                          {selectedCountry.code === country.code && <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Language Selection Mobile */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2 mb-1 px-1">
                  <Globe className="w-4 h-4 text-foreground/40" />
                  <span className="text-xs font-black text-foreground/40 uppercase tracking-wider">لغة العرض</span>
                </div>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSelectedLang(lang)}
                      className={`flex-1 px-4 py-2.5 rounded-xl border-2 text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                        selectedLang.code === lang.code 
                        ? 'border-primary/40 bg-primary/5 text-primary shadow-sm shadow-primary/5' 
                        : 'border-transparent bg-muted text-foreground/60 hover:bg-muted/80'
                      }`}
                    >
                      <img src={lang.flag} alt={lang.name} className="w-5 h-3.5 object-cover rounded-[2px]" />
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <p className="text-[10px] text-foreground/30 font-bold uppercase text-center tracking-widest pt-6">Mat Link &copy; 2026</p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Search Overlay (Existing) */}
      <div 
        ref={searchRef}
        className={`absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-foreground/5 transition-all duration-500 ease-in-out transform shadow-xl ${
          isSearchOpen ? 'translate-y-0 opacity-100 visible shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)]' : '-translate-y-4 opacity-0 invisible pointer-events-none'
        }`}
      >
        <div className="container mx-auto px-4 py-6 lg:py-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 lg:gap-4 bg-muted/50 p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-foreground/5 shadow-inner group focus-within:bg-white focus-within:ring-2 focus-within:ring-primary/20 transition-all">
              <Search className="w-5 h-5 lg:w-6 lg:h-6 text-foreground/20 group-focus-within:text-primary transition-colors" />
              <input 
                type="text" 
                placeholder="ابحث عن مواد بناء..."
                className="w-full bg-transparent border-none outline-none text-base lg:text-lg font-bold placeholder:text-foreground/20 text-foreground"
                autoFocus={isSearchOpen}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-primary text-white px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg lg:rounded-xl font-black text-xs lg:text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                بحث
              </button>
            </div>
            
            {/* Search Results / Suggestions */}
            <div className="mt-6">
              {searchQuery.trim().length > 0 ? (
                <div className="space-y-4 animate-fade-in-up">
                  {/* Results Count */}
                  <div className="flex justify-end px-2">
                    <span className="text-[10px] font-bold text-foreground/40">{filteredResults.length} نتيجة</span>
                  </div>
                  
                  {/* Results List */}
                  <div className="bg-white rounded-2xl border border-foreground/5 shadow-xl overflow-hidden divide-y divide-foreground/5">
                    {filteredResults.length > 0 ? (
                      filteredResults.slice(0, 5).map((product) => (
                        <Link 
                          href={`/products/${product.id}`} 
                          key={product.id}
                          className="flex items-center gap-4 p-4 hover:bg-primary/5 transition-colors group"
                        >
                          {/* Product Image */}
                          <div className="w-14 h-14 rounded-xl overflow-hidden border border-foreground/5 group-hover:scale-105 transition-transform shrink-0 shadow-sm">
                            <img 
                              src={product.image} 
                              alt={product.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          
                          <div className="flex-1 text-right">
                            <h4 className="text-base font-black text-foreground mb-0.5">
                              {/* Orange first word */}
                              <span className="text-primary">{product.title.split(' ')[0]}</span>
                              {' '}{product.title.split(' ').slice(1).join(' ')}
                            </h4>
                            <p className="text-xs font-bold text-primary">من {product.price} ر.س</p>
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
              ) : (
                /* Quick Suggestions */
                <div className="flex flex-wrap items-center justify-center gap-2 lg:gap-3">
                  <span className="text-[10px] lg:text-xs font-black text-foreground/40 ml-2">مقترحات:</span>
                  {["حديد", "أسمنت", "طوب", "سباكة"].map((item) => (
                    <button 
                      key={item} 
                      onClick={() => setSearchQuery(item)}
                      className="px-3 py-1 lg:px-4 lg:py-1.5 bg-muted rounded-full text-[10px] lg:text-xs font-bold text-foreground/60 hover:bg-primary/10 hover:text-primary transition-all"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
