"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Mail, 
  Lock, 
  ArrowLeft,
  ChevronRight
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

const LoginClient = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Attempt:", formData);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col font-black rtl">
      
      {/* Back to Home - Optional if footer exists, but good for UX */}
      <Link href="/" className="fixed top-8 right-8 flex items-center gap-2 text-foreground/40 hover:text-primary transition-all group z-50">
        <span className="font-black text-xs">العودة للرئيسية</span>
        <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>

      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-[440px] space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          
          {/* Form Card */}
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.06)] border border-foreground/5 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-primary/20 to-transparent"></div>
            
            <div className="text-center mb-10">
              <h1 className="text-2xl font-black text-[#1e293b]">تسجيل الدخول</h1>
              <p className="text-xs font-bold text-foreground/30 mt-1">أهلاً بك مجدداً في مات لينك</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              
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
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-black text-foreground/60 block">كلمة المرور</label>
                  <Link href="/forgot-password" size="sm" className="text-[10px] font-black text-primary hover:underline">
                    نسيت كلمة المرور؟
                  </Link>
                </div>
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

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full bg-primary text-white h-12 rounded-xl font-black text-base hover:shadow-lg hover:-translate-y-px transition-all active:scale-95 flex items-center justify-center gap-3 mt-4"
              >
                تسجيل الدخول
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

              {/* Social Logins */}
              <div className="grid grid-cols-1 gap-3">
                <button 
                  type="button"
                  className="w-full bg-white border border-foreground/10 h-11 rounded-xl font-black text-xs flex items-center justify-center gap-3 hover:bg-[#F8FAFC] hover:border-foreground/20 transition-all active:scale-95"
                >
                  <GoogleIcon />
                  <span>متابعة بواسطة جوجل</span>
                </button>
              </div>

            </form>

            {/* Registration Link */}
            <div className="mt-8 pt-8 border-t border-foreground/5 text-center">
               <p className="font-bold text-xs text-foreground/40">
                 ليس لديك حساب؟{" "}
                 <Link href="/register" className="text-primary font-black hover:underline underline-offset-4 decoration-2">
                   إنشاء حساب جديد
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

export default LoginClient;
