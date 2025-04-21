// Product Related Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
  sku?: string;
  stockQuantity?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// User Related Types
export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  address?: Address;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Order Related Types
export interface Order {
  id: number;
  userId: number;
  items: OrderItem[];
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress?: Address;
  subtotal: number;
  tax: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  productId: number;
  orderId: number;
  quantity: number;
  priceAtTime: number;
  product?: Product;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

// Cart Related Types
export interface CartItem extends Product {
  quantity: number;
}

export interface Cart {
  id: number;
  userId?: number;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

// Message Related Types (for MQTT/WebSocket)
export interface Message {
  id: number;
  topic: string;
  payload: string;
  timestamp: Date;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}