"use client";

import Link from "next/link";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowLeft,
  Send
} from "lucide-react";

const Footer = () => {
  const footerLinks = {
    platform: [
      { label: "من نحن", href: "/about" },
      { label: "انضم كمورد", href: "/register?type=supplier" },
      { label: "انضم كمقاول", href: "/register?type=contractor" },
      { label: "الأسئلة الشائعة", href: "/faq" },
    ],
    materials: [
      { label: "حديد تسليح", href: "/search?q=حديد" },
      { label: "أسمنت وخرسانة", href: "/search?q=خرسانة" },
      { label: "أدوات كهربائية", href: "/search?q=كهرباء" },
      { label: "أدوات سباكة", href: "/search?q=سباكة" },
    ],
    support: [
      { label: "مركز المساعدة", href: "/help" },
      { label: "سياسة الخصوصية", href: "/privacy" },
      { label: "شروط الاستخدام", href: "/terms" },
      { label: "تواصل معنا", href: "/contact" },
    ]
  };

  const socialLinks = [
    { icon: <Twitter className="w-5 h-5" />, href: "#", color: "hover:bg-[#1DA1F2]" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", color: "hover:bg-[#0077b5]" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", color: "hover:bg-[#E4405F]" },
    { icon: <Facebook className="w-5 h-5" />, href: "#", color: "hover:bg-[#1877F2]" },
  ];

  return (
    <footer className="relative bg-[#0F172A] pt-24 pb-12 overflow-hidden text-white/70">
      {/* Decorative Blur */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-4 space-y-8">
            <Link href="/" className="flex items-center gap-4">
              <img 
                src="/logo.png" 
                alt="MatLink Logo" 
                className="w-14 h-14 lg:w-20 lg:h-20 object-contain hover:scale-110 transition-transform duration-500"
              />
              <div className="flex flex-col text-right">
                <span className="text-xl lg:text-2xl font-black text-white leading-none tracking-tight">
                  Mat<span className="text-primary">Link</span>
                </span>
                <span className="text-[9px] lg:text-[11px] text-white/40 font-bold leading-none uppercase mt-1.5">منصة المشتريات الإنشائية</span>
              </div>
            </Link>
            
            <p className="text-sm leading-relaxed max-w-sm">
              مات لينك هي المنصة الأولى في المنطقة التي تجمع بين المقاولين والموردين في مكان واحد، لتسهيل عمليات توريد مواد البناء بأعلى جودة وأفضل الأسعار.
            </p>
            
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all hover:scale-110 hover:text-white ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-black text-lg mb-8 relative pr-4">
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></span>
              المنصة
            </h4>
            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-bold hover:text-primary hover:pr-2 transition-all flex items-center gap-2 group">
                    <ArrowLeft className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-white font-black text-lg mb-8 relative pr-4">
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></span>
              المواد
            </h4>
            <ul className="space-y-4">
              {footerLinks.materials.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm font-bold hover:text-primary hover:pr-2 transition-all flex items-center gap-2 group">
                    <ArrowLeft className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Contact Column */}
          <div className="lg:col-span-4 space-y-8">
            <h4 className="text-white font-black text-lg mb-8 relative pr-4">
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></span>
              اشترك في النشرة البريدية
            </h4>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="بريدك الإلكتروني" 
                className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-6 outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all font-bold text-sm"
              />
              <button className="absolute left-2 top-2 bottom-2 w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                <Send className="w-5 h-5 -rotate-45" />
              </button>
            </div>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4 text-sm font-bold">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary border border-white/5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase">اتصل بنا</span>
                  <span dir="ltr">+966 500 000 000</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm font-bold">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-primary border border-white/5">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-white/40 uppercase">راسلنا</span>
                  <span>info@matlink.sa</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs font-bold text-white/30">
            &copy; {new Date().getFullYear()} مات لينك. جميع الحقوق محفوظة. تم التطوير بكل ❤️ لخدمة قطاع المقاولات.
          </div>
          
          {/* Payment Methods */}
          <div className="flex items-center gap-4 opacity-30 invert brightness-0 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
          </div>
          
          <div className="flex items-center gap-6 text-[11px] font-black uppercase tracking-widest text-white/20">
            <Link href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link>
            <Link href="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
