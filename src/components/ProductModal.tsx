"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Minus, Sparkles, Check, Flame, Info } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";
import { Scent } from "@/types";

export const ProductModal: React.FC = () => {
  const { selectedProductForModal, closeProductModal, scents, addToCart } = useCatalog();
  const [selectedScent, setSelectedScent] = useState<Scent | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Set default available scent when modal opens
  useEffect(() => {
    if (selectedProductForModal) {
      setQuantity(1);
      setAddedSuccess(false);
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
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fade-in">
      <div
        className="fixed inset-0"
        onClick={closeProductModal}
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-3xl shadow-2xl overflow-hidden border border-[#E8DCCF] z-10 my-auto flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#FAF7F2]/90 backdrop-blur-xs border border-[#E8DCCF] text-[#332219] hover:bg-[#332219] hover:text-[#FAF7F2] transition-colors flex items-center justify-center shadow-xs cursor-pointer"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Left / Top Image */}
        <div className="w-full md:w-1/2 bg-[#F4ECE1] relative min-h-[260px] md:min-h-full">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:hidden" />
          <div className="absolute bottom-4 left-4 z-10 md:hidden">
            <span className="text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#FAF7F2]/90 text-[#332219]">
              {product.category}
            </span>
            <h2 className="font-serif text-2xl font-bold text-white mt-1">
              {product.name}
            </h2>
          </div>
        </div>

        {/* Modal Right / Details */}
        <div className="w-full md:w-1/2 p-6 sm:p-7 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="hidden md:block">
              <span className="text-xs font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#F4ECE1] text-[#9E5F28]">
                {product.category}
              </span>
              <h2 className="font-serif text-3xl font-semibold text-[#332219] mt-2">
                {product.name}
              </h2>
            </div>

            {product.subtitle && (
              <p className="text-xs text-[#B87333] font-medium mt-1">
                {product.subtitle}
              </p>
            )}

            <div className="mt-2.5 mb-4">
              <span className="text-2xl font-semibold text-[#B87333]">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#6E5D53] leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Technical details list */}
            {product.details && product.details.length > 0 && (
              <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-[#E8DCCF]/70 mb-5">
                <span className="text-[11px] font-semibold text-[#332219] uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-[#B87333]" />
                  Especificações da Vela
                </span>
                <ul className="space-y-1.5 text-xs text-[#6E5D53]">
                  {product.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B87333] mt-1.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Scent Selector */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-[#332219] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B87333]" />
                  <span>Escolha a Essência:</span>
                </label>
                {selectedScent && (
                  <span className="text-xs text-[#B87333] font-medium">
                    {selectedScent.name}
                  </span>
                )}
              </div>

              {scents.length === 0 ? (
                <p className="text-xs text-gray-500 italic">Nenhuma essência cadastrada.</p>
              ) : (
                <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                  {scents.map((scent) => {
                    const isSelected = selectedScent?.id === scent.id;
                    return (
                      <div
                        key={scent.id}
                        onClick={() => scent.available && setSelectedScent(scent)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer text-left ${
                          isSelected
                            ? "border-[#B87333] bg-[#F4ECE1]/60 shadow-xs ring-1 ring-[#B87333]"
                            : scent.available
                            ? "border-[#E8DCCF] hover:border-[#B87333]/50 hover:bg-[#FAF7F2]"
                            : "border-gray-200 opacity-50 cursor-not-allowed bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-semibold ${isSelected ? "text-[#332219]" : "text-[#6E5D53]"}`}>
                            {scent.name}
                          </span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-[#B87333] text-white flex items-center justify-center text-[10px]">
                              ✓
                            </span>
                          )}
                        </div>
                        {scent.description && (
                          <p className="text-[11px] text-[#6E5D53] mt-1 leading-tight line-clamp-2">
                            {scent.description}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center justify-between pt-2 border-t border-[#F4ECE1] mb-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#332219]">
                Quantidade
              </span>
              <div className="flex items-center gap-3 bg-[#FAF7F2] border border-[#E8DCCF] rounded-full px-2 py-1">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-7 h-7 rounded-full bg-white text-[#332219] hover:bg-[#EADBC8] flex items-center justify-center transition-colors cursor-pointer text-xs"
                  aria-label="Diminuir quantidade"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-sm font-semibold text-[#332219]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-7 h-7 rounded-full bg-white text-[#332219] hover:bg-[#EADBC8] flex items-center justify-center transition-colors cursor-pointer text-xs"
                  aria-label="Aumentar quantidade"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleAddToCart}
              disabled={!product.available || !selectedScent}
              className={`w-full py-3.5 px-6 rounded-2xl font-medium text-sm flex items-center justify-between transition-all duration-200 cursor-pointer shadow-md active:scale-98 ${
                addedSuccess
                  ? "bg-[#25D366] text-white"
                  : "bg-[#B87333] hover:bg-[#9E5F28] text-white hover:shadow-lg"
              }`}
            >
              <div className="flex items-center gap-2">
                {addedSuccess ? <Check className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                <span>{addedSuccess ? "Adicionada à Sacola!" : "Adicionar à Sacola"}</span>
              </div>
              <span className="font-semibold">
                {totalPrice.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </button>

            {/* Share product button */}
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `🕯️ Olha que linda essa vela da Selumi: *${product.name}* (${product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}) — ${product.subtitle || "Vela artesanal em cera vegetal"}. Dá uma olhada no catálogo digital: ${typeof window !== "undefined" ? window.location.origin : ""}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl text-xs text-[#6E5D53] hover:text-[#332219] hover:bg-[#F4ECE1] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Encaminhar esta vela para alguém especial ✨</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
