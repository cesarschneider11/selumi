"use client";

import React from "react";
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    cartTotal,
    cartCount,
    updateQuantity,
    removeFromCart,
    openCheckout,
  } = useCatalog();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-2xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-[#FAF7F2] h-full shadow-2xl flex flex-col z-10 border-l border-[#E8DCCF]">
        {/* Header */}
        <div className="p-5 border-b border-[#E8DCCF] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#F4ECE1] text-[#B87333] flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-xl font-semibold text-[#332219]">
                Sua Sacola de Afeto
              </h2>
              <span className="text-xs text-[#9C8A7E]">
                {cartCount === 1 ? "1 vela selecionada" : `${cartCount} velas selecionadas`}
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-8 h-8 rounded-full hover:bg-[#F4ECE1] text-[#6E5D53] hover:text-[#332219] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Fechar sacola"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#6E5D53]">
              <div className="w-16 h-16 rounded-full bg-[#F4ECE1] flex items-center justify-center text-[#B87333] mb-4">
                <ShoppingBag className="w-7 h-7 stroke-[1.5]" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#332219] mb-1">
                Sua sacola está vazia
              </h3>
              <p className="text-xs text-[#9C8A7E] max-w-xs mb-6">
                Escolha suas velas artesanais favoritas e sinta a experiência de acolhimento da Selumi.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="bg-[#B87333] hover:bg-[#9E5F28] text-white text-xs font-medium px-6 py-3 rounded-full transition-colors shadow-xs cursor-pointer"
              >
                Explorar Velas
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-3.5 border border-[#E8DCCF]/80 flex gap-3.5 shadow-2xs transition-all hover:border-[#B87333]/30"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#F4ECE1] flex-shrink-0">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-base font-semibold text-[#332219]">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                        title="Remover vela"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="inline-flex items-center gap-1 text-[11px] text-[#9E5F28] bg-[#F4ECE1] px-2 py-0.5 rounded-md font-medium mt-0.5">
                      <Sparkles className="w-2.5 h-2.5" />
                      <span className="truncate max-w-[170px]">{item.scent.name}</span>
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2 bg-[#FAF7F2] border border-[#E8DCCF] rounded-full px-2 py-0.5">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-5 h-5 rounded-full bg-white text-[#332219] hover:bg-[#EADBC8] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Diminuir"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-semibold w-4 text-center text-[#332219]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-5 h-5 rounded-full bg-white text-[#332219] hover:bg-[#EADBC8] flex items-center justify-center transition-colors cursor-pointer"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="text-sm font-semibold text-[#332219]">
                        {item.totalPrice.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div className="p-5 bg-white border-t border-[#E8DCCF] space-y-3">
            <div className="space-y-1.5 text-xs text-[#6E5D53]">
              <div className="flex items-center justify-between">
                <span>Subtotal dos itens</span>
                <span className="font-medium text-[#332219]">
                  {cartTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Taxa de entrega</span>
                <span className="text-[#9E5F28] font-medium">A combinar no WhatsApp</span>
              </div>
            </div>

            <div className="pt-2 border-t border-[#F4ECE1] flex items-baseline justify-between">
              <span className="font-serif text-lg font-bold text-[#332219]">Total</span>
              <span className="font-serif text-2xl font-bold text-[#B87333]">
                {cartTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>

            <p className="text-[11px] text-[#9C8A7E] text-center">
              Ao avançar, seu pedido será finalizado diretamente no WhatsApp da Selumi com todo carinho.
            </p>

            <button
              onClick={openCheckout}
              className="w-full bg-[#B87333] hover:bg-[#9E5F28] text-white py-3.5 px-5 rounded-2xl font-medium text-sm flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
            >
              <span>Avançar para Finalização</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
