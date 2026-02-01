
import React, { useState } from 'react';
import { Heart, ShoppingBag, Trash2, Search, ArrowRight, X, Plus, Minus } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface WishlistProps {
  wishlist: string[];
  products: Product[];
  toggleWishlist: (productId: string) => void;
  addToCart: (productId: string, quantity: number) => void;
}

export const Wishlist: React.FC<WishlistProps> = ({ wishlist, products, toggleWishlist, addToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  
  const wishlistProducts = products.filter(p => wishlist.includes(p.id))
                                   .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                               p.description.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleQtyChange = (productId: string, newQty: number, maxStock: number) => {
    const qty = Math.max(1, Math.min(newQty, maxStock));
    setQuantities(prev => ({ ...prev, [productId]: qty }));
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF9F6] px-4">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mb-6">
          <Heart size={40} className="text-pink-200" />
        </div>
        <h2 className="text-3xl font-serif mb-4">Your wishlist is empty</h2>
        <p className="text-gray-400 mb-10 text-center max-w-xs">Save your favorite scents here for a future special occasion.</p>
        <Link 
          to="/shop" 
          className="px-12 py-4 bg-red-600 text-white text-[10px] tracking-widest font-bold hover:bg-black transition-colors"
        >
          START SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 border-b border-gray-200 pb-8">
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <Heart size={28} className="text-red-600 fill-red-600" />
            <h1 className="text-4xl font-serif">Saved Favorites</h1>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Search in wishlist..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white border border-gray-100 rounded-sm text-xs outline-none focus:border-red-600 transition-colors shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistProducts.map(product => {
              const discountedPrice = product.price * (1 - product.discount / 100);
              const qty = quantities[product.id] || 1;
              const isOutOfStock = product.stock === 0;

              return (
                <div key={product.id} className={`bg-white group border border-gray-100 shadow-sm hover:shadow-md transition-shadow ${isOutOfStock ? 'opacity-75' : ''}`}>
                  <div className="flex h-full">
                    <div className="w-1/3 aspect-[3/4] relative overflow-hidden bg-gray-50">
                      <Link to={`/product/${product.id}`}>
                        <img 
                          src={product.imageUrls[0]} 
                          alt={product.name} 
                          className={`w-full h-full object-cover transition-transform duration-700 ${!isOutOfStock ? 'group-hover:scale-110' : 'grayscale'}`} 
                        />
                      </Link>
                      {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                          <span className="bg-red-600 text-white text-[7px] font-bold tracking-widest px-2 py-1 -rotate-45 uppercase">Out of Stock</span>
                        </div>
                      )}
                    </div>
                    <div className="w-2/3 p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className={`text-lg font-serif mb-1 line-clamp-1 ${isOutOfStock ? 'text-gray-400' : ''}`}>{product.name}</h3>
                          <button 
                            onClick={() => toggleWishlist(product.id)}
                            className="text-gray-300 hover:text-red-600 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className={`text-[9px] font-bold tracking-[0.2em] uppercase mb-4 ${isOutOfStock ? 'text-gray-300' : 'text-red-400'}`}>{product.category}</p>
                        <p className={`text-xs font-bold mb-4 ${isOutOfStock ? 'text-gray-300' : 'text-black'}`}>GH¢ {discountedPrice.toFixed(2)}</p>
                      </div>

                      <div className="mt-auto">
                        {/* Quantity Selector */}
                        <div className={`flex items-center justify-between mb-4 pb-4 border-b border-gray-50 ${isOutOfStock ? 'pointer-events-none opacity-20' : ''}`}>
                          <span className="text-[9px] font-bold tracking-widest text-gray-400 uppercase">Quantity</span>
                          <div className="flex items-center border border-gray-100">
                            <button 
                              onClick={() => handleQtyChange(product.id, qty - 1, product.stock)}
                              className="px-2 py-1 text-gray-400 hover:text-red-600 transition-colors"
                              disabled={isOutOfStock}
                            >
                              <Minus size={12} />
                            </button>
                            <span className="px-3 text-[10px] font-bold w-8 text-center">{isOutOfStock ? 0 : qty}</span>
                            <button 
                              onClick={() => handleQtyChange(product.id, qty + 1, product.stock)}
                              className="px-2 py-1 text-gray-400 hover:text-red-600 transition-colors"
                              disabled={isOutOfStock}
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => addToCart(product.id, qty)}
                            disabled={isOutOfStock}
                            className={`flex-grow py-3 text-[9px] font-bold tracking-widest transition-colors ${
                              !isOutOfStock 
                                ? 'bg-black text-white hover:bg-red-600' 
                                : 'bg-gray-100 text-gray-300 cursor-not-allowed border border-gray-100'
                            }`}
                          >
                            {!isOutOfStock ? 'MOVE TO BAG' : 'OUT OF STOCK'}
                          </button>
                          <Link 
                            to={`/product/${product.id}`}
                            className="p-3 border border-gray-200 text-gray-400 hover:text-black transition-colors"
                          >
                            <ArrowRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-white/50 border border-dashed border-gray-200 rounded-sm">
            <p className="text-gray-400 text-sm italic">No favorites found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};
