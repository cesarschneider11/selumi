"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, Scent, CartItem, StoreConfig, PaymentMethod, OrderData } from "@/types";
import { INITIAL_PRODUCTS, INITIAL_SCENTS, INITIAL_CONFIG, ADMIN_CREDENTIALS } from "@/lib/constants";

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
  lastCompletedOrder: OrderData | null;
  isSuccessModalOpen: boolean;

  // Cart actions
  addToCart: (product: Product, scent: Scent, quantity: number) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  setIsCartOpen: (open: boolean) => void;

  // Modals
  openProductModal: (product: Product) => void;
  closeProductModal: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
  closeSuccessModal: () => void;

  // Checkout & WhatsApp
  submitOrder: (order: {
    customerName: string;
    customerPhone?: string;
    paymentMethod: PaymentMethod;
    notes?: string;
  }) => void;
  generateWhatsAppLink: (orderData: OrderData) => string;
  getWhatsAppSupportLink: () => string;

  // Admin actions
  loginAdmin: (user: string, pass: string) => boolean;
  logoutAdmin: () => void;
  saveProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  saveScent: (scent: Scent) => void;
  deleteScent: (scentId: string) => void;
  saveConfig: (newConfig: StoreConfig) => void;
  resetToDefaults: () => void;
  importCatalogData: (jsonData: string) => boolean;
  exportCatalogData: () => string;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: "selumi_products_v1",
  SCENTS: "selumi_scents_v1",
  CONFIG: "selumi_config_v1",
  CART: "selumi_cart_v1",
  ADMIN_AUTH: "selumi_admin_auth_v1",
};

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [scents, setScents] = useState<Scent[]>(INITIAL_SCENTS);
  const [config, setConfig] = useState<StoreConfig>(INITIAL_CONFIG);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [lastCompletedOrder, setLastCompletedOrder] = useState<OrderData | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Load persisted data on client mount
  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }

      const savedScents = localStorage.getItem(STORAGE_KEYS.SCENTS);
      if (savedScents) {
        setScents(JSON.parse(savedScents));
      }

      const savedConfig = localStorage.getItem(STORAGE_KEYS.CONFIG);
      if (savedConfig) {
        setConfig(JSON.parse(savedConfig));
      }

      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      const savedAdminAuth = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      if (savedAdminAuth === "true") {
        setIsAdminLoggedIn(true);
      }
    } catch (e) {
      console.error("Erro ao carregar dados do localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage after initial load
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error("Erro ao salvar produtos:", e);
    }
  }, [products, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.SCENTS, JSON.stringify(scents));
    } catch (e) {
      console.error("Erro ao salvar essências:", e);
    }
  }, [scents, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error("Erro ao salvar configurações:", e);
    }
  }, [config, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error("Erro ao salvar carrinho:", e);
    }
  }, [cart, isLoaded]);

  // Cart operations
  const addToCart = (product: Product, scent: Scent, quantity: number) => {
    const cartItemId = `${product.id}__${scent.id}`;

    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.id === cartItemId);

      if (existingItemIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingItemIndex].quantity + quantity;
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: newQty,
          totalPrice: newQty * product.price,
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: cartItemId,
          product,
          scent,
          quantity,
          unitPrice: product.price,
          totalPrice: quantity * product.price,
        };
        return [...prevCart, newItem];
      }
    });

    setIsCartOpen(true);
    setSelectedProductForModal(null);
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === cartItemId) {
          return {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * item.unitPrice,
          };
        }
        return item;
      })
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);

  // Modals
  const openProductModal = (product: Product) => {
    setSelectedProductForModal(product);
  };

  const closeProductModal = () => {
    setSelectedProductForModal(null);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };

  // WhatsApp Helpers
  const formatCurrency = (val: number) => {
    return val.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

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
    if (orderData.customerPhone) {
      msg += `📱 *Telefone:* ${orderData.customerPhone.trim()}\n`;
    }
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

    if (orderData.notes && orderData.notes.trim()) {
      msg += `📝 *Observações / Detalhes:* ${orderData.notes.trim()}\n`;
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
    const message = encodeURIComponent(
      `Olá! Estava navegando no catálogo digital da Selumi e gostaria de tirar uma dúvida ou saber mais sobre as velas aromáticas. ✨`
    );
    return `https://wa.me/${cleanNumber}?text=${message}`;
  };

  const submitOrder = (orderInput: {
    customerName: string;
    customerPhone?: string;
    paymentMethod: PaymentMethod;
    notes?: string;
  }) => {
    const orderData: OrderData = {
      ...orderInput,
      items: [...cart],
      total: cartTotal,
      createdAt: new Date().toISOString(),
    };

    setLastCompletedOrder(orderData);
    setIsCheckoutOpen(false);
    setIsSuccessModalOpen(true);

    // Open WhatsApp in new tab or app
    const waLink = generateWhatsAppLink(orderData);
    window.open(waLink, "_blank", "noopener,noreferrer");

    // Clear cart after order is triggered
    clearCart();
  };

  // Admin Actions
  const loginAdmin = (user: string, pass: string): boolean => {
    if (user.trim() === ADMIN_CREDENTIALS.username && pass === ADMIN_CREDENTIALS.password) {
      setIsAdminLoggedIn(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  const saveProduct = (product: Product) => {
    setProducts((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = product;
        return updated;
      }
      return [product, ...prev];
    });
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const saveScent = (scent: Scent) => {
    setScents((prev) => {
      const idx = prev.findIndex((s) => s.id === scent.id);
      if (idx > -1) {
        const updated = [...prev];
        updated[idx] = scent;
        return updated;
      }
      return [...prev, scent];
    });
  };

  const deleteScent = (scentId: string) => {
    setScents((prev) => prev.filter((s) => s.id !== scentId));
  };

  const saveConfig = (newConfig: StoreConfig) => {
    setConfig(newConfig);
  };

  const resetToDefaults = () => {
    setProducts(INITIAL_PRODUCTS);
    setScents(INITIAL_SCENTS);
    setConfig(INITIAL_CONFIG);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.SCENTS);
    localStorage.removeItem(STORAGE_KEYS.CONFIG);
  };

  const exportCatalogData = (): string => {
    return JSON.stringify({ products, scents, config }, null, 2);
  };

  const importCatalogData = (jsonData: string): boolean => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.products && Array.isArray(parsed.products)) {
        setProducts(parsed.products);
      }
      if (parsed.scents && Array.isArray(parsed.scents)) {
        setScents(parsed.scents);
      }
      if (parsed.config && typeof parsed.config === "object") {
        setConfig(parsed.config);
      }
      return true;
    } catch (e) {
      console.error("Falha ao importar JSON:", e);
      return false;
    }
  };

  return (
    <CatalogContext.Provider
      value={{
        products,
        scents,
        config,
        cart,
        cartCount,
        cartTotal,
        isCartOpen,
        selectedProductForModal,
        isCheckoutOpen,
        isAdminLoggedIn,
        lastCompletedOrder,
        isSuccessModalOpen,

        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        setIsCartOpen,

        openProductModal,
        closeProductModal,
        openCheckout,
        closeCheckout,
        closeSuccessModal,

        submitOrder,
        generateWhatsAppLink,
        getWhatsAppSupportLink,

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
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog deve ser usado dentro de um CatalogProvider");
  }
  return context;
};
