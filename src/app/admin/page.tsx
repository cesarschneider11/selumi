"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Flame,
  Lock,
  LogOut,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Upload,
  Settings,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  Save,
  RotateCcw,
  Download,
  AlertTriangle,
  Eye,
  MessageCircle,
} from "lucide-react";
import { useCatalog } from "@/context/CatalogContext";
import { Product, Scent, StoreConfig } from "@/types";

export default function AdminPage() {
  const {
    products,
    scents,
    config,
    isAdminLoggedIn,
    loginAdmin,
    logoutAdmin,
    saveProduct,
    deleteProduct,
    saveScent,
    deleteScent,
    saveConfig,
    resetToDefaults,
    exportCatalogData,
    importCatalogData,
  } = useCatalog();

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Tab navigation
  const [activeTab, setActiveTab] = useState<"products" | "scents" | "settings" | "backup">("products");

  // Editing Product state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Editing Scent state
  const [editingScent, setEditingScent] = useState<Scent | null>(null);
  const [isScentModalOpen, setIsScentModalOpen] = useState(false);

  // Settings state
  const [tempConfig, setTempConfig] = useState<StoreConfig>(config);
  const [configSavedSuccess, setConfigSavedSuccess] = useState(false);

  // Notification feedback
  const [actionNotice, setActionNotice] = useState<string | null>(null);

  const showNotice = (msg: string) => {
    setActionNotice(msg);
    setTimeout(() => setActionNotice(null), 3000);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(username, password);
    if (!success) {
      setLoginError("Usuário ou senha incorretos. Verifique suas credenciais.");
    } else {
      setLoginError("");
      setTempConfig(config);
    }
  };

  // If not logged in, show Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-[#E8DCCF] shadow-xl text-center">
          <div className="w-14 h-14 rounded-full bg-[#EADBC8] text-[#B87333] flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Lock className="w-6 h-6 stroke-[1.8]" />
          </div>

          <span className="text-xs font-semibold uppercase tracking-widest text-[#B87333] block mb-1">
            Selumi — Luz que acolhe
          </span>
          <h1 className="font-serif text-3xl font-semibold text-[#332219] mb-2">
            Painel Administrativo
          </h1>
          <p className="text-xs text-[#6E5D53] mb-6">
            Acesso exclusivo para gerenciar produtos, preços, essências e WhatsApp da boutique.
          </p>

          {loginError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center justify-center gap-2">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1.5">
                Usuário
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Ex: selumi"
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCCF] text-sm bg-[#FAF7F2]/40 focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1.5">
                Senha
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-[#E8DCCF] text-sm bg-[#FAF7F2]/40 focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] outline-hidden"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#B87333] hover:bg-[#9E5F28] text-white py-3.5 px-6 rounded-xl font-medium text-sm transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer mt-2"
            >
              Acessar Painel
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#F4ECE1] text-center">
            <Link
              href="/"
              className="text-xs text-[#6E5D53] hover:text-[#B87333] transition-colors inline-flex items-center gap-1.5"
            >
              <span>← Voltar ao Catálogo Digital</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- Handlers for Products ---
  const handleOpenNewProduct = () => {
    setEditingProduct({
      id: `prod-${Date.now()}`,
      name: "",
      subtitle: "",
      price: 50.0,
      description: "",
      details: ["100% Cera Vegetal de Soja e Coco", "Pavio 100% algodão"],
      imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
      category: "Coleção Floral",
      available: true,
      featured: false,
    });
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (prod: Product) => {
    setEditingProduct({ ...prod });
    setIsProductModalOpen(true);
  };

  const handleSaveProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name.trim()) return;
    saveProduct(editingProduct);
    setIsProductModalOpen(false);
    showNotice(`Vela "${editingProduct.name}" salva com sucesso!`);
  };

  // Convert image file upload to base64 data url
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingProduct) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setEditingProduct({ ...editingProduct, imageUrl: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // --- Handlers for Scents ---
  const handleOpenNewScent = () => {
    setEditingScent({
      id: `scent-${Date.now()}`,
      name: "",
      description: "",
      tags: ["Aconchegante"],
      available: true,
    });
    setIsScentModalOpen(true);
  };

  const handleEditScent = (scent: Scent) => {
    setEditingScent({ ...scent });
    setIsScentModalOpen(true);
  };

  const handleSaveScentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingScent || !editingScent.name.trim()) return;
    saveScent(editingScent);
    setIsScentModalOpen(false);
    showNotice(`Essência "${editingScent.name}" salva com sucesso!`);
  };

  // --- Handlers for Settings ---
  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    saveConfig(tempConfig);
    setConfigSavedSuccess(true);
    showNotice("Configurações da loja atualizadas!");
    setTimeout(() => setConfigSavedSuccess(false), 2500);
  };

  // --- Handlers for Backup & Restore ---
  const handleDownloadBackup = () => {
    const jsonStr = exportCatalogData();
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `selumi_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showNotice("Backup baixado com sucesso!");
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        if (text) {
          const ok = importCatalogData(text);
          if (ok) {
            showNotice("Catálogo importado com sucesso!");
          } else {
            alert("Erro ao importar o arquivo. Verifique o formato do JSON.");
          }
        }
      };
      reader.readAsText(file);
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm("Tem certeza que deseja restaurar o catálogo para as 5 velas e essências originais da Selumi?")) {
      resetToDefaults();
      showNotice("Catálogo restaurado aos padrões originais!");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#332219]">
      {/* Admin Topbar */}
      <header className="bg-white border-b border-[#E8DCCF] sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#B87333] flex items-center justify-center text-white">
              <Flame className="w-4 h-4 fill-white" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wider text-[#332219]">
                SELUMI Admin
              </span>
              <span className="text-[10px] text-[#9E5F28] bg-[#F4ECE1] px-2 py-0.5 rounded-full font-semibold ml-2">
                Painel Ativo
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-[#6E5D53] hover:text-[#B87333] px-3 py-1.5 rounded-full border border-[#E8DCCF] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Ver Catálogo</span>
            </Link>

            <button
              onClick={logoutAdmin}
              className="text-xs text-red-600 hover:text-red-700 px-3 py-1.5 rounded-full border border-red-200 hover:bg-red-50 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Notice Banner */}
      {actionNotice && (
        <div className="bg-[#B87333] text-white text-xs py-2 px-4 text-center font-medium animate-fade-in shadow-xs flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#E8DCCF] pb-4 mb-8">
          <button
            onClick={() => setActiveTab("products")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "products"
                ? "bg-[#332219] text-white shadow-xs"
                : "bg-white text-[#6E5D53] border border-[#E8DCCF] hover:bg-[#FAF7F2]"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Velas & Produtos ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("scents")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "scents"
                ? "bg-[#332219] text-white shadow-xs"
                : "bg-white text-[#6E5D53] border border-[#E8DCCF] hover:bg-[#FAF7F2]"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Essências & Aromas ({scents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "settings"
                ? "bg-[#332219] text-white shadow-xs"
                : "bg-white text-[#6E5D53] border border-[#E8DCCF] hover:bg-[#FAF7F2]"
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>WhatsApp & Loja</span>
          </button>

          <button
            onClick={() => setActiveTab("backup")}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "backup"
                ? "bg-[#332219] text-white shadow-xs"
                : "bg-white text-[#6E5D53] border border-[#E8DCCF] hover:bg-[#FAF7F2]"
            }`}
          >
            <Download className="w-4 h-4" />
            <span>Backup & Restaurar</span>
          </button>
        </div>

        {/* TAB 1: PRODUCTS */}
        {activeTab === "products" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#332219]">
                  Gerenciamento de Velas
                </h2>
                <p className="text-xs text-[#6E5D53]">
                  Cadastre novos modelos, edite valores, fotos e disponibilidade de estoque.
                </p>
              </div>

              <button
                onClick={handleOpenNewProduct}
                className="bg-[#B87333] hover:bg-[#9E5F28] text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Nova Vela</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-[#E8DCCF] overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
                >
                  <div className="relative aspect-video bg-[#F4ECE1] overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/90 text-[#332219]">
                        {product.category}
                      </span>
                    </div>
                    <div className="absolute top-2.5 right-2.5">
                      <span
                        className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                          product.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {product.available ? "Em Estoque" : "Esgotada"}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-baseline justify-between gap-2 mb-1">
                        <h3 className="font-serif text-xl font-semibold text-[#332219]">
                          {product.name}
                        </h3>
                        <span className="text-base font-bold text-[#B87333]">
                          {product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-[#6E5D53] line-clamp-2 mb-3">
                        {product.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pt-3 border-t border-[#F4ECE1]">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="flex-1 py-2 px-3 rounded-lg bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#332219] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Editar</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Deseja realmente excluir a vela "${product.name}"?`)) {
                            deleteProduct(product.id);
                            showNotice(`Vela "${product.name}" removida.`);
                          }
                        }}
                        className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Excluir produto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SCENTS */}
        {activeTab === "scents" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#332219]">
                  Gerenciamento de Essências
                </h2>
                <p className="text-xs text-[#6E5D53]">
                  Configure as opções de aromas que os clientes podem selecionar para cada vela.
                </p>
              </div>

              <button
                onClick={handleOpenNewScent}
                className="bg-[#B87333] hover:bg-[#9E5F28] text-white px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Nova Essência</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {scents.map((scent) => (
                <div
                  key={scent.id}
                  className="bg-white rounded-2xl p-5 border border-[#E8DCCF] flex flex-col justify-between shadow-2xs"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase font-bold text-[#9E5F28] bg-[#F4ECE1] px-2 py-0.5 rounded-md">
                        {scent.tags?.[0] || "Aroma"}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          scent.available ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {scent.available ? "Ativa" : "Inativa"}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-[#332219] mb-1">
                      {scent.name}
                    </h3>

                    <p className="text-xs text-[#6E5D53] leading-relaxed mb-4">
                      {scent.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-3 border-t border-[#F4ECE1]">
                    <button
                      onClick={() => handleEditScent(scent)}
                      className="flex-1 py-1.5 px-3 rounded-lg bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#332219] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </button>

                    <button
                      onClick={() => {
                        if (window.confirm(`Deseja excluir a essência "${scent.name}"?`)) {
                          deleteScent(scent.id);
                          showNotice(`Essência "${scent.name}" removida.`);
                        }
                      }}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Excluir essência"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SETTINGS */}
        {activeTab === "settings" && (
          <div className="max-w-2xl bg-white rounded-3xl p-7 border border-[#E8DCCF] shadow-xs">
            <h2 className="font-serif text-2xl font-semibold text-[#332219] mb-1">
              Configurações Gerais & WhatsApp
            </h2>
            <p className="text-xs text-[#6E5D53] mb-6">
              Defina o número que recebe os pedidos, chave PIX e mensagens institucionais.
            </p>

            <form onSubmit={handleSaveConfig} className="space-y-5">
              {/* WhatsApp Number */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1.5 flex items-center gap-2">
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>Número de WhatsApp da Selumi (com DDI e DDD)</span>
                </label>
                <input
                  type="text"
                  required
                  value={tempConfig.whatsappNumber}
                  onChange={(e) =>
                    setTempConfig({ ...tempConfig, whatsappNumber: e.target.value })
                  }
                  placeholder="Ex: 5511999999999"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCCF] text-sm bg-[#FAF7F2]/40 focus:border-[#B87333] focus:ring-1 focus:ring-[#B87333] outline-hidden"
                />
                <span className="text-[11px] text-[#9C8A7E] mt-1 block">
                  Apenas números com DDI (55 para Brasil) e DDD. Exemplo: 5511987654321
                </span>
              </div>

              {/* Tagline */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1.5">
                  Slogan da Marca
                </label>
                <input
                  type="text"
                  value={tempConfig.tagline}
                  onChange={(e) => setTempConfig({ ...tempConfig, tagline: e.target.value })}
                  placeholder="Luz que acolhe"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCCF] text-sm bg-[#FAF7F2]/40 focus:border-[#B87333] outline-hidden"
                />
              </div>

              {/* PIX Key */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1.5">
                    Chave PIX
                  </label>
                  <input
                    type="text"
                    value={tempConfig.pixKey}
                    onChange={(e) => setTempConfig({ ...tempConfig, pixKey: e.target.value })}
                    placeholder="Chave PIX da loja"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCCF] text-sm bg-[#FAF7F2]/40 focus:border-[#B87333] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1.5">
                    Tipo de Chave
                  </label>
                  <input
                    type="text"
                    value={tempConfig.pixKeyType}
                    onChange={(e) =>
                      setTempConfig({ ...tempConfig, pixKeyType: e.target.value })
                    }
                    placeholder="E-mail / Telefone / CNPJ"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCCF] text-sm bg-[#FAF7F2]/40 focus:border-[#B87333] outline-hidden"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#F4ECE1]">
                <button
                  type="submit"
                  className="bg-[#B87333] hover:bg-[#9E5F28] text-white py-3 px-6 rounded-xl font-medium text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar Configurações</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: BACKUP */}
        {activeTab === "backup" && (
          <div className="max-w-2xl bg-white rounded-3xl p-7 border border-[#E8DCCF] shadow-xs space-y-6">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#332219] mb-1">
                Backup e Segurança dos Dados
              </h2>
              <p className="text-xs text-[#6E5D53]">
                Você pode exportar todos os produtos e configurações para um arquivo de segurança no seu
                computador ou restaurar quando desejar.
              </p>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DCCF] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-[#332219] uppercase tracking-wider">
                  Baixar Backup Completo (JSON)
                </h4>
                <p className="text-[11px] text-[#6E5D53]">
                  Gera um arquivo com todos os produtos, fotos, essências e configurações.
                </p>
              </div>
              <button
                onClick={handleDownloadBackup}
                className="bg-[#332219] hover:bg-[#4A3528] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Exportar Backup</span>
              </button>
            </div>

            <div className="p-4 bg-[#FAF7F2] rounded-2xl border border-[#E8DCCF] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-[#332219] uppercase tracking-wider">
                  Restaurar de um Arquivo de Backup
                </h4>
                <p className="text-[11px] text-[#6E5D53]">
                  Substitui os dados atuais pelos dados do arquivo JSON selecionado.
                </p>
              </div>
              <label className="bg-white hover:bg-[#F4ECE1] text-[#332219] border border-[#E8DCCF] px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap">
                <Upload className="w-3.5 h-3.5" />
                <span>Importar JSON</span>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
            </div>

            <div className="p-4 bg-red-50/60 rounded-2xl border border-red-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider">
                  Restaurar Catálogo Padrão Selumi
                </h4>
                <p className="text-[11px] text-red-600">
                  Restaura as 5 velas originais (Jardim, Rosa, Flor, Vidro pequeno e grande).
                </p>
              </div>
              <button
                onClick={handleResetDefaults}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Restaurar Originais</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- MODAL FOR EDITING / ADDING PRODUCT --- */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setIsProductModalOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E8DCCF] z-10 p-6 sm:p-7 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#F4ECE1]">
              <h3 className="font-serif text-2xl font-semibold text-[#332219]">
                {editingProduct.id ? "Editar Vela" : "Nova Vela"}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProductSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1">
                  Nome da Vela <span className="text-[#B87333]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  placeholder="Ex: Jardim"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCCF] text-sm bg-[#FAF7F2]/40 focus:border-[#B87333] outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1">
                    Preço (R$) <span className="text-[#B87333]">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={editingProduct.price}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCCF] text-sm bg-[#FAF7F2]/40 focus:border-[#B87333] outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1">
                    Categoria
                  </label>
                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, category: e.target.value })
                    }
                    placeholder="Ex: Coleção Floral"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCCF] text-sm bg-[#FAF7F2]/40 focus:border-[#B87333] outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1">
                  Subtítulo / Chamada Curta
                </label>
                <input
                  type="text"
                  value={editingProduct.subtitle || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, subtitle: e.target.value })
                  }
                  placeholder="Ex: Vela botânica esculpida em cera vegetal"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCCF] text-sm bg-[#FAF7F2]/40 focus:border-[#B87333] outline-hidden"
                />
              </div>

              {/* Photo Input (URL or Upload) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1">
                  Fotografia da Vela
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={editingProduct.imageUrl}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, imageUrl: e.target.value })
                    }
                    placeholder="Cole a URL da imagem ou envie abaixo"
                    className="flex-1 px-4 py-2 rounded-xl border border-[#E8DCCF] text-xs bg-[#FAF7F2]/40 focus:border-[#B87333] outline-hidden"
                  />
                  <label className="bg-[#FAF7F2] hover:bg-[#F4ECE1] text-[#332219] border border-[#E8DCCF] px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1 cursor-pointer whitespace-nowrap">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Foto</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {editingProduct.imageUrl && (
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-100 border border-[#E8DCCF]">
                    <img
                      src={editingProduct.imageUrl}
                      alt="Pré-visualização"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1">
                  Descrição Encantadora
                </label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCCF] text-sm bg-[#FAF7F2]/40 focus:border-[#B87333] outline-hidden"
                />
              </div>

              {/* Stock Switch */}
              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="prod-available"
                  checked={editingProduct.available}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, available: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#B87333] focus:ring-[#B87333]"
                />
                <label htmlFor="prod-available" className="text-xs font-semibold text-[#332219] cursor-pointer">
                  Produto Disponível para Pedidos (em estoque)
                </label>
              </div>

              <div className="pt-4 border-t border-[#F4ECE1] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-[#6E5D53] hover:bg-[#FAF7F2]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#B87333] hover:bg-[#9E5F28] text-white px-6 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-xs"
                >
                  Salvar Vela
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL FOR EDITING / ADDING SCENT --- */}
      {isScentModalOpen && editingScent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-fade-in">
          <div
            className="fixed inset-0"
            onClick={() => setIsScentModalOpen(false)}
            aria-hidden="true"
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-[#E8DCCF] z-10 p-6 sm:p-7">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#F4ECE1]">
              <h3 className="font-serif text-2xl font-semibold text-[#332219]">
                {editingScent.id ? "Editar Essência" : "Nova Essência"}
              </h3>
              <button
                onClick={() => setIsScentModalOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveScentSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1">
                  Nome da Essência <span className="text-[#B87333]">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={editingScent.name}
                  onChange={(e) => setEditingScent({ ...editingScent, name: e.target.value })}
                  placeholder="Ex: Baunilha Real & Fava Tonka"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCCF] text-sm bg-[#FAF7F2]/40 focus:border-[#B87333] outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#332219] mb-1">
                  Descrição Olfativa / Notas
                </label>
                <textarea
                  rows={3}
                  value={editingScent.description}
                  onChange={(e) =>
                    setEditingScent({ ...editingScent, description: e.target.value })
                  }
                  placeholder="Ex: Notas doces, amendoadas e aconchegantes..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E8DCCF] text-sm bg-[#FAF7F2]/40 focus:border-[#B87333] outline-hidden"
                />
              </div>

              {/* Status */}
              <div className="flex items-center gap-3 py-2">
                <input
                  type="checkbox"
                  id="scent-available"
                  checked={editingScent.available}
                  onChange={(e) =>
                    setEditingScent({ ...editingScent, available: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-[#B87333] focus:ring-[#B87333]"
                />
                <label htmlFor="scent-available" className="text-xs font-semibold text-[#332219] cursor-pointer">
                  Essência Ativa para Escolha do Cliente
                </label>
              </div>

              <div className="pt-4 border-t border-[#F4ECE1] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsScentModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs text-[#6E5D53] hover:bg-[#FAF7F2]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-[#B87333] hover:bg-[#9E5F28] text-white px-6 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-xs"
                >
                  Salvar Essência
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
