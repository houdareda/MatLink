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

const SupplierCard = ({ supplier }) => {
  return (
    <div className="bg-white rounded-2xl border border-foreground/5 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full overflow-hidden">
      {/* Card Header/Profile */}
      <div className="p-5 pb-3">
        <div className="flex justify-between items-start mb-5">
          <div className="w-14 h-14 bg-muted/30 rounded-2xl flex items-center justify-center border border-foreground/5 group-hover:bg-primary/5 transition-colors shrink-0">
             <Building2 className="w-7 h-7 text-foreground/20 group-hover:text-primary transition-colors" />
          </div>
          <div className="flex flex-col items-end gap-2">
            {supplier.isVerified && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
                <span className="text-[10px] font-black text-primary">موثوق</span>
                <CheckCircle2 className="w-3 h-3 text-primary" />
              </div>
            )}
            <div className="flex items-center gap-1 text-foreground/40">
               <span className="text-[10px] font-bold">{supplier.location}</span>
               <MapPin className="w-3 h-3" />
            </div>
          </div>
        </div>

        <h3 className="text-[18px] font-black text-foreground mb-2.5 text-right group-hover:text-primary transition-colors">
          {supplier.name}
        </h3>
        
        <p className="text-[11px] text-foreground/40 font-bold leading-relaxed text-right line-clamp-2 h-9">
          {supplier.description}
        </p>
      </div>

      {/* Stats/Quick Info */}
      <div className="px-5 py-3 bg-muted/20 border-y border-foreground/5 flex items-center justify-between">
         <div className="flex items-center gap-3">
            {[
              { icon: <Mail className="w-3.5 h-3.5" />, label: "Email" },
              { icon: <Phone className="w-3.5 h-3.5" />, label: "Call" },
              { icon: <Globe className="w-3.5 h-3.5" />, label: "Web" }
            ].map((contact, idx) => (
              <button key={idx} className="w-8 h-8 rounded-lg bg-white border border-foreground/5 flex items-center justify-center text-foreground/30 hover:text-primary hover:border-primary/20 transition-all">
                {contact.icon}
              </button>
            ))}
         </div>
         <div className="flex flex-col items-end">
            <span className="text-primary font-black text-sm">{supplier.productCount} منتج</span>
            <span className="text-[10px] font-bold text-foreground/20 uppercase">متوفر حالياً</span>
         </div>
      </div>

      {/* Action Button */}
      <div className="p-3">
        <Link 
          href={`/products?supplier=${supplier.id}`}
          className="w-full flex items-center justify-center gap-2 py-3 bg-white border border-foreground/10 rounded-xl text-xs font-black text-foreground/60 hover:bg-primary hover:text-white hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
        >
          <span>عرض المنتجات</span>
          <ChevronLeft className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default SupplierCard;
