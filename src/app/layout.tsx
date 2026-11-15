import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CatalogProvider } from "@/context/CatalogContext";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SELUMI — Luz que acolhe | Velas Artesanais e Aromáticas",
  description:
    "Catálogo digital de velas artesanais e aromáticas feitas com cera 100% vegetal. Aconchego, carinho, relaxamento e bem-estar para o seu lar.",
  keywords: [
    "velas artesanais",
    "velas aromáticas",
    "cera vegetal",
    "selumi",
    "luz que acolhe",
    "decoração",
    "aromatizador",
    "bem-estar",
  ],
  authors: [{ name: "Selumi" }],
  openGraph: {
    title: "SELUMI — Luz que acolhe",
    description: "Velas artesanais que acolhem e transformam momentos.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#332219] selection:bg-[#B87333]/20 selection:text-[#332219]">
        <CatalogProvider>{children}</CatalogProvider>
      </body>
    </html>
  );
}
