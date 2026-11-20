import { Product, Scent, StoreConfig, OrderData } from "@/types";

export type DbConfig = {
  id: number;
  store_name: string;
  tagline: string | null;
  whatsapp_number: string;
  welcome_message: string | null;
  pix_key: string | null;
  pix_key_type: string | null;
  is_open: boolean;
  city_state: string | null;
  instagram_url: string | null;
};

export type DbProduct = {
  id: string;
  name: string;
  subtitle: string | null;
  price: number | string;
  description: string | null;
  details: string[] | null;
  image_url: string | null;
  category: string | null;
  available: boolean;
  featured: boolean | null;
  sort_order?: number | null;
};

export type DbScent = {
  id: string;
  name: string;
  description: string | null;
  tags: string[] | null;
  available: boolean;
};

export type DbOrder = {
  id: string;
  customer_name: string;
  customer_phone: string | null;
  payment_method: string;
  notes: string | null;
  is_gift: boolean;
  gift_message: string | null;
  items: any;
  total: number | string;
  status: string;
  created_at: string;
};

export function fromDbConfig(r: DbConfig): StoreConfig {
  return {
    storeName: r.store_name,
    tagline: r.tagline ?? "",
    whatsappNumber: r.whatsapp_number,
    welcomeMessage: r.welcome_message ?? "",
    pixKey: r.pix_key ?? "",
    pixKeyType: r.pix_key_type ?? "",
    isOpen: r.is_open,
    cityState: r.city_state ?? "",
    instagramUrl: r.instagram_url ?? undefined,
  };
}

export function toDbConfig(c: StoreConfig): Omit<DbConfig, "id"> & { id: number } {
  return {
    id: 1,
    store_name: c.storeName,
    tagline: c.tagline || null,
    whatsapp_number: c.whatsappNumber,
    welcome_message: c.welcomeMessage || null,
    pix_key: c.pixKey || null,
    pix_key_type: c.pixKeyType || null,
    is_open: c.isOpen,
    city_state: c.cityState || null,
    instagram_url: c.instagramUrl || null,
  };
}

export function fromDbProduct(r: DbProduct): Product {
  const isBest = Boolean(r.featured);
  return {
    id: r.id,
    name: r.name,
    subtitle: r.subtitle ?? undefined,
    price: Number(r.price),
    description: r.description ?? "",
    details: Array.isArray(r.details) ? r.details : [],
    imageUrl: r.image_url ?? "",
    category: r.category ?? "",
    available: r.available,
    featured: isBest,
    isBestSeller: isBest,
  };
}

export function toDbProduct(p: Product, sortOrder = 0): DbProduct {
  const isBest = p.isBestSeller !== undefined ? Boolean(p.isBestSeller) : Boolean(p.featured);
  return {
    id: p.id,
    name: p.name,
    subtitle: p.subtitle ?? null,
    price: p.price,
    description: p.description ?? null,
    details: p.details ?? [],
    image_url: p.imageUrl ?? null,
    category: p.category ?? null,
    available: p.available,
    featured: isBest,
    sort_order: sortOrder,
  };
}

export function fromDbScent(r: DbScent): Scent {
  const tags = Array.isArray(r.tags) ? r.tags : [];
  const isBest = tags.some((t) => typeof t === "string" && (t.toLowerCase() === "mais vendida" || t.toLowerCase() === "+ vendida"));
  return {
    id: r.id,
    name: r.name,
    description: r.description ?? "",
    tags,
    available: r.available,
    isBestSeller: isBest,
  };
}

export function toDbScent(s: Scent): DbScent {
  const currentTags = Array.isArray(s.tags) ? [...s.tags] : [];
  const filteredTags = currentTags.filter((t) => typeof t === "string" && t.toLowerCase() !== "mais vendida" && t.toLowerCase() !== "+ vendida");
  if (s.isBestSeller) {
    filteredTags.unshift("+ Vendida");
  }
  return {
    id: s.id,
    name: s.name,
    description: s.description ?? null,
    tags: filteredTags,
    available: s.available,
  };
}

export function fromDbOrder(r: DbOrder): OrderData {
  return {
    id: r.id,
    customerName: r.customer_name,
    customerPhone: r.customer_phone ?? undefined,
    paymentMethod: r.payment_method as any,
    notes: r.notes ?? undefined,
    isGift: r.is_gift,
    giftMessage: r.gift_message ?? undefined,
    items: Array.isArray(r.items) ? r.items : [],
    total: Number(r.total),
    status: r.status as any,
    createdAt: r.created_at,
  };
}

export function toDbOrder(o: OrderData): DbOrder {
  return {
    id: o.id || `order-${Date.now()}`,
    customer_name: o.customerName,
    customer_phone: o.customerPhone ?? null,
    payment_method: o.paymentMethod,
    notes: o.notes ?? null,
    is_gift: !!o.isGift,
    gift_message: o.giftMessage ?? null,
    items: o.items ?? [],
    total: o.total,
    status: o.status || "pendente",
    created_at: o.createdAt || new Date().toISOString(),
  };
}
