"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Building2, 
  HardHat, 
  CheckCircle2,
  Info,
  ArrowLeft
} from "lucide-react";
import Footer from "@/components/Footer";

// Google Icon as a Component for simplicity
const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
  </svg>
);

const RegisterClient = () => {
  const searchParams = useSearchParams();
  const [accountType, setAccountType] = useState("contractor"); // contractor or supplier
  
  useEffect(() => {
    const type = searchParams.get("type");
    if (type === "contractor" || type === "supplier") {
      setAccountType(type);
    }
  }, [searchParams]);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", { ...formData, accountType });
    // Handle registration logic here
  };

  return (
    <main className="min-h-screen bg-[#F1F5F9] flex flex-col font-black rtl">
      
      {/* Back to Home */}
      <Link href="/" className="fixed top-8 right-8 flex items-center gap-2 text-foreground/40 hover:text-primary transition-all group z-50">
        <span className="font-black text-xs">العودة للرئيسية</span>
        <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[480px] space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          {/* Form Card */}
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] border border-foreground/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>
            
            <div className="text-center mb-8">
              <h1 className="text-2xl font-black text-[#1e293b]">إنشاء حساب جديد</h1>
              <p className="text-xs font-bold text-foreground/30 mt-1">انضم إلى منصة مات لينك للمقاولات</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Input Groups */}
              <div className="space-y-4">
                
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-foreground/60 block mr-1">الاسم الكامل</label>
                  <div className="relative group">
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="أدخل اسمك الثلاثي"
                      className="w-full bg-[#F8FAFC] border border-foreground/5 h-12 pr-11 pl-4 rounded-xl font-bold text-sm text-foreground focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-foreground/60 block mr-1">رقم الجوال</label>
                  <div className="relative group">
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="05xxxxxxxx"
                      className="w-full bg-[#F8FAFC] border border-foreground/5 h-12 pr-11 pl-4 rounded-xl font-bold text-sm text-foreground focus:outline-none focus:border-primary/30 focus:bg-white transition-all text-left rtl:text-right"
                    />
                  </div>
                </div>

                {/* Account Type Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-foreground/60 block mr-1">نوع الحساب</label>
                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Contractor */}
                    <button 
                      type="button"
                      onClick={() => setAccountType("contractor")}
                      className={`relative p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${accountType === "contractor" ? "border-primary bg-primary/5 shadow-sm" : "border-foreground/5 bg-[#F8FAFC] hover:border-foreground/10"}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${accountType === "contractor" ? "bg-primary text-white" : "bg-white text-foreground/20 shadow-sm"}`}>
                        <HardHat className="w-4 h-4" />
                      </div>
                      <span className={`font-black text-xs ${accountType === "contractor" ? "text-primary" : "text-foreground/40"}`}>مقاول</span>
                      {accountType === "contractor" && (
                        <div className="absolute top-1 left-1">
                          <CheckCircle2 className="w-3 h-3 text-primary fill-white" />
                        </div>
                      )}
                    </button>

                    {/* Supplier */}
                    <button 
                      type="button"
                      onClick={() => setAccountType("supplier")}
                      className={`relative p-3 rounded-xl border-2 transition-all flex items-center gap-3 ${accountType === "supplier" ? "border-primary bg-primary/5 shadow-sm" : "border-foreground/5 bg-[#F8FAFC] hover:border-foreground/10"}`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${accountType === "supplier" ? "bg-primary text-white" : "bg-white text-foreground/20 shadow-sm"}`}>
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className={`font-black text-xs ${accountType === "supplier" ? "text-primary" : "text-foreground/40"}`}>مورد</span>
                      {accountType === "supplier" && (
                        <div className="absolute top-1 left-1">
                          <CheckCircle2 className="w-3 h-3 text-primary fill-white" />
                        </div>
                      )}
                    </button>

                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-foreground/60 block mr-1">البريد الإلكتروني</label>
                  <div className="relative group">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      className="w-full bg-[#F8FAFC] border border-foreground/5 h-12 pr-11 pl-4 rounded-xl font-bold text-sm text-foreground focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black text-foreground/60 block mr-1">كلمة المرور</label>
                  <div className="relative group">
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                    <input 
                      type="password" 
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full bg-[#F8FAFC] border border-foreground/5 h-12 pr-11 pl-4 rounded-xl font-bold text-sm text-foreground focus:outline-none focus:border-primary/30 focus:bg-white transition-all"
                    />
                  </div>
                </div>

              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-primary text-white h-12 rounded-xl font-black text-base hover:shadow-lg hover:-translate-y-px transition-all active:scale-95 flex items-center justify-center gap-3 mt-2"
              >
                تسجيل الحساب
              </button>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-foreground/5"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-4 text-[10px] font-black text-foreground/20 uppercase tracking-widest">أو عبر المنصات</span>
                </div>
              </div>

              {/* Social Logins (Placeholder) */}
              <div className="grid grid-cols-1 gap-3">
                <button 
                  type="button"
                  className="w-full bg-white border border-foreground/10 h-11 rounded-xl font-black text-xs flex items-center justify-center gap-3 hover:bg-[#F8FAFC] hover:border-foreground/20 transition-all active:scale-95"
                >
                  <GoogleIcon />
                  <span>تسجيل الدخول بواسطة جوجل</span>
                </button>
              </div>

            </form>

            {/* Login Footer */}
            <div className="mt-6 pt-6 border-t border-foreground/5 text-center">
               <p className="font-bold text-xs text-foreground/40">
                 لديك حساب بالفعل؟{" "}
                 <Link href="/login" className="text-primary font-black hover:underline underline-offset-4 decoration-2">
                   دخول
                 </Link>
               </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default RegisterClient;
