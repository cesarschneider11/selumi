export interface Product {
  id: string;
  name: string;
  subtitle?: string;
  price: number;
  description: string;
  details?: string[];
  imageUrl: string;
  category: string;
  available: boolean;
  featured?: boolean;
  isBestSeller?: boolean;
}

export interface Scent {
  id: string;
  name: string;
  description: string;
  tags?: string[];
  available: boolean;
  isBestSeller?: boolean;
}

export interface CartItem {
  id: string; // unique item cart id (e.g. productId + scentId)
  product: Product;
  scent: Scent;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export type PaymentMethod = 'pix' | 'cash' | 'card_future';

export type OrderStatus = 'pendente' | 'confirmado' | 'entregue';

export interface OrderData {
  id?: string;
  customerName: string;
  customerPhone?: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  isGift?: boolean;
  giftMessage?: string;
  items: CartItem[];
  total: number;
  status?: OrderStatus;
  createdAt: string;
}

export interface StoreConfig {
  storeName: string;
  tagline: string;
  whatsappNumber: string; // Ex: '5511999999999'
  welcomeMessage: string;
  pixKey: string;
  pixKeyType: string;
  isOpen: boolean;
  cityState: string;
  instagramUrl?: string;
}
