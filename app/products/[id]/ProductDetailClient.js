"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import productsData from "@/data/products.json";
import ProductCard from "@/components/ProductCard";
import { useCompare } from "@/context/CompareContext";
import { 
  GitCompare, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Globe, 
  FileText, 
  CheckCircle2, 
  Download,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

const ProductDetailClient = ({ product }) => {
  const { toggleCompare, isCompared } = useCompare();
  const compared = isCompared(product.id);

  const relatedProducts = productsData.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <section className="py-12 lg:py-20 bg-[#F1F5F9]">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm font-bold text-foreground/40 mb-10">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <Link href="/#products" className="hover:text-primary transition-colors">المنتجات</Link>
          <ChevronLeft className="w-3.5 h-3.5" />
          <span className="text-foreground/60">{product.category}</span>
        </div>

        {/* Top Section: Info + Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          
          {/* Left Column: Product Info */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Category & Title */}
            <div className="space-y-3">
              <span className="inline-block text-xs font-black text-foreground/40 bg-muted px-4 py-1.5 rounded-full border border-foreground/5">
                {product.category} وصلب
              </span>
              <h1 className="text-3xl lg:text-4xl font-black text-foreground leading-tight">
                {product.title}
              </h1>
              <p className="text-sm font-bold text-foreground/50 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing Info */}
            <div className="bg-white rounded-2xl border border-foreground/5 p-6 shadow-sm flex items-center justify-between">
              <div className="text-right">
                <p className="text-xs font-black text-foreground/30 uppercase tracking-widest mb-1">أفضل سعر متاح</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xs font-bold text-foreground/40">يبدأ من</span>
                  <span className="text-3xl font-black text-primary">{product.price}</span>
                  <span className="text-sm font-black text-primary/60">ريال / {product.unit}</span>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center bg-primary/5 border border-primary/10 rounded-xl px-4 py-3">
                <span className="text-primary font-black text-sm">حسب الكمية</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a 
                href={`tel:${product.supplier.phone}`}
                className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-black text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
              >
                <Phone className="w-4 h-4" />
                تواصل مع المورد
              </a>
              <button 
                onClick={() => toggleCompare(product)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-black text-sm transition-all border group ${
                  compared 
                    ? 'bg-primary/10 border-primary text-primary' 
                    : 'bg-white border-foreground/10 text-foreground/60 hover:border-primary/30 hover:text-primary'
                }`}
              >
                <GitCompare className={`w-4 h-4 transition-transform duration-500 ${compared ? 'scale-110' : 'group-hover:scale-110'}`} />
                <span>مقارنة</span>
              </button>
              <a 
                href={product.pdfUrl || "#"} 
                download
                className="flex items-center gap-2 bg-white border border-foreground/10 px-5 py-3 rounded-xl font-black text-sm text-foreground/60 hover:border-primary/30 hover:text-primary transition-all"
              >
                <Download className="w-4 h-4" />
                ملفات المنتج (PDF)
              </a>
            </div>

            {/* Warranty Badge */}
            <div className="bg-primary/5 rounded-2xl p-5 flex items-center gap-4 border border-primary/10">
              <ShieldCheck className="w-8 h-8 text-primary shrink-0" />
              <div className="text-right">
                <h4 className="font-black text-foreground text-base">الضمان</h4>
                <p className="text-sm font-bold text-foreground/50">{product.warranty}</p>
              </div>
            </div>
          </div>

          {/* Right Column: Product Image */}
          <div className="order-1 lg:order-2">
            <div className="bg-muted/30 rounded-2xl border border-foreground/5 overflow-hidden aspect-square flex items-center justify-center shadow-sm">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section: Specs + Description */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
          {/* Technical Specs */}
          <div className="bg-white rounded-2xl border border-foreground/5 overflow-hidden shadow-sm order-2 lg:order-1">
            <div className="px-6 py-5 border-b border-foreground/5 text-center">
              <h3 className="font-black text-foreground text-lg">المواصفات الفنية</h3>
            </div>
            <div className="divide-y divide-foreground/5">
              {product.specs.map((spec, idx) => (
                <div key={idx} className="flex items-center justify-between px-6 py-4">
                    <span className="font-black text-foreground text-sm bg-muted/50 px-4 py-1.5 rounded-lg">{spec.label}</span>
                    <span className="text-sm font-bold text-foreground/50">{spec.value}</span>
                  </div>
              ))}
            </div>
          </div>

          {/* Detailed Description */}
          <div className="bg-white rounded-2xl border border-foreground/5 overflow-hidden shadow-sm p-6 lg:p-8 order-1 lg:order-2">
            <h3 className="font-black text-foreground text-lg mb-5 text-right">الوصف التفصيلي</h3>
            <p className="text-sm font-bold text-foreground/50 leading-loose text-right">
              {product.detailedDescription}
            </p>
          </div>
        </div>

        {/* Supplier Section */}
        <div className="bg-white rounded-2xl border border-foreground/5 overflow-hidden shadow-sm p-6 lg:p-8">
          <h3 className="font-black text-foreground text-lg mb-6 text-right">المورد</h3>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            {/* Supplier Info */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-muted/50 border border-foreground/5 flex items-center justify-center">
                <FileText className="w-6 h-6 text-foreground/20" />
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <h4 className="font-black text-foreground text-base">{product.supplier.name}</h4>
                  {product.supplier.verified && (
                    <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3" />
                      موثق
                    </span>
                  )}
                </div>
                <p className="text-xs font-bold text-foreground/40 mt-0.5">📍 {product.supplier.location}</p>
              </div>
            </div>
            
            {/* Supplier Actions */}
            <div className="flex flex-wrap items-center gap-3">
              <a 
                href={`tel:${product.supplier.phone}`}
                className="flex items-center gap-2 bg-muted/50 border border-foreground/5 px-4 py-2.5 rounded-xl font-bold text-xs text-foreground/60 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all"
              >
                <Phone className="w-4 h-4" />
                <span dir="ltr">{product.supplier.phone}</span>
              </a>
              <a 
                href={`mailto:${product.supplier.email}`}
                className="flex items-center gap-2 bg-muted/50 border border-foreground/5 px-4 py-2.5 rounded-xl font-bold text-xs text-foreground/60 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all"
              >
                <Mail className="w-4 h-4" />
                بريد إلكتروني
              </a>
              <a 
                href={product.supplier.website}
                target="_blank"
                className="flex items-center gap-2 bg-muted/50 border border-foreground/5 px-4 py-2.5 rounded-xl font-bold text-xs text-foreground/60 hover:bg-primary/5 hover:border-primary/20 hover:text-primary transition-all"
              >
                <Globe className="w-4 h-4" />
                الموقع
              </a>
            </div>
          </div>
        </div>

        {/* Related Products Slider */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-black text-foreground">منتجات مشابهة</h3>
              <div className="flex items-center gap-2">
                <button className="related-prev w-10 h-10 rounded-xl border border-foreground/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all text-foreground/40">
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="related-next w-10 h-10 rounded-xl border border-foreground/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all text-foreground/40">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>
            </div>
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".related-prev",
                nextEl: ".related-next",
              }}
              spaceBetween={20}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="related-products-swiper"
            >
              {relatedProducts.map((relProduct) => (
                <SwiperSlide key={relProduct.id}>
                  <ProductCard product={relProduct} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

      </div>
    </section>
  );
};

export default ProductDetailClient;
