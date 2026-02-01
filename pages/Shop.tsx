
import React, { useState, useEffect } from 'react';
import { Filter, ChevronDown, SlidersHorizontal, Heart, Search, X } from 'lucide-react';
import { Product } from '../types';
import { Link, useSearchParams } from 'react-router-dom';

interface ShopProps {
  products: Product[];
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

export const Shop: React.FC<ShopProps> = ({ products, wishlist, toggleWishlist }) => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const categories = ['All', ...new Set(products.map(p => p.category))];

  useEffect(() => {
    setActiveCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-12 pb-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-200 pb-8">
          <div className="flex-grow">
            <div className="flex items-center space-x-2 text-red-600 mb-2">
              <Heart size={16} className="fill-red-600" />
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase">Val's Edition Collection</span>
            </div>
            <h1 className="text-4xl font-serif">AuraScents Boutique</h1>
          </div>
          
          <div className="mt-8 md:mt-0 flex flex-col md:flex-row md:items-center space-x-0 md:space-x-8 space-y-4 md:space-y-0">
            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text"
                placeholder="Search scents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-gray-100 rounded-sm text-xs outline-none focus:border-red-600 transition-colors shadow-sm"
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

            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] tracking-widest px-4 py-2 border transition-all font-bold ${
                    activeCategory === cat 
                    ? 'border-red-600 text-red-600 bg-white' 
                    : 'border-transparent text-gray-400 hover:text-black'
                  }`}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {filteredProducts.map(product => {
            const isPackage = product.category.includes('Package');
            const isInWishlist = wishlist.includes(product.id);
            return (
              <div key={product.id} className="group relative">
                <Link to={`/product/${product.id}`}>
                  <div className={`relative aspect-[3/4] overflow-hidden bg-white mb-4 ${isPackage ? 'border-b-2 border-red-500/20' : ''}`}>
                    <img 
                      src={product.imageUrls[0]} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {isPackage && (
                      <span className="absolute top-4 left-4 bg-red-600 text-white text-[8px] px-2 py-1 tracking-widest font-bold">
                        VALENTINE'S SPECIAL
                      </span>
                    )}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                        <span className="text-xs font-bold tracking-[0.2em] border-y border-black py-2">OUT OF STOCK</span>
                      </div>
                    )}
                  </div>
                </Link>
                
                {/* Wishlist Button Overlay */}
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full shadow-md z-10 transition-all ${
                    isInWishlist ? 'bg-red-600 text-white' : 'bg-white text-gray-400 hover:text-red-600'
                  }`}
                >
                  <Heart size={16} className={isInWishlist ? 'fill-current' : ''} />
                </button>

                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-serif">{product.name}</h3>
                    <p className="text-sm font-bold">
                      {product.discount > 0 ? (
                        <span className="text-red-600">GH¢ {(product.price * (1 - product.discount/100)).toFixed(2)}</span>
                      ) : (
                        `GH¢ ${product.price}`
                      )}
                    </p>
                  </div>
                  <p className={`text-[10px] uppercase tracking-widest mb-4 font-bold ${isPackage ? 'text-red-400' : 'text-gray-400'}`}>
                    {product.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-24 bg-white/50 border border-dashed border-gray-200 rounded-sm">
            <p className="text-gray-400 text-sm italic">No products matched your search or selection.</p>
            <button 
              onClick={() => {setSearchQuery(''); setActiveCategory('All');}}
              className="mt-4 text-[10px] font-bold tracking-widest text-red-600 border-b border-red-600 uppercase"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
