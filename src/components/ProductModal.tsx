"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Minus, Sparkles, Check, Flame, ChevronRight, Wind, Share2, AlertCircle } from "lucide-react";
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
  const isBestSeller = Boolean(product.isBestSeller || product.featured);
  const totalPrice = product.price * quantity;

  const handleAddToCart = () => {
    if (!product.available || !selectedScent || !selectedScent.available) return;
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
            className={`w-full h-full object-cover object-center ${!product.available ? "grayscale-30 opacity-90" : ""}`}
          />
          {isBestSeller && product.available && (
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-[#B87333] to-[#9E5F28] text-white shadow-lg">
                <Flame className="w-3.5 h-3.5 fill-amber-200 text-amber-200" />
                <span>Mais Vendida</span>
              </span>
            </div>
          )}
          {!product.available && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4">
              <span className="text-xs font-bold uppercase tracking-wider px-4 py-2 bg-white text-red-700 rounded-full shadow-lg border border-red-200">
                Em Falta no Momento
              </span>
            </div>
          )}
        </div>

        {/* --- MAIN CONTENT & MOBILE LAYOUT --- */}
        <div className="w-full md:w-7/12 flex flex-col justify-between overflow-y-auto">
          {/* Scrollable body */}
          <div className="p-5 sm:p-7 space-y-4 pb-24 md:pb-6">
            {/* Banner if Product is Out of Stock */}
            {!product.available && (
              <div className="p-3.5 bg-red-50/90 border border-red-200 rounded-2xl flex items-center gap-2.5 text-xs text-red-800 animate-fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                <div>
                  <strong className="block font-semibold">Vela Temporariamente em Falta</strong>
                  <span className="text-[11px] text-red-700">Novos pedidos para este modelo estão pausados no momento.</span>
                </div>
              </div>
            )}

            {/* MOBILE COMPACT HEADER (Photo + Title + Price side by side) */}
            <div className="md:hidden flex items-center gap-3.5 pb-3 border-b border-[#E8DCCF]/70">
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
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#EADBC8]/60 text-[#9E5F28]">
                    {product.category}
                  </span>
                  {isBestSeller && product.available && (
                    <span className="inline-flex items-center gap-0.5 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#B87333] text-white">
                      <Flame className="w-2.5 h-2.5 fill-amber-200 text-amber-200" />
                      <span>+ Vendida</span>
                    </span>
                  )}
                  {!product.available && (
                    <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                      Em Falta
                    </span>
                  )}
                </div>
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
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#F4ECE1] text-[#9E5F28]">
                  {product.category}
                </span>
                {isBestSeller && product.available && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#B87333] text-white">
                    <Flame className="w-3 h-3 fill-amber-200 text-amber-200" />
                    <span>+ Vendida</span>
                  </span>
                )}
                {!product.available && (
                  <span className="text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                    Em Falta
                  </span>
                )}
              </div>
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
                  <span className={`text-xs font-semibold ${selectedScent.available ? "text-[#B87333]" : "text-red-600"}`}>
                    {selectedScent.name} {!selectedScent.available && "(Em falta)"}
                  </span>
                )}
              </div>

              {/* Scent Cards List */}
              <div className="space-y-2">
                {scents.map((scent) => {
                  const isSelected = selectedScent?.id === scent.id;
                  const isScentBestSeller = Boolean(scent.isBestSeller);
                  return (
                    <button
                      type="button"
                      key={scent.id}
                      onClick={() => scent.available && setSelectedScent(scent)}
                      disabled={!scent.available}
                      className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                        !scent.available
                          ? "border-red-200/80 bg-red-50/40 opacity-70 cursor-not-allowed"
                          : isSelected
                          ? "border-[#B87333] bg-white ring-2 ring-[#B87333]/25 shadow-xs cursor-pointer"
                          : "border-[#E8DCCF] bg-white/60 hover:bg-white hover:border-[#B87333]/40 cursor-pointer"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors flex-shrink-0 ${
                              !scent.available
                                ? "border-red-300 bg-red-100"
                                : isSelected
                                ? "border-[#B87333] bg-[#B87333] text-white"
                                : "border-[#E8DCCF] bg-white"
                            }`}
                          >
                            {isSelected && scent.available && (
                              <span className="w-1.5 h-1.5 rounded-full bg-white" />
                            )}
                          </div>
                          <span
                            className={`text-xs sm:text-sm font-bold truncate ${
                              !scent.available
                                ? "text-gray-500 line-through"
                                : isSelected
                                ? "text-[#332219]"
                                : "text-[#543D32]"
                            }`}
                          >
                            {scent.name}
                          </span>
                        </div>

                        {/* Badges: Best Seller, Out of stock, Category tag */}
                        <div className="flex items-center gap-1.5 flex-shrink-0">
                          {!scent.available ? (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-red-600 text-white shadow-2xs">
                              Em Falta
                            </span>
                          ) : (
                            <>
                              {isScentBestSeller && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-gradient-to-r from-[#B87333] to-[#9E5F28] text-white shadow-2xs">
                                  <Flame className="w-2.5 h-2.5 fill-amber-200 text-amber-200" />
                                  <span>+ Vendida</span>
                                </span>
                              )}
                              {scent.tags && scent.tags.length > 0 && (
                                <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#9E5F28] border border-[#E8DCCF]/60">
                                  {scent.tags.find((t) => t.toLowerCase() !== "+ vendida" && t.toLowerCase() !== "mais vendida") || scent.tags[0]}
                                </span>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      {scent.description && (
                        <p className={`text-[11px] pl-6 leading-relaxed ${!scent.available ? "text-gray-400" : "text-[#6E5D53]"}`}>
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
                disabled={!product.available}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-7 h-7 rounded-xl bg-white text-[#332219] hover:bg-[#EADBC8] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer text-xs shadow-2xs"
                aria-label="Diminuir"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-5 text-center text-sm font-bold text-[#332219]">
                {quantity}
              </span>
              <button
                type="button"
                disabled={!product.available}
                onClick={() => setQuantity((q) => q + 1)}
                className="w-7 h-7 rounded-xl bg-white text-[#332219] hover:bg-[#EADBC8] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors cursor-pointer text-xs shadow-2xs"
                aria-label="Aumentar"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Add to Cart Submit Button */}
            {product.available ? (
              <button
                onClick={handleAddToCart}
                disabled={!selectedScent || !selectedScent.available}
                className={`flex-1 py-3.5 px-4 rounded-2xl font-semibold text-xs sm:text-sm flex items-center justify-between transition-all duration-200 cursor-pointer shadow-md active:scale-98 ${
                  addedSuccess
                    ? "bg-[#25D366] text-white"
                    : !selectedScent || !selectedScent.available
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-[#B87333] hover:bg-[#9E5F28] text-white hover:shadow-lg"
                }`}
              >
                <div className="flex items-center gap-2">
                  {addedSuccess ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                  <span>
                    {addedSuccess
                      ? "Adicionada à Sacola!"
                      : !selectedScent || !selectedScent.available
                      ? "Selecione um aroma disponível"
                      : "Adicionar à Sacola"}
                  </span>
                </div>
                <span className="font-bold text-sm sm:text-base">
                  {totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </button>
            ) : (
              <button
                disabled
                className="flex-1 py-3.5 px-4 rounded-2xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200"
              >
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span>Vela em Falta no Momento</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
