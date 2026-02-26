"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    title: "عروض خاصة للمقاولين",
    titleHighlight: "للمقاولين",
    description: "سجل الآن واحصل على أسعار حصرية وخصومات للمقاولين المعتمدين على الطلبات الكبيرة.",
    image: "/hero1.png",
  },
  {
    title: "أفضل الموردين في مكان واحد",
    titleHighlight: "الموردين",
    description: "نحن نربطك بأهم الشركات والمصنعين لضمان جودة مواد البناء بأفضل الأسعار.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "أفضل الموردين في مكان واحد",
    titleHighlight: "الموردين",
    description: "نحن نربطك بأهم الشركات والمصنعين لضمان جودة مواد البناء بأفضل الأسعار.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
  },
  {
    title: "أفضل الموردين في مكان واحد",
    titleHighlight: "الموردين",
    description: "نحن نربطك بأهم الشركات والمصنعين لضمان جودة مواد البناء بأفضل الأسعار.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
  }
];

const Hero = () => {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] bg-black overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 15000 }}
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
        roundLengths={true}
        threshold={15}
        resistance={true}
        resistanceRatio={0}
        dir="rtl"
        grabCursor={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} className="overflow-hidden">
            <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('${slide.image}')`,
                  width: "100%",
                  height: "100%"
                }}
              ></div>

              {/* Content */}
              <div className="relative z-10 container mx-auto px-4 text-center">
                <div className="max-w-4xl mx-auto space-y-6">
                  <h1 
                    className="text-3xl md:text-5xl font-black text-white leading-tight"
                    style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
                  >
                    {slide.title.split(slide.titleHighlight)[0]}
                    <span className="text-primary">{slide.titleHighlight}</span>
                    {slide.title.split(slide.titleHighlight)[1]}
                  </h1>
                  
                  <p 
                    className="text-base md:text-lg text-white/90 font-medium max-w-2xl mx-auto leading-relaxed"
                    style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}
                  >
                    {slide.description}
                  </p>

                  {/* Buttons removed based on user request */}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce cursor-pointer">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-white rounded-full"></div>
        </div>
      </div>    
    </section>
  );
};

export default Hero;
