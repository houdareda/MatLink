import { Suspense } from "react";
import RegisterClient from "./RegisterClient";

export const metadata = {
  title: "إنشاء حساب جديد | MatLink",
  description: "انضم إلى منصة مات لينك كمورد أو مقاول وابدأ في توسيع نطاق أعمالك.",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <RegisterClient />
    </Suspense>
  );
}
