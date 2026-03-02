import productsData from "@/data/products.json";
import suppliersData from "@/data/suppliers.json"; // [MODIFY]
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return productsData.map((product) => ({
    id: String(product.id),
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = productsData.find((p) => String(p.id) === id);
  if (!product) return { title: "منتج غير موجود | مات لينك" };
  return {
    title: `${product.title} | مات لينك`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = productsData.find((p) => String(p.id) === id);
  if (!product) notFound();

  // [MODIFY] Find the related supplier
  const supplier = suppliersData.find((s) => s.id === product.supplierId);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header />
      <main className="grow">
        <ProductDetailClient product={product} supplier={supplier} />
      </main>
      <Footer />
    </div>
  );
}
