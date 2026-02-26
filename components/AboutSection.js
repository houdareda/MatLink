"use client";

import { CheckCircle2, ShieldCheck } from "lucide-react";

const AboutSection = () => {
  const features = [
    "تواصل مباشر مع كبار الموردين",
    "شهادات جودة معتمدة لجميع المواد",
    "تتبع لوجستي متقدم وتسليم في الموقع",
    "عروض أسعار شفافة وخصومات على الكميات",
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Column: Content (Right side in RTL) */}
          <div className="flex-1 text-right order-1">
            <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-[8px] border border-primary/20 mb-6">
              <span className="text-[12px] font-black text-primary tracking-widest">منذ عام 2024</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-black text-foreground leading-tight mb-8">
              إحداث <span className="text-primary">ثورة في</span>
              <br />
              توريد مواد البناء
            </h2>
            
            <p className="text-lg text-foreground/60 font-medium leading-relaxed mb-10 max-w-2xl">
              مات لينك هي المنصة الرقمية الرائدة في المملكة التي تربط المقاولين مباشرة بالموردين المعتمدين. نحن نلغي الوسطاء، ونبسط اللوجستيات، ونضمن أفضل أسعار السوق لمواد البناء الحيوية.
            </p>
            
            <div className="space-y-5 mb-12">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center justify-start gap-4 group">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 flex-shrink-0">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-foreground/80 font-bold group-hover:text-primary transition-colors">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
            
            <button className="h-14 px-10 bg-[#333333] text-white rounded-[10px] font-black text-sm hover:bg-black transition-all shadow-xl shadow-black/10 active:scale-95">
              تعرف علينا أكثر
            </button>
          </div>

          {/* Column: Image with Floating Card (Left side in RTL) */}
          <div className="flex-1 relative order-2 lg:order-2 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[650px]">
              {/* Decorative Rotated Background (The "Rectangle" from CSS) */}
              <div 
                className="absolute inset-0 rounded-[12px]  bg-[#E28B21]/10 transform rotate-[4deg] translate-x-2 translate-y-0"
                style={{ background: "#E28B2125" }}
              ></div>
              
              {/* Main Image Container */}
              <div className="relative rounded-[12px] overflow-hidden shadow-2xl shadow-black/10 border border-foreground/5 aspect-[1.3/1]">
                <img 
                  src="/image2.jpg" 
                  alt="Construction Revolution" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Trust Card */}
              <div className="absolute -bottom-6 -right-6 lg:-bottom-10 lg:-right-10 bg-white p-6 rounded-[12px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-foreground/5 flex items-center gap-5 min-w-[260px] animate-fade-in group hover:-translate-y-2 transition-transform duration-500 z-20">
                <div className="w-16 h-16 bg-primary/10 rounded-[10px] flex items-center justify-center border border-primary/20 group-hover:bg-primary transition-colors duration-500 shrink-0">
                  <ShieldCheck className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-500" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-foreground">آمن 100%</div>
                  <div className="text-xs font-bold text-foreground/40">معاملات معتمدة</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
