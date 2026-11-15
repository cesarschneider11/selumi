"use client";

import React from "react";
import { Sparkles, HeartHandshake, Leaf, ShieldCheck, SunMedium } from "lucide-react";

export const ValuesSection: React.FC = () => {
  return (
    <section id="sobre" className="py-16 md:py-24 bg-[#F4ECE1]/60 border-y border-[#E8DCCF]/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B87333] mb-2 block">
            Essência & Propósito
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#332219] mb-4">
            A luz que acolhe cada detalhe do seu momento.
          </h2>
          <p className="text-sm sm:text-base text-[#6E5D53] leading-relaxed font-light">
            Na Selumi, não fazemos apenas velas: cultivamos pausas, despertamos memórias olfativas e iluminamos
            encontros com afeto puro e materiais nobres.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DCCF] text-center flex flex-col items-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F4ECE1] text-[#B87333] flex items-center justify-center mb-4">
              <Leaf className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#332219] mb-2">
              100% Cera Vegetal
            </h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed">
              Blend ecológico de coco e soja que proporciona uma queima limpa, lenta e livre de parafinas derivadas de petróleo.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DCCF] text-center flex flex-col items-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F4ECE1] text-[#B87333] flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#332219] mb-2">
              Alta Perfumaria
            </h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed">
              Essências premium com notas olfativas equilibradas para perfumar delicadamente sem causar incômodo ou dor de cabeça.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DCCF] text-center flex flex-col items-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F4ECE1] text-[#B87333] flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#332219] mb-2">
              Produção Manual
            </h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed">
              Cada vela é vertida, nivelada e acabada à mão, com pavio de algodão trançado puro e energia acolhedora.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DCCF] text-center flex flex-col items-center shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-[#F4ECE1] text-[#B87333] flex items-center justify-center mb-4">
              <SunMedium className="w-6 h-6 stroke-[1.5]" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#332219] mb-2">
              Presente Perfeito
            </h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed">
              Design sofisticado que decora com elegância e expressa carinho genuíno para presentear quem é especial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
