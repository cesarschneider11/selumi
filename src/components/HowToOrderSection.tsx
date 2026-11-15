"use client";

import React from "react";
import { Sparkles, ShoppingBag, MessageSquareText, Flame } from "lucide-react";

export const HowToOrderSection: React.FC = () => {
  return (
    <section id="como-pedir" className="py-16 md:py-24 bg-[#F4ECE1]/50 border-t border-[#E8DCCF]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#B87333] mb-2 block">
          Simplicidade & Afeto
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#332219] mb-4">
          Como Fazer seu Pedido
        </h2>
        <p className="text-sm sm:text-base text-[#6E5D53] max-w-xl mx-auto mb-14 font-light leading-relaxed">
          Sem cadastros complicados ou burocracias. Uma experiência prática e humanizada diretamente no WhatsApp.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-7 border border-[#E8DCCF] shadow-xs text-left relative flex flex-col justify-between">
            <div className="w-10 h-10 rounded-full bg-[#B87333] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
              01
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#332219] mb-2">
                Escolha o Modelo & Aroma
              </h3>
              <p className="text-xs text-[#6E5D53] leading-relaxed">
                Navegue pelo catálogo e escolha a vela que mais combina com você, definindo a essência que mais toca seus sentidos.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-7 border border-[#E8DCCF] shadow-xs text-left relative flex flex-col justify-between">
            <div className="w-10 h-10 rounded-full bg-[#B87333] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
              02
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#332219] mb-2">
                Revise sua Sacola
              </h3>
              <p className="text-xs text-[#6E5D53] leading-relaxed">
                Adicione quantos itens desejar, ajuste quantidades e selecione a forma de pagamento (PIX ou dinheiro na entrega).
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-7 border border-[#E8DCCF] shadow-xs text-left relative flex flex-col justify-between">
            <div className="w-10 h-10 rounded-full bg-[#B87333] text-white flex items-center justify-center font-bold text-sm mb-5 shadow-xs">
              03
            </div>
            <div>
              <h3 className="font-serif text-xl font-semibold text-[#332219] mb-2">
                Confirme no WhatsApp
              </h3>
              <p className="text-xs text-[#6E5D53] leading-relaxed">
                Seu pedido é enviado formatado para nossa equipe. Confirmamos tudo com você e combinamos a entrega com carinho.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
