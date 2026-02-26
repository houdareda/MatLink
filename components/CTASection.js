import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative">
        {/* Main Boxed Container */}
        <div className="relative bg-[#FDF7F2] rounded-[32px] p-12 lg:p-20 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)] border border-foreground/5 mb-10">
          
          {/* Decorative Blobs inside the box */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#E28B21]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#E28B21]/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 -z-10"></div>
          
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32 relative z-10">
            
            {/* Column: CTA Content (Right side in RTL) */}
            <div className="flex-1 text-right order-1">
              <h2 className="text-3xl lg:text-5xl font-black text-foreground leading-tight mb-6">
                جاهز لتحسين <br />
                <span className="text-primary">سلسلة التوريد؟</span>
              </h2>
              
              <p className="text-sm lg:text-base text-foreground/40 font-bold mb-10 max-w-sm ml-auto leading-relaxed">
                انضم إلى مئات شركات المقاولات التي توفر بالفعل ما يصل إلى 20% من تكاليف المواد.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-start gap-4">
                <Link href="/register?type=contractor" className="h-14 px-10 bg-primary text-white rounded-[10px] font-black text-sm hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 flex items-center justify-center min-w-[160px]">
                  انضم كمقاول
                </Link>
                <Link href="/register?type=supplier" className="h-14 px-8 border-2 border-foreground/10 bg-white text-foreground rounded-[10px] font-black text-sm hover:border-black transition-all flex items-center justify-center min-w-[160px]">
                  انضم كمورد
                </Link>
              </div>
            </div>

            {/* Column: Testimonial Card (Left side in RTL) */}
            <div className="flex-1 order-2 w-full max-w-[500px]">
              <div className="bg-white p-8 lg:p-12 rounded-[12px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] border border-foreground/5 relative animate-fade-in translate-x-2">
                {/* Profile Header */}
                <div className="flex items-center gap-4 justify-start mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/10 shadow-lg shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" 
                      alt="عمر السعيد" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-right">
                    <h4 className="text-lg font-black text-foreground">عمر السعيد</h4>
                    <p className="text-[10px] font-bold text-foreground/40 leading-tight">مدير مشروع، الشركة السعودية المحدودة للبناء</p>
                  </div>
                </div>
                
                <div className="h-px bg-foreground/5 w-full mb-6"></div>
                
                {/* Quote */}
                <p className="text-right text-xs lg:text-sm text-foreground/60 font-bold leading-relaxed italic mb-8" dir="rtl">
                  "مات لينك غيرت طريقة توريدنا للحديد. نحصل على عروض الأسعار في دقائق والتسليم دائماً في الموعد. نوصي بها بشدة للمشاريع السكنية الكبيرة."
                </p>
                
                {/* Rating */}
                <div className="flex justify-start gap-1.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm shadow-primary/20"></div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
