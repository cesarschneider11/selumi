"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Sparkles, ShoppingBag, MessageCircle, Menu, X, Flame } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";

export const Header: React.FC = () => {
  const { cartCount, cartTotal, setIsCartOpen, getWhatsAppSupportLink, config } = useCatalog();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs py-3 border-b border-[#E8DCCF]/60"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="group flex items-center gap-2.5 text-decoration-none">
          <div className="w-9 h-9 rounded-full bg-[#EADBC8] flex items-center justify-center text-[#B87333] transition-transform group-hover:scale-105 shadow-inner">
            <Flame className="w-5 h-5 fill-[#B87333]/30" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-[#332219] uppercase leading-none">
              {config.storeName || "SELUMI"}
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[#9C8A7E] font-medium uppercase mt-0.5">
              {config.tagline || "Luz que acolhe"}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6E5D53]">
          <a
            href="#colecao"
            className="hover:text-[#B87333] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B87333] hover:after:w-full after:transition-all"
          >
            Nossa Coleção
          </a>
          <a
            href="#essencias"
            className="hover:text-[#B87333] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B87333] hover:after:w-full after:transition-all"
          >
            Aromas & Essências
          </a>
          <a
            href="#sobre"
            className="hover:text-[#B87333] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B87333] hover:after:w-full after:transition-all"
          >
            O Cuidado Artesanal
          </a>
          <a
            href="#como-pedir"
            className="hover:text-[#B87333] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#B87333] hover:after:w-full after:transition-all"
          >
            Como Funciona
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Support Button */}
          <a
            href={getWhatsAppSupportLink()}
            target="_blank"
            rel="noopener noreferrer"
            title="Tirar dúvidas no WhatsApp"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#6E5D53] hover:text-[#25D366] px-3 py-1.5 rounded-full border border-[#E8DCCF] hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Fale Conosco</span>
          </a>

          {/* Cart Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Abrir Sacola de Velas"
            className="relative flex items-center gap-2 bg-[#332219] hover:bg-[#4A3528] text-[#FAF7F2] px-3.5 py-2 rounded-full transition-all duration-200 shadow-sm hover:shadow active:scale-95 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-[#EADBC8]" />
            <span className="text-xs font-medium hidden sm:inline">
              {cartCount > 0
                ? `${cartTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}`
                : "Sacola"}
            </span>

            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-[#B87333] text-white text-[11px] font-bold flex items-center justify-center animate-pulse">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#332219] hover:text-[#B87333] transition-colors cursor-pointer"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E8DCCF] px-6 py-4 animate-fade-in shadow-lg">
          <nav className="flex flex-col gap-3 text-sm text-[#332219]">
            <a
              href="#colecao"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8DCCF]/50 flex items-center justify-between"
            >
              <span>Nossa Coleção</span>
              <Sparkles className="w-3.5 h-3.5 text-[#B87333]" />
            </a>
            <a
              href="#essencias"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8DCCF]/50"
            >
              Aromas & Essências
            </a>
            <a
              href="#sobre"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8DCCF]/50"
            >
              O Cuidado Artesanal
            </a>
            <a
              href="#como-pedir"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[#E8DCCF]/50"
            >
              Como Fazer o Pedido
            </a>
            <a
              href={getWhatsAppSupportLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 text-[#128C7E] font-medium flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Conversar com a Selumi no WhatsApp</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
