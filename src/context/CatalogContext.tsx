"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, Scent, CartItem, StoreConfig, PaymentMethod, OrderData, OrderStatus } from "@/types";
import { INITIAL_PRODUCTS, INITIAL_SCENTS, INITIAL_CONFIG } from "@/lib/constants";

interface CatalogContextType {
  products: Product[];
  scents: Scent[];
  config: StoreConfig;
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  selectedProductForModal: Product | null;
  isCheckoutOpen: boolean;
  isAdminLoggedIn: boolean;
  orders: OrderData[];
  lastCompletedOrder: OrderData | null;
  isSuccessModalOpen: boolean;
  isLoading: boolean;

  addToCart: (product: Product, scent: Scent, quantity: number) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  setIsCartOpen: (open: boolean) => void;

  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  closeSuccessModal: () => void;

  submitOrder: (order: {
    customerName: string;
    customerPhone?: string;
    paymentMethod: PaymentMethod;
    notes?: string;
    isGift?: boolean;
    giftMessage?: string;
  }) => Promise<void>;
  generateWhatsAppLink: (orderData: OrderData) => string;
  getWhatsAppSupportLink: () => string;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  clearOrdersHistory: () => Promise<void>;

  loginAdmin: (user: string, pass: string) => Promise<boolean>;
  logoutAdmin: () => Promise<void>;
  saveProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  saveScent: (scent: Scent) => Promise<void>;
  deleteScent: (scentId: string) => Promise<void>;
  saveConfig: (newConfig: StoreConfig) => Promise<void>;
  resetToDefaults: () => Promise<void>;
  importCatalogData: (jsonData: string) => Promise<boolean>;
  exportCatalogData: () => string;
  refreshCatalog: () => Promise<void>;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: "selumi_cart_v1",
  ADMIN_AUTH: "selumi_admin_auth_v1",
};

async function api(path: string, options?: RequestInit) {
  const res = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options?.headers || {}) },
    cache: "no-store",
  });
  if (!res.ok) {
    let msg = "Erro na requisição";
    try { const j = await res.json(); msg = j.error || msg; } catch {}
    throw new Error(msg);
  }
  return res.json().catch(() => ({}));
}

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [scents, setScents] = useState<Scent[]>(INITIAL_SCENTS);
  const [config, setConfig] = useState<StoreConfig>(INITIAL_CONFIG);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<OrderData | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const refreshCatalog = useCallback(async () => {
    try {
      const data = await api("/api/catalog");
      if (data.config) setConfig(data.config);
      if (Array.isArray(data.products)) setProducts(data.products);
      if (Array.isArray(data.scents)) setScents(data.scents);
      if (Array.isArray(data.orders)) setOrders(data.orders);
    } catch (e) {
      console.error("Erro ao carregar catálogo do servidor:", e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (savedCart) setCart(JSON.parse(savedCart));
      const savedAdminAuth = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      if (savedAdminAuth === "true") setIsAdminLoggedIn(true);
    } catch (e) {
      console.error("Erro ao carregar dados locais:", e);
    } finally {
      setIsLoaded(true);
    }
    refreshCatalog();
  }, [refreshCatalog]);

  useEffect(() => {
    if (!isLoaded) return;
    try { localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart)); } catch (e) { console.error(e); }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, scent: Scent, quantity: number) => {
    const cartItemId = `${product.id}__${scent.id}`;
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === cartItemId);
      if (existingItemIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingItemIndex].quantity + quantity;
        updated[existingItemIndex] = { ...updated[existingItemIndex], quantity: newQty, totalPrice: newQty * product.price };
        return updated;
      } else {
        const newItem: CartItem = { id: cartItemId, product, scent, quantity, unitPrice: product.price, totalPrice: quantity * product.price };
        return [...prevCart, newItem];
      }
    });
    setIsCartOpen(true);
    setSelectedProductForModal(null);
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) { removeFromCart(cartItemId); return; }
    setCart((prevCart) => prevCart.map((item) => item.id === cartItemId ? { ...item, quantity: newQuantity, totalPrice: newQuantity * item.unitPrice } : item));
  };

  const removeFromCart = (cartItemId: string) => setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  const openProductModal = (product: Product) => setSelectedProductForModal(product);
  const closeProductModal = () => setSelectedProductForModal(null);
  const openCheckout = () => { setIsCartOpen(false); setIsCheckoutOpen(true); };
  const closeCheckout = () => setIsCheckoutOpen(false);
  const closeSuccessModal = () => setIsSuccessModalOpen(false);

  const formatCurrency = (val: number) => val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const generateWhatsAppMessage = (orderData: OrderData): string => {
    const paymentLabels: Record<PaymentMethod, string> = {
      pix: "PIX",
      cash: "Dinheiro na entrega / retirada presencial",
      card_future: "Cartão / Mercado Pago (Em breve)",
    };
    let msg = `🕯️ *NOVO PEDIDO — SELUMI*\n`;
    msg += `_Luz que acolhe_\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    msg += `👤 *Cliente:* ${orderData.customerName.trim()}\n`;
    if (orderData.customerPhone) msg += `📱 *Telefone:* ${orderData.customerPhone.trim()}\n`;
    msg += `\n📦 *Itens Escolhidos:*\n`;
    orderData.items.forEach((item, index) => {
      msg += `\n*${index + 1}. ${item.product.name}* (x${item.quantity})\n`;
      msg += `   └ *Aroma:* ${item.scent.name}\n`;
      msg += `   └ *Valor unitário:* ${formatCurrency(item.unitPrice)}\n`;
      msg += `   └ *Subtotal:* ${formatCurrency(item.totalPrice)}\n`;
    });
    msg += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *VALOR TOTAL:* ${formatCurrency(orderData.total)}\n`;
    msg += `💳 *Forma de Pagamento:* ${paymentLabels[orderData.paymentMethod] || orderData.paymentMethod}\n`;
    if (orderData.notes && orderData.notes.trim()) msg += `📝 *Observações / Detalhes:* ${orderData.notes.trim()}\n`;
    if (orderData.isGift) {
      msg += `🎁 *Embalagem para Presente:* Sim\n`;
      if (orderData.giftMessage && orderData.giftMessage.trim()) msg += `💌 *Dedicatória:* "${orderData.giftMessage.trim()}"\n`;
    }
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `Olá, acabei de montar meu pedido pelo catálogo digital da Selumi! Gostaria de confirmar a disponibilidade e combinar os detalhes da entrega/retirada. ✨`;
    return msg;
  };

  const generateWhatsAppLink = (orderData: OrderData): string => {
    const cleanNumber = config.whatsappNumber.replace(/\D/g, "");
    const message = encodeURIComponent(generateWhatsAppMessage(orderData));
    return `https://wa.me/${cleanNumber}?text=${message}`;
  };

  const getWhatsAppSupportLink = (): string => {
    const cleanNumber = config.whatsappNumber.replace(/\D/g, "");
    const message = encodeURIComponent(`Olá! Estava navegando no catálogo digital da Selumi e gostaria de tirar uma dúvida ou saber mais sobre as velas aromáticas. ✨`);
    return `https://wa.me/${cleanNumber}?text=${message}`;
  };

  const submitOrder = async (orderInput: {
    customerName: string;
    customerPhone?: string;
    paymentMethod: PaymentMethod;
    notes?: string;
    isGift?: boolean;
    giftMessage?: string;
  }) => {
    const orderData: OrderData = {
      ...orderInput,
      id: `order-${Date.now()}`,
      status: "pendente",
      items: [...cart],
      total: cartTotal,
      createdAt: new Date().toISOString(),
    };
    try {
      await api("/api/orders", { method: "POST", body: JSON.stringify(orderData) });
    } catch (e) {
      console.error("Erro ao salvar pedido no servidor:", e);
    }
    setOrders((prev) => [orderData, ...prev]);
    setLastCompletedOrder(orderData);
    setIsCheckoutOpen(false);
    setIsSuccessModalOpen(true);
    const waLink = generateWhatsAppLink(orderData);
    window.open(waLink, "_blank", "noopener,noreferrer");
    clearCart();
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord)));
    try { await api("/api/admin/orders", { method: "PATCH", body: JSON.stringify({ id: orderId, status }) }); } catch (e) { console.error(e); await refreshCatalog(); }
  };

  const clearOrdersHistory = async () => {
    setOrders([]);
    try { await api("/api/admin/orders", { method: "DELETE" }); } catch (e) { console.error(e); await refreshCatalog(); }
  };

  const loginAdmin = async (user: string, pass: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username: user, password: pass }) });
      if (res.ok) { setIsAdminLoggedIn(true); sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, "true"); await refreshCatalog(); return true; }
      return false;
    } catch { return false; }
  };

  const logoutAdmin = async () => {
    try { await fetch("/api/admin/logout", { method: "POST" }); } catch {}
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  const saveProduct = async (product: Product) => {
    setProducts((prev) => { const idx = prev.findIndex((p) => p.id === product.id); if (idx > -1) { const u = [...prev]; u[idx] = product; return u; } return [product, ...prev]; });
    try { await api("/api/admin/products", { method: "POST", body: JSON.stringify(product) }); } catch (e) { console.error(e); await refreshCatalog(); }
  };

  const deleteProduct = async (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    try { await api(`/api/admin/products?id=${encodeURIComponent(productId)}`, { method: "DELETE" }); } catch (e) { console.error(e); await refreshCatalog(); }
  };

  const saveScent = async (scent: Scent) => {
    setScents((prev) => { const idx = prev.findIndex((s) => s.id === scent.id); if (idx > -1) { const u = [...prev]; u[idx] = scent; return u; } return [...prev, scent]; });
    try { await api("/api/admin/scents", { method: "POST", body: JSON.stringify(scent) }); } catch (e) { console.error(e); await refreshCatalog(); }
  };

  const deleteScent = async (scentId: string) => {
    setScents((prev) => prev.filter((s) => s.id !== scentId));
    try { await api(`/api/admin/scents?id=${encodeURIComponent(scentId)}`, { method: "DELETE" }); } catch (e) { console.error(e); await refreshCatalog(); }
  };

  const saveConfig = async (newConfig: StoreConfig) => {
    setConfig(newConfig);
    try { await api("/api/admin/config", { method: "POST", body: JSON.stringify(newConfig) }); } catch (e) { console.error(e); await refreshCatalog(); }
  };

  const resetToDefaults = async () => {
    try { await api("/api/admin/seed", { method: "POST" }); await refreshCatalog(); } catch (e) { console.error(e); }
  };

  const exportCatalogData = (): string => JSON.stringify({ products, scents, config }, null, 2);

  const importCatalogData = async (jsonData: string): Promise<boolean> => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.config) await saveConfig(parsed.config);
      if (Array.isArray(parsed.products)) { for (const p of parsed.products) await saveProduct(p); }
      if (Array.isArray(parsed.scents)) { for (const s of parsed.scents) await saveScent(s); }
      await refreshCatalog();
      return true;
    } catch (e) { console.error("Falha ao importar JSON:", e); return false; }
  };

  return (
    <CatalogContext.Provider
      value={{
        products, scents, config, cart, cartCount, cartTotal, isCartOpen,
        selectedProductForModal, isCheckoutOpen, isAdminLoggedIn, orders,
        lastCompletedOrder, isSuccessModalOpen, isLoading,
        addToCart, updateQuantity, removeFromCart, clearCart, setIsCartOpen,
        openProductModal, closeProductModal, openCheckout, closeCheckout, closeSuccessModal,
        submitOrder, generateWhatsAppLink, getWhatsAppSupportLink, updateOrderStatus, clearOrdersHistory,
        loginAdmin, logoutAdmin, saveProduct, deleteProduct, saveScent, deleteScent, saveConfig,
        resetToDefaults, exportCatalogData, importCatalogData, refreshCatalog,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) throw new Error("useCatalog deve ser usado dentro de um CatalogProvider");
  return context;
};
