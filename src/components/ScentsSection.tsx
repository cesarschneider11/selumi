"use client";

import React from "react";
import { Sparkles, Wind, Flame, AlertCircle } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";

export const ScentsSection: React.FC = () => {
  const { scents } = useCatalog();

  // Essências mais vendidas aparecem primeiro
  const sortedScents = [...scents].sort((a, b) => {
    const aBest = Boolean(a.isBestSeller);
    const bBest = Boolean(b.isBestSeller);

    if (aBest && !bBest) return -1;
    if (!aBest && bBest) return 1;

    if (a.available && !b.available) return -1;
    if (!a.available && b.available) return 1;

    return 0;
  });

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
          {sortedScents.map((scent) => {
            const isBest = Boolean(scent.isBestSeller);
            const isAvailable = scent.available;
            const categoryTag = scent.tags?.find((t) => t.toLowerCase() !== "+ vendida" && t.toLowerCase() !== "mais vendida") || scent.tags?.[0];

            return (
              <div
                key={scent.id}
                className={`bg-white rounded-2xl p-6 border transition-all duration-300 hover:shadow-md flex flex-col justify-between ${
                  !isAvailable
                    ? "border-red-200/70 bg-red-50/20 opacity-80"
                    : isBest
                    ? "border-[#B87333]/50 shadow-2xs hover:border-[#B87333]"
                    : "border-[#E8DCCF]/80 hover:border-[#B87333]/40"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#F4ECE1] text-[#B87333] flex items-center justify-center">
                        <Wind className="w-4 h-4 stroke-[1.8]" />
                      </div>
                      {isBest && isAvailable && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-[#B87333] to-[#9E5F28] text-white shadow-2xs">
                          <Flame className="w-2.5 h-2.5 fill-amber-200 text-amber-200" />
                          <span>+ Vendida</span>
                        </span>
                      )}
                      {!isAvailable && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                          <AlertCircle className="w-2.5 h-2.5" />
                          <span>Em Falta</span>
                        </span>
                      )}
                    </div>

                    {categoryTag && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[#9E5F28] border border-[#E8DCCF]">
                        {categoryTag}
                      </span>
                    )}
                  </div>

                  <h3 className={`font-serif text-xl font-semibold mb-2 ${!isAvailable ? "text-gray-600 line-through" : "text-[#332219]"}`}>
                    {scent.name}
                  </h3>

                  <p className={`text-xs leading-relaxed mb-4 ${!isAvailable ? "text-gray-400" : "text-[#6E5D53]"}`}>
                    {scent.description}
                  </p>
                </div>

                {scent.tags && scent.tags.length > 1 && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#F4ECE1]">
                    {scent.tags
                      .filter((t) => t.toLowerCase() !== "+ vendida" && t.toLowerCase() !== "mais vendida")
                      .map((tag, idx) => (
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
            );
          })}
        </div>
      </div>
    </section>
  );
};
