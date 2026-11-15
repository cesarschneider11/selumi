"use client";

import React from "react";
import { ArrowDown, Flame, Heart, Sparkles, Wind } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";

export const Hero: React.FC = () => {
  const { config } = useCatalog();

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F6EFE6] to-[#FAF7F2]">
      {/* Decorative Warm Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-[#EADBC8]/40 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#B87333]/10 rounded-full blur-2xl pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Subtle Welcome Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EADBC8]/50 border border-[#E8DCCF] text-[#6E5D53] text-xs font-medium tracking-wider uppercase mb-6 animate-fade-in shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#B87333]" />
          <span>Velas Artesanais Aromáticas</span>
          <span className="w-1 h-1 rounded-full bg-[#B87333]"></span>
          <span>100% Cera Vegetal</span>
        </div>

        {/* Hero Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#332219] tracking-tight leading-[1.15] mb-6">
          Aconchego, afeto e a calma que o seu lar merece.
        </h1>

        {/* Hero Narrative Paragraph */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#6E5D53] font-light leading-relaxed mb-10">
          Bem-vindo à <strong className="font-medium text-[#332219]">Selumi</strong>. Cada uma de nossas velas é
          cuidadosamente vertida à mão para transformar momentos simples em rituais de paz, relaxamento e carinho.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#colecao"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#B87333] hover:bg-[#9E5F28] text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide transition-all duration-300 shadow-md hover:shadow-lg active:scale-98 cursor-pointer group"
          >
            <span>Conhecer nossa coleção</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </a>

          <a
            href="#sobre"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFFFF]/80 hover:bg-[#FFFFFF] text-[#332219] px-7 py-4 rounded-full text-sm font-medium border border-[#E8DCCF] hover:border-[#B87333]/40 transition-all duration-200 cursor-pointer"
          >
            <Flame className="w-4 h-4 text-[#B87333]" />
            <span>Por que velas vegetais?</span>
          </a>
        </div>

        {/* Three Senses Cards - Mobile Friendly */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
          <div className="bg-[#FFFFFF]/70 backdrop-blur-xs border border-[#E8DCCF]/70 rounded-2xl p-5 transition-transform hover:-translate-y-1 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-[#F4ECE1] text-[#B87333] flex items-center justify-center mb-3">
              <Heart className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#332219] mb-1">
              Feito com Afeto
            </h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed">
              Produção artesanal e lenta, respeitando o tempo de cura da cera para um acabamento impecável.
            </p>
          </div>

          <div className="bg-[#FFFFFF]/70 backdrop-blur-xs border border-[#E8DCCF]/70 rounded-2xl p-5 transition-transform hover:-translate-y-1 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-[#F4ECE1] text-[#B87333] flex items-center justify-center mb-3">
              <Wind className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#332219] mb-1">
              Aromas Acolhedores
            </h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed">
              Essências selecionadas de alta perfumaria com notas que abraçam e relaxam a mente.
            </p>
          </div>

          <div className="bg-[#FFFFFF]/70 backdrop-blur-xs border border-[#E8DCCF]/70 rounded-2xl p-5 transition-transform hover:-translate-y-1 shadow-2xs">
            <div className="w-9 h-9 rounded-xl bg-[#F4ECE1] text-[#B87333] flex items-center justify-center mb-3">
              <Flame className="w-4 h-4" />
            </div>
            <h3 className="font-serif text-lg font-medium text-[#332219] mb-1">
              Queima Limpa & Pura
            </h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed">
              Cera 100% vegetal de soja e coco, livre de parafina e resíduos poluentes no seu lar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
