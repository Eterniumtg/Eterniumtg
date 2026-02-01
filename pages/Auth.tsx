
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, UserRole } from '../types';
import * as db from '../db';
import { Eye, EyeOff, Lock, Mail, User as UserIcon } from 'lucide-react';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const users = db.getUsers();

    if (isLogin) {
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        onLogin(user);
        navigate(user.role === UserRole.ADMIN ? '/admin' : '/');
      } else {
        setError('Invalid credentials. For admin use admin@luxury.com / admin');
      }
    } else {
      if (users.find(u => u.email === formData.email)) {
        setError('Email already registered.');
        return;
      }
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: UserRole.CUSTOMER
      };
      // In a real app we'd save to DB
      onLogin(newUser);
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif mb-4 tracking-wider">
            {isLogin ? 'Welcome Back' : 'Join the Maison'}
          </h1>
          <p className="text-gray-400 text-sm">Experience the pinnacle of fine perfumery.</p>
        </div>

        <div className="bg-white p-10 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full border-b border-gray-200 py-3 pl-8 outline-none focus:border-[#D4AF37] transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full border-b border-gray-200 py-3 pl-8 outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Password</label>
              <div className="relative">
                <Lock className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                <input 
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                  className="w-full border-b border-gray-200 py-3 pl-8 pr-8 outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="••••••••"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#D4AF37]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

            <button 
              type="submit"
              className="w-full py-4 bg-black text-white text-xs tracking-widest font-bold hover:bg-[#D4AF37] transition-all duration-300"
            >
              {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-xs tracking-widest font-bold text-gray-400 hover:text-black transition-colors"
            >
              {isLogin ? "DON'T HAVE AN ACCOUNT? REGISTER" : "ALREADY A MEMBER? LOGIN"}
            </button>
          </div>
        </div>

        {isLogin && (
          <div className="mt-12 bg-[#E5D3B3]/20 p-6 rounded-sm text-center">
            <p className="text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase mb-2">Admin Demo Access</p>
            <p className="text-xs text-gray-500">Email: admin@luxury.com | Pass: admin</p>
          </div>
        )}
      </div>
    </div>
  );
};
