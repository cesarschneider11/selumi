"use client";

import React from "react";
import { Flame, Scissors, Clock, ShieldCheck, Sparkles } from "lucide-react";

export const RitualSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#FAF7F2] border-t border-[#E8DCCF]/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EADBC8]/40 border border-[#E8DCCF] text-xs font-semibold uppercase tracking-wider text-[#9E5F28] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B87333]" />
            <span>Ritual de Cuidado</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#332219] mb-4">
            Como Cuidar da Sua Vela Selumi
          </h2>
          <p className="text-sm sm:text-base text-[#6E5D53] font-light leading-relaxed">
            Pequenos gestos que prolongam o tempo de queima, intensificam a liberação das essências e garantem uma
            experiência segura e encantadora em cada acendimento.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DCCF] flex flex-col items-start shadow-xs transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-[#F4ECE1] text-[#B87333] flex items-center justify-center mb-4">
              <Flame className="w-6 h-6 stroke-[1.6]" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E5F28] mb-1">
              01. Memória da Cera
            </span>
            <h3 className="font-serif text-lg font-semibold text-[#332219] mb-2">
              Primeira Queima
            </h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed">
              Deixe a cera derreter até alcançar as bordas do frasco. Isso evita o efeito &ldquo;túnel&rdquo; e garante
              que a vela queime por inteiro.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DCCF] flex flex-col items-start shadow-xs transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-[#F4ECE1] text-[#B87333] flex items-center justify-center mb-4">
              <Scissors className="w-6 h-6 stroke-[1.6]" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E5F28] mb-1">
              02. Pavio Limpo
            </span>
            <h3 className="font-serif text-lg font-semibold text-[#332219] mb-2">
              Apare a Ponta
            </h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed">
              Antes de reacender, corte o pavio em aproximadamente 5mm. Esse cuidado gera uma chama estável e sem
              fuligem escura.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DCCF] flex flex-col items-start shadow-xs transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-[#F4ECE1] text-[#B87333] flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 stroke-[1.6]" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E5F28] mb-1">
              03. Duração Ideal
            </span>
            <h3 className="font-serif text-lg font-semibold text-[#332219] mb-2">
              Até 4 Horas
            </h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed">
              Não queime sua vela por mais de 4 horas seguidas. Esse tempo preserva as propriedades olfativas e a
              integridade da cera.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-3xl p-6 border border-[#E8DCCF] flex flex-col items-start shadow-xs transition-transform hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-[#F4ECE1] text-[#B87333] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 stroke-[1.6]" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#9E5F28] mb-1">
              04. Ambiente Seguro
            </span>
            <h3 className="font-serif text-lg font-semibold text-[#332219] mb-2">
              Superfície Plana
            </h3>
            <p className="text-xs text-[#6E5D53] leading-relaxed">
              Acenda sempre sobre suportes firmes, longe de correntes de ar, cortinas, crianças pequenas e animais de
              estimação.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
