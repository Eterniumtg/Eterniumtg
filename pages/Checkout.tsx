
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product, CartItem, Order, OrderStatus } from '../types';
import { CreditCard, Truck, Lock, CheckCircle } from 'lucide-react';

interface CheckoutProps {
  cart: CartItem[];
  products: Product[];
  user: any;
  onPlaceOrder: (order: Order) => void;
  clearCart: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ cart, products, user, onPlaceOrder, clearCart }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({
    fullName: user?.name || '',
    street: '',
    city: '',
    zip: '',
    phone: ''
  });

  const subtotal = cart.reduce((acc, item) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return acc;
    const price = product.price * (1 - product.discount / 100);
    return acc + (price * item.quantity);
  }, 0);

  const shipping = subtotal > 150 ? 0 : 25;
  const total = subtotal + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    const order: Order = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      userId: user?.id || 'guest',
      items: cart.map(item => {
        const p = products.find(p => p.id === item.productId)!;
        return {
          id: Math.random().toString(),
          productId: p.id,
          productName: p.name,
          quantity: item.quantity,
          price: p.price * (1 - p.discount / 100)
        };
      }),
      totalAmount: total,
      status: OrderStatus.PENDING,
      date: new Date().toISOString(),
      shippingAddress: `${address.fullName}, ${address.street}, ${address.city}, ${address.zip}`
    };

    onPlaceOrder(order);
    clearCart();
    setIsProcessing(false);
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-8">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <h1 className="text-4xl font-serif mb-4">Thank you for your order.</h1>
        <p className="text-gray-500 max-w-md mb-12">
          Your order has been placed successfully and is being prepared for shipment. You will receive a confirmation email shortly.
        </p>
        <button 
          onClick={() => navigate('/')}
          className="px-10 py-4 bg-black text-white text-xs tracking-widest font-bold hover:bg-[#D4AF37] transition-all"
        >
          RETURN HOME
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <div className="flex items-center space-x-4 mb-12">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-black text-white' : 'bg-gray-200'}`}>1</div>
              <div className="h-[1px] w-12 bg-gray-200"></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-black text-white' : 'bg-gray-200'}`}>2</div>
            </div>

            {step === 1 ? (
              <div className="space-y-8">
                <h2 className="text-3xl font-serif">Shipping Details</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Full Name</label>
                    <input 
                      required
                      type="text" 
                      value={address.fullName}
                      onChange={e => setAddress({...address, fullName: e.target.value})}
                      className="w-full bg-white border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Street Address</label>
                    <input 
                      required
                      type="text" 
                      value={address.street}
                      onChange={e => setAddress({...address, street: e.target.value})}
                      className="w-full bg-white border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">City</label>
                      <input 
                        required
                        type="text" 
                        value={address.city}
                        onChange={e => setAddress({...address, city: e.target.value})}
                        className="w-full bg-white border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">ZIP / Postal Code</label>
                      <input 
                        required
                        type="text" 
                        value={address.zip}
                        onChange={e => setAddress({...address, zip: e.target.value})}
                        className="w-full bg-white border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      value={address.phone}
                      onChange={e => setAddress({...address, phone: e.target.value})}
                      className="w-full bg-white border-b border-gray-200 py-3 focus:border-[#D4AF37] outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <h2 className="text-3xl font-serif">Payment Method</h2>
                <div className="p-8 border border-[#D4AF37] bg-white rounded-sm space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="text-[#D4AF37]" />
                      <span className="text-sm font-bold tracking-widest">CREDIT / DEBIT CARD</span>
                    </div>
                    <div className="flex space-x-2">
                      <div className="w-8 h-5 bg-gray-100 rounded"></div>
                      <div className="w-8 h-5 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <input 
                      required
                      placeholder="Card Number"
                      className="w-full border-b border-gray-200 py-3 outline-none focus:border-[#D4AF37]"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input required placeholder="MM / YY" className="border-b border-gray-200 py-3 outline-none focus:border-[#D4AF37]" />
                      <input required placeholder="CVV" className="border-b border-gray-200 py-3 outline-none focus:border-[#D4AF37]" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Lock size={14} />
                  <span className="text-[10px] tracking-widest uppercase">Secure encrypted transaction</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white p-10 h-fit shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold tracking-widest mb-8 border-b border-gray-100 pb-4">YOUR ORDER</h3>
            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto">
              {cart.map(item => {
                const p = products.find(p => p.id === item.productId)!;
                return (
                  <div key={item.productId} className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-400 font-medium">x{item.quantity}</span>
                      <span className="font-serif">{p.name}</span>
                    </div>
                    <span>${(p.price * (1 - p.discount/100) * item.quantity).toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
            <div className="space-y-4 border-t border-gray-100 pt-6">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-xl font-serif pt-4 border-t border-gray-100">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button 
              type="submit"
              disabled={isProcessing}
              className={`w-full mt-10 py-5 bg-black text-white text-xs tracking-widest font-bold hover:bg-[#D4AF37] transition-all flex items-center justify-center space-x-3 ${isProcessing ? 'opacity-50 cursor-wait' : ''}`}
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  <span>PROCESSING...</span>
                </>
              ) : (
                <span>{step === 1 ? 'CONTINUE TO PAYMENT' : 'PLACE ORDER'}</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
