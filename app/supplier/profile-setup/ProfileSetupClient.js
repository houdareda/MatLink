"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Upload, 
  FileText, 
  CheckCircle2,
  ChevronLeft,
  MessageSquare,
  Globe2,
  Image as ImageIcon
} from "lucide-react";

const ProfileSetupClient = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nameAr: "",
    nameEn: "",
    description: "",
    country: "المملكة العربية السعودية",
    email: "",
    website: "",
    logo: null,
    profilePdf: null,
    isoCerts: [],
    qualityCerts: [],
    approvals: [],
    catalogs: [],
    branches: [
      { id: Date.now(), nameAr: "", address: "", phone: "", whatsapp: "", mapLink: "" }
    ]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBranchChange = (id, field, value) => {
    setFormData({
      ...formData,
      branches: formData.branches.map(b => b.id === id ? { ...b, [field]: value } : b)
    });
  };

  const addBranch = () => {
    setFormData({
      ...formData,
      branches: [
        ...formData.branches,
        { id: Date.now(), nameAr: "", address: "", phone: "", whatsapp: "", mapLink: "" }
      ]
    });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [field]: file });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saving Profile:", formData);
    // Simulate API call
    setTimeout(() => {
      router.push("/supplier/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-black rtl pb-20">
      {/* Header */}
      <div className="bg-white border-b border-foreground/5 py-6">
        <div className="container mx-auto px-4 max-w-4xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Building2 className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-black text-foreground">إكمال ملف المورد</h1>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`w-8 h-1.5 rounded-full transition-all ${s <= step ? 'bg-primary' : 'bg-foreground/10'}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl mt-12">
        <div className="bg-white rounded-[32px] border border-foreground/5 shadow-xl shadow-foreground/5 p-8 md:p-12">
          
          <form onSubmit={handleSubmit} className="space-y-10">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
                <div className="text-right">
                  <h2 className="text-2xl font-black text-foreground mb-2">البيانات الأساسية</h2>
                  <p className="text-sm text-foreground/40 font-bold">أدخل اسم الشركة والنبذة التعريفية</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-right">
                    <label className="text-xs font-black text-foreground/60 mr-1">اسم الشركة (عربي)</label>
                    <input 
                      type="text" 
                      name="nameAr"
                      value={formData.nameAr}
                      onChange={handleChange}
                      placeholder="مثال: شركة الحديد الوطنية"
                      className="w-full bg-[#F8FAFC] border border-foreground/5 h-14 px-6 rounded-2xl font-bold text-sm focus:outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                  <div className="space-y-2 text-right">
                    <label className="text-xs font-black text-foreground/60 mr-1">Company Name (English)</label>
                    <input 
                      type="text" 
                      name="nameEn"
                      value={formData.nameEn}
                      onChange={handleChange}
                      placeholder="Example: National Steel Co."
                      style={{ direction: 'ltr' }}
                      className="w-full bg-[#F8FAFC] border border-foreground/5 h-14 px-6 rounded-2xl font-bold text-sm focus:outline-none focus:border-primary/30 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2 text-right">
                  <label className="text-xs font-black text-foreground/60 mr-1">نبذة عن الشركة</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="اكتب نبذة مختصرة عن نشاط الشركة وتاريخها..."
                    className="w-full bg-[#F8FAFC] border border-foreground/5 p-6 rounded-2xl font-bold text-sm focus:outline-none focus:border-primary/30 transition-all min-h-[150px]"
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 text-right">
                    <label className="text-xs font-black text-foreground/60 mr-1">بلد المنشأ</label>
                    <div className="relative">
                      <Globe2 className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                      <input 
                        type="text" 
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-[#F8FAFC] border border-foreground/5 h-14 pr-14 pl-6 rounded-2xl font-bold text-sm focus:outline-none focus:border-primary/30 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-right">
                    <label className="text-xs font-black text-foreground/60 mr-1">الموقع (المدينة)</label>
                    <div className="relative">
                      <MapPin className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                      <input 
                        type="text" 
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="مثال: الرياض، المنطقة الصناعية"
                        className="w-full bg-[#F8FAFC] border border-foreground/5 h-14 pr-14 pl-6 rounded-2xl font-bold text-sm focus:outline-none focus:border-primary/30 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="bg-primary text-white px-12 py-4 rounded-2xl font-black text-sm hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                  >
                    التالي
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4">
                <div className="text-right">
                  <h2 className="text-2xl font-black text-foreground mb-2">بيانات التواصل واللوجو</h2>
                  <p className="text-sm text-foreground/40 font-bold">كيف يمكن للعملاء الوصول إليكم؟</p>
                </div>

                <div className="flex flex-col items-center justify-center p-8 bg-muted/30 rounded-[32px] border-2 border-dashed border-foreground/10 group hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden">
                  <input 
                    type="file" 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    onChange={(e) => handleFileChange(e, "logo")}
                  />
                  {formData.logo ? (
                    <div className="flex flex-col items-center">
                      <CheckCircle2 className="w-12 h-12 text-emerald-500 mb-2" />
                      <span className="text-xs font-black text-foreground/60">تم اختيار اللوجو</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-foreground/20 mb-4 group-hover:text-primary transition-colors">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                      <span className="text-sm font-black text-foreground/60">رفع لوجو الشركة</span>
                      <span className="text-[10px] text-foreground/20 mt-1 uppercase">JPG, PNG (Max 2MB)</span>
                    </>
                  )}
                </div>

                <div className="space-y-12">
                  <div className="flex items-center justify-between">
                    <div className="text-right">
                      <h3 className="font-black text-foreground text-lg">الفروع وعناوين التواصل</h3>
                      <p className="text-xs text-foreground/40 font-bold">يمكنك إضافة أكثر من فرع لشركتك</p>
                    </div>
                    <button 
                      type="button" 
                      onClick={addBranch}
                      className="px-4 py-2 bg-primary/10 text-primary text-xs font-black rounded-xl hover:bg-primary hover:text-white transition-all"
                    >
                      + إضافة فرع جديد
                    </button>
                  </div>

                  <div className="space-y-10">
                    {formData.branches.map((branch, index) => (
                      <div key={branch.id} className="p-8 bg-[#F8FAFC] rounded-[32px] border border-foreground/5 relative animate-in fade-in slide-in-from-top-4">
                        {formData.branches.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => removeBranch(branch.id)}
                            className="absolute -top-3 -left-3 w-8 h-8 bg-white border border-red-100 text-red-500 rounded-full flex items-center justify-center hover:bg-red-50 transition-all shadow-sm z-10"
                          >
                            ×
                          </button>
                        )}
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2 text-right md:col-span-2">
                            <label className="text-xs font-black text-foreground/60 mr-1">اسم الفرع (مثال: فرع الرياض - الرئيسي)</label>
                            <input 
                              type="text" 
                              value={branch.nameAr}
                              onChange={(e) => handleBranchChange(branch.id, "nameAr", e.target.value)}
                              placeholder="اسم الفرع..."
                              className="w-full bg-white border border-foreground/5 h-12 px-6 rounded-xl font-bold text-sm focus:outline-none focus:border-primary/30 transition-all"
                            />
                          </div>
                          
                          <div className="space-y-2 text-right md:col-span-2">
                            <label className="text-xs font-black text-foreground/60 mr-1">العنوان بالتفصيل</label>
                            <div className="relative">
                              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                              <input 
                                type="text" 
                                value={branch.address}
                                onChange={(e) => handleBranchChange(branch.id, "address", e.target.value)}
                                placeholder="حي الملز، طريق صلاح الدين..."
                                className="w-full bg-white border border-foreground/5 h-12 pr-12 pl-6 rounded-xl font-bold text-sm focus:outline-none focus:border-primary/30 transition-all"
                              />
                            </div>
                          </div>

                          <div className="space-y-2 text-right">
                            <label className="text-xs font-black text-foreground/60 mr-1">رقم الهاتف</label>
                            <div className="relative">
                              <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                              <input 
                                type="tel" 
                                value={branch.phone}
                                onChange={(e) => handleBranchChange(branch.id, "phone", e.target.value)}
                                className="w-full bg-white border border-foreground/5 h-12 pr-12 pl-6 rounded-xl font-bold text-sm focus:outline-none focus:border-primary/30 transition-all text-left"
                              />
                            </div>
                          </div>

                          <div className="space-y-2 text-right">
                            <label className="text-xs font-black text-foreground/60 mr-1">رقم الواتساب</label>
                            <div className="relative">
                              <MessageSquare className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                              <input 
                                type="tel" 
                                value={branch.whatsapp}
                                onChange={(e) => handleBranchChange(branch.id, "whatsapp", e.target.value)}
                                className="w-full bg-white border border-foreground/5 h-12 pr-12 pl-6 rounded-xl font-bold text-sm focus:outline-none focus:border-primary/30 transition-all text-left"
                              />
                            </div>
                          </div>

                          <div className="space-y-2 text-right md:col-span-2">
                            <label className="text-xs font-black text-foreground/60 mr-1">رابط جوجل ماب (اختياري)</label>
                            <div className="relative">
                              <Globe className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                              <input 
                                type="url" 
                                value={branch.mapLink}
                                onChange={(e) => handleBranchChange(branch.id, "mapLink", e.target.value)}
                                placeholder="https://goo.gl/maps/..."
                                className="w-full bg-white border border-foreground/5 h-12 pr-12 pl-6 rounded-xl font-bold text-sm focus:outline-none focus:border-primary/30 transition-all text-left"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-foreground/5">
                    <div className="space-y-2 text-right">
                      <label className="text-xs font-black text-foreground/60 mr-1">البريد الإلكتروني الموحد</label>
                      <div className="relative">
                        <Mail className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-[#F8FAFC] border border-foreground/5 h-14 pr-14 pl-6 rounded-2xl font-bold text-sm focus:outline-none focus:border-primary/30 transition-all text-left"
                        />
                      </div>
                    </div>
                    <div className="space-y-2 text-right">
                      <label className="text-xs font-black text-foreground/60 mr-1">الموقع الإلكتروني</label>
                      <div className="relative">
                        <Globe className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                        <input 
                          type="url" 
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          placeholder="https://example.com"
                          className="w-full bg-[#F8FAFC] border border-foreground/5 h-14 pr-14 pl-6 rounded-2xl font-bold text-sm focus:outline-none focus:border-primary/30 transition-all text-left"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button 
                    type="button" 
                    onClick={() => setStep(1)}
                    className="text-foreground/40 font-black text-sm hover:text-foreground transition-all flex items-center gap-2"
                  >
                    السابق
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setStep(3)}
                    className="bg-primary text-white px-12 py-4 rounded-2xl font-black text-sm hover:shadow-xl hover:-translate-y-1 transition-all active:scale-95"
                  >
                    التالي
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-left-4 text-right">
                <div className="text-right">
                  <h2 className="text-2xl font-black text-foreground mb-2">الملفات والشهادات</h2>
                  <p className="text-sm text-foreground/40 font-bold">ارفع المستندات التي تثبت جودة أعمالك</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "البروفايل التعريفي (PDF)", field: "profilePdf" },
                    { label: "شهادات ISO", field: "isoCerts" },
                    { label: "شهادات جودة", field: "qualityCerts" },
                    { label: "اعتمادات سابقة", field: "approvals" },
                    { label: "كتالوجات المنتجات", field: "catalogs" }
                  ].map((item, idx) => (
                    <div key={idx} className="relative group">
                      <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer z-10" 
                        onChange={(e) => handleFileChange(e, item.field)}
                      />
                      <div className="bg-[#F8FAFC] border border-foreground/5 p-4 rounded-2xl flex items-center justify-between group-hover:border-primary/20 transition-all">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-foreground/20 group-hover:text-primary transition-colors">
                          <Upload className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-black text-foreground/60">{item.label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-primary/5 rounded-[32px] p-8 border border-primary/10">
                  <div className="flex items-start gap-4 flex-row-reverse">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shrink-0 border border-primary/10">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-foreground mb-1">جاهز للانطلاق؟</h4>
                      <p className="text-xs font-bold text-foreground/50 leading-relaxed">بمجرد حفظ البيانات، ستتم مراجعة ملف شركتك من قبل فريق مات لينك وتفعيله ليظهر للمقاولين.</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between pt-6">
                  <button 
                    type="button" 
                    onClick={() => setStep(2)}
                    className="text-foreground/40 font-black text-sm hover:text-foreground transition-all flex items-center gap-2"
                  >
                    السابق
                  </button>
                  <button 
                    type="submit"
                    className="bg-primary text-white px-16 py-4 rounded-2xl font-black text-base hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95"
                  >
                    حفظ البيانات والبدء
                  </button>
                </div>
              </div>
            )}
          </form>

        </div>
      </div>
    </div>
  );
};

export default ProfileSetupClient;
