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
  Map,
  Settings,
  Image as ImageIcon
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Reusable Input Wrapper
const InputWrapper = ({ label, children, info, required }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between px-1">
      <label className="text-sm font-black text-foreground/70 flex items-center gap-1.5 whitespace-nowrap">
        {label}
        {required && <span className="text-primary text-lg leading-none">*</span>}
      </label>
      {info && (
        <div className="group relative">
          <Info className="w-3.5 h-3.5 text-foreground/30 cursor-help" />
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-xl text-center font-bold">
            {info}
          </div>
        </div>
      )}
    </div>
    {children}
  </div>
);

const SetupProfileClient = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "error" });
  
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
    if (file) setFiles(prev => ({ ...prev, [type]: file }));
  };

  const removeFile = (type) => setFiles(prev => ({ ...prev, [type]: null }));

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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate Section 1: Basic
    if (!formData.nameAr.trim() || !formData.nameEn.trim() || !formData.specialty.trim() || !logoPreview) {
      showToast("يرجى إكمال كافة البيانات الأساسية المذكورة بـ (*)");
      return;
    }
    
    // Validate Section 2: Contact
    if (!formData.email.trim()) {
      showToast("يرجى إدخال البريد الإلكتروني الرسمي");
      return;
    }
    const invalidBranch = branches.find(b => !b.title.trim() || !b.location.trim() || !b.phone.trim());
    if (invalidBranch) {
      showToast("يرجى إكمال بيانات كافة المواقع / الفروع");
      return;
    }

    // Validate Section 3: Documents
    if (!files.profile) {
      showToast("ملف بروفايل الشركة (PDF) إلزامي");
      return;
    }

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#F1F5F9] font-black rtl flex items-center justify-center p-4">
        <div className="bg-white rounded-[40px] p-12 shadow-2xl border border-foreground/5 max-w-lg w-full text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle2 className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-3xl font-black text-[#1e293b] mb-4">تم حفظ الملف بنجاح!</h2>
          <p className="text-foreground/40 font-bold mb-10 text-sm">
            شكراً لك! سيقوم فريق مات لينك بمراجعة طلبك وتفعيل حساب المورد خلال ٢٤ ساعة.
          </p>
          <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-10 py-4 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-lg active:scale-95">
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
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-100 animate-in slide-in-from-top-4 duration-300">
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
        <div className="w-full">
          {/* Header Title Section */}
          <div className="mb-12 text-right">
            <h1 className="text-3xl lg:text-4xl font-black text-[#1e293b] mb-4">إعداد بروفايل الشركة</h1>
            <p className="text-foreground/40 font-bold max-w-2xl text-sm lg:text-base">
              أدخل بيانات شركتك الكاملة في صفحة واحدة لتفعيل حسابك كمورد معتمد.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Right Side: Main Content (8 columns) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Box 1: Basic Company Info */}
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-foreground/5 space-y-8">
                <div className="flex items-center gap-4 border-b border-foreground/5 pb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#1e293b]">البيانات الأساسية</h2>
                    <p className="text-xs text-foreground/40 font-bold">هوية الشركة وتخصصها الرئيسي</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputWrapper label="اسم الشركة (بالعربية)" required>
                    <input name="nameAr" value={formData.nameAr} onChange={handleInputChange} type="text" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all" placeholder="مثال: شركة مواد البناء العالمية" />
                  </InputWrapper>
                  <InputWrapper label="Company Name (English)" required>
                    <input name="nameEn" value={formData.nameEn} onChange={handleInputChange} type="text" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all text-left placeholder:text-right" placeholder="Example: Global Materials Corp" />
                  </InputWrapper>
                  <InputWrapper label="بلد المنشأ" required>
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
                        <ChevronDown className={`w-4 h-4 text-foreground/20 transition-transform ${isCountryOpen ? 'rotate-180' : ''}`} />
                      </button>

                      {isCountryOpen && (
                        <div className="absolute top-full right-0 w-full mt-2 bg-white rounded-2xl shadow-xl border border-foreground/5 py-2 z-50 max-h-60 overflow-y-auto custom-scrollbar animate-in fade-in slide-in-from-top-2 duration-200">
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

                <InputWrapper label="نشرة تعريفية (اختياري)" info="صف لمحة سريعة عن تاريخ الشركة وخبرتها">
                  <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-2xl px-5 py-4 text-sm font-bold outline-none transition-all resize-none" placeholder="نحن شركة رائدة في مجال توريد..."></textarea>
                </InputWrapper>
              </div>

              {/* Box 2: Contact & Branches */}
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-foreground/5 space-y-8">
                <div className="flex items-center gap-4 border-b border-foreground/5 pb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#1e293b]">بيانات التواصل والمواقع</h2>
                    <p className="text-xs text-foreground/40 font-bold">البريد الرسمي ومواقع تواجد الموردين</p>
                  </div>
                </div>

                <div className="max-w-md">
                   <InputWrapper label="البريد الإلكتروني الرسمي" required>
                      <div className="relative">
                        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                        <input name="email" value={formData.email} onChange={handleInputChange} type="email" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl pr-12 pl-5 py-4 text-sm font-bold outline-none transition-all" placeholder="info@company.com" />
                      </div>
                    </InputWrapper>
                </div>

                <div className="space-y-4 pt-4">
                  {branches.map((branch, idx) => (
                    <div key={branch.id} className="bg-[#F1F5F9]/50 p-6 rounded-[24px] border border-foreground/5 space-y-4 animate-in slide-in-from-bottom-2 duration-300">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black text-foreground/30 uppercase tracking-widest">{idx === 0 ? 'المقر الرئيسي' : `موقع / فرع إضافي ${idx}`}</span>
                        {idx !== 0 && (
                          <button type="button" onClick={() => removeBranch(branch.id)} className="text-red-300 hover:text-red-500 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <InputWrapper label="الاسم / المسؤول" required>
                          <input value={branch.title} onChange={(e) => updateBranch(branch.id, "title", e.target.value)} type="text" className="w-full bg-white border border-foreground/5 focus:border-primary/20 rounded-xl px-4 py-3 text-xs font-black outline-none" placeholder="الرياض" />
                        </InputWrapper>
                        <InputWrapper label="المدينة" required>
                          <input value={branch.location} onChange={(e) => updateBranch(branch.id, "location", e.target.value)} type="text" className="w-full bg-white border border-foreground/5 focus:border-primary/20 rounded-xl px-4 py-3 text-xs font-black outline-none" placeholder="حي الملز" />
                        </InputWrapper>
                        <InputWrapper label="رقم الجوال" required>
                          <input value={branch.phone} onChange={(e) => updateBranch(branch.id, "phone", e.target.value)} type="tel" className="w-full bg-white border border-foreground/5 focus:border-primary/20 rounded-xl px-4 py-3 text-xs font-black outline-none text-left" placeholder="+966" />
                        </InputWrapper>
                        <InputWrapper label="واتساب">
                          <input value={branch.whatsapp} onChange={(e) => updateBranch(branch.id, "whatsapp", e.target.value)} type="tel" className="w-full bg-white border border-foreground/5 focus:border-primary/20 rounded-xl px-4 py-3 text-xs font-black outline-none text-left" placeholder="+966" />
                        </InputWrapper>
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={addBranch} className="w-full py-5 border-2 border-dashed border-foreground/10 rounded-[20px] bg-white text-foreground/40 font-black text-xs flex items-center justify-center gap-3 hover:bg-muted/30 transition-all">
                    <Plus className="w-4 h-4" />
                    <span>إضافة موقع / مورد إضافي</span>
                  </button>
                </div>
              </div>

              {/* Box 3: Documents & Certificates */}
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-foreground/5 space-y-8">
                <div className="flex items-center gap-4 border-b border-foreground/5 pb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                    <FileUp className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#1e293b]">الملفات والشهادات</h2>
                    <p className="text-xs text-foreground/40 font-bold">المستندات القانونية والمستندات التقنية</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <InputWrapper label="Company Profile (بروفايل الشركة)" required info="ملف PDF تعريفي بنشاطات الشركة">
                      <div className={`relative border-2 border-dashed rounded-2xl p-6 transition-all ${files.profile ? 'border-primary/40 bg-primary/5' : 'bg-[#F1F5F9] border-foreground/10'}`}>
                        <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf" onChange={(e) => handleFileChange("profile", e)} />
                        <div className="flex items-center gap-4">
                           <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${files.profile ? 'bg-primary text-white' : 'bg-white text-foreground/10'}`}>
                              <FileText className="w-6 h-6" />
                           </div>
                           <div className="flex-1">
                              <p className="text-xs font-black text-foreground/60">{files.profile ? files.profile.name : 'ارفع بروفايل الشركة (PDF)'}</p>
                           </div>
                           {files.profile && <button onClick={() => removeFile("profile")} className="text-red-400 p-2"><X className="w-4 h-4" /></button>}
                        </div>
                      </div>
                    </InputWrapper>
                  </div>

                  {[
                    { id: "iso", label: "شهادات ISO" },
                    { id: "quality", label: "شهادات الجودة" },
                    { id: "approvals", label: "اعتمادات سابقة" },
                    { id: "catalogs", label: "الكتالوجات" }
                  ].map(doc => (
                    <div key={doc.id}>
                      <InputWrapper label={`${doc.label} (اختياري)`}>
                        <div className={`relative border border-foreground/10 rounded-xl p-3 transition-all ${files[doc.id] ? 'bg-primary/5' : 'bg-[#F1F5F9]'}`}>
                          <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf" onChange={(e) => handleFileChange(doc.id, e)} />
                          <div className="flex items-center gap-3">
                             <FileText className={`w-5 h-5 ${files[doc.id] ? 'text-primary' : 'text-foreground/10'}`} />
                             <span className="text-[10px] font-black text-foreground/40 truncate">{files[doc.id] ? files[doc.id].name : 'رفع ملف'}</span>
                             {files[doc.id] && <button onClick={() => removeFile(doc.id)} className="text-red-300 mr-auto"><Trash2 className="w-3 h-3" /></button>}
                          </div>
                        </div>
                      </InputWrapper>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Left Side: Sidebar Items (4 columns) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Box 4: Logo Upload */}
              <div className="bg-white rounded-[32px] p-6 shadow-sm border border-foreground/5 space-y-4 sticky top-28">
                <div className="flex items-center gap-4 border-b border-foreground/5 pb-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#1e293b]">لوجو الشركة</h2>
                    <p className="text-xs text-foreground/40 font-bold">للتعريف بعلامتكم التجارية</p>
                  </div>
                </div>

                {logoPreview ? (
                  <div className="relative aspect-square max-w-[200px] mx-auto rounded-[32px] overflow-hidden border-4 border-white shadow-xl group">
                    <img src={logoPreview} alt="Logo" className="w-full h-full object-contain p-4 bg-white" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                       <label className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                          <Upload className="w-5 h-5" />
                          <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                       </label>
                    </div>
                  </div>
                ) : (
                  <label className="aspect-square max-w-[200px] mx-auto rounded-[32px] border-2 border-dashed border-foreground/10 flex flex-col items-center justify-center gap-4 hover:bg-[#F1F5F9] hover:border-primary/30 cursor-pointer transition-all group p-8">
                    <Building2 className="w-12 h-12 text-foreground/10 group-hover:scale-110 transition-transform" />
                    <div className="text-center">
                       <span className="block text-xs font-black text-foreground/40">ارفع اللوجو</span>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleLogoChange} />
                  </label>
                )}

                {/* Submit Block */}
                <div className="pt-4 border-t border-foreground/5 space-y-4">
                  <button type="submit" className="w-full bg-primary text-white py-5 rounded-[20px] font-black text-base shadow-xl shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3">
                    <CheckCircle2 className="w-6 h-6" />
                    <span>حفظ البروفايل</span>
                  </button>
                  <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <p className="text-[10px] text-primary font-bold leading-relaxed">
                      بمجرد الحفظ، سيتم إرسال بياناتك للمراجعة. تأكد من صحة كافة المستندات لتسريع عملية التفعيل.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SetupProfileClient;
