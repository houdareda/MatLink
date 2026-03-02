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
  LayoutGrid,
  FileUp
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
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-slate-800 text-white text-[10px] rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 shadow-xl text-center">
            {info}
          </div>
        </div>
      )}
    </div>
    {children}
  </div>
);

const AddProductClient = () => {
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
    unit: "طن",
    price: "",
  });

  const [specs, setSpecs] = useState([{ id: Date.now(), key: "", value: "" }]);
  const [images, setImages] = useState([]); 
  const [files, setFiles] = useState({
    dataSheet: null,
    certificates: null
  });
  const [extraFiles, setExtraFiles] = useState([]);

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

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "error" }), 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImages([{ file, preview: URL.createObjectURL(file) }]);
  };

  const handleFileChange = (type, e) => {
    const file = e.target.files[0];
    if (file) setFiles(prev => ({ ...prev, [type]: file }));
  };

  const addExtraFile = () => setExtraFiles([...extraFiles, { id: Date.now(), name: "", file: null }]);
  const removeExtraFile = (id) => setExtraFiles(extraFiles.filter(f => f.id !== id));
  const updateExtraFile = (id, field, value) => {
    setExtraFiles(extraFiles.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const addSpec = () => setSpecs([...specs, { id: Date.now(), key: "", value: "" }]);
  const removeSpec = (id) => setSpecs(specs.filter(s => s.id !== id));
  const updateSpec = (id, field, value) => {
    setSpecs(specs.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nameAr.trim() || !formData.nameEn.trim() || !formData.category || !formData.description.trim() || !formData.price.trim()) {
      showToast("يرجى إكمال جميع الحقول الإجبارية (*)");
      return;
    }
    if (images.length === 0) {
      showToast("يرجى رفع صورة المنتج الأساسية");
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
            <h1 className="text-3xl lg:text-4xl font-black text-[#1e293b] mb-4">إضافة منتج جديد</h1>
            <p className="text-foreground/40 font-bold max-w-2xl text-sm lg:text-base">
              أدخل مواصفات المنتج بالكامل في صفحة واحدة لتسهيل عملية الإدراج.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Right Side: Main Content (8 columns) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Box 1: Basic Info */}
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-foreground/5 space-y-8">
                <div className="flex items-center gap-4 border-b border-foreground/5 pb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                    <LayoutGrid className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#1e293b]">البيانات الأساسية</h2>
                    <p className="text-xs text-foreground/40 font-bold">اسم المنتج والوصف العام</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputWrapper label="اسم المنتج (بالعربية)" required>
                    <input name="nameAr" value={formData.nameAr} onChange={handleInputChange} type="text" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all" placeholder="حديد تسليح سابك 12 ملم" />
                  </InputWrapper>
                  <InputWrapper label="Product Name (English)" required>
                    <input name="nameEn" value={formData.nameEn} onChange={handleInputChange} type="text" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all text-left placeholder:text-right" placeholder="Sabic Rebar 12mm" />
                  </InputWrapper>
                  <InputWrapper label="تصنيف المنتج" required>
                    <div className="relative">
                      <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all appearance-none cursor-pointer">
                        <option value="">اختر القسم...</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                      <ChevronDown className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 pointer-events-none" />
                    </div>
                  </InputWrapper>
                  <InputWrapper label="وحدة القياس" required>
                    <div className="relative">
                      <select name="unit" value={formData.unit} onChange={handleInputChange} className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all appearance-none cursor-pointer">
                        <option value="طن">طن (Ton)</option>
                        <option value="كيلو">كيلو (Kg)</option>
                        <option value="متر">متر (Meter)</option>
                        <option value="متر مكعب">متر مكعب (m³)</option>
                        <option value="حبة">حبة (Piece)</option>
                      </select>
                      <ChevronDown className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 pointer-events-none" />
                    </div>
                  </InputWrapper>
                </div>

                <InputWrapper label="وصف المنتج (مختصر)" required info="يظهر في نتائج البحث وبجانب صورة المنتج">
                  <textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-2xl px-5 py-4 text-sm font-bold outline-none transition-all resize-none" placeholder="اكتب وصفاً جذاباً ومختصراً..."></textarea>
                </InputWrapper>

                <InputWrapper label="وصف تفصيلي (اختياري)">
                  <textarea name="detailedDescription" value={formData.detailedDescription} onChange={handleInputChange} rows={5} className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-2xl px-5 py-4 text-sm font-bold outline-none transition-all resize-none" placeholder="نحن نورد هذا المنتج وفقاً لأعلى معايير الجودة العالمية..."></textarea>
                </InputWrapper>
              </div>

              {/* Box 2: Tech Specs */}
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-foreground/5 space-y-8">
                <div className="flex items-center gap-4 border-b border-foreground/5 pb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                    <Settings className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#1e293b]">المواصفات الفنية والضمان</h2>
                    <p className="text-xs text-foreground/40 font-bold">تفاصيل المواصفات التي تهم المقاولين</p>
                  </div>
                </div>

                <InputWrapper label="معلومات الضمان (اختياري)">
                  <input name="warranty" value={formData.warranty} onChange={handleInputChange} type="text" className="w-full bg-[#F1F5F9] border border-foreground/10 focus:border-primary/20 focus:bg-white rounded-xl px-5 py-4 text-sm font-bold outline-none transition-all" placeholder="مثال: ضمان لمدة 10 سنوات ضد عيوب التصنيع" />
                </InputWrapper>

                <div className="pt-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-sm font-black text-[#1e293b]">قائمة المواصفات</h3>
                    <button type="button" onClick={addSpec} className="flex items-center gap-2 text-primary font-black text-xs hover:opacity-70 transition-opacity">
                      <Plus className="w-4 h-4" />
                      <span>إضافة خاصية</span>
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {specs.map((spec) => (
                      <div key={spec.id} className="grid grid-cols-12 gap-3 items-center group animate-in slide-in-from-right-2 duration-300">
                        <div className="col-span-11 grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#F1F5F9] p-2 rounded-2xl border border-foreground/5">
                          <input value={spec.value} onChange={(e) => updateSpec(spec.id, "value", e.target.value)} className="bg-white rounded-xl px-5 py-3 text-xs font-black outline-none focus:ring-1 ring-primary/20" placeholder="القيمة (مثل: 12 ملم)" />
                          <input value={spec.key} onChange={(e) => updateSpec(spec.id, "key", e.target.value)} className="bg-white rounded-xl px-5 py-3 text-xs font-black outline-none focus:ring-1 ring-primary/20 text-right" placeholder="الخاصية (مثل: القطر)" />
                        </div>
                        <button type="button" onClick={() => removeSpec(spec.id)} className="col-span-1 flex justify-center text-red-300 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    {specs.length === 0 && (
                      <div className="text-center py-8 border-2 border-dashed border-foreground/5 rounded-2xl">
                         <p className="text-[10px] font-bold text-foreground/20">لا يوجد مواصفات مضافة حالياً</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Box 3: Additional Files */}
              <div className="bg-white rounded-[32px] p-8 shadow-sm border border-foreground/5 space-y-8">
                <div className="flex items-center justify-between border-b border-foreground/5 pb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                      <FileUp className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-black text-[#1e293b]">الملفات والمستندات</h2>
                      <p className="text-xs text-foreground/40 font-bold">ارفع الكتالوجات وشهادات الجودة</p>
                    </div>
                  </div>
                  <button type="button" onClick={addExtraFile} className="flex items-center gap-2 bg-muted text-[#1e293b] hover:shadow-md px-5 py-2.5 rounded-xl text-xs font-black transition-all">
                    <Plus className="w-4 h-4" />
                    <span>إضافة ملف</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputWrapper label="Data Sheet (PDF)">
                    <div className={`relative border-2 border-dashed rounded-2xl p-5 transition-all text-center ${files.dataSheet ? 'border-primary/40 bg-primary/5' : 'border-foreground/10 bg-[#F1F5F9]'}`}>
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf" onChange={(e) => handleFileChange("dataSheet", e)} />
                      <div className="flex flex-col items-center gap-2">
                        <FileText className={`w-8 h-8 ${files.dataSheet ? 'text-primary' : 'text-foreground/20'}`} />
                        <span className="text-[10px] font-black truncate max-w-full italic px-2">{files.dataSheet ? files.dataSheet.name : 'ارفع مواصفات PDF'}</span>
                      </div>
                    </div>
                  </InputWrapper>
                  <InputWrapper label="الشهادات (PDF)">
                    <div className={`relative border-2 border-dashed rounded-2xl p-5 transition-all text-center ${files.certificates ? 'border-primary/40 bg-primary/5' : 'border-foreground/10 bg-[#F1F5F9]'}`}>
                      <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept=".pdf" onChange={(e) => handleFileChange("certificates", e)} />
                      <div className="flex flex-col items-center gap-2">
                        <Package className={`w-8 h-8 ${files.certificates ? 'text-primary' : 'text-foreground/20'}`} />
                        <span className="text-[10px] font-black truncate max-w-full italic px-2">{files.certificates ? files.certificates.name : 'ارفع شهادات الجودة'}</span>
                      </div>
                    </div>
                  </InputWrapper>
                </div>

                <div className="space-y-4 pt-4">
                  {extraFiles.map((ef) => (
                    <div key={ef.id} className="bg-[#F1F5F9] p-4 rounded-3xl border border-foreground/5 flex flex-col md:flex-row gap-4 items-center group animate-in zoom-in-95 duration-300">
                      <div className="flex-1 w-full">
                        <input value={ef.name} onChange={(e) => updateExtraFile(ef.id, "name", e.target.value)} className="w-full bg-white rounded-xl px-5 py-3 text-xs font-black outline-none border border-foreground/5" placeholder="اسم الملف الإضافي" />
                      </div>
                      <div className="relative flex-1 w-full bg-white rounded-xl px-5 py-3 border border-foreground/5 overflow-hidden">
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => updateExtraFile(ef.id, "file", e.target.files[0])} />
                        <div className="flex items-center gap-3">
                           <Upload className="w-4 h-4 text-primary" />
                           <span className="text-[10px] font-black text-foreground/30 truncate">{ef.file ? ef.file.name : 'اختر ملفاً...'}</span>
                        </div>
                      </div>
                      <button type="button" onClick={() => removeExtraFile(ef.id)} className="p-3 text-red-300 hover:text-red-600 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Left Side: Sidebar Items (4 columns) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Box 4: Image Upload */}
              <div className="bg-white rounded-[32px] p-6 shadow-sm border border-foreground/5 space-y-4 sticky top-28">
                <div className="flex items-center gap-4 border-b border-foreground/5 pb-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-[#1e293b]">صورة المنتج</h2>
                    <p className="text-xs text-foreground/40 font-bold">يفضل مقاس ١٢٠٠ × ٨٠٠</p>
                  </div>
                </div>

                {images.length > 0 ? (
                  <div className="relative aspect-3/2 rounded-[24px] overflow-hidden border border-foreground/10 group shadow-lg">
                    <img src={images[0].preview} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                       <label className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-90 transition-all">
                          <Upload className="w-5 h-5" />
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                       </label>
                       <button type="button" onClick={() => setImages([])} className="w-12 h-12 bg-red-500 text-white rounded-full flex items-center justify-center hover:scale-110 active:scale-90 transition-all">
                          <Trash2 className="w-5 h-5" />
                       </button>
                    </div>
                  </div>
                ) : (
                  <label className="aspect-3/2 rounded-[24px] border-2 border-dashed border-foreground/10 flex flex-col items-center justify-center gap-4 hover:bg-[#F1F5F9] hover:border-primary/30 cursor-pointer transition-all group py-6">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-all">
                       <ImageIcon className="w-8 h-8 text-primary/30" />
                    </div>
                    <div className="text-center">
                      <span className="block text-sm font-black text-[#1e293b]">ارفع صورة غلاف</span>
                      <span className="text-[10px] font-bold text-foreground/30">اضغط هنا للاختيار</span>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                )}

                {/* Box 5: Pricing */}
                <div className="pt-4 border-t border-foreground/5">
                  <div className="flex items-center gap-3 mb-3">
                    <DollarSign className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-black text-[#1e293b]">السعر</h3>
                  </div>

                  <div className="bg-[#FDF7F2] rounded-3xl p-6 border border-primary/10 space-y-4">
                    <div className="relative">
                      <input 
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        type="number" 
                        className="w-full bg-white border-2 border-primary/20 focus:border-primary rounded-2xl px-6 py-4 text-xl font-black outline-none transition-all text-center"
                        placeholder="00.00"
                      />
                      <div className="absolute top-1/2 -translate-y-1/2 right-4 text-[10px] font-black text-foreground/20 border-l border-foreground/5 pl-3">ر.س</div>
                    </div>
                    <div className="text-center">
                      <span className="text-[11px] font-black text-foreground/40 italic">لكل </span>
                      <span className="text-primary font-black italic">{formData.unit}</span>
                      <span className="text-[11px] font-black text-foreground/40 italic"> (حسب الكمية)</span>
                    </div>
                  </div>
                </div>

                {/* Submit Action Block */}
                <div className="pt-4 border-t border-foreground/5">
                   <button type="submit" className="w-full bg-primary text-white py-5 rounded-[20px] font-black text-base shadow-xl shadow-primary/20 hover:bg-primary/90 hover:-translate-y-1 active:translate-y-0 transition-all flex items-center justify-center gap-3 group">
                      <CheckCircle2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                      <span>حفظ ونشر المنتج</span>
                   </button>
                   <p className="text-center text-[10px] text-foreground/30 font-bold mt-4">
                      بالنشر، أنت توافق على شروط توريد المواد في مات لينك
                   </p>
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

export default AddProductClient;
