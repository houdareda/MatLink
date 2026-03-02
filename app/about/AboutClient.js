"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Users, 
  ShoppingBag, 
  ShieldCheck, 
  Zap, 
  ArrowLeft, 
  CheckCircle2,
  TrendingUp,
  Building2,
  PackageCheck
} from "lucide-react";
import AboutSection from "@/components/AboutSection";
import CTASection from "@/components/CTASection";

const AboutClient = () => {
  return (
    <div className="min-h-screen bg-white font-black rtl">
      <Header />
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden bg-[#FDF7F2]">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-right">
              <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-lg border border-primary/20 mb-6">
                <span className="text-[12px] font-black text-primary tracking-widest">مستقبل الإنشاءات الرقمي</span>
              </div>
              <h1 className="text-4xl lg:text-7xl font-black text-[#1e293b] leading-tight mb-8">
                نحن نعيد تعريف <br />
                <span className="text-primary text-glow-sm">سلاسل التوريد</span>
              </h1>
              <p className="text-lg text-foreground/50 font-bold leading-relaxed max-w-2xl mb-10">
                مات لينك هي أكثر من مجرد منصة؛ هي شريكك الاستراتيجي في نمو أعمالك. نحن نجمع بين التكنولوجيا والخبرة الميدانية لربط أطراف قطاع البناء في بيئة واحدة آمنة وفعالة.
              </p>
            </div>
            <div className="flex-1 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 aspect-4/3 group">
                <img 
                  src="/about_hero_image.png" 
                  alt="About Hero" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#1e293b]/50 to-transparent"></div>
              </div>
              {/* Floating Stat */}
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-foreground/5 animate-bounce-subtle">
                <div className="text-3xl font-black text-primary">+1500</div>
                <div className="text-[10px] font-bold text-foreground/40 uppercase">مورد ومقاول مسجل</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Process Section (How it works) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24">
            <h2 className="text-3xl lg:text-5xl font-black text-[#1e293b] mb-4">كيف تعمل المنصة؟</h2>
            <p className="text-foreground/40 font-bold">رحلة متكاملة تبدأ من العرض وتنتهي بالتوريد</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
             {/* Left Column: Image/Visual (Slightly Larger) */}
             <div className="lg:col-span-5 order-2 lg:order-1 flex justify-center lg:justify-start">
                <div className="relative w-full max-w-[500px]">
                  <div className="bg-[#1e293b] rounded-3xl p-1 overflow-hidden shadow-2xl transform lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
                     <div className="rounded-[22px] overflow-hidden">
                        <img src="/about_process_image.png" alt="Process" className="w-full h-auto opacity-95" />
                     </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl -z-10"></div>
                </div>
             </div>

             {/* Right Column: Steps (Wider and more filled) */}
             <div className="lg:col-span-7 order-1 lg:order-2">
                <div className="space-y-6 relative">
                  {/* Vertical Line for steps */}
                  <div className="absolute right-7 top-10 bottom-10 w-px bg-foreground/5 hidden lg:block"></div>

                  {[
                    {
                      icon: <ShoppingBag className="w-7 h-7 text-white" />,
                      bg: "bg-primary",
                      shadow: "shadow-primary/20",
                      title: "للموردين: اعرض ونمِ مبيعاتك",
                      desc: "قم بإدراج منتجاتك، وتحديد أسعارك، والوصول إلى آلاف المقاولين في جميع أنحاء المملكة بضغطة زر واحدة. توفر لك المنصة لوحة تحكم متكاملة لمتابعة طلباتك ونمو مبيعاتك."
                    },
                    {
                      icon: <Users className="w-7 h-7 text-white" />,
                      bg: "bg-[#1e293b]",
                      shadow: "shadow-[#1e293b]/10",
                      title: "للمقاولين: قارن وتوريد بذكاء",
                      desc: "ابحث عن المواد التي تحتاجها، وقارن بين أسعار الموردين المختلفين بناءً على الجودة والموقع والسعر. احصل على أفضل العروض المخصصة لمشروعك في دقائق معدودة."
                    },
                    {
                      icon: <Zap className="w-7 h-7 text-white" />,
                      bg: "bg-green-500",
                      shadow: "shadow-green-500/10",
                      title: "النتيجة: كفاءة وسرعة استثنائية",
                      desc: "تقليل الوقت الضائع في المفاوضات التقليدية والاتصالات المتكررة. مات لينك تضمن لك دورة توريد أسرع بنسبة 40% وتحسيناً ملحوظاً في الربحية لجميع الأطراف."
                    }
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-8 items-start relative group p-6 rounded-2xl hover:bg-[#F1F5F9] transition-colors duration-300">
                       <div className={`w-14 h-14 ${step.bg} rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${step.shadow} z-10 transform group-hover:scale-110 transition-transform`}>
                          {step.icon}
                       </div>
                       <div className="text-right">
                          <h3 className="text-xl font-black text-[#1e293b] mb-3 group-hover:text-primary transition-colors">{step.title}</h3>
                          <p className="text-sm lg:text-base text-foreground/50 font-bold leading-relaxed">
                            {step.desc}
                          </p>
                       </div>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Vision/Mission Section */}
      <section className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary rounded-full blur-[120px]"></div>
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-blue-500 rounded-full blur-[120px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-12">
               <span className="text-primary font-black uppercase tracking-[5px] text-xs">مهمتنا</span>
               <h2 className="text-3xl lg:text-5xl font-black mt-4 leading-normal">
                  بناء سوق مواد بناء هو <br />
                  <span className="text-primary italic">الأكثر شفافية</span> وكفاءة في العالم العربي
               </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
               <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                  <ShieldCheck className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-lg font-black mb-3">الثقة المطلقة</h4>
                  <p className="text-xs text-white/40 font-bold leading-relaxed">نحن نضمن جودة الموردين وأمان المعاملات المالية بالكامل.</p>
               </div>
               <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                  <TrendingUp className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-lg font-black mb-3">النمو المستمر</h4>
                  <p className="text-xs text-white/40 font-bold leading-relaxed">توفير الأدوات اللازمة للموردين الصغار والكبار للتوسع محلياً.</p>
               </div>
               <div className="p-8 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors group">
                  <Building2 className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-lg font-black mb-3">الاستدامة</h4>
                  <p className="text-xs text-white/40 font-bold leading-relaxed">تحسين سلاسل الإمداد لتقليل الهدر الكربوني وتحسين البيئة.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Benefits/Why Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
            <div className="flex-1 order-2 lg:order-1">
               <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-4">
                        <div className="rounded-2xl overflow-hidden shadow-lg aspect-square">
                           <img src="/about_vision_image.png" alt="Build 1" className="w-full h-full object-cover" />
                        </div>
                        <div className="bg-primary p-6 rounded-2xl text-white">
                           <div className="text-2xl font-black">24/7</div>
                           <div className="text-[10px] uppercase font-bold opacity-80">دعم فني متواصل</div>
                        </div>
                     </div>
                     <div className="space-y-4 pt-8">
                        <div className="bg-[#1e293b] p-6 rounded-2xl text-white">
                           <div className="text-2xl font-black">100%</div>
                           <div className="text-[10px] uppercase font-bold opacity-80">ضمان الجودة</div>
                        </div>
                        <div className="rounded-2xl overflow-hidden shadow-lg aspect-square border border-foreground/5">
                           <img src="/image2.jpg" alt="Building" className="w-full h-full object-cover" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex-1 text-right order-1 lg:order-2">
               <h2 className="text-3xl lg:text-5xl font-black text-[#1e293b] mb-8 leading-tight">
                  لماذا يختار المحترفون <br />
                  منصة <span className="text-primary italic">مات لينك؟</span>
               </h2>
               
               <div className="space-y-6">
                  {[
                    { title: "موردون معتمدون", desc: "نحن نقوم بفحص وتدقيق جميع الموردين لضمان المصداقية." },
                    { title: "أفضل الأسعار", desc: "بسبب التنافس المباشر، تحصل دائماً على السعر الحقيقي دون عمولات مخفية." },
                    { title: "سرعة في التنفيذ", desc: "نظام طلبات ذكي يختصر أسابيع من المفاوضات إلى ساعات قليلة." },
                    { title: "نظام لوجستي", desc: "إمكانية المتابعة الفورية لشحنات المواد حتى وصولها لموقع البناء." }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4 items-start group">
                      <div className="shrink-0 mt-1">
                        <PackageCheck className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-[#1e293b] mb-1 group-hover:text-primary transition-colors">{item.title}</h4>
                        <p className="text-sm text-foreground/40 font-bold leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
      <CTASection />
      
      <Footer />
    </div>
  );
};

export default AboutClient;
