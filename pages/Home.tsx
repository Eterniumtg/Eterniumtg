
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Heart, Sparkles } from 'lucide-react';
import { Product } from '../types';

interface HomeProps {
  products: Product[];
}

export const Home: React.FC<HomeProps> = ({ products }) => {
  const ladiesSets = products.filter(p => p.category === 'Ladies Package').slice(0, 4);
  const menSets = products.filter(p => p.category === 'Men Package').slice(0, 3);

  return (
    <div className="bg-[#FAF9F6]">
      {/* Hero Section */}
      <section className="relative h-[95vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=2000" 
            alt="AuraScents Hero"
            className="w-full h-full object-cover filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-white">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="text-red-500 fill-red-500 animate-pulse" size={20} />
              <h4 className="text-red-400 font-bold tracking-[0.3em] text-sm uppercase">Special Valentine Day Offer</h4>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif mb-8 leading-tight">AuraScents <br/><span className="italic text-red-500">Val's Edition</span></h1>
            <p className="text-lg text-gray-200 mb-10 leading-relaxed font-light">
              Gift your loved one an unforgettable olfactory experience. Explore our limited-edition Valentine's Day packages curated with love.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/shop" 
                className="inline-flex items-center px-8 py-4 bg-red-600 text-white hover:bg-white hover:text-black transition-all duration-300 tracking-widest text-sm font-bold group"
              >
                VIEW PACKAGES
                <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ladies Package Section */}
      <section className="py-24 bg-pink-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center space-x-2 text-pink-500 mb-2">
                <Sparkles size={16} />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">For Her</span>
              </div>
              <h2 className="text-4xl font-serif">Ladies Packages</h2>
            </div>
            <Link to="/shop?category=Ladies+Package" className="text-xs font-bold tracking-widest text-pink-600 border-b border-pink-200 pb-1 hover:text-pink-800 transition-colors">VIEW ALL SETS</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {ladiesSets.map(product => (
              <div key={product.id} className="group bg-white p-4 shadow-sm hover:shadow-xl transition-shadow border border-pink-100">
                <div className="relative overflow-hidden aspect-[4/5] bg-white mb-6">
                  <img 
                    src={product.imageUrls[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full text-pink-500 shadow-sm">
                    <Heart size={14} className="group-hover:fill-pink-500 transition-colors" />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-serif mb-1">{product.name}</h3>
                  <p className="text-xl font-bold text-red-600 mb-4">GH¢ {product.price}</p>
                  <Link 
                    to={`/product/${product.id}`}
                    className="block w-full py-3 bg-pink-600 text-white text-[10px] font-bold tracking-widest hover:bg-black transition-colors"
                  >
                    ADD TO BAG
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Men Package Section */}
      <section className="py-24 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/10 skew-x-12 transform translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="flex items-center space-x-2 text-blue-400 mb-2">
                <Sparkles size={16} />
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase">For Him</span>
              </div>
              <h2 className="text-4xl font-serif">Men Packages</h2>
            </div>
            <Link to="/shop?category=Men+Package" className="text-xs font-bold tracking-widest text-blue-400 border-b border-blue-900 pb-1 hover:text-white transition-colors">VIEW ALL SETS</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {menSets.map(product => (
              <div key={product.id} className="group flex flex-col md:flex-row bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden hover:border-blue-500/50 transition-colors">
                <div className="md:w-1/2 aspect-square">
                  <img 
                    src={product.imageUrls[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  />
                </div>
                <div className="md:w-1/2 p-8 flex flex-col justify-center">
                  <h3 className="text-2xl font-serif mb-2">{product.name}</h3>
                  <p className="text-blue-400 font-bold text-xl mb-4">GH¢ {product.price}</p>
                  <p className="text-xs text-gray-400 line-clamp-2 mb-6">{product.description}</p>
                  <Link 
                    to={`/product/${product.id}`}
                    className="inline-block py-3 px-6 border border-white/20 text-white text-[10px] font-bold tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    VIEW PACKAGE
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Note (Based on Image) */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="p-10 border border-gray-100 rounded-sm bg-gray-50/50">
            <h3 className="text-2xl font-serif mb-6">Note</h3>
            <ul className="text-sm text-gray-500 space-y-4 mb-10 text-left list-disc list-inside">
              <li>Each gift set can be personalized to reflect your unique style.</li>
              <li>Additional items may be included upon request at a fee.</li>
              <li>Kindly place orders in advance for premium packaging and delivery.</li>
              <li>Also single perfumes are available for purchase.</li>
            </ul>
            <div className="border-t border-gray-200 pt-8">
              <h4 className="text-sm font-bold tracking-widest uppercase mb-4 text-red-600">Contact Us On</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium">
                <div>WhatsApp: 0206845402, 0557743737</div>
                <div>Snapchat: naa.deii8</div>
                <div className="md:col-span-2">Location: Knust, Kotei</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
