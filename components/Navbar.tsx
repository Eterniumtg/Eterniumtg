
import { ShoppingBag, User as UserIcon, Menu, X, LogOut, LayoutDashboard, Heart } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
  cartCount: number;
  wishlistCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout, cartCount, wishlistCount }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center group">
            <Link to="/" className="flex items-center space-x-2 text-2xl font-serif tracking-widest text-black">
              <span className="font-bold">AURASCENTS</span>
              <span className="text-red-600 text-xs tracking-tighter self-end mb-1 font-sans">VAL'S EDITION</span>
              <Heart size={16} className="text-red-600 fill-red-600 group-hover:scale-125 transition-transform" />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-[10px] tracking-widest font-bold hover:text-red-600 transition-colors">HOME</Link>
            <Link to="/shop" className="text-[10px] tracking-widest font-bold hover:text-red-600 transition-colors">SHOP COLLECTION</Link>
            <Link to="/shop?category=Ladies+Package" className="text-[10px] tracking-widest font-bold text-pink-600 hover:text-red-700 transition-colors">LADIES SETS</Link>
            <Link to="/shop?category=Men+Package" className="text-[10px] tracking-widest font-bold text-blue-600 hover:text-blue-800 transition-colors">MEN SETS</Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            {user?.role === UserRole.ADMIN && (
              <Link to="/admin" title="Admin Dashboard" className="text-gray-600 hover:text-red-600">
                <LayoutDashboard size={20} />
              </Link>
            )}
            
            <Link to="/wishlist" className="relative text-gray-600 hover:text-red-600 transition-colors">
              <Heart size={20} className={wishlistCount > 0 ? "fill-red-600 text-red-600" : ""} />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => navigate('/profile')} 
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-red-600"
                >
                  <UserIcon size={20} />
                  <span className="hidden lg:inline">{user.name.split(' ')[0]}</span>
                </button>
                <button onClick={onLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/auth" className="text-[10px] tracking-widest font-bold hover:text-red-600">LOGIN</Link>
            )}

            <Link to="/cart" className="relative text-gray-600 hover:text-red-600">
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 py-4 space-y-4">
          <Link to="/" className="block text-xs tracking-widest font-bold" onClick={() => setIsOpen(false)}>HOME</Link>
          <Link to="/shop" className="block text-xs tracking-widest font-bold" onClick={() => setIsOpen(false)}>SHOP</Link>
          <Link to="/wishlist" className="block text-xs tracking-widest font-bold" onClick={() => setIsOpen(false)}>WISHLIST ({wishlistCount})</Link>
          <Link to="/shop?category=Ladies+Package" className="block text-xs tracking-widest font-bold text-pink-600" onClick={() => setIsOpen(false)}>LADIES SETS</Link>
          <Link to="/shop?category=Men+Package" className="block text-xs tracking-widest font-bold text-blue-600" onClick={() => setIsOpen(false)}>MEN SETS</Link>
        </div>
      )}
    </nav>
  );
};
