"use client";

import React from "react";
import { Sparkles, Wind } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";

export const ScentsSection: React.FC = () => {
  const { scents } = useCatalog();

  return (
    <section id="essencias" className="py-16 md:py-24 bg-[#FAF7F2]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EADBC8]/40 border border-[#E8DCCF] text-xs font-semibold uppercase tracking-wider text-[#9E5F28] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B87333]" />
            <span>Alquimia Olfativa</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#332219] mb-4">
            Nossos Aromas que Acolhem
          </h2>
          <p className="text-sm sm:text-base text-[#6E5D53] font-light leading-relaxed">
            Cada aroma foi formulado para evocar sensações de tranquilidade, calor e aconchego. Você escolhe a sua
            essência favorita ao personalizar qualquer modelo da nossa coleção.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {scents.map((scent) => (
            <div
              key={scent.id}
              className="bg-white rounded-2xl p-6 border border-[#E8DCCF]/80 hover:border-[#B87333]/40 transition-all duration-300 hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#F4ECE1] text-[#B87333] flex items-center justify-center">
                    <Wind className="w-4 h-4 stroke-[1.8]" />
                  </div>
                  {scent.tags && scent.tags.length > 0 && (
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#9E5F28] border border-[#E8DCCF]">
                      {scent.tags[0]}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-xl font-semibold text-[#332219] mb-2">
                  {scent.name}
                </h3>

                <p className="text-xs text-[#6E5D53] leading-relaxed mb-4">
                  {scent.description}
                </p>
              </div>

              {scent.tags && scent.tags.length > 1 && (
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#F4ECE1]">
                  {scent.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-[#FAF7F2] text-[#6E5D53]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
