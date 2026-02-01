
import { User, Product, Order, UserRole, CartItem } from './types';
import { INITIAL_PRODUCTS } from './constants';

const DB_KEYS = {
  USERS: 'perfume_users',
  PRODUCTS: 'perfume_products',
  ORDERS: 'perfume_orders',
  CURRENT_USER: 'perfume_session',
  WISHLIST: 'perfume_wishlist'
};

export const getProducts = (): Product[] => {
  const data = localStorage.getItem(DB_KEYS.PRODUCTS);
  if (!data) {
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  return JSON.parse(data);
};

export const saveProduct = (product: Product) => {
  const products = getProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index >= 0) {
    products[index] = product;
  } else {
    products.push(product);
  }
  localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
};

export const deleteProduct = (id: string) => {
  const products = getProducts().filter(p => p.id !== id);
  localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
};

export const getUsers = (): User[] => {
  const data = localStorage.getItem(DB_KEYS.USERS);
  if (!data) {
    // Default admin
    const defaultUsers = [{
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@luxury.com',
      password: 'admin',
      role: UserRole.ADMIN
    }];
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify(defaultUsers));
    return defaultUsers;
  }
  return JSON.parse(data);
};

export const getOrders = (): Order[] => {
  const data = localStorage.getItem(DB_KEYS.ORDERS);
  return data ? JSON.parse(data) : [];
};

export const saveOrder = (order: Order) => {
  const orders = getOrders();
  orders.push(order);
  localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders));

  // Reduce stock
  const products = getProducts();
  order.items.forEach(item => {
    const p = products.find(prod => prod.id === item.productId);
    if (p) p.stock = Math.max(0, p.stock - item.quantity);
  });
  localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
};

export const updateOrderStatus = (orderId: string, status: any) => {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = status;
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders));
  }
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(DB_KEYS.CURRENT_USER);
  return data ? JSON.parse(data) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (user) {
    localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(DB_KEYS.CURRENT_USER);
  }
};

export const getWishlist = (): string[] => {
  const data = localStorage.getItem(DB_KEYS.WISHLIST);
  return data ? JSON.parse(data) : [];
};

export const saveWishlist = (wishlist: string[]) => {
  localStorage.setItem(DB_KEYS.WISHLIST, JSON.stringify(wishlist));
};
