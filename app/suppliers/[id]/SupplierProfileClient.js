"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  FileText, 
  CheckCircle2, 
  Download,
  ChevronLeft,
  MessageSquare
} from "lucide-react";

const SupplierProfileClient = ({ supplier, products }) => {
  return (
    <div className="bg-[#F1F5F9] pb-20">
      {/* Hero / Header Section */}
      <section className="relative pt-12 pb-24 overflow-hidden bg-white border-b border-foreground/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[10px] font-black text-foreground/30 uppercase tracking-widest mb-10">
            <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-foreground/60">الموردون</span>
            <ChevronLeft className="w-3 h-3" />
            <span className="text-primary">{supplier.nameAr}</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Logo and Main Info */}
            <div className="flex-1 space-y-8 text-right">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-24 h-24 lg:w-32 lg:h-32 bg-muted/30 rounded-3xl border-2 border-primary/10 flex items-center justify-center overflow-hidden shadow-xl shadow-primary/5 shrink-0">
                  <img src={supplier.logo} alt={supplier.nameAr} className="w-full h-full object-cover" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 justify-start">
                    {supplier.verified && (
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 text-[10px] font-black">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        مورد موثق
                      </span>
                    )}
                    <span className="text-[10px] font-black text-foreground/40 bg-muted px-4 py-1 rounded-full border border-foreground/5 uppercase tracking-wider">
                      {supplier.country}
                    </span>
                  </div>
                  
                  <h1 className="text-3xl lg:text-5xl font-black text-foreground leading-tight">
                    {supplier.nameAr}
                    <span className="block text-xl lg:text-2xl text-foreground/40 mt-1 font-bold">{supplier.nameEn}</span>
                  </h1>
                  
                  <div className="flex items-center gap-2 justify-start text-foreground/50 font-bold text-sm">
                    <span>{supplier.location}</span>
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </div>

              <p className="text-base lg:text-lg text-foreground/60 font-medium leading-relaxed max-w-3xl">
                {supplier.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 justify-start">
                <a 
                  href={`tel:${supplier.contact.phone}`}
                  className="flex items-center gap-2 bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
                >
                  <span>تواصل الآن</span>
                  <Phone className="w-4 h-4" />
                </a>
                <a 
                  href={`https://wa.me/${supplier.contact.whatsapp}`}
                  className="flex items-center gap-2 bg-emerald-500 text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-emerald-600 transition-all shadow-xl shadow-emerald-500/20 hover:scale-105 active:scale-95"
                >
                  <span>واتساب</span>
                  <MessageSquare className="w-4 h-4" />
                </a>
                {supplier.documents.profilePdf && (
                  <a 
                    href={supplier.documents.profilePdf}
                    download
                    className="flex items-center gap-2 bg-white border-2 border-foreground/10 px-8 py-3.5 rounded-2xl font-black text-sm text-foreground/60 hover:border-primary/30 hover:text-primary transition-all group"
                  >
                    <span>تحميل البروفايل</span>
                    <Download className="w-4 h-4 group-hover:animate-bounce" />
                  </a>
                )}
              </div>
            </div>

            {/* Branches and Contact Info */}
            <div className="w-full lg:w-96 space-y-6">
              <div className="bg-white rounded-[32px] border border-foreground/5 p-8 shadow-sm space-y-6 text-right">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-black text-foreground text-lg">الفروع والتواصل</h3>
                  <div className="bg-primary/5 px-3 py-1 rounded-lg border border-primary/10">
                    <span className="text-[10px] font-black text-primary">{supplier.branches?.length || 0} فروع</span>
                  </div>
                </div>
                
                <div className="space-y-8">
                  {supplier.branches?.map((branch, idx) => (
                    <div key={branch.id || idx} className="space-y-4 pb-6 border-b border-foreground/5 last:border-0 last:pb-0">
                      <div className="flex items-center gap-2 justify-start group">
                        <div className="w-1.5 h-6 bg-primary/20 rounded-full group-hover:bg-primary transition-colors"></div>
                        <h4 className="font-black text-foreground text-sm">{branch.nameAr}</h4>
                      </div>

                      <div className="space-y-4 pr-3">
                        {/* Address */}
                        <div className="flex items-start gap-3 flex-row-reverse">
                          <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center text-foreground/30 shrink-0">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] text-foreground/30 font-black uppercase mb-0.5">العنوان</p>
                            <p className="text-xs font-bold text-foreground/70 leading-relaxed">{branch.address}</p>
                          </div>
                        </div>

                        {/* Phone & WhatsApp */}
                        <div className="flex items-start gap-3 flex-row-reverse">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] text-foreground/30 font-black uppercase mb-0.5">تواصل مباشر</p>
                            <div className="flex flex-wrap items-center gap-2 justify-end">
                              <a href={`tel:${branch.phone}`} className="text-xs font-bold text-foreground/70 hover:text-primary transition-colors" dir="ltr">{branch.phone}</a>
                              <span className="text-foreground/10 text-[10px]">|</span>
                              <a href={`https://wa.me/${branch.whatsapp}`} target="_blank" className="text-xs font-bold text-emerald-600 hover:underline">واتساب</a>
                            </div>
                          </div>
                        </div>

                        {/* Map Link */}
                        {branch.mapLink && (
                          <div className="pt-2">
                            <a 
                              href={branch.mapLink} 
                              target="_blank" 
                              className="w-full flex items-center justify-center gap-2 py-2.5 bg-muted/30 border border-foreground/5 rounded-xl text-[10px] font-black text-primary hover:bg-primary/5 hover:border-primary/20 transition-all"
                            >
                              <span>عرض على الخريطة</span>
                              <Globe className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* General company contacts (Email/Web) */}
                  <div className="pt-4 border-t-2 border-dashed border-foreground/5 space-y-4">
                    <div className="flex items-center gap-4 flex-row-reverse">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] text-foreground/30 font-black uppercase mb-0.5">البريد الموحد</p>
                        <p className="text-xs font-bold text-foreground/70 break-all">{supplier.contact.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-row-reverse">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                        <Globe className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-[10px] text-foreground/30 font-black uppercase mb-0.5">الموقع الرسمي</p>
                        <a href={supplier.contact.website} target="_blank" className="text-xs font-bold text-primary hover:underline break-all">{supplier.contact.website}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Documents Status */}
              {(supplier.documents.isoCertificates?.length > 0 || 
                supplier.documents.qualityCertificates?.length > 0 || 
                supplier.documents.previousApprovals?.length > 0) && (
                <div className="bg-white rounded-[32px] border border-foreground/5 p-8 shadow-sm text-right">
                  <h3 className="font-black text-foreground text-lg mb-6">الشهادات والاعتمادات</h3>
                  <div className="space-y-4">
                    {[
                      { label: "شهادات ISO", docs: supplier.documents.isoCertificates },
                      { label: "شهادات جودة", docs: supplier.documents.qualityCertificates },
                      { label: "اعتمادات سابقة", docs: supplier.documents.previousApprovals }
                    ].map((category, idx) => (
                      category.docs && category.docs.length > 0 && (
                        <div key={idx} className="space-y-2">
                          {category.docs.map((file, fIdx) => (
                            <a 
                              key={fIdx}
                              href={file}
                              download
                              className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-foreground/5 hover:bg-primary/5 hover:border-primary/20 transition-all group"
                            >
                              <span className="text-xs font-bold text-foreground/60 group-hover:text-foreground transition-colors">{category.label}</span>
                              <Download className="w-4 h-4 text-foreground/20 group-hover:text-primary transition-colors" />
                            </a>
                          ))}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Supplier's Products Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
            <div className="text-right">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] block mb-3">كتالوج المورد</span>
              <h2 className="text-2xl lg:text-4xl font-black text-foreground leading-tight">المنتجات المتوفرة</h2>
            </div>
            <div className="bg-white px-6 py-3 rounded-2xl border border-foreground/5 shadow-sm">
              <span className="text-sm font-black text-foreground/40">{products.length} منتج متاح حالياً</span>
            </div>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-24 bg-white rounded-[40px] border-2 border-dashed border-foreground/10 flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center">
                <FileText className="w-10 h-10 text-foreground/20" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-black text-foreground">لا توجد منتجات حالياً</h3>
                <p className="text-sm text-foreground/40 font-bold">لم يقم هذا المورد بإضافة منتجات للمنصة بعد.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SupplierProfileClient;
