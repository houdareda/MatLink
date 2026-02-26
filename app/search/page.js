import SearchClient from "./SearchClient";
import { Suspense } from "react";

export const metadata = {
  title: "نتائج البحث | مات لينك",
  description: "نتائج البحث عن مواد البناء والمعدات الإنشائية في منصة مات لينك.",
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center font-black">جاري التحميل...</div>}>
      <SearchClient />
    </Suspense>
  );
}
