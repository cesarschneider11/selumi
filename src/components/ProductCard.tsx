"use client";

import React from "react";
import { Product } from "@/types";
import { Sparkles, Check, Flame, AlertCircle } from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { openProductModal, cart } = useCatalog();

  const isBestSeller = Boolean(product.isBestSeller || product.featured);

  // Check if product is in cart
  const itemsInCartCount = cart
    .filter((item) => item.product.id === product.id)
    .reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="group relative bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#E8DCCF]/80 hover:border-[#B87333]/40 transition-all duration-300 hover:shadow-lg flex flex-col justify-between">
      {/* Product Image Container */}
      <div
        className="relative w-full aspect-[4/5] sm:aspect-square overflow-hidden bg-[#F4ECE1] cursor-pointer"
        onClick={() => openProductModal(product)}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className={`w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 ${
            !product.available ? "grayscale-30 opacity-85" : ""
          }`}
          loading="lazy"
        />

        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges (Left: Category, Right: Best Seller / In Cart / Out of Stock) */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          <span className="text-[11px] font-medium tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#FAF7F2]/90 backdrop-blur-xs text-[#332219] border border-[#E8DCCF]/60 shadow-2xs">
            {product.category}
          </span>
          {isBestSeller && product.available && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full bg-gradient-to-r from-[#B87333] to-[#9E5F28] text-white shadow-md animate-fade-in tracking-wide">
              <Flame className="w-3 h-3 fill-amber-200 text-amber-200" />
              <span>+ Vendida</span>
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end">
          {/* Out of Stock badge */}
          {!product.available && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red-600 text-white shadow-md">
              <AlertCircle className="w-3 h-3" />
              <span>Em Falta</span>
            </span>
          )}

          {/* Status / In Cart Badge */}
          {itemsInCartCount > 0 && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-[#332219] text-white shadow-xs">
              <Check className="w-3 h-3 stroke-[3]" />
              <span>{itemsInCartCount} na sacola</span>
            </span>
          )}
        </div>

        {!product.available && (
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] flex items-center justify-center p-4">
            <span className="text-xs font-bold uppercase tracking-wider px-4 py-2 bg-white/95 text-[#332219] rounded-full shadow-lg border border-[#E8DCCF] text-center">
              Temporariamente em Falta
            </span>
          </div>
        )}

        {/* Quick View Pill on Hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 hidden sm:flex items-center justify-center py-2 rounded-xl bg-[#FAF7F2]/95 backdrop-blur-xs text-[#332219] text-xs font-medium border border-[#E8DCCF]">
          <span>{product.available ? "Toque para ver detalhes e aromas" : "Toque para ver detalhes da peça"}</span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3
                onClick={() => openProductModal(product)}
                className="font-serif text-2xl font-semibold text-[#332219] group-hover:text-[#B87333] transition-colors cursor-pointer"
              >
                {product.name}
              </h3>
            </div>
            <span className="text-lg font-semibold text-[#B87333] whitespace-nowrap">
              {product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </span>
          </div>

          {product.subtitle && (
            <p className="text-xs text-[#B87333]/90 font-medium mb-2.5">
              {product.subtitle}
            </p>
          )}

          <p className="text-xs sm:text-sm text-[#6E5D53] line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-[#F4ECE1]">
          {product.available ? (
            <button
              onClick={() => openProductModal(product)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer bg-[#F4ECE1] hover:bg-[#B87333] text-[#332219] hover:text-white shadow-2xs hover:shadow active:scale-98"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Escolher Aroma & Personalizar</span>
            </button>
          ) : (
            <button
              onClick={() => openProductModal(product)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              <AlertCircle className="w-3.5 h-3.5 text-red-500" />
              <span>Em Falta • Ver Detalhes</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
