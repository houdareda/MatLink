"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Plus, 
  Search, 
  Trash2, 
  Edit3, 
  Eye, 
  Download, 
  ChevronRight,
  Package,
  TrendingUp,
  Users,
  LayoutDashboard,
  LogOut,
  Settings,
  Bell,
  X,
  Upload,
  CheckCircle2,
  FileText
} from "lucide-react";
import productsData from "@/data/products.json";
import suppliersData from "@/data/suppliers.json";

const DashboardClient = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Simulate logged in supplier (id: 1)
  const supplierId = 1;
  const supplier = suppliersData.find(s => s.id === supplierId);
  const myProducts = productsData.filter(p => p.supplierId === supplierId);

  const filteredProducts = myProducts.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-black rtl">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-l border-foreground/5 hidden lg:flex flex-col h-screen sticky top-0">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-primary rounded-xl rotate-12 flex items-center justify-center text-white">
              <Package className="w-6 h-6 -rotate-12" />
            </div>
            <span className="text-2xl font-black text-foreground tracking-tight">MatLink</span>
          </Link>

          <nav className="space-y-2">
            {[
              { label: "لوحة التحكم", icon: <LayoutDashboard className="w-5 h-5" />, active: true },
              { label: "منتجاتي", icon: <Package className="w-5 h-5" />, active: false },
              { label: "الإحصائيات", icon: <TrendingUp className="w-5 h-5" />, active: false },
              { label: "العملاء", icon: <Users className="w-5 h-5" />, active: false },
            ].map((item, idx) => (
              <button 
                key={idx}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm transition-all ${item.active ? 'bg-primary/10 text-primary' : 'text-foreground/40 hover:bg-muted/50 hover:text-foreground'}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8 space-y-2">
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm text-foreground/40 hover:bg-muted/50 hover:text-foreground transition-all">
            <Settings className="w-5 h-5" />
            الإعدادات
          </button>
          <button className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-sm text-red-500 hover:bg-red-50 transition-all">
            <LogOut className="w-5 h-5" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-foreground/5 px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-black text-foreground">أهلاً، {supplier.nameAr} 👋</h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-xl bg-muted/30 flex items-center justify-center text-foreground/40 hover:bg-muted transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-foreground/5 shadow-sm">
              <img src={supplier.logo} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-10">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-[32px] border border-primary/10 shadow-sm space-y-2 bg-linear-to-br from-white to-primary/5">
              <p className="text-xs font-black text-foreground/30 uppercase">إجمالي المنتجات</p>
              <h3 className="text-3xl font-black text-foreground">{myProducts.length}</h3>
              <p className="text-[10px] text-emerald-500 font-bold">+2 هذا الشهر</p>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-foreground/5 shadow-sm space-y-2">
              <p className="text-xs font-black text-foreground/30 uppercase">تحميلات الكتالوج</p>
              <h3 className="text-3xl font-black text-foreground">1,280</h3>
              <p className="text-[10px] text-emerald-500 font-bold">+15% أعلى من المعتاد</p>
            </div>
            <div className="bg-white p-8 rounded-[32px] border border-foreground/5 shadow-sm space-y-2">
              <p className="text-xs font-black text-foreground/30 uppercase">نقرات التواصل</p>
              <h3 className="text-3xl font-black text-foreground">425</h3>
              <p className="text-[10px] text-primary font-bold">نشاط ممتاز</p>
            </div>
          </div>

          {/* Products Table Section */}
          <div className="bg-white rounded-[32px] border border-foreground/5 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-foreground/5 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-right">
                <h3 className="text-xl font-black text-foreground">إدارة المنتجات</h3>
                <p className="text-xs text-foreground/40 font-bold">يمكنك إضافة، تعديل أو حذف منتجاتك من هنا</p>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/20" />
                  <input 
                    type="text" 
                    placeholder="بحث سريع..."
                    className="w-full bg-[#F8FAFC] border border-foreground/5 h-12 pr-11 pl-4 rounded-xl font-bold text-xs focus:outline-none focus:border-primary/30 transition-all"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary text-white px-6 h-12 rounded-xl font-black text-sm flex items-center gap-3 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95 whitespace-nowrap"
                >
                  <Plus className="w-5 h-5" />
                  إضافة منتج
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse">
                <thead>
                  <tr className="bg-[#F8FAFC]">
                    <th className="px-8 py-5 text-xs font-black text-foreground/30 uppercase tracking-widest">المنتج</th>
                    <th className="px-8 py-5 text-xs font-black text-foreground/30 uppercase tracking-widest">التصنيف</th>
                    <th className="px-8 py-5 text-xs font-black text-foreground/30 uppercase tracking-widest">السعر</th>
                    <th className="px-8 py-5 text-xs font-black text-foreground/30 uppercase tracking-widest">التحميلات</th>
                    <th className="px-8 py-5 text-xs font-black text-foreground/30 uppercase tracking-widest">الحالة</th>
                    <th className="px-8 py-5 text-xs font-black text-foreground/30 uppercase tracking-widest">الإجراءات</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-foreground/5">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/10 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4 flex-row-reverse">
                          <div className="w-12 h-12 rounded-xl border border-foreground/5 overflow-hidden bg-muted/30">
                            <img src={p.image} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <p className="font-black text-foreground text-sm">{p.title}</p>
                            <p className="text-[10px] text-foreground/30 font-black">ID: #{p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-xs font-bold text-foreground/60 bg-muted px-4 py-1.5 rounded-full">{p.category}</span>
                      </td>
                      <td className="px-8 py-5 font-black text-sm text-primary">SAR {p.price}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-1.5 flex-row-reverse text-foreground/40 font-bold text-xs">
                          <Download className="w-3.5 h-3.5" />
                          <span>124</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-left">
                        <span className="flex items-center gap-1.5 justify-end text-emerald-500 text-[10px] font-black">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          نشط
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="w-9 h-9 rounded-lg bg-primary/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="w-9 h-9 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Add Product Modal (Simulated) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[40px] shadow-2xl relative z-10 overflow-y-auto animate-in zoom-in-95 duration-300">
            <div className="p-10">
              <div className="flex items-center justify-between mb-10">
                <div className="text-right">
                  <h3 className="text-2xl font-black text-foreground">إضافة منتج جديد</h3>
                  <p className="text-sm text-foreground/40 font-bold">أدخل تفاصيل المنتج ليتم عرضه للمقاولين</p>
                </div>
                <button onClick={() => setShowAddModal(false)} className="w-12 h-12 bg-muted/50 rounded-2xl flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-foreground/60 mr-1">اسم المنتج (عربي)</label>
                    <input type="text" className="w-full bg-[#F8FAFC] border border-foreground/5 h-14 px-6 rounded-2xl font-bold text-sm focus:outline-none focus:border-primary/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-foreground/60 mr-1">Product Name (EN)</label>
                    <input type="text" style={{ direction: 'ltr' }} className="w-full bg-[#F8FAFC] border border-foreground/5 h-14 px-6 rounded-2xl font-bold text-sm focus:outline-none focus:border-primary/30" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-right">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-foreground/60 mr-1">التصنيف</label>
                    <select className="w-full bg-[#F8FAFC] border border-foreground/5 h-14 px-6 rounded-2xl font-bold text-sm focus:outline-none focus:border-primary/30 appearance-none">
                      <option>حديد</option>
                      <option>خرسانة</option>
                      <option>سباكة</option>
                      <option>كهرباء</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-foreground/60 mr-1">نطاق السعر (ريال / وحدة)</label>
                    <input type="text" placeholder="مثال: 2500 - 2900" className="w-full bg-[#F8FAFC] border border-foreground/5 h-14 px-6 rounded-2xl font-bold text-sm focus:outline-none focus:border-primary/30" />
                  </div>
                </div>

                <div className="space-y-2 text-right">
                  <label className="text-xs font-black text-foreground/60 mr-1">وصف كامل</label>
                  <textarea className="w-full bg-[#F8FAFC] border border-foreground/5 p-6 rounded-2xl font-bold text-sm focus:outline-none focus:border-primary/30 min-h-[120px]"></textarea>
                </div>

                {/* Uploads Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-10">
                  <div className="p-6 border-2 border-dashed border-foreground/10 rounded-2xl flex flex-col items-center justify-center hover:border-primary/30 transition-all cursor-pointer">
                    <Upload className="w-6 h-6 text-foreground/20 mb-2" />
                    <span className="text-xs font-black text-foreground/60">رفع صور المنتج</span>
                  </div>
                  <div className="p-6 border-2 border-dashed border-foreground/10 rounded-2xl flex flex-col items-center justify-center hover:border-primary/30 transition-all cursor-pointer">
                    <Download className="w-6 h-6 text-foreground/20 mb-2" />
                    <span className="text-xs font-black text-foreground/60">Data Sheet PDF</span>
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-black text-lg hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 transition-all active:scale-95"
                >
                  حفظ المنتج ونشره
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardClient;
