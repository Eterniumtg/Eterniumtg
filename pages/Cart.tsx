
import React from 'react';
import { Trash2, ArrowRight, ShoppingBag, Heart } from 'lucide-react';
import { Product, CartItem } from '../types';
import { Link, useNavigate } from 'react-router-dom';

interface CartProps {
  cart: CartItem[];
  products: Product[];
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
}

export const Cart: React.FC<CartProps> = ({ cart, products, removeFromCart, updateQuantity }) => {
  const navigate = useNavigate();
  
  const cartDetails = cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return {
      ...item,
      product
    };
  }).filter(item => item.product);

  const subtotal = cartDetails.reduce((acc, item) => {
    const price = item.product!.price * (1 - item.product!.discount / 100);
    return acc + (price * item.quantity);
  }, 0);

  const shipping = subtotal > 150 ? 0 : 25;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6]">
        <ShoppingBag size={64} className="text-gray-200 mb-6" />
        <h2 className="text-3xl font-serif mb-4">Your bag is empty</h2>
        <p className="text-gray-400 mb-10">Select a special package for your loved one.</p>
        <Link 
          to="/shop" 
          className="px-12 py-4 bg-red-600 text-white text-[10px] tracking-widest font-bold hover:bg-black transition-colors"
        >
          EXPLORE VAL'S EDITION
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-3 mb-12">
          <Heart size={24} className="text-red-600 fill-red-600" />
          <h1 className="text-4xl font-serif">Your AuraBag</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-8">
            {cartDetails.map(item => (
              <div key={item.productId} className="flex space-x-6 pb-8 border-b border-gray-100">
                <div className="w-32 h-40 flex-shrink-0 bg-white overflow-hidden border border-gray-100">
                  <img src={item.product!.imageUrls[0]} alt={item.product!.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-lg font-serif">{item.product!.name}</h3>
                    <p className="font-bold">GH¢ {((item.product!.price * (1 - item.product!.discount / 100)) * item.quantity).toFixed(2)}</p>
                  </div>
                  <p className="text-[10px] text-red-400 uppercase tracking-widest mb-6 font-bold">{item.product!.category}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-200">
                      <button 
                        onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                        className="px-3 py-1 text-gray-500 hover:text-black"
                      >
                        -
                      </button>
                      <span className="px-4 text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.productId, Math.min(item.product!.stock, item.quantity + 1))}
                        className="px-3 py-1 text-gray-500 hover:text-black"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.productId)}
                      className="text-gray-400 hover:text-red-500 transition-colors flex items-center space-x-1"
                    >
                      <Trash2 size={16} />
                      <span className="text-[10px] font-bold tracking-widest uppercase">Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white p-10 h-fit border border-gray-100 shadow-sm">
            <h3 className="text-[10px] font-bold tracking-widest mb-8 border-b border-gray-100 pb-4 uppercase">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>GH¢ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'COMPLIMENTARY' : `GH¢ ${shipping.toFixed(2)}`}</span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-red-600">GH¢ {total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full py-5 bg-red-600 text-white flex items-center justify-center space-x-3 text-[10px] tracking-widest font-bold hover:bg-black transition-all duration-300"
            >
              <span>PROCEED TO SECURE CHECKOUT</span>
              <ArrowRight size={16} />
            </button>
            <p className="text-[10px] text-gray-400 text-center mt-6">
              Premium Valentine's gift wrapping included.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
