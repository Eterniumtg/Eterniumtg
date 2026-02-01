
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product, CartItem } from '../types';
import { Plus, Minus, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface ProductDetailProps {
  products: Product[];
  addToCart: (productId: string, quantity: number) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ products, addToCart, wishlist, toggleWishlist }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found.</p>
        <button onClick={() => navigate('/shop')} className="ml-4 underline">Return to Shop</button>
      </div>
    );
  }

  const discountedPrice = product.price * (1 - product.discount / 100);
  const isValentineSet = product.category.includes('Package');
  const isInWishlist = wishlist.includes(product.id);

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Images */}
          <div className="space-y-6">
            <div className="aspect-[4/5] bg-white overflow-hidden shadow-sm border border-gray-100">
              <img 
                src={product.imageUrls[0]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <p className={`text-xs tracking-[0.3em] font-bold uppercase ${isValentineSet ? 'text-red-600' : 'text-gray-400'}`}>
                {product.category}
              </p>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`p-2 transition-colors ${isInWishlist ? 'text-red-600' : 'text-gray-300 hover:text-red-600'}`}
              >
                <Heart size={24} className={isInWishlist ? 'fill-current' : ''} />
              </button>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif mb-6">{product.name}</h1>
            
            <div className="flex items-center space-x-4 mb-8">
              {product.discount > 0 ? (
                <>
                  <span className="text-3xl font-light text-red-600">GH¢ {discountedPrice.toFixed(2)}</span>
                  <span className="text-xl text-gray-400 line-through">GH¢ {product.price}</span>
                </>
              ) : (
                <span className="text-3xl font-light">GH¢ {product.price}</span>
              )}
            </div>

            <div className="border-t border-b border-gray-100 py-8 mb-8">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">Select Quantity</span>
                <div className="flex items-center border border-gray-200">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:text-red-600"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-6 py-2 text-sm font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:text-red-600"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <button 
                onClick={() => addToCart(product.id, quantity)}
                disabled={product.stock === 0}
                className={`w-full py-5 flex items-center justify-center space-x-3 tracking-widest text-sm font-bold transition-all duration-300 ${
                  product.stock > 0 
                  ? 'bg-black text-white hover:bg-red-600' 
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                <ShoppingBag size={18} />
                <span>{product.stock > 0 ? 'ADD TO BAG' : 'OUT OF STOCK'}</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="mb-10">
              <div className="flex space-x-8 border-b border-gray-100 mb-6">
                {['description', 'contents', 'notes'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 text-xs tracking-widest font-bold uppercase transition-all ${
                      activeTab === tab ? 'border-b-2 border-red-600 text-black' : 'text-gray-400'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-sm text-gray-500 leading-relaxed min-h-[100px]">
                {activeTab === 'description' && product.description}
                {activeTab === 'contents' && (
                  <ul className="list-disc list-inside space-y-2">
                    {product.notes?.map((note, i) => (
                      <li key={i}>{note}</li>
                    )) || 'Package details available soon.'}
                  </ul>
                )}
                {activeTab === 'notes' && 'Please allow 2-3 business days for processing and delivery of premium gift sets.'}
              </div>
            </div>

            {/* Perks */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center text-center">
                <ShieldCheck size={20} className="text-red-600 mb-2" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Hand Packed</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <Truck size={20} className="text-red-600 mb-2" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Island Wide</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <RefreshCw size={20} className="text-red-600 mb-2" />
                <span className="text-[10px] font-bold tracking-widest uppercase">Premium Finish</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
