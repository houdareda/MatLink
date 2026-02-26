import SuppliersClient from "./SuppliersClient";

export const metadata = {
  title: "الموردون المعتمدون | MatLink",
  description: "تصفح قائمة الموردين المعتمدين واكتشف أفضل مصادر مواد البناء في المملكة.",
};

export default function SuppliersPage() {
  return <SuppliersClient />;
}
