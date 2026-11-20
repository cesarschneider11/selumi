"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { ValuesSection } from "@/components/ValuesSection";
import { ScentsSection } from "@/components/ScentsSection";
import { HowToOrderSection } from "@/components/HowToOrderSection";
import { RitualSection } from "@/components/RitualSection";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { ProductModal } from "@/components/ProductModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { SuccessModal } from "@/components/SuccessModal";
import { WhatsAppFloatingButton } from "@/components/WhatsAppFloatingButton";
import { useCatalog } from "@/context/CatalogContext";
import { Sparkles, SlidersHorizontal } from "lucide-react";

export default function HomePage() {
  const { products, config } = useCatalog();
  const [selectedCategory, setSelectedCategory] = useState<string>("todas");

  // Extract distinct categories
  const categories = ["todas", ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === "todas"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Produtos mais vendidos aparecem primeiro na ordem de visualização
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const aBest = Boolean(a.isBestSeller || a.featured);
    const bBest = Boolean(b.isBestSeller || b.featured);

    // 1º: Mais vendidos vêm antes
    if (aBest && !bBest) return -1;
    if (!aBest && bBest) return 1;

    // 2º: Em estoque vem antes de em falta
    if (a.available && !b.available) return -1;
    if (!a.available && b.available) return 1;

    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* Navigation Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Catalog Section */}
        <section id="colecao" className="py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EADBC8]/50 border border-[#E8DCCF] text-xs font-semibold uppercase tracking-wider text-[#9E5F28] mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#B87333]" />
                <span>Coleção Atual</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#332219]">
                Nossas Velas Artesanais
              </h2>
              <p className="text-xs sm:text-sm text-[#6E5D53] mt-2 max-w-md">
                Toque em qualquer vela para escolher a essência que mais agrada seus sentidos e adicione ao seu
                pedido personalizado.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                    selectedCategory === category
                      ? "bg-[#332219] text-[#FAF7F2] shadow-xs"
                      : "bg-[#FFFFFF] text-[#6E5D53] border border-[#E8DCCF] hover:border-[#B87333]/40 hover:text-[#332219]"
                  }`}
                >
                  {category === "todas" ? "Todas as Velas" : category}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          {sortedProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-[#E8DCCF]">
              <p className="text-sm text-[#6E5D53]">Nenhuma vela encontrada nesta categoria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Values Section */}
        <ValuesSection />

        {/* Scents / Aromas Section */}
        <ScentsSection />

        {/* How to Order Guide */}
        <HowToOrderSection />

        {/* Candle Care Ritual */}
        <RitualSection />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Global Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <SuccessModal />
      <WhatsAppFloatingButton />

      {/* Footer */}
      <Footer />
    </div>
  );
}
