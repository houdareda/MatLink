import suppliersData from "@/data/suppliers.json";
import productsData from "@/data/products.json";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SupplierProfileClient from "./SupplierProfileClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return suppliersData.map((supplier) => ({
    id: String(supplier.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const supplier = suppliersData.find((s) => String(s.id) === id);
  if (!supplier) return { title: "مورد غير موجود | مات لينك" };
  return {
    title: `${supplier.nameAr} | مات لينك`,
    description: supplier.description,
  };
}

export default async function SupplierPage({ params }) {
  const { id } = await params;
  const supplier = suppliersData.find((s) => String(s.id) === id);
  if (!supplier) notFound();

  // Get products for this supplier
  const supplierProducts = productsData.filter((p) => String(p.supplierId) === id);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="grow">
        <SupplierProfileClient supplier={supplier} products={supplierProducts} />
      </main>
      <Footer />
    </div>
  );
}
