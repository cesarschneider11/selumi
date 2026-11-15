"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, MessageCircle, ArrowRight, Heart, Sparkles } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";

export const SuccessModal: React.FC = () => {
  const { isSuccessModalOpen, closeSuccessModal, lastCompletedOrder, generateWhatsAppLink } = useCatalog();

  useEffect(() => {
    if (isSuccessModalOpen) {
      // Fire subtle warm confetti
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#B87333", "#C59B27", "#EADBC8", "#4A3528"],
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [isSuccessModalOpen]);

  if (!isSuccessModalOpen || !lastCompletedOrder) return null;

  const waLink = generateWhatsAppLink(lastCompletedOrder);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="fixed inset-0" onClick={closeSuccessModal} aria-hidden="true" />

      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E8DCCF] z-10 p-7 text-center">
        {/* Success Icon */}
        <div className="w-16 h-16 rounded-full bg-[#EADBC8]/60 text-[#B87333] flex items-center justify-center mx-auto mb-5 shadow-inner">
          <Heart className="w-8 h-8 fill-[#B87333]" />
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9E5F28] px-3 py-1 bg-[#F4ECE1] rounded-full mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#B87333]" />
          <span>Pedido Gerado com Afeto</span>
        </span>

        <h2 className="font-serif text-3xl font-semibold text-[#332219] mb-3">
          Obrigado, {lastCompletedOrder.customerName.split(" ")[0]}!
        </h2>

        <p className="text-xs sm:text-sm text-[#6E5D53] leading-relaxed mb-6">
          Seu pedido foi direcionado ao nosso WhatsApp oficial. Caso a janela do WhatsApp não tenha aberto
          automaticamente, clique no botão verde abaixo para confirmar sua encomenda conosco.
        </p>

        {/* WhatsApp Button */}
        <div className="space-y-3">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-3.5 px-6 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Abrir WhatsApp da Selumi</span>
          </a>

          <button
            onClick={closeSuccessModal}
            className="w-full bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#332219] py-3 px-6 rounded-2xl font-medium text-xs border border-[#E8DCCF] transition-colors cursor-pointer"
          >
            Voltar ao Catálogo
          </button>
        </div>
      </div>
    </div>
  );
};
