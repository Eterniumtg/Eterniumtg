
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  // LADIES PACKAGES
  {
    id: 'v-ladies-1',
    name: 'Baby Girl Gift Set',
    description: 'Includes: Mini perfume, Scented candle, Lipgloss and liner, Chocolate, Handcream, and Bracelet.',
    price: 250,
    discount: 0,
    stock: 50,
    imageUrls: ['https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=800'],
    category: 'Ladies Package',
    isFeatured: true,
    notes: ['Mini Perfume', 'Scented Candle', 'Luxury Chocolates']
  },
  {
    id: 'v-ladies-2',
    name: 'Sweetheart Gift Set',
    description: 'Includes: Mini perfume, Hairclips, Chocolate, Purse, Necklace, and Lipgloss.',
    price: 250,
    discount: 0,
    stock: 45,
    imageUrls: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=800'],
    category: 'Ladies Package',
    isFeatured: true,
    notes: ['Mini Perfume', 'Purse', 'Necklace']
  },
  {
    id: 'v-ladies-3',
    name: 'My Muse Gift Set',
    description: 'Includes: Mini perfume, Body Splash, Hand fan, Necklace, Lipgloss and liner, and Chocolate.',
    price: 350,
    discount: 0,
    stock: 30,
    imageUrls: ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=800'],
    category: 'Ladies Package',
    isFeatured: true,
    notes: ['Mini Perfume', 'Body Splash', 'Necklace']
  },
  {
    id: 'v-ladies-4',
    name: 'Heart Of Mine Gift Set',
    description: 'Includes: Luxury Perfume (100ml), Hand fan, Diary, Hairclips, Champagne, Chocolate, and Handcream.',
    price: 580,
    discount: 0,
    stock: 15,
    imageUrls: ['https://images.unsplash.com/photo-1615033811136-2184be5e378c?auto=format&fit=crop&q=80&w=800'],
    category: 'Ladies Package',
    isFeatured: true,
    notes: ['100ml Luxury Perfume', 'Champagne', 'Diary']
  },
  // MEN PACKAGES
  {
    id: 'v-men-1',
    name: 'Bae Approved Gift Set',
    description: 'Includes: Perfume, Wallet, Belt, Champagne, and Chocolate.',
    price: 450,
    discount: 0,
    stock: 40,
    imageUrls: ['https://images.unsplash.com/photo-1616940844649-535215ae4eb1?auto=format&fit=crop&q=80&w=800'],
    category: 'Men Package',
    isFeatured: true,
    notes: ['Perfume', 'Leather Wallet', 'Champagne']
  },
  {
    id: 'v-men-2',
    name: 'My Safe Place Gift Set',
    description: 'Includes: Perfume (100ml), Watch, Bracelet, Champagne, and Chocolate.',
    price: 500,
    discount: 0,
    stock: 20,
    imageUrls: ['https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&q=80&w=800'],
    category: 'Men Package',
    isFeatured: true,
    notes: ['100ml Perfume', 'Luxury Watch', 'Champagne']
  },
  {
    id: 'v-men-3',
    name: 'My Forever Man Gift Set',
    description: 'Includes: Luxury Perfume (100ml), Men\'s slippers, Wallet, Room Diffuser, Chocolates, and Atomizer.',
    price: 700,
    discount: 0,
    stock: 10,
    imageUrls: ['https://images.unsplash.com/photo-1512314889357-e157c22f938d?auto=format&fit=crop&q=80&w=800'],
    category: 'Men Package',
    isFeatured: true,
    notes: ['100ml Luxury Perfume', 'Room Diffuser', 'Men\'s Slippers']
  }
];

export const THEME = {
  primary: '#b91c1c', // Valentine Red
  secondary: '#1A1A1A', // Rich Black
  background: '#FAF9F6', // Off-white
  accent: '#fca5a5', // Soft Pink
};
