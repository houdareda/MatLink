import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F1F5F9] text-foreground">
      <Header />
      <main className="grow">
        <Hero />
        <FeaturedProducts />
      </main>

      <Footer />
    </div>
  );
}
