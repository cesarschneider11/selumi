"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Minus, Sparkles, Check, Flame, ChevronRight, Wind, Share2 } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";
import { Scent } from "@/types";

export const ProductModal: React.FC = () => {
  const { selectedProductForModal, closeProductModal, scents, addToCart } = useCatalog();
  const [selectedScent, setSelectedScent] = useState<Scent | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [showFullPhoto, setShowFullPhoto] = useState(false);

  // Set default available scent when modal opens
  useEffect(() => {
    if (selectedProductForModal) {
      setQuantity(1);
      setAddedSuccess(false);
      setShowFullPhoto(false);
      const firstAvailable = scents.find((s) => s.available) || scents[0] || null;
      setSelectedScent(firstAvailable);
    }
  }, [selectedProductForModal, scents]);

  if (!selectedProductForModal) return null;

  const product = selectedProductForModal;
  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    if (!selectedScent) return;
    addToCart(product, selectedScent, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      closeProductModal();
    }, 450);
  };

  const shareText = `🕯️ Olha que linda essa vela da Selumi: *${product.name}* (${product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}) — ${product.subtitle || "Vela artesanal em cera vegetal"}. Veja no catálogo digital: https://selumi.vercel.app`;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        onClick={closeProductModal}
        aria-hidden="true"
      />

      {/* Modal Container: Bottom Sheet on Mobile, Centered Box on Desktop */}
      <div className="relative w-full sm:max-w-3xl bg-[#FAF7F2] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#E8DCCF] z-10 flex flex-col md:flex-row max-h-[92vh] sm:max-h-[88vh]">
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-3.5 right-3.5 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 backdrop-blur-xs border border-[#E8DCCF] text-[#332219] hover:bg-[#332219] hover:text-white transition-colors flex items-center justify-center shadow-xs cursor-pointer"
          aria-label="Fechar"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* --- DESKTOP VIEW: Large Left Image --- */}
        <div className="hidden md:block md:w-5/12 bg-[#F4ECE1] relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* --- MAIN CONTENT & MOBILE LAYOUT --- */}
        <div className="w-full md:w-7/12 flex flex-col justify-between overflow-y-auto">
          {/* Scrollable body */}
          <div className="p-5 sm:p-7 space-y-5 pb-24 md:pb-6">
            {/* MOBILE COMPACT HEADER (Photo + Title + Price side by side) */}
            <div className="md:hidden flex items-center gap-3.5 pb-4 border-b border-[#E8DCCF]/70">
              <div
                onClick={() => setShowFullPhoto(!showFullPhoto)}
                className="w-20 h-20 rounded-2xl overflow-hidden bg-[#F4ECE1] border border-[#E8DCCF] shadow-xs flex-shrink-0 relative cursor-pointer group"
                title="Toque para ampliar a foto"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#EADBC8]/60 text-[#9E5F28]">
                  {product.category}
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#332219] leading-tight mt-1 truncate">
                  {product.name}
                </h2>
                <span className="font-serif text-xl font-bold text-[#B87333] block mt-0.5">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>

            {/* Mobile Expanded Photo Dropdown (if tapped) */}
            {showFullPhoto && (
              <div className="md:hidden rounded-2xl overflow-hidden border border-[#E8DCCF] bg-black/5 animate-fade-in relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
                <button
                  onClick={() => setShowFullPhoto(false)}
                  className="absolute bottom-2 right-2 px-3 py-1 bg-black/70 text-white rounded-full text-[10px] font-medium"
                >
                  Recolher foto
                </button>
              </div>
            )}

            {/* DESKTOP HEADER (Title + Category + Price) */}
            <div className="hidden md:block">
              <span className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#F4ECE1] text-[#9E5F28]">
                {product.category}
              </span>
              <div className="flex items-baseline justify-between gap-3 mt-2">
                <h2 className="font-serif text-3xl font-bold text-[#332219]">
                  {product.name}
                </h2>
                <span className="font-serif text-2xl font-bold text-[#B87333] whitespace-nowrap">
                  {product.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>

            {/* Subtitle & Description */}
            <div>
              {product.subtitle && (
                <p className="text-xs font-medium text-[#B87333] mb-1">
                  {product.subtitle}
                </p>
              )}
              <p className="text-xs sm:text-sm text-[#6E5D53] leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications summary (compact) */}
            {product.details && product.details.length > 0 && (
              <div className="bg-white/80 p-3 sm:p-3.5 rounded-2xl border border-[#E8DCCF]/70">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#332219] uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#B87333]" />
                  <span>Detalhes do Produto</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] sm:text-xs text-[#6E5D53]">
                  {product.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-[#B87333] flex-shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SCENT SELECTOR (Optimized for touch and spacious reading) */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-[#332219] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B87333]" />
                  <span>Escolha a Essência:</span>
                </label>
                {selectedScent && (
                  <span className="text-xs text-[#B87333] font-semibold">
                    {selectedScent.name}
                  </span>
                )}
              </div>

              {/* Scent Cards List */}
              <div className="space-y-2">
                {scents.map((scent) => {
                  const isSelected = selectedScent?.id === scent.id;
                  return (
                    <button
                      type="button"
                      key={scent.id}
                      onClick={() => scent.available && setSelectedScent(scent)}
                      disabled={!scent.available}
                      className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                        isSelected
                          ? "border-[#B87333] bg-white ring-2 ring-[#B87333]/25 shadow-xs"
                          : scent.available
                          ? "border-[#E8DCCF] bg-white/60 hover:bg-white hover:border-[#B87333]/40"
                          : "border-gray-200 opacity-50 bg-gray-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                              isSelected
                                ? "border-[#B87333] bg-[#B87333] text-white"
                                : "border-[#E8DCCF] bg-white"
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span
                            className={`text-xs sm:text-sm font-bold ${
                              isSelected ? "text-[#332219]" : "text-[#543D32]"
                            }`}
                          >
                            {scent.name}
                          </span>
                        </div>

                        {scent.tags && scent.tags.length > 0 && (
                          <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#9E5F28] border border-[#E8DCCF]/60">
                            {scent.tags[0]}
                          </span>
                        )}
                      </div>

                      {scent.description && (
                        <p className="text-[11px] text-[#6E5D53] pl-6 leading-relaxed">
                          {scent.description}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Share link button */}
            <div className="pt-2 text-center">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#6E5D53] hover:text-[#B87333] transition-colors py-1 px-3 rounded-full hover:bg-white/60"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Encaminhar esta vela para alguém especial</span>
              </a>
            </div>
          </div>

          {/* STICKY BOTTOM ACTION BAR (Always visible at thumb reach on mobile and desktop) */}
          <div className="fixed md:static bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md p-3.5 sm:p-5 border-t border-[#E8DCCF] z-40 shadow-lg md:shadow-none flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#E8DCCF] rounded-2xl px-2.5 py-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-xl bg-white text-[#332219] hover:bg-[#EADBC8] flex items-center justify-center transition-colors cursor-pointer text-xs shadow-2xs"
                aria-label="Diminuir"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-5 text-center text-sm font-bold text-[#332219]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 rounded-xl bg-white text-[#332219] hover:bg-[#EADBC8] flex items-center justify-center transition-colors cursor-pointer text-xs shadow-2xs"
                aria-label="Aumentar"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Submit Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.available || !selectedScent}
              className={`flex-1 py-3.5 px-4 rounded-2xl font-semibold text-xs sm:text-sm flex items-center justify-between transition-all duration-200 cursor-pointer shadow-md active:scale-98 ${
                addedSuccess
                  ? "bg-[#25D366] text-white"
                  : "bg-[#B87333] hover:bg-[#9E5F28] text-white hover:shadow-lg"
              }`}
            >
              <div className="flex items-center gap-2">
                {addedSuccess ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                <span>{addedSuccess ? "Adicionada à Sacola!" : "Adicionar à Sacola"}</span>
              </div>
              <span className="font-bold text-sm sm:text-base">
                {totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
