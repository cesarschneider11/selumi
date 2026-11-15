"use client";

import React, { useState } from "react";
import { X, Send, CreditCard, Banknote, QrCode, Lock, Sparkles, MessageCircle, AlertCircle } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";
import { PaymentMethod } from "@/types";

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, closeCheckout, cart, cartTotal, submitOrder, config } = useCatalog();

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("pix");
  const [notes, setNotes] = useState("");
  const [validationError, setValidationError] = useState("");

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setValidationError("Por favor, informe seu nome para identificarmos seu pedido.");
      return;
    }

    setValidationError("");
    submitOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      paymentMethod,
      notes: notes.trim(),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="fixed inset-0" onClick={closeCheckout} aria-hidden="true" />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E8DCCF] z-10 my-auto">
        {/* Header */}
        <div className="p-6 bg-[#FAF7F2] border-b border-[#E8DCCF] flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#B87333] block mb-1">
              Finalização Simples & Sem Cadastro
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#332219]">
              Quase lá... Seu pedido de afeto
            </h2>
          </div>

          <button
            onClick={closeCheckout}
            className="w-9 h-9 rounded-full bg-white border border-[#E8DCCF] text-[#6E5D53] hover:text-[#332219] flex items-center justify-center transition-colors cursor-pointer shadow-xs"
            aria-label="Fechar checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          {validationError && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Customer Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1.5">
              Seu Nome Completo <span className="text-[#B87333]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex: Maria Clara Santos"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#E8DCCF] focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] outline-hidden text-sm bg-[#FAF7F2]/50 text-[#332219]"
            />
          </div>

          {/* Customer WhatsApp */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1.5">
              Seu WhatsApp (Opcional)
            </label>
            <input
              type="tel"
              placeholder="(DDD) 99999-9999"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#E8DCCF] focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] outline-hidden text-sm bg-[#FAF7F2]/50 text-[#332219]"
            />
            <span className="text-[11px] text-[#9C8A7E] mt-1 block">
              Usado apenas para nos comunicarmos sobre a entrega do seu pedido.
            </span>
          </div>

          {/* Payment Method Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-2.5">
              Forma de Pagamento
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* PIX */}
              <label
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === "pix"
                    ? "border-[#B87333] bg-[#F4ECE1]/60 ring-1 ring-[#B87333]"
                    : "border-[#E8DCCF] hover:border-[#B87333]/50 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pix"
                  checked={paymentMethod === "pix"}
                  onChange={() => setPaymentMethod("pix")}
                  className="mt-1 text-[#B87333] focus:ring-[#B87333]"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#332219]">
                    <QrCode className="w-3.5 h-3.5 text-[#B87333]" />
                    <span>PIX</span>
                  </div>
                  <p className="text-[11px] text-[#6E5D53] mt-0.5 leading-snug">
                    Chave e confirmação rápida pelo WhatsApp.
                  </p>
                </div>
              </label>

              {/* Dinheiro */}
              <label
                className={`p-3.5 rounded-2xl border cursor-pointer flex items-start gap-3 transition-all ${
                  paymentMethod === "cash"
                    ? "border-[#B87333] bg-[#F4ECE1]/60 ring-1 ring-[#B87333]"
                    : "border-[#E8DCCF] hover:border-[#B87333]/50 bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="mt-1 text-[#B87333] focus:ring-[#B87333]"
                />
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#332219]">
                    <Banknote className="w-3.5 h-3.5 text-[#B87333]" />
                    <span>Dinheiro</span>
                  </div>
                  <p className="text-[11px] text-[#6E5D53] mt-0.5 leading-snug">
                    Pagamento na entrega ou na retirada presencial.
                  </p>
                </div>
              </label>

              {/* Cartão / Mercado Pago - Em Breve */}
              <div className="p-3.5 rounded-2xl border border-gray-200 bg-gray-50/70 sm:col-span-2 flex items-center justify-between opacity-75">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-4 h-4 text-gray-400" />
                  <div>
                    <span className="text-xs font-semibold text-gray-600 block">
                      Cartão de Crédito / Mercado Pago
                    </span>
                    <span className="text-[11px] text-gray-400">
                      Integração de pagamento digital online.
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EADBC8] text-[#9E5F28]">
                  Em breve
                </span>
              </div>
            </div>
          </div>

          {/* Observations */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1.5">
              Observações, Endereço ou Detalhes Especiais
            </label>
            <textarea
              rows={2}
              placeholder="Ex: É para presente com cartãozinho; ou endereço para cálculo de entrega..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCCF] focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] outline-hidden text-sm bg-[#FAF7F2]/50 text-[#332219]"
            />
          </div>

          {/* Order Summary box */}
          <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DCCF] space-y-2">
            <div className="flex items-center justify-between text-xs text-[#6E5D53]">
              <span>Itens no pedido ({cart.length})</span>
              <span>{cartTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
            </div>
            <div className="pt-2 border-t border-[#E8DCCF]/60 flex items-baseline justify-between">
              <span className="font-serif text-base font-bold text-[#332219]">Valor Total</span>
              <span className="font-serif text-2xl font-bold text-[#B87333]">
                {cartTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </span>
            </div>
          </div>

          {/* WhatsApp notice */}
          <div className="p-3 bg-[#EADBC8]/30 rounded-xl border border-[#E8DCCF] flex items-start gap-2.5 text-xs text-[#6E5D53]">
            <MessageCircle className="w-4 h-4 text-[#25D366] flex-shrink-0 mt-0.5" />
            <p className="leading-snug">
              Ao clicar no botão abaixo, seu pedido será montado e abriremos o WhatsApp oficial da{" "}
              <strong>Selumi</strong> para confirmação imediata.
            </p>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            className="w-full bg-[#25D366] hover:bg-[#1ebd59] text-white py-4 px-6 rounded-2xl font-medium text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
          >
            <MessageCircle className="w-5 h-5 fill-white" />
            <span>Enviar Pedido para o WhatsApp</span>
          </button>
        </form>
      </div>
    </div>
  );
};
