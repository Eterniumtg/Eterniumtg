
import React from 'react';
import { Instagram, MessageCircle, Ghost, Mail, MapPin, Phone, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div>
          <div className="flex items-center space-x-2 mb-6">
            <h2 className="text-xl font-serif tracking-widest">AURASCENTS</h2>
            <Heart size={14} className="text-red-600 fill-red-600" />
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6 italic">
            Val's Edition - Curating the most romantic scents and premium gift packages to make your moments unforgettable.
          </p>
          <div className="flex space-x-4">
            <a href="https://wa.me/233206845402" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition-colors">
              <MessageCircle size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-pink-500 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors">
              <Ghost size={20} />
            </a>
          </div>
        </div>

        {/* Shop Column */}
        <div>
          <h3 className="text-[10px] font-bold tracking-widest mb-6 text-red-600 uppercase">Shop Val's Edition</h3>
          <ul className="space-y-4 text-sm text-gray-400 font-medium">
            <li><Link to="/shop?category=Ladies+Package" className="hover:text-white transition-colors">Ladies Packages</Link></li>
            <li><Link to="/shop?category=Men+Package" className="hover:text-white transition-colors">Men Packages</Link></li>
            <li><Link to="/shop" className="hover:text-white transition-colors">All Perfumes</Link></li>
            <li><Link to="/" className="hover:text-white transition-colors">Gift Customization</Link></li>
          </ul>
        </div>

        {/* Support Column */}
        <div>
          <h3 className="text-[10px] font-bold tracking-widest mb-6 text-red-600 uppercase">Support</h3>
          <ul className="space-y-4 text-sm text-gray-400 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Delivery Info</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Packaging Options</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Pre-order Guide</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h3 className="text-[10px] font-bold tracking-widest mb-6 text-red-600 uppercase">Get In Touch</h3>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start space-x-3">
              <MapPin size={18} className="text-red-600 mt-0.5 flex-shrink-0" />
              <span className="leading-tight">Knust, Kotei</span>
            </li>
            <li className="flex items-center space-x-3">
              <MessageCircle size={18} className="text-red-600 flex-shrink-0" />
              <a href="tel:0206845402" className="hover:text-white transition-colors">0206845402 / 0557743737</a>
            </li>
            <li className="flex items-center space-x-3">
              <Ghost size={18} className="text-red-600 flex-shrink-0" />
              <span>naa.deii8</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-red-600 flex-shrink-0" />
              <a href="mailto:hello@aurascents.com" className="hover:text-white transition-colors">hello@aurascents.com</a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest font-bold text-gray-600 uppercase">
        <p>© 2024 AURASCENTS VAL'S EDITION. ALL RIGHTS RESERVED.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
};
