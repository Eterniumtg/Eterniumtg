
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User, Product, Order, CartItem, UserRole } from './types';
import * as db from './db';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { AdminDashboard } from './pages/AdminDashboard';
import { Auth } from './pages/Auth';
import { Wishlist } from './pages/Wishlist';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initial data load
    const savedUser = db.getCurrentUser();
    const allProducts = db.getProducts();
    const allOrders = db.getOrders();
    const savedCart = localStorage.getItem('perfume_cart');
    const savedWishlist = db.getWishlist();

    setUser(savedUser);
    setProducts(allProducts);
    setOrders(allOrders);
    setWishlist(savedWishlist);
    if (savedCart) setCart(JSON.parse(savedCart));
    
    setIsInitialized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('perfume_cart', JSON.stringify(cart));
    }
  }, [cart, isInitialized]);

  useEffect(() => {
    if (isInitialized) {
      db.saveWishlist(wishlist);
    }
  }, [wishlist, isInitialized]);

  const handleLogin = (u: User) => {
    setUser(u);
    db.setCurrentUser(u);
  };

  const handleLogout = () => {
    setUser(null);
    db.setCurrentUser(null);
  };

  const addToCart = (productId: string, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === productId);
      if (existing) {
        return prev.map(item => item.productId === productId ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { productId, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => item.productId === productId ? { ...item, quantity } : item));
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const handlePlaceOrder = (order: Order) => {
    db.saveOrder(order);
    setOrders(prev => [...prev, order]);
    setProducts(db.getProducts()); // Update stock in state
  };

  const handleUpdateStatus = (id: string, status: any) => {
    db.updateOrderStatus(id, status);
    setOrders(db.getOrders());
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  if (!isInitialized) return null;

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar user={user} onLogout={handleLogout} cartCount={cartCount} wishlistCount={wishlist.length} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home products={products} />} />
            <Route path="/shop" element={<Shop products={products} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/product/:id" element={<ProductDetail products={products} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />} />
            <Route path="/cart" element={<Cart cart={cart} products={products} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/wishlist" element={<Wishlist wishlist={wishlist} products={products} toggleWishlist={toggleWishlist} addToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} products={products} user={user} onPlaceOrder={handlePlaceOrder} clearCart={() => setCart([])} />} />
            <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
            
            {/* Protected Admin Routes */}
            <Route 
              path="/admin" 
              element={
                user?.role === UserRole.ADMIN 
                  ? <AdminDashboard products={products} orders={orders} onUpdateStatus={handleUpdateStatus} onAddProduct={() => {}} /> 
                  : <Navigate to="/auth" />
              } 
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
