"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";

export const WhatsAppFloatingButton: React.FC = () => {
  const { getWhatsAppSupportLink, config } = useCatalog();
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-40 flex flex-col items-end gap-2">
      {/* Discreet Warm Tooltip */}
      {showTooltip && (
        <div className="bg-white/95 backdrop-blur-md border border-[#E8DCCF] rounded-2xl py-2 px-3.5 shadow-lg max-w-[220px] text-right animate-fade-in relative flex items-center gap-2">
          <p className="text-[11px] text-[#332219] font-medium leading-tight">
            Dúvidas ou velas personalizadas? <strong>Fale conosco!</strong>
          </p>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-gray-400 hover:text-gray-600 p-0.5"
            aria-label="Fechar dica"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={getWhatsAppSupportLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Conversar com a Selumi pelo WhatsApp"
        className="w-13 h-13 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 group"
      >
        <MessageCircle className="w-7 h-7 fill-white text-[#25D366] transition-transform group-hover:rotate-6" />
      </a>
    </div>
  );
};
