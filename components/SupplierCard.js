"use client";

import React from "react";
import Link from "next/link";
import { 
  Building2, 
  MapPin, 
  Mail, 
  Phone, 
  Globe, 
  CheckCircle2, 
  ChevronLeft 
} from "lucide-react";

import productsData from "@/data/products.json";

const SupplierCard = ({ supplier }) => {
  const productCount = productsData.filter(p => p.supplierId === supplier.id).length;

  return (
    <div className="bg-white rounded-2xl border border-foreground/5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full overflow-hidden">
      {/* Card Header/Profile */}
      <div className="p-5 pb-3">
        <div className="flex justify-between items-start mb-5">
          <Link href={`/suppliers/${supplier.id}`} className="w-14 h-14 bg-muted/30 rounded-2xl flex items-center justify-center border border-foreground/5 group-hover:border-primary/20 transition-all shrink-0 overflow-hidden">
             {supplier.logo ? (
               <img src={supplier.logo} alt={supplier.nameAr} className="w-full h-full object-cover" />
             ) : (
               <Building2 className="w-7 h-7 text-foreground/20 group-hover:text-primary transition-colors" />
             )}
          </Link>
          <div className="flex flex-col items-end gap-2">
            {supplier.verified && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                <span className="text-[10px] font-black text-emerald-600">موثوق</span>
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              </div>
            )}
            <div className="flex items-center gap-1 text-foreground/40 text-right">
               <span className="text-[10px] font-bold">
                 {supplier.branches?.length > 1 
                   ? `${supplier.branches.length} فروع متوفرة` 
                   : supplier.branches?.[0]?.nameAr || supplier.country}
               </span>
               <MapPin className="w-3 h-3 shrink-0" />
            </div>
          </div>
        </div>

        <Link href={`/suppliers/${supplier.id}`}>
          <h3 className="text-[18px] font-black text-foreground mb-2.5 text-right group-hover:text-primary transition-colors">
            {supplier.nameAr}
          </h3>
        </Link>
        
        <p className="text-[11px] text-foreground/40 font-bold leading-relaxed text-right line-clamp-2 h-9">
          {supplier.description}
        </p>
      </div>

      {/* Stats/Quick Info */}
      <div className="px-5 py-3 bg-muted/20 border-y border-foreground/5 flex items-center justify-between">
         <div className="flex items-center gap-3">
            {[
              { icon: <Mail className="w-3.5 h-3.5" />, link: `mailto:${supplier.contact.email}` },
              { icon: <Phone className="w-3.5 h-3.5" />, link: `tel:${supplier.branches?.[0]?.phone}` },
              { icon: <Globe className="w-3.5 h-3.5" />, link: supplier.contact.website }
            ].map((contact, idx) => (
              <a key={idx} href={contact.link} target="_blank" className="w-8 h-8 rounded-lg bg-white border border-foreground/5 flex items-center justify-center text-foreground/30 hover:text-primary hover:border-primary/20 transition-all">
                {contact.icon}
              </a>
            ))}
         </div>
         <div className="flex flex-col items-end text-right">
            <span className="text-primary font-black text-sm">{productCount} منتج</span>
            <span className="text-[10px] font-bold text-foreground/20 uppercase">متوفر حالياً</span>
         </div>
      </div>

      {/* Action Button */}
      <div className="p-3">
        <Link 
          href={`/suppliers/${supplier.id}`}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-foreground/10 rounded-xl text-xs font-black text-foreground/60 hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
        >
          <span>عرض الملف الشخصي</span>
          <ChevronLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default SupplierCard;
