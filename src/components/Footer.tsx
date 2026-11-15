"use client";

import React from "react";
import Link from "next/link";
import { Flame, Heart, Lock, MessageCircle } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";

export const Footer: React.FC = () => {
  const { config, getWhatsAppSupportLink } = useCatalog();

  return (
    <footer className="bg-[#2C1E16] text-[#FAF7F2] pt-16 pb-12 border-t border-[#3C2A21]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#4A3528]">
          {/* Brand Col */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#B87333] flex items-center justify-center text-white">
                <Flame className="w-4 h-4 fill-white/40" />
              </div>
              <span className="font-serif text-2xl tracking-[0.2em] font-semibold uppercase">
                {config.storeName || "SELUMI"}
              </span>
            </div>
            <p className="font-serif italic text-lg text-[#EADBC8] mb-3">
              &ldquo;{config.tagline || "Luz que acolhe"}&rdquo;
            </p>
            <p className="text-xs text-[#E8DCCF]/70 max-w-sm leading-relaxed mb-6">
              Velas artesanais criadas para transformar qualquer espaço em um refúgio de aconchego,
              tranquilidade e reconexão consigo mesmo.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#EADBC8]">
              <Heart className="w-3.5 h-3.5 text-[#B87333] fill-[#B87333]" />
              <span>Produzido à mão com amor e calma no Brasil</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#EADBC8] mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-xs text-[#E8DCCF]/80">
              <li>
                <a href="#colecao" className="hover:text-[#B87333] transition-colors">
                  Nossa Coleção de Velas
                </a>
              </li>
              <li>
                <a href="#essencias" className="hover:text-[#B87333] transition-colors">
                  Aromas & Notas Olfativas
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#B87333] transition-colors">
                  Sobre a Selumi
                </a>
              </li>
              <li>
                <a href="#como-pedir" className="hover:text-[#B87333] transition-colors">
                  Como Fazer seu Pedido
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider uppercase text-[#EADBC8] mb-4">
              Atendimento Humanizado
            </h4>
            <p className="text-xs text-[#E8DCCF]/80 mb-4 leading-relaxed">
              Deseja uma vela personalizada para eventos, lembrancinhas ou presentes corporativos?
            </p>
            <a
              href={getWhatsAppSupportLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs bg-[#B87333] hover:bg-[#9E5F28] text-white px-4 py-2.5 rounded-full transition-all"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Conversar no WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DCCF]/50">
          <p>© 2026 Selumi — Luz que acolhe. Todos os direitos reservados.</p>

          <Link
            href="/admin"
            className="inline-flex items-center gap-1.5 text-xs text-[#E8DCCF]/60 hover:text-[#B87333] transition-colors py-1 px-2.5 rounded-lg hover:bg-white/5"
            title="Acesso restrito para administração do catálogo"
          >
            <Lock className="w-3 h-3" />
            <span>Área Administrativa</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
