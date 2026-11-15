"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "Do que são feitas as velas da Selumi?",
    answer:
      "Nossas velas são produzidas com um blend exclusivo de cera 100% vegetal (soja e coco), totalmente livre de parafina e derivados de petróleo. Os pavios são 100% de algodão trançado puro e as essências são premium, garantindo uma queima saudável e limpa.",
  },
  {
    question: "Como funciona a escolha do aroma/essência?",
    answer:
      "Você escolhe o modelo de vela que mais gostar e, ao clicar nela, seleciona a essência que mais toca seus sentidos (como Baunilha & Tonka, Lavanda Francesa, Flor de Cerejeira, etc.). Todas as velas são produzidas com a fragrância que você escolher.",
  },
  {
    question: "Vocês fazem encomendas personalizadas para casamentos, festas ou empresas?",
    answer:
      "Sim! Adoramos criar momentos memoráveis. Produzimos lembrancinhas personalizadas com rótulos e aromas exclusivos para casamentos, maternidade, aniversários e presentes corporativos. Basta conversar conosco pelo WhatsApp clicando no botão 'Fale Conosco'.",
  },
  {
    question: "Como é calculada a entrega e o frete?",
    answer:
      "Ao finalizar seu pedido no catálogo, você será direcionado ao nosso WhatsApp oficial com o resumo pronto. Lá combinamos a melhor forma de entrega (envio ou retirada presencial) e informamos o valor exato de forma clara e ágil.",
  },
  {
    question: "Quais as formas de pagamento?",
    answer:
      "Trabalhamos com chave PIX (enviada diretamente na confirmação do pedido no WhatsApp) e dinheiro na entrega ou retirada presencial. Em breve disponibilizaremos também pagamento por cartão de crédito.",
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { getWhatsAppSupportLink } = useCatalog();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-16 md:py-24 bg-[#F4ECE1]/40 border-t border-[#E8DCCF]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EADBC8]/50 border border-[#E8DCCF] text-xs font-semibold uppercase tracking-wider text-[#9E5F28] mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-[#B87333]" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#332219] mb-3">
            Perguntas Frequentes
          </h2>
          <p className="text-xs sm:text-sm text-[#6E5D53] max-w-md mx-auto">
            Tudo o que você precisa saber sobre o processo de produção, entregas e cuidados artesanais.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-[#E8DCCF] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF7F2]/50 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-semibold text-[#332219]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#F4ECE1] text-[#B87333] flex items-center justify-center transition-transform duration-300 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#6E5D53] leading-relaxed border-t border-[#F4ECE1] animate-fade-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Callout */}
        <div className="mt-10 p-6 bg-white rounded-3xl border border-[#E8DCCF] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs text-center sm:text-left">
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#332219]">
              Ainda tem alguma dúvida?
            </h4>
            <p className="text-xs text-[#6E5D53] mt-0.5">
              Estamos prontos para atender você com todo o carinho pelo WhatsApp.
            </p>
          </div>
          <a
            href={getWhatsAppSupportLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#1ebd59] text-white px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Chamar no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
