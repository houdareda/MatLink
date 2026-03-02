"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  Building2, 
  Upload, 
  Globe, 
  Mail, 
  Phone, 
  MessageSquare, 
  FileText, 
  CheckCircle2, 
  AlertCircle,
  FileUp,
  X,
  Plus,
  ArrowRight,
  Info,
  ChevronDown,
  Trash2,
  MapPin,
  Map
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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

const SetupProfileClient = () => {
  const [activeSection, setActiveSection] = useState("basic");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    specialty: "",
    bio: "",
    email: "",
  });

  const [branches, setBranches] = useState([
    { id: Date.now(), title: "المقر الرئيسي", location: "", phone: "", whatsapp: "" }
  ]);

  const [files, setFiles] = useState({
    profile: null,
    iso: null,
    quality: null,
    approvals: null,
    catalogs: null
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "error" });

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
  ];

  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const countryRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setIsCountryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sections = [
    { id: "basic", title: "البيانات الأساسية", icon: Building2, number: "١" },
    { id: "contact", title: "بيانات التواصل", icon: Phone, number: "٢" },
    { id: "documents", title: "الملفات والشهادات", icon: FileUp, number: "٣" },
  ];

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "error" }), 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      setFiles(prev => ({ ...prev, [type]: file }));
    }
  };

  const removeFile = (type) => {
    setFiles(prev => ({ ...prev, [type]: null }));
  };

  // Branch Handlers
  const addBranch = () => {
    setBranches([...branches, { id: Date.now(), title: "", location: "", phone: "", whatsapp: "" }]);
  };

  const removeBranch = (id) => {
    if (branches.length > 1) {
      setBranches(branches.filter(b => b.id !== id));
    } else {
      showToast("يجب وجود مورد واحد على الأقل");
    }
  };

  const updateBranch = (id, field, value) => {
    setBranches(branches.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  // Validation Logic
  const validateStep = (stepId) => {
    if (stepId === "basic") {
      if (!formData.nameAr.trim()) return "يرجى إدخال اسم الشركة بالعربية";
      if (!formData.nameEn.trim()) return "يرجى إدخال اسم الشركة بالإنجليزية";
      if (!formData.specialty.trim()) return "يرجى إدخال تخصص الشركة";
      if (!logoPreview) return "يرجى رفع لوجو الشركة";
    }
    
    if (stepId === "contact") {
      if (!formData.email.trim()) return "يرجى إدخال البريد الإلكتروني الرسمي";
      const invalidBranch = branches.find(b => !b.title.trim() || !b.location.trim() || !b.phone.trim());
      if (invalidBranch) return "يرجى إكمال بيانات كافة الفروع/الموردين";
    }

    if (stepId === "documents") {
      if (!files.profile) return "ملف بروفايل الشركة (PDF) إلزامي";
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSidebarClick = (sectionId) => {
    // Determine the index of the clicked section and current section
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    const currentIndex = sections.findIndex(s => s.id === activeSection);

    // If going backward, just go
    if (sectionIndex < currentIndex) {
      setActiveSection(sectionId);
      return;
    }

    // If going forward, validate sequentially
    if (sectionIndex > currentIndex) {
      const error = validateStep(activeSection);
      if (error) {
        showToast(error);
        return;
      }
      // If jumping more than one step, we'd need a loop, but here it's simple
      if (sectionIndex === currentIndex + 1) {
        setActiveSection(sectionId);
      } else {
        showToast("يرجى إكمال الخطوات بالترتيب");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const error = validateStep("documents");
    if (error) {
      showToast(error);
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
          <h2 className="text-3xl font-black text-[#1e293b] mb-4">تم حفظ البيانات بنجاح!</h2>
          <p className="text-foreground/40 font-bold mb-10">
            شكراً لك! سيقوم فريق مات لينك بمراجعة طلبك وتفعيل حسابك خلال 24 ساعة. يمكنك الآن البدء في تصفح الموقع.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
            <ArrowRight className="w-4 h-4 rotate-180" />
            <span>الانتقال للرئيسية</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-black rtl">
      <Header />

      {/* Toast Notification */}
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
          {/* Header Title & Progress */}
          <div className="mb-12 flex flex-col md:flex-row items-end justify-between gap-6">
            <div className="text-center md:text-right">
              <h1 className="text-3xl lg:text-4xl font-black text-[#1e293b] mb-4">إعداد ملف الشركة</h1>
              <p className="text-foreground/40 font-bold max-w-2xl text-sm lg:text-base">
                أكمل الخطوات الثلاث لتفعيل حسابك والبدء في عرض منتجاتك للمشترين.
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
               <span className="text-[10px] font-black text-foreground/40 uppercase tracking-widest">المسار التدريجي</span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
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
                        onClick={() => handleSidebarClick(section.id)}
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

                <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-[10px] text-primary font-bold leading-relaxed">
                      يجب إكمال كافة الحقول الإجبارية المميزة بعلامة (*) للانتقال للخطوة التالية.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Section: Basic Info */}
                {activeSection === "basic" && (
                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-foreground/5 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="flex items-center gap-4 border-b border-foreground/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                        <Building2 className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-[#1e293b]">١. البيانات الأساسية</h2>
                        <p className="text-xs text-foreground/40 font-bold">هوية الشركة وتخصصها الرئيسي</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputWrapper label="اسم الشركة (بالعربية)" required info="الاسم الرسمي كما سيظهر في المنصة باللغة العربية">
                        <input name="nameAr" value={formData.nameAr} onChange={handleInputChange} type="text" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all" placeholder="مثال: شركة مواد البناء العالمية" />
                      </InputWrapper>
                      <InputWrapper label="Company Name (English)" required info="The official trade name in English for international exports">
                        <input name="nameEn" value={formData.nameEn} onChange={handleInputChange} type="text" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all text-left rtl-input placeholder:text-right" placeholder="Example: Global Materials Corp" />
                      </InputWrapper>
                      <InputWrapper label="بلد المنشأ" required info="المكان الرئيسي لعمليات الشركة">
                        <div className="relative" ref={countryRef}>
                          <button
                            type="button"
                            onClick={() => setIsCountryOpen(!isCountryOpen)}
                            className="w-full flex items-center justify-between bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all"
                          >
                            <div className="flex items-center gap-3">
                              <img src={selectedCountry.flag} alt={selectedCountry.name} className="w-6 h-4 object-cover rounded-[2px]" />
                              <span>{selectedCountry.name}</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-foreground/30 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                          </button>

                          {isCountryOpen && (
                            <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-foreground/5 py-2 z-50 max-h-60 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
                              {countries.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(country);
                                    setIsCountryOpen(false);
                                  }}
                                  className={`w-full flex items-center gap-3 px-5 py-3 hover:bg-muted/50 transition-colors text-right text-xs font-bold ${
                                    selectedCountry.code === country.code ? 'text-primary bg-primary/5' : 'text-foreground/70'
                                  }`}
                                >
                                  <img src={country.flag} alt={country.name} className="w-6 h-4 object-cover rounded-[2px]" />
                                  <span>{country.name}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </InputWrapper>
                      <InputWrapper label="تخصص الشركة" required info="المجال الرئيسي لمواد البناء التي توردها">
                        <input name="specialty" value={formData.specialty} onChange={handleInputChange} type="text" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all" placeholder="مثال: حديد تسليح وأسمنت" />
                      </InputWrapper>
                    </div>

                    <InputWrapper label="نبذة عن الشركة (Company Profile) (اختياري)" info="اكتب لمحة سريعة عن تاريخ الشركة وخبرتها في السوق">
                      <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-2xl px-5 py-4 text-sm font-bold outline-none transition-all resize-none" placeholder="نحن شركة رائدة في مجال توريد مواد البناء منذ عام..."></textarea>
                    </InputWrapper>

                    <div className="pt-4">
                      <InputWrapper label="لوجو الشركة" required info="يفضل أن يكون التصميم بدقة عالية وبصيغة PNG أو JPG">
                        <div className="flex items-center gap-6 p-6 border border-foreground/10 rounded-2xl bg-[#F1F5F9] group hover:border-primary/30 transition-all">
                          <div className="w-24 h-24 rounded-2xl bg-white border border-foreground/5 shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                            {logoPreview ? (
                              <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-2" />
                            ) : (
                              <Building2 className="w-8 h-8 text-foreground/10" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-black text-foreground/60 mb-2">اسحب اللوجو هنا أو انقر للاختيار</p>
                            <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-foreground/10 rounded-lg text-xs font-black cursor-pointer hover:bg-muted transition-all">
                              <Upload className="w-3.5 h-3.5" />
                              <span>اختر ملف</span>
                              <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                            </label>
                          </div>
                        </div>
                      </InputWrapper>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-foreground/5">
                      <button type="button" onClick={() => handleNextStep("contact")} className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95">
                        <span>بيانات التواصل</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Section: Contact Details (Enhanced Multi-Branch) */}
                {activeSection === "contact" && (
                  <div className="animate-in fade-in slide-in-from-left-4 duration-500 space-y-6">
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-foreground/5 space-y-8">
                      <div className="flex items-center gap-4 border-b border-foreground/5 pb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h2 className="text-xl font-black text-[#1e293b]">٢. بيانات التواصل</h2>
                          <p className="text-xs text-foreground/40 font-bold">البريد الرسمي وفروع الشركة / الموزعين</p>
                        </div>
                      </div>

                      <div className="max-w-md">
                        <InputWrapper label="البريد الإلكتروني الرسمي للشركة" required info="سيستخدم للمراسلات القانونية والإشعارات">
                          <div className="relative">
                            <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                            <input name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl pr-12 pl-5 py-4 text-sm font-bold outline-none transition-all" placeholder="info@company.com" />
                          </div>
                        </InputWrapper>
                      </div>
                    </div>

                    {/* Branches List */}
                    <div className="space-y-4">
                      {branches.map((branch, idx) => (
                        <div key={branch.id} className="bg-white rounded-[32px] p-8 shadow-sm border border-foreground/5 animate-in slide-in-from-bottom-4 duration-300">
                          <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-[10px] font-black">{idx + 1}</div>
                               <h3 className="text-sm font-black text-[#1e293b]">{idx === 0 ? "المقر الرئيسي" : "بيانات المورد / الفرع"}</h3>
                            </div>
                            {idx !== 0 && (
                              <button type="button" onClick={() => removeBranch(branch.id)} className="text-red-400 hover:text-red-600 transition-colors p-2">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <InputWrapper label="اسم الفرع / الشخص المسؤول" required>
                               <input value={branch.title} onChange={(e) => updateBranch(branch.id, "title", e.target.value)} type="text" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-4 py-3.5 text-xs font-bold outline-none transition-all" placeholder="مثال: فرع الرياض" />
                            </InputWrapper>
                            <InputWrapper label="المدينة / العنوان" required>
                               <div className="relative">
                                  <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/20" />
                                  <input value={branch.location} onChange={(e) => updateBranch(branch.id, "location", e.target.value)} type="text" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl pr-10 pl-4 py-3.5 text-xs font-bold outline-none transition-all" placeholder="الرياض، حي الملز" />
                               </div>
                            </InputWrapper>
                            <InputWrapper label="رقم الجوال" required>
                               <div className="relative">
                                  <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/20" />
                                  <input value={branch.phone} onChange={(e) => updateBranch(branch.id, "phone", e.target.value)} type="tel" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl pr-10 pl-4 py-3.5 text-[10px] font-bold outline-none transition-all text-left rtl-input" placeholder="+966 5..." />
                               </div>
                            </InputWrapper>
                            <InputWrapper label="رقم واتساب (اختياري)">
                               <div className="relative">
                                  <MessageSquare className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-foreground/20" />
                                  <input value={branch.whatsapp} onChange={(e) => updateBranch(branch.id, "whatsapp", e.target.value)} type="tel" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl pr-10 pl-4 py-3.5 text-[10px] font-bold outline-none transition-all text-left rtl-input" placeholder="+966 5..." />
                               </div>
                            </InputWrapper>
                          </div>
                        </div>
                      ))}

                      <button 
                        type="button" 
                        onClick={addBranch}
                        className="w-full py-6 border-2 border-dashed border-foreground/10 rounded-[32px] bg-white/50 text-foreground/40 font-black text-sm flex items-center justify-center gap-3 hover:bg-white hover:border-primary/30 hover:text-primary transition-all group"
                      >
                        <div className="w-8 h-8 rounded-full bg-muted group-hover:bg-primary/10 flex items-center justify-center transition-all">
                          <Plus className="w-4 h-4" />
                        </div>
                        <span>إضافة فرع أو مورد آخر</span>
                      </button>
                    </div>

                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-foreground/5 flex justify-between items-center">
                      <button type="button" onClick={() => setActiveSection("basic")} className="text-sm font-black text-foreground/40 hover:text-foreground/60 transition-colors px-6">رجوع</button>
                      <button type="button" onClick={() => handleNextStep("documents")} className="flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        <span>الملفات والشهادات</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Section: Documents */}
                {activeSection === "documents" && (
                  <div className="bg-white rounded-[32px] p-8 shadow-sm border border-foreground/5 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
                    <div className="flex items-center gap-4 border-b border-foreground/5 pb-6">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                        <FileUp className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-[#1e293b]">٣. الملفات والشهادات</h2>
                        <p className="text-xs text-foreground/40 font-bold">ارفع المستندات القانونية وكتالوجات المنتجات</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Required PDF */}
                      <div className="md:col-span-2">
                        <InputWrapper label="Company Profile (ملف بروفايل الشركة)" required info="يجب رفع الملف بصيغة PDF لتعريف العملاء بمشروعاتكم السابقة">
                          <div className={`relative border border-foreground/10 rounded-2xl p-6 transition-all ${
                            files.profile ? 'border-primary/40 bg-primary/5' : 'bg-[#F1F5F9] group hover:border-primary/30'
                          }`}>
                            <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf" onChange={(e) => handleFileChange("profile", e)} />
                            <div className="flex items-center gap-4">
                              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                                files.profile ? 'bg-primary text-white' : 'bg-white text-foreground/10'
                              }`}>
                                <FileText className="w-7 h-7" />
                              </div>
                              <div className="flex-1">
                                {files.profile ? (
                                  <div>
                                    <p className="text-sm font-black text-primary truncate max-w-[200px]">{files.profile.name}</p>
                                    <button type="button" onClick={(e) => { e.stopPropagation(); removeFile("profile"); }} className="text-[10px] font-bold text-red-400 hover:text-red-500 mt-1">حذف الملف</button>
                                  </div>
                                ) : (
                                  <div>
                                    <p className="text-sm font-black text-foreground/60">ارفع بروفايل الشركة (إلزامي)</p>
                                    <p className="text-[10px] text-foreground/30 font-bold uppercase mt-1">PDF max 10MB</p>
                                  </div>
                                )}
                              </div>
                              {files.profile && <CheckCircle2 className="w-6 h-6 text-primary animate-in zoom-in duration-300" />}
                            </div>
                          </div>
                        </InputWrapper>
                      </div>

                      {/* Optional PDFs */}
                      {[
                        { id: "iso", label: "شهادات ISO" },
                        { id: "quality", label: "شهادات جودة" },
                        { id: "approvals", label: "اعتمادات سابقة" },
                        { id: "catalogs", label: "كتالوجات المنتجات" },
                      ].map((doc) => (
                        <div key={doc.id}>
                          <InputWrapper label={`${doc.label} (اختياري)`}>
                            <div className={`relative border border-foreground/10 rounded-xl p-4 transition-all ${
                              files[doc.id] ? 'border-primary/40 bg-primary/5' : 'bg-[#F1F5F9] group hover:border-primary/30'
                            }`}>
                              <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf" onChange={(e) => handleFileChange(doc.id, e)} />
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                                  files[doc.id] ? 'bg-primary text-white' : 'bg-white text-foreground/10'
                                }`}>
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                  {files[doc.id] ? (
                                    <p className="text-xs font-black text-primary truncate">{files[doc.id].name}</p>
                                  ) : (
                                    <p className="text-xs font-black text-foreground/40">انقر لرفع ملف</p>
                                  )}
                                </div>
                                {files[doc.id] && (
                                  <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(doc.id); }} className="p-1 rounded-md bg-white border border-foreground/5 text-red-400 hover:text-red-600">
                                    <X className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </InputWrapper>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between pt-4 border-t border-foreground/5">
                      <button type="button" onClick={() => setActiveSection("contact")} className="text-sm font-black text-foreground/40 hover:text-foreground/60 transition-colors px-6">رجوع</button>
                      <button type="submit" className="flex items-center gap-3 bg-primary text-white px-12 py-4 rounded-xl font-black text-base hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 active:scale-95 group">
                        <CheckCircle2 className="w-5 h-5" />
                        <span>حفظ وإرسال للمراجعة</span>
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

export default SetupProfileClient;
