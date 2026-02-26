import { Cairo, Inter } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "مات لينك | MatLink",
  description: "منصة مات لينك المتكاملة",
};

import { CompareProvider } from "@/context/CompareContext";
import CompareBar from "@/components/CompareBar";
import Toast from "@/components/Toast";

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${inter.variable} antialiased font-cairo`}
        suppressHydrationWarning
      >
        <CompareProvider>
          <Toast />
          {children}
          <CompareBar />
        </CompareProvider>
      </body>
    </html>
  );
}
