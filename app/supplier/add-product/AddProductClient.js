"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Plus, 
  Trash2, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  X, 
  ArrowRight, 
  Info, 
  FileText, 
  Package, 
  DollarSign, 
  Settings, 
  Image as ImageIcon,
  ChevronDown,
  LayoutGrid
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Reusable Input Wrapper (matching SetupProfile style)
const InputWrapper = ({ label, children, info, required }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between px-1">
      <label className="text-sm font-black text-foreground/70 flex items-center gap-1.5">
        {label}
        {required && <span className="text-primary text-lg leading-none">*</span>}
      </label>
      {info && (
        <div className="group relative">
          <Info className="w-3.5 h-3.5 text-foreground/30 cursor-help" />
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-xl">
            {info}
          </div>
        </div>
      )}
    </div>
    {children}
  </div>
);

const AddProductClient = () => {
  const [activeSection, setActiveSection] = useState("basic");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "error" });

  // Form States
  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    category: "",
    description: "",
    detailedDescription: "",
    warranty: "",
    unit: "طن", // Default unit
  });

  const [specs, setSpecs] = useState([{ id: Date.now(), key: "", value: "" }]);
  const [tiers, setTiers] = useState([{ id: Date.now(), minQty: "1", maxQty: "", price: "" }]);
  
  const [images, setImages] = useState([]); // Array of { file, preview }
  const [files, setFiles] = useState({
    dataSheet: null,
    certificates: null
  });

  const categories = [
    "حديد تسليح",
    "أسمنت وبلوك",
    "خرسانة جاهزة",
    "أدوات كهربائية",
    "سباكة ومواسير",
    "أخشاب ونجارة",
    "أصباغ ودهانات",
    "عوازل ومواد كيميائية"
  ];

  const sections = [
    { id: "basic", title: "البيانات الأساسية", icon: LayoutGrid, number: "١" },
    { id: "specs", title: "المواصفات والضمان", icon: Settings, number: "٢" },
    { id: "pricing", title: "الأسعار والكميات", icon: DollarSign, number: "٣" },
    { id: "media", title: "الصور والمستندات", icon: Upload, number: "٤" },
  ];

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "error" }), 4000);
  };

  // Handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImages([{
      file,
      preview: URL.createObjectURL(file)
    }]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const handleFileChange = (type, e) => {
    const file = e.target.files[0];
    if (file) setFiles(prev => ({ ...prev, [type]: file }));
  };

  // Dynamic Specs
  const addSpec = () => setSpecs([...specs, { id: Date.now(), key: "", value: "" }]);
  const removeSpec = (id) => setSpecs(specs.filter(s => s.id !== id));
  const updateSpec = (id, field, value) => {
    setSpecs(specs.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  // Dynamic Tiers
  const addTier = () => setTiers([...tiers, { id: Date.now(), minQty: "", maxQty: "", price: "" }]);
  const removeTier = (id) => setTiers(tiers.filter(t => t.id !== id));
  const updateTier = (id, field, value) => {
    setTiers(tiers.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  // Validation
  const validateStep = (stepId) => {
    if (stepId === "basic") {
      if (!formData.nameAr.trim()) return "يرجى إدخال اسم المنتج بالعربية";
      if (!formData.nameEn.trim()) return "يرجى إدخال اسم المنتج بالإنجليزية";
      if (!formData.category) return "يرجى اختيار قسم المنتج";
      if (!formData.description.trim()) return "يرجى إدخال وصف المختصر للمنتج";
    }
    
    if (stepId === "pricing") {
      const invalidTier = tiers.find(t => !t.minQty || !t.price);
      if (invalidTier) return "يرجى إكمال بيانات السعر والكمية";
    }

    return null;
  };

  const handleNextStep = (nextId) => {
    const error = validateStep(activeSection);
    if (error) {
      showToast(error);
      return;
    }
    setActiveSection(nextId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateStep("media");
    if (error) {
      showToast(error);
      return;
    }
    if (images.length === 0) {
      showToast("يرجى رفع صورة واحدة على الأقل للمنتج");
      return;
    }
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] font-black rtl flex items-center justify-center p-4">
        <div className="bg-white rounded-[40px] p-12 shadow-2xl border border-foreground/5 max-w-lg w-full text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-[#1e293b] mb-4">تم إضافة المنتج بنجاح!</h2>
          <p className="text-foreground/40 font-bold mb-10">
            رائع! منتجك الآن قيد المراجعة وسيظهر للعملاء بمجرد التأكد من كافة البيانات.
          </p>
          <div className="flex flex-col gap-3">
            <button onClick={() => window.location.reload()} className="bg-primary text-white px-10 py-4 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-lg">
              إضافة منتج آخر
            </button>
            <Link href="/" className="text-foreground/40 font-black text-xs hover:text-primary transition-colors py-2">
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-black rtl">
      <Header />

      {/* Toast */}
      {toast.show && (
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-100 animate-in slide-in-from-top-4 duration-300">
          <div className="bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-red-400">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span className="text-sm font-black">{toast.message}</span>
            <button onClick={() => setToast({ ...toast, show: false })} className="ml-2 hover:opacity-70">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="text-center md:text-right">
              <h1 className="text-3xl lg:text-4xl font-black text-[#1e293b] mb-4">إضافة منتج جديد</h1>
              <p className="text-foreground/40 font-bold max-w-2xl text-sm lg:text-base">
                أدخل مواصفات منتجك بدقة لتسهل على المقاولين العثور عليك وتوريد الكميات المطلوبة.
              </p>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-foreground/5 flex items-center gap-4">
              <div className="flex -space-x-2 rtl:space-x-reverse">
                {sections.map((s, idx) => (
                  <div key={s.id} className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black transition-all ${
                    idx <= sections.findIndex(sec => sec.id === activeSection) ? 'bg-primary text-white' : 'bg-muted text-foreground/20'
                  }`}>
                    {s.number}
                  </div>
                ))}
              </div>
              <span className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">خطوات الإضافة</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Nav */}
            <div className="lg:w-1/4 shrink-0">
              <div className="bg-white rounded-[24px] p-4 shadow-sm border border-foreground/5 sticky top-28">
                <div className="space-y-1">
                  {sections.map((section, idx) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    const isCompleted = sections.findIndex(s => s.id === activeSection) > idx;

                    return (
                      <button
                        key={section.id}
                        onClick={() => {
                          const targetIdx = sections.findIndex(s => s.id === section.id);
                          const currentIdx = sections.findIndex(s => s.id === activeSection);
                          if (targetIdx < currentIdx) setActiveSection(section.id);
                        }}
                        className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all relative ${
                          isActive 
                          ? 'bg-primary/10 text-primary shadow-sm shadow-primary/5' 
                          : 'text-foreground/40 hover:bg-muted/50 hover:text-foreground/60'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                          isActive ? 'bg-primary text-white scale-110' : (isCompleted ? 'bg-green-500 text-white' : 'bg-muted')
                        }`}>
                          {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                        </div>
                        <div className="flex flex-col items-start">
                          <span className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">الخطوة {section.number}</span>
                          <span className="text-xs lg:text-sm font-black">{section.title}</span>
                        </div>
                        {isActive && <div className="absolute left-0 w-1 h-8 bg-primary rounded-r-full" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Form Area */}
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* 1. Basic Information */}
                {activeSection === "basic" && (
                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-foreground/5 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="flex items-center gap-4 border-b border-foreground/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                        <LayoutGrid className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-[#1e293b]">البيانات الأساسية</h2>
                        <p className="text-xs text-foreground/40 font-bold">اسم المنتج وتصنيفه العام</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputWrapper label="اسم المنتج (بالعربية)" required>
                        <input name="nameAr" value={formData.nameAr} onChange={handleInputChange} type="text" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all" placeholder="مثال: حديد تسليح سابك 12 ملم" />
                      </InputWrapper>
                      <InputWrapper label="Product Name (English)" required>
                        <input name="nameEn" value={formData.nameEn} onChange={handleInputChange} type="text" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all text-left rtl-input placeholder:text-right" placeholder="Example: Sabic Rebar 12mm" />
                      </InputWrapper>
                      <InputWrapper label="تصنيف المنتج" required>
                        <div className="relative">
                          <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all appearance-none cursor-pointer">
                            <option value="">اختر التصنيف المناسب</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                          </select>
                          <ChevronDown className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 pointer-events-none" />
                        </div>
                      </InputWrapper>
                    </div>

                    <InputWrapper label="وصف المنتج (مختصر)" required info="سيظهر في نتائج البحث وبجانب صورة المنتج">
                      <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-2xl px-5 py-4 text-sm font-bold outline-none transition-all resize-none" placeholder="اكتب وصفاً جذاباً ومختصراً للمنتج..."></textarea>
                    </InputWrapper>

                    <div className="flex justify-end pt-4 border-t border-foreground/5">
                      <button type="button" onClick={() => handleNextStep("specs")} className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-lg active:scale-95">
                        <span>المواصفات والضمان</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. Specifications & Warranty */}
                {activeSection === "specs" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-foreground/5 space-y-8">
                      <div className="flex items-center gap-4 border-b border-foreground/5 pb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                          <Settings className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-xl font-black text-[#1e293b]">المواصفات والضمان</h2>
                          <p className="text-xs text-foreground/40 font-bold">تفاصيل فنية دقيقة ومعلومات الضمان</p>
                        </div>
                      </div>

                      <InputWrapper label="وصف تفصيلي للمنتج (اختياري)">
                         <textarea name="detailedDescription" value={formData.detailedDescription} onChange={handleInputChange} rows={5} className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-2xl px-5 py-4 text-sm font-bold outline-none transition-all resize-none" placeholder="نحن نورد هذا المنتج وفقاً لأعلى معايير الجودة العالمية..."></textarea>
                      </InputWrapper>

                      <InputWrapper label="معلومات الضمان (اختياري)">
                         <input name="warranty" value={formData.warranty} onChange={handleInputChange} type="text" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all" placeholder="مثال: ضمان لمدة 10 سنوات ضد عيوب التصنيع" />
                      </InputWrapper>

                      {/* Technical Specs List */}
                      <div className="pt-4 border-t border-foreground/5">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-sm font-black text-[#1e293b]">المواصفات الفنية</h3>
                          <button type="button" onClick={addSpec} className="flex items-center gap-2 text-primary font-black text-xs hover:opacity-70">
                            <Plus className="w-4 h-4" />
                            <span>إضافة صفحة</span>
                          </button>
                        </div>
                        
                        <div className="space-y-3">
                          {specs.map((spec) => (
                            <div key={spec.id} className="grid grid-cols-12 gap-3 items-center group">
                               <div className="col-span-11 grid grid-cols-2 gap-3 bg-[#F1F5F9] p-2 rounded-xl border border-foreground/5">
                                  <input 
                                    value={spec.value} 
                                    onChange={(e) => updateSpec(spec.id, "value", e.target.value)} 
                                    className="bg-white rounded-lg px-4 py-3 text-xs font-black outline-none focus:ring-1 ring-primary/20" 
                                    placeholder="القيمة (مثال: 12 ملم)"
                                  />
                                  <input 
                                    value={spec.key} 
                                    onChange={(e) => updateSpec(spec.id, "key", e.target.value)} 
                                    className="bg-white rounded-lg px-4 py-3 text-xs font-black outline-none focus:ring-1 ring-primary/20 text-right" 
                                    placeholder="الخاصية (مثال: القطر)"
                                  />
                               </div>
                               <button type="button" onClick={() => removeSpec(spec.id)} className="col-span-1 flex justify-center text-red-300 hover:text-red-500 transition-colors">
                                 <Trash2 className="w-4 h-4" />
                               </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-foreground/5 flex justify-between items-center">
                      <button type="button" onClick={() => setActiveSection("basic")} className="text-sm font-black text-foreground/40 hover:text-foreground/60 transition-colors px-6">رجوع</button>
                      <button type="button" onClick={() => handleNextStep("pricing")} className="flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-lg">
                        <span>الأسعار والكميات</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. Pricing & Quantity */}
                {activeSection === "pricing" && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-foreground/5 space-y-8">
                      <div className="flex items-center gap-4 border-b border-foreground/5 pb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                          <DollarSign className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1 flex items-center justify-between">
                          <div>
                            <h2 className="text-xl font-black text-[#1e293b]">الأسعار والكميات</h2>
                            <p className="text-xs text-foreground/40 font-bold">حدد وحدة القياس ونطاق السعر</p>
                          </div>
                          <div className="w-48">
                            <InputWrapper label="وحدة القياس">
                              <select name="unit" value={formData.unit} onChange={handleInputChange} className="w-full bg-[#333] text-white rounded-xl px-4 py-3 text-xs font-black outline-none border-none appearance-none cursor-pointer text-center">
                                <option value="طن">طن (Ton)</option>
                                <option value="كيلو">كيلو (Kg)</option>
                                <option value="متر">متر (Meter)</option>
                                <option value="متر مكعب">متر مكعب (m³)</option>
                                <option value="حبة">حبة (Piece)</option>
                                <option value="بوكس">بوكس (Box)</option>
                                <option value="كيس">كيس (Bag)</option>
                              </select>
                            </InputWrapper>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {tiers.map((tier, idx) => (
                           <div key={tier.id} className="bg-[#F1F5F9] rounded-2xl p-6 border border-foreground/5 relative group">
                              <div className="flex items-center justify-between mb-4">
                                <span className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">النطاق السعري {idx + 1}</span>
                                {tiers.length > 1 && (
                                  <button type="button" onClick={() => removeTier(tier.id)} className="text-red-400 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <InputWrapper label={`إلى كمية (${formData.unit})`}>
                                  <input value={tier.maxQty} onChange={(e) => updateTier(tier.id, "maxQty", e.target.value)} type="number" className="w-full bg-white border border-foreground/5 focus:border-primary/20 rounded-xl px-5 py-3.5 text-xs font-black outline-none" placeholder="اختياري (مثال: 50)" />
                                </InputWrapper>
                                <InputWrapper label={`من كمية (${formData.unit})`} required>
                                  <input value={tier.minQty} onChange={(e) => updateTier(tier.id, "minQty", e.target.value)} type="number" className="w-full bg-white border border-foreground/5 focus:border-primary/20 rounded-xl px-5 py-3.5 text-xs font-black outline-none" placeholder="1" />
                                </InputWrapper>
                                <InputWrapper label={`السعر لـ ${formData.unit} (ر.س)`} required>
                                  <input value={tier.price} onChange={(e) => updateTier(tier.id, "price", e.target.value)} type="number" className="w-full bg-white border border-foreground/5 focus:border-primary/20 rounded-xl px-5 py-3.5 text-xs font-black outline-none text-left" placeholder="00.00" />
                                </InputWrapper>
                              </div>
                           </div>
                        ))}

                        <button 
                          type="button" 
                          onClick={addTier}
                          className="w-full py-6 border-2 border-dashed border-foreground/10 rounded-[32px] bg-white/50 text-foreground/40 font-black text-sm flex items-center justify-center gap-3 hover:bg-white hover:border-primary/30 hover:text-primary transition-all group"
                        >
                          <Plus className="w-5 h-5" />
                          <span>إضافة نطاق سبي آخر</span>
                        </button>
                      </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-foreground/5 flex justify-between items-center">
                      <button type="button" onClick={() => setActiveSection("specs")} className="text-sm font-black text-foreground/40 hover:text-foreground/60 transition-colors px-6">رجوع</button>
                      <button type="button" onClick={() => handleNextStep("media")} className="flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-lg active:scale-95">
                        <span>الصور والمستندات</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. Media & Documents */}
                {activeSection === "media" && (
                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-foreground/5 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="flex items-center gap-4 border-b border-foreground/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                        <Upload className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-[#1e293b]">الصور والمستندات</h2>
                        <p className="text-xs text-foreground/40 font-bold">ارفع صور المنتج والشهادات الفنية</p>
                      </div>
                    </div>

                    {/* Single Image Upload */}
                    <div className="space-y-4">
                       <div className="flex items-center justify-between">
                         <label className="text-sm font-black text-foreground/70">صورة المنتج الأساسية</label>
                         <span className="text-[10px] font-bold text-primary bg-primary/5 px-3 py-1 rounded-full">يفضل مقاس 1200 × 800 بكسل</span>
                       </div>
                       
                       {images.length > 0 ? (
                         <div className="relative aspect-3/2 rounded-[32px] overflow-hidden border border-foreground/10 group shadow-lg">
                            <img src={images[0].preview} alt="Product" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                               <label className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                                  <Upload className="w-5 h-5" />
                                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                               </label>
                               <button 
                                 type="button" 
                                 onClick={() => setImages([])}
                                 className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
                                >
                                 <Trash2 className="w-5 h-5" />
                               </button>
                            </div>
                         </div>
                       ) : (
                         <label className="aspect-3/2 rounded-[32px] border-2 border-dashed border-foreground/10 flex flex-col items-center justify-center gap-4 hover:bg-[#F1F5F9] hover:border-primary/40 cursor-pointer transition-all group py-12">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                               <ImageIcon className="w-8 h-8 text-primary" />
                            </div>
                            <div className="text-center">
                               <span className="block text-sm font-black text-[#1e293b]">ارفع صورة كـ غلاف للمنتج</span>
                               <span className="text-[10px] font-bold text-foreground/40">اسحب الصورة هنا أو اضغط للاختيار</span>
                            </div>
                            <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                         </label>
                       )}
                    </div>

                    {/* PDF Documentation */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-foreground/5">
                        <InputWrapper label="Data Sheet (PDF)" info="الملف التقني الكامل للمواصفات">
                           <div className={`relative border border-foreground/10 rounded-2xl p-5 transition-all ${
                             files.dataSheet ? 'border-primary/40 bg-primary/5' : 'bg-[#F1F5F9]'
                           }`}>
                             <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf" onChange={(e) => handleFileChange("dataSheet", e)} />
                             <div className="flex items-center gap-4">
                               <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                                 files.dataSheet ? 'bg-primary text-white' : 'bg-white text-foreground/10'
                               }`}>
                                 <FileText className="w-6 h-6" />
                               </div>
                               <div className="flex-1 truncate">
                                  <p className="text-xs font-black truncate">{files.dataSheet ? files.dataSheet.name : 'ارفع مواصفات PDF'}</p>
                               </div>
                             </div>
                           </div>
                        </InputWrapper>

                        <InputWrapper label="شهادات المنتج (اختياري)">
                           <div className={`relative border border-foreground/10 rounded-2xl p-5 transition-all ${
                             files.certificates ? 'border-primary/40 bg-primary/5' : 'bg-[#F1F5F9]'
                           }`}>
                             <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf" onChange={(e) => handleFileChange("certificates", e)} />
                             <div className="flex items-center gap-4">
                               <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                                 files.certificates ? 'bg-primary text-white' : 'bg-white text-foreground/10'
                               }`}>
                                 <Package className="w-6 h-6" />
                               </div>
                               <div className="flex-1 truncate">
                                  <p className="text-xs font-black truncate">{files.certificates ? files.certificates.name : 'ارفع شهادات الجودة'}</p>
                               </div>
                             </div>
                           </div>
                        </InputWrapper>
                    </div>

                    <div className="flex justify-between pt-4 border-t border-foreground/5">
                      <button type="button" onClick={() => setActiveSection("pricing")} className="text-sm font-black text-foreground/40 hover:text-foreground/60 transition-colors px-6">رجوع</button>
                      <button type="submit" className="flex items-center gap-3 bg-primary text-white px-12 py-4 rounded-xl font-black text-base hover:bg-primary/90 transition-all shadow-xl active:scale-95">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>حفظ المنتج ومراجعة</span>
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AddProductClient;
